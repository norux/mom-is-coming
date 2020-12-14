import { Request, Response } from 'express';

import { version } from '../../package.json';

export default function (req: Request, res: Response) {
  return res.json(version);
}
