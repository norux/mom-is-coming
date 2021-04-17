import express from 'express';
import morgan from 'morgan';
import path from 'path';

import cors from './middlewares/cors';
import handle404 from './middlewares/error/handle404';
import handleError from './middlewares/error/handleError';
import fetchSpreadSheet from './middlewares/fetchSpreadSheet';
import ignoreFavicon from './middlewares/ignore/favicon';
import version from './middlewares/version';
import routes from './routes';

const app = express();

app.set('etag', false);
app.set('x-powered-by', false);

app.use(express.static(path.resolve(process.cwd(), '../mic-web/dist')));

app.use(express.json());
app.use(ignoreFavicon);

app.use(morgan('combined'));
app.use(cors);

// app.use(fetchBandData);
app.use(fetchSpreadSheet);

app.use('/version', version);
app.use('/api', routes);

app.use(handle404);
app.use(handleError);

export default app;
