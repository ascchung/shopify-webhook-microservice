const crypto = require("crypto");
const HttpError = require("../models/http-error");

// Middleware to capture raw request body
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

// Function to verify the Shopify Webhook HMAC
const verifyShopifyWebhook = (data, hmacHeader) => {
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(data, "utf8")
    .digest("base64");

  // Ensure hmacHeader and hash are of the same length
  if (hmacHeader.length !== hash.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(hmacHeader), Buffer.from(hash));
};

// Middleware to handle Shopify Webhook verification
const verifyWebhook = (req, res, next) => {
  const hmacHeader = req.headers["x-shopify-hmac-sha256"];
  const data = req.rawBody;

  console.log({ hmacHeader, data });

  if (!hmacHeader || !data) {
    return res.status(400).send("Bad Request");
  }

  const verified = verifyShopifyWebhook(data, hmacHeader);

  if (!verified) {
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
