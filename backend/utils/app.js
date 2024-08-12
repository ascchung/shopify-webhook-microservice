const express = require("express");
require("dotenv").config();
const { rawBodySaver, verifyWebhook } = require("./verify-webhook");
const {
  renderUpdateForm,
  handleManualUpdate,
} = require("../controllers/manual-update-controller");
const subscribeToWebhook = require("../utils/webhook-subscription");
const webhookRoutes = require("../routes/webhook-routes");

const app = express();

// Capture raw body data
app.use(express.json({ verify: rawBodySaver }));
app.use(express.urlencoded({ extended: true })); // Needed to parse form data

const manageWebhookSubscription = async () => {
  try {
    await subscribeToWebhook(
      process.env.SHOPIFY_STORE_URL,
      process.env.SHOPIFY_ACCESS_TOKEN,
      "customers/update",
      `${process.env.WEBHOOK_URL}/api/webhooks/customers/update`
    );
    console.log("Webhook subscription created or already exists.");
  } catch (error) {
    if (
      error.errors &&
      error.errors.address &&
      error.errors.address.includes("for this topic has already been taken")
    ) {
      console.log("Webhook already exists. No need to create a new one.");
    } else {
      console.error("Error creating webhook subscription:", error);
    }
  }
};

manageWebhookSubscription();

app.get("/", renderUpdateForm);

app.post("/update-customer", handleManualUpdate);

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
