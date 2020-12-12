export default function (error: any, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const { status, message } = error;

  if (status && message) {
    return res.status(status).send(message);
  }

  res.status(500).send('Internal Server Error');
}
