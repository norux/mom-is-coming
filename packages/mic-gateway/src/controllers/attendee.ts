import { Request, Response } from 'express';

export function getAttendee(req: Request, res: Response) {
  res.json(req.app.locals.attendees || []);
}
