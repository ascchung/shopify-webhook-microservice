const express = require("express");
const router = express.Router();
const { handleCustomerUpdate } = require("../controllers/webhook-controllers");
const verifyWebhook = require("../utils/verify-webhook");

// Endpoint to handle webhooks
router.post("/webhooks", verifyWebhook, handleCustomerUpdate);

module.exports = router;
