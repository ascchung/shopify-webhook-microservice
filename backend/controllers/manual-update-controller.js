const axios = require("axios");
const HttpError = require("../models/http-error");
require("dotenv").config();

const renderUpdateForm = (req, res, next) => {
  res.send(`
    <form action="/update-customer" method="POST">
      <label for="customerId">Customer ID:</label>
      <input type="text" id="customerId" name="customerId" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="status">Marketing Status:</label>
      <select id="status" name="status">
        <option value="subscribed">Subscribed</option>
        <option value="unsubscribed">Not Subscribed</option>
      </select>
      <br>
      <button type="submit">Update</button>
    </form>
  `);
};

const handleManualUpdate = async (req, res, next) => {
  console.log("Received form data:", req.body);

  const { customerId, email, marketingStatus } = req.body;

  if (!customerId || !email || !marketingStatus) {
    return res.status(400).json({ message: "Missing required fields" });
  }

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
          state: marketingStatus,
        },
      },
    });

    console.log("Update response:", updateResponse.data);
    res
      .status(200)
      .json({ message: "Customer marketing status updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    return next(new HttpError("Internal server error", 500));
  }
};

module.exports = {
  renderUpdateForm,
  handleManualUpdate,
};
