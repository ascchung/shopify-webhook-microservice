const express = require("express");
require("dotenv").config();
const { rawBodySaver, verifyWebhook } = require("./utils/verify-webhook");
const webhookRoutes = require("./routes/webhook-routes");

const app = express();

// Capture raw body data
app.use(express.json({ verify: rawBodySaver }));

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
