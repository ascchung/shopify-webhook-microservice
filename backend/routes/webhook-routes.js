const express = require("express");
const { verifyWebhook, rawBodySaver } = require("../utils/verify-webhook");
const { handleCustomerUpdate } = require("../controllers/webhook-controllers");

const router = express.Router();

router.post(
  "/api/webhooks/customers/update",
  express.json({ verify: rawBodySaver }),
  verifyWebhook,
  handleCustomerUpdate
);

module.exports = router;
