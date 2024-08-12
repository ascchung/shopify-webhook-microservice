const express = require("express");
require("dotenv").config();
const { rawBodySaver, verifyWebhook } = require("./verify-webhook");
const subscribeToWebhook = require("../utils/webhook-subscription");
const webhookRoutes = require("../routes/webhook-routes");

const app = express();

// Serving static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Capture raw body data
app.use(express.json({ verify: rawBodySaver }));

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

// Form on /customers/update
app.get("/customers/update", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "update-customer.html"));
});

// Routes
app.use("/api/webhooks", verifyWebhook, webhookRoutes);

app.post("/update-customer", async (req, res, next) => {
  const { customerId, email, status } = req.body;

  try {
    const client = axios.create({
      baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-07`,
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });

    const updateResponse = await client.put(`/customers/${customerId}.json`, {
      customer: {
        id: customerId,
        email_marketing_consent: {
          state: status,
        },
      },
    });

    res.send("Customer marketing status updated successfully");
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send("Error updating customer");
  }
});

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
