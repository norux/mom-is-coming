import axios from 'axios';

import { getDate } from '@/utils/date';

const BAND_API_BASE_URL = 'https://openapi.band.us';
const ALLOWED_MEMBER = ['leader', 'coleader'];

export default async function (req, res, next) {
  if (
    !req.app.locals.mutex &&
    new Date().getTime() - req.app.locals.lastUpdated <= Number(process.env.FETCH_BAND_DATA_INTERVAL)
  ) {
    return next();
  }

  const { data: posts } = await axios.get(`${BAND_API_BASE_URL}/v2/band/posts`, {
    params: {
      access_token: process.env.BAND_ACCESS_TOKEN,
      band_key: process.env.BAND_KEY,
    },
  });

  try {
    req.app.locals.mutex = true;
    const today = getDate(new Date());
    const attendanceBook = posts.result_data.items.find(
      item =>
        ALLOWED_MEMBER.includes(item.author.role) && getDate(item.created_at) === today && /출석부/.test(item.content)
    );

    if (!attendanceBook) {
      req.app.locals.lastUpdated = new Date().getTime();

      return next();
    }

    const attendees = attendanceBook.content.split('\n').reduce((acc, cur) => {
      if (cur[0] !== '-') {
        return acc;
      }

      acc.push(cur.slice(1).trim());

      return acc;
    }, []);

    req.app.locals.attendees = {
      [today]: attendees,
    };

    console.log(req.app.locals.attendees);

    req.app.locals.lastUpdated = new Date().getTime();

    next();
  } finally {
    req.app.locals.mutex = false;
  }
}
