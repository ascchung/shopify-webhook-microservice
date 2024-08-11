const axios = require('axios');

const subscribeToWebhook = async (shopDomain, accessToken, topic, address) => {
  try {
    const response = await axios.post(
      `https://${shopDomain}/admin/api/2024-07/webhooks.json`,
      {
        webhook: {
          topic: topic,
          address: address,
          format: 'json',
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );
    console.log('Webhook subscription created:', response.data);
  } catch (error) {
    console.error('Error creating webhook subscription:', error.response ? error.response.data : error.message);
  }
};

module.exports = subscribeToWebhook;
