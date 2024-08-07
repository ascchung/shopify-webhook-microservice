const crypto = require("crypto");
const HttpError = require("../models/http-error");

const verifyWebhook = (req, res, next) => {
  const hmac = req.get("X-Shopify-Hmac-Sha256");
  const body = req.rawBody;
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(body, "utf8")
    .digest("base64");

  console.log("Received HMAC:", hmac);
  console.log("Calculated Hash:", hash);
  console.log("Request Body:", body);
  console.log("Secret:", process.env.SHOPIFY_API_SECRET);

  if (hash !== hmac) {
    console.error("Webhook verification failed");
    return next(new HttpError("Unauthorized", 401));
  }

  console.log("Webhook verified successfully");
  next();
};

module.exports = verifyWebhook;
