const axios = require('axios');
require('dotenv').config();

const registerWebhook = async () => {
  try {
    console.log('Attempting to register webhook...');

    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2023-07/webhooks.json`,
      {
        webhook: {
          topic: 'customers/update',
          address: `${process.env.WEBHOOK_URL}/api/webhooks/customers/update`,
          format: 'json',
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    console.log('Webhook registered successfully:', response.data);
  } catch (error) {
    console.error('Failed to register webhook:', error.response ? error.response.data : error.message);
  }
};

registerWebhook();
