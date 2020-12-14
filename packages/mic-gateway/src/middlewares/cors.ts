const ALLOWS_DOMAINS = [];

export default function (req, res, next) {
  if (
    ALLOWS_DOMAINS.some(domain => {
      const regexp = new RegExp(`${domain}(?::\\d+)?$`);

      return regexp.test(req.headers.origin);
    })
  ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  }
  next();
}
