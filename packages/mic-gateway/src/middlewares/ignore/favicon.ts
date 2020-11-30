export default function (req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    return res.sendStatus(204);
  }

  next();
}
