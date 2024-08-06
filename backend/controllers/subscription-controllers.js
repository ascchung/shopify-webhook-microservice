const axios = require('axios');
const db = require('../utils/db');
const HttpError = require('../models/http-error');

const updateSubscription = async (req, res, next) => {
  const { contact_email, propertyName, propertyValue } = req.body;

  if (!contact_email || !propertyName || !propertyValue) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    await db.query(
      'INSERT INTO subscriptions (contact_email, propertyName, propertyValue) VALUES (?, ?, ?)',
      [contact_email, propertyName, propertyValue]
    );

    const customers = await axios.get(
      `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-04/customers/search.json?query=email:${contact_email}`,
      { headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY } }
    );

    if (customers.data.customers.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customerId = customers.data.customers[0].id;

    await axios.put(
      `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-04/customers/${customerId}.json`,
      { customer: { id: customerId, [propertyName]: propertyValue } },
      { headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY } }
    );

    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateSubscription
};
