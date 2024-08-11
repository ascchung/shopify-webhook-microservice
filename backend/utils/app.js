const express = require("express");
require("dotenv").config();
const { rawBodySaver, verifyWebhook } = require("./verify-webhook");
const subscribeToWebhook = require("../utils/webhook-subscription");
const webhookRoutes = require("../routes/webhook-routes");

const app = express();

// Capture raw body data
app.use(express.json({ verify: rawBodySaver }));

if (process.env.NODE_ENV === "production") {
  subscribeToWebhook(
    process.env.SHOPIFY_STORE_URL,
    process.env.SHOPIFY_ACCESS_TOKEN,
    "customers/update",
    `${process.env.WEBHOOK_URL}/api/webhooks/customers/update`
  );
}

app.get("/", (req, res, next) => {
  res.send("This is my deployed app!");
});

// Routes
app.use("/api/webhooks", verifyWebhook, webhookRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
});

module.exports = app;
