const axios = require("axios");
const HttpError = require("../models/http-error");

const renderUpdateForm = (req, res) => {
  res.send(`
    <form action="/update-customer" method="POST">
      <label for="customerId">Customer ID:</label>
      <input type="text" id="customerId" name="id" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>
      <label for="marketingStatus">Marketing Status:</label>
      <select id="marketingStatus" name="state" required>
        <option value="subscribed">Subscribed</option>
        <option value="unsubscribed">Unsubscribed</option>
      </select><br>
      <button type="submit">Update Customer</button>
    </form>
  `);
};

const handleManualUpdate = async (req, res, next) => {
  const { id, email, state } = req.body;

  console.log("Received form data:", req.body);

  if (!id || !email || !state) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = axios.create({
      baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-07`,
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });

    const updateResponse = await client.put(`/customers/${id}.json`, {
      customer: {
        id,
        email,
        email_marketing_consent: {
          state: state,
        },
      },
    });

    console.log("Update response:", updateResponse.data);
    res
      .status(200)
      .json({ message: "Customer marketing status updated successfully" });
  } catch (error) {
    console.error("Error processing manual update:", error);
    return next(new HttpError("Internal server error", 500));
  }
};

module.exports = {
  renderUpdateForm,
  handleManualUpdate,
};
