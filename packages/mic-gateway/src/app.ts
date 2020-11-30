import express from 'express';
import morgan from 'morgan';

import version from './middlewares/version';
import handle404 from './middlewares/error/handle404';
import handleError from './middlewares/error/handleError';
import ignoreFavicon from './middlewares/ignore/favicon';
import cors from './middlewares/cors';
import fetchBandData from './middlewares/fetchBandData';
import routes from './routes';

const app = express();
app.locals.attendees = {};
app.locals.lastUpdated = 0;

app.set('etag', false);
app.set('x-powered-by', false);

app.use(ignoreFavicon);

app.use(morgan('combined'));
app.use(cors);

app.use(fetchBandData);

app.use('/version', version);
app.use('/api', routes);

app.use(handle404);
app.use(handleError);

export default app;
