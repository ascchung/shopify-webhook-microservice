const crypto = require("crypto");
const HttpError = require("../models/http-error");

const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

const verifyWebhook = (req, res, next) => {
  const hmac = req.get("X-Shopify-Hmac-Sha256");
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(req.rawBody, "utf8", "hex")
    .digest("base64");

  console.log(`Received HMAC: ${hmac}`);
  console.log(`Calculated Hash: ${hash}`);
  console.log(`Request Body: ${req.rawBody}`);
  console.log(`Secret: ${process.env.SHOPIFY_API_SECRET}`);

  if (hash !== hmac) {
    console.error("Webhook verification failed");
    return next(new HttpError("Unauthorized", 401));
  }

  console.log("Webhook verified successfully");
  next();
};

module.exports = {
  verifyWebhook,
  rawBodySaver,
};
