import { google } from 'googleapis';
import createHttpError from 'http-errors';

import { SHEET_COLUMN } from '@/types/google';

const sheets = google.sheets('v4');

export default async function (req, res, next) {
  if (
    !req.app.locals.mutex &&
    new Date().getTime() - req.app.locals.lastUpdated <= Number(process.env.FETCH_DATA_INTERVAL)
  ) {
    return next();
  }

  try {
    req.app.locals.mutex = true;

    const { data } = await sheets.spreadsheets.values.get({
      key: process.env.GOOGLE_KEY,
      spreadsheetId: process.env.SPREAD_SHEET_ID,
      range: process.env.SPREAD_SHEET_RANGE,
    });

    req.app.locals.pickUpChildren = (data.values || []).reduce((acc, column) => {
      if (column[SHEET_COLUMN.TO_BE_PICK_UP] === 'TRUE' && column[SHEET_COLUMN.ALREADY_GO_HOME] === 'FALSE') {
        acc.push(column[SHEET_COLUMN.NAME]);
      }

      return acc;
    }, []);
    req.app.locals.lastUpdated = new Date().getTime();

    next();
  } catch (e) {
    next(createHttpError(e));
  } finally {
    req.app.locals.mutex = false;
  }
}
