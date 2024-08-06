const crypto = require('crypto');
const HttpError = require('../models/http-error');

const verifyWebhook = (req, res, next) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  if (hash !== hmac) {
    return next(new HttpError('Unauthorized', 401));
  }

  next();
};

module.exports = verifyWebhook;
