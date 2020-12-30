import fs from 'fs-extra';
import http from 'http';

import pkgJson from '../package.json';
import app from './app';

const port = (process.env as any).SERVER_PORT || '3000';

http.createServer(app).listen(port, async function () {
  // eslint-disable-next-line no-console
  console.log(`[${pkgJson.version}] server has started on port ${port} (${process.pid})`);

  await fs.writeFile(`${process.cwd()}/.pid`, process.pid);
});
