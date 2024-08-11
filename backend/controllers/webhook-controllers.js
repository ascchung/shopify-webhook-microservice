const axios = require("axios");
const HttpError = require("../models/http-error");
require("dotenv").config();

const handleCustomerUpdate = async (req, res, next) => {
  const { id: customer_id, email, email_marketing_consent } = req.body;

  // Check if all necessary data is present
  if (!customer_id || !email || !email_marketing_consent) {
    return next(new HttpError("Invalid payload structure", 400));
  }

  try {
    // Determine if the customer should be unsubscribed
    if (email_marketing_consent.state === "subscribed") {
      // Update the customer to "not_subscribed"
      const client = axios.create({
        baseURL: `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-07`,
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
      });

      const updateResponse = await client.put(
        `/customers/${customer_id}.json`,
        {
          customer: {
            id: customer_id,
            email_marketing_consent: {
              state: "not_subscribed", // Update the state to "not_subscribed"
            },
          },
        }
      );

      return res
        .status(200)
        .json({ message: "Customer unsubscribed successfully" });
    } else {
      return res
        .status(200)
        .json({ message: "Customer is not subscribed, no changes made." });
    }
  } catch (error) {
    return next(new HttpError("Internal server error", 500));
  }
};

module.exports = {
  handleCustomerUpdate,
};
