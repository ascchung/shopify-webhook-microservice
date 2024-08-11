const axios = require('axios');
const HttpError = require('../models/http-error');
require('dotenv').config();

const handleCustomerUpdate = async (req, res, next) => {
  const payload = req.body;

  console.log('Received payload:', payload);

  try {
    // Extract customer details from the payload
    const { contact_email, propertyName, propertyValue } = payload;
    console.log(`Processing customer with email: ${contact_email}`);

    // Create the Shopify REST client instance
    const client = axios.create({
      baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-07`,
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });

    // Search for the customer by email
    const searchResponse = await client.get('/customers/search.json', {
      params: { query: `email:${contact_email}` },
    });

    if (searchResponse.data.customers.length === 0) {
      console.log(`Customer with email ${contact_email} not found`);
      return res.status(404).json({ message: `Customer with email ${contact_email} not found` });
    }

    const customerId = searchResponse.data.customers[0].id;
    console.log(`Found customer ID: ${customerId}`);

    // Update the customer with the new marketing status
    const updateResponse = await client.put(`/customers/${customerId}.json`, {
      customer: {
        id: customerId,
        [propertyName]: propertyValue,
      },
    });

    console.log('Update response:', updateResponse.data);
    res.status(200).json({ message: 'Customer marketing status updated successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return next(new HttpError('Internal server error', 500));
  }
};

module.exports = {
  handleCustomerUpdate,
};
