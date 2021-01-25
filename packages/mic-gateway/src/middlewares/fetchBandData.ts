import axios from 'axios';
import createHttpError from 'http-errors';

import { ALLOWED_MEMBER, BAND_API_BASE_URL, GetPostCommentResponse, GetPostsResponse, Paging } from '@/types/band';
import { getDate } from '@/utils/date';

export default async function (req, res, next) {
  if (
    !req.app.locals.mutex &&
    new Date().getTime() - req.app.locals.lastUpdated <= Number(process.env.FETCH_BAND_DATA_INTERVAL)
  ) {
    return next();
  }

  try {
    req.app.locals.mutex = true;

    const { data: posts } = await axios.get<GetPostsResponse>(`${BAND_API_BASE_URL}/v2/band/posts`, {
      params: {
        access_token: process.env.BAND_ACCESS_TOKEN,
        band_key: process.env.BAND_KEY,
      },
    });

    const today = getDate(new Date());
    const attendanceBook = posts.result_data.items.find(
      item =>
        ALLOWED_MEMBER.includes(item.author.role) && getDate(item.created_at) === today && /출석부/.test(item.content)
    );

    if (!attendanceBook) {
      req.app.locals.lastUpdated = new Date().getTime();

      return next();
    }

    const { post_key, content } = attendanceBook;
    req.app.locals.attendees = content.split('\n').reduce<string[]>((acc, cur) => {
      if (cur[0] !== '-') {
        return acc;
      }

      acc.push(cur.slice(1).trim());

      return acc;
    }, []);

    const pickUpChildren: any[] = [];
    let nextParams: Paging = null;
    do {
      const { data: comments } = await axios.get<GetPostCommentResponse>(`${BAND_API_BASE_URL}/v2/band/post/comments`, {
        params: nextParams ?? {
          access_token: process.env.BAND_ACCESS_TOKEN,
          band_key: process.env.BAND_KEY,
          post_key,
        },
      });

      const { items } = comments.result_data;
      items.forEach(({ content, comment_key }) => {
        for (const attendee of req.app.locals.attendees) {
          if (new RegExp(attendee).test(content)) {
            pickUpChildren.push({
              attendee,
              postKey: post_key,
              commentKey: comment_key,
            });
            break;
          }
        }
      });

      nextParams = comments.result_data.paging.next_params;
    } while (nextParams);

    req.app.locals.pickUpChildren = pickUpChildren;
    req.app.locals.lastUpdated = new Date().getTime();

    next();
  } catch (e) {
    next(createHttpError(e));
  } finally {
    req.app.locals.mutex = false;
  }
}
