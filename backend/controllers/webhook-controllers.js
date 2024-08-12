const axios = require("axios");
const HttpError = require("../models/http-error");
require("dotenv").config();

const handleCustomerUpdate = async (req, res, next) => {
  const payload = req.body;

  console.log("Received payload:", payload);

  try {
    // Extract customer details from the payload
    const customerId = payload.id;
    const email = payload.email;
    console.log(
      `Processing customer with ID: ${customerId} and email: ${email}`
    );

    if (!customerId || !email) {
      console.error("Customer ID or email is missing in the payload.");
      return next(new HttpError("Invalid payload structure", 400));
    }

    // Create the Shopify REST client instance
    const client = axios.create({
      baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-07`,
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });

    // Update the customer with the new marketing status
    const updateResponse = await client.put(`/customers/${customerId}.json`, {
      customer: {
        id: customerId,
        email_marketing_consent: {
          state: "not_subscribed",
          opt_in_level: "single_opt_in",
        },
      },
    });

    console.log("Update response:", updateResponse.data);
    res
      .status(200)
      .json({ message: "Customer marketing status updated successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return next(new HttpError("Internal server error", 500));
  }
};

module.exports = {
  handleCustomerUpdate,
};
