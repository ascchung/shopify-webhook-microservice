const { shopifyApi, ApiVersion } = require("@shopify/shopify-api");
require("@shopify/shopify-api/adapters/node");
require("dotenv").config();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  scopes: ["write_customers"],
  hostName: process.env.SHOPIFY_STORE_URL.replace(/^https?:\/\//, ""),
  apiVersion: ApiVersion.July23,
});

async function registerWebhook() {
  try {
    const response = await shopify.rest.Webhook.create({
      session: shopify.session,
      topic: "customers/update",
      address: "https://343e-107-139-107-69.ngrok-free.app/api/webhooks",
      format: "json",
    });

    console.log("Webhook registered successfully:", response);
  } catch (error) {
    console.error("Failed to register webhook:", error);
  }
}

registerWebhook();
