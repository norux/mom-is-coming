import { Request, Response } from 'express';

import execute from '@/utils/execute';

export async function update(req: Request, res: Response) {
  res.send(`I'll start to update`);

  await execute('git', ['pull'], { showCommand: true });
  await execute('yarn', ['workspace', 'mic-gateway', 'run', 'restart'], { showCommand: true });
}
