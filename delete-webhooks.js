const axios = require("axios");
require("dotenv").config();

const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const API_VERSION = "2024-07"; // Adjust the API version if needed

// Function to delete a webhook by ID
async function deleteWebhook(webhookId) {
  try {
    await axios.delete(
      `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/webhooks/${webhookId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );
    console.log(`Deleted webhook with ID: ${webhookId}`);
  } catch (error) {
    console.error(
      `Failed to delete webhook with ID: ${webhookId}`,
      error.message
    );
  }
}

// Function to retrieve all webhooks and delete them
async function deleteAllWebhooks() {
  try {
    const response = await axios.get(
      `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/webhooks.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const webhooks = response.data.webhooks;

    if (webhooks.length === 0) {
      console.log("No webhooks to delete.");
      return;
    }

    for (const webhook of webhooks) {
      await deleteWebhook(webhook.id);
    }

    console.log("All webhooks have been deleted.");
  } catch (error) {
    console.error("Error fetching webhooks:", error.message);
  }
}

// Run the deleteAllWebhooks function
deleteAllWebhooks();
