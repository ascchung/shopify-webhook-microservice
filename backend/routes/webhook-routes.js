const express = require("express");
const { handleCustomerUpdate } = require("../controllers/webhook-controllers");
const verifyWebhook = require("../utils/verify-webhook");

const router = express.Router();

router.post("/webhooks", verifyWebhook, handleCustomerUpdate);

module.exports = router;
