const express = require("express");
require("dotenv").config();
const { shopifyApi, ApiVersion } = require('@shopify/shopify-api');
require('@shopify/shopify-api/adapters/node');

const app = express();
const webhookRoutes = require("../routes/webhook-routes");

app.use(express.json());

// Shopify API setup
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  scopes: ['write_customers'],
  hostName: process.env.SHOPIFY_STORE_URL.replace(/^https?:\/\//, ''),
  apiVersion: ApiVersion.July23,
  isPrivateApp: true,
});

// Make Shopify available in the request object
app.use((req, res, next) => {
  req.shopify = shopify;
  next();
});

app.use("/api", webhookRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || "An unknown error occurred." });
});

module.exports = app;
