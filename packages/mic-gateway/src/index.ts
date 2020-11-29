import http from 'http';
import app from './app';
import pkgJson from '../package.json';

const port = (process.env as any).SERVER_PORT || '3000';

http.createServer(app).listen(port, function () {
  console.log(`[${pkgJson.version}] server has started on port ${port}`);
});
