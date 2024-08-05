const express = require("express");

const subscriptionControllers = require("../controllers/subscription-controllers");

const router = express.Router();

router.post("/webhook", subscriptionControllers.updateSubscription);

module.exports = router;
