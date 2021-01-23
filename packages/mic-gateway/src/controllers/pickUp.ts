import axios from 'axios';
import { Request, Response } from 'express';
import createHttpError from 'http-errors';

import { BAND_API_BASE_URL } from '@/types/band';

export function getPickUpChildren(req: Request, res: Response) {
  res.json(req.app.locals.pickUpChildren || []);
}

export async function finishPickUpChildren(req: Request, res: Response, next) {
  try {
    await axios.post(`${BAND_API_BASE_URL}/v2/band/post/comment/remove`, null, {
      params: {
        access_token: process.env.BAND_ACCESS_TOKEN,
        band_key: process.env.BAND_KEY,
        post_key: req.params.postKey,
        comment_key: req.params.commentKey,
      },
    });

    res.status(200).send();
  } catch (e) {
    next(createHttpError(400));
  }
}
