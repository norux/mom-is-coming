import express from 'express';
import morgan from 'morgan';

import version from './middlewares/version';
import handle404 from './middlewares/error/handle404';
import handleError from './middlewares/error/handleError';
import cors from './middlewares/cors';
import routes from './routes';

const app = express();

app.set('etag', false);
app.set('x-powered-by', false);

app.use(morgan('combined'));
app.use(cors);

app.use('/version', version);
app.use('/api', routes);

app.use(handle404);
app.use(handleError);

export default app;
