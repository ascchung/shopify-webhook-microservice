const express = require("express");
const { handleCustomerUpdate } = require("../controllers/webhook-controllers");

const router = express.Router();

router.post("/customers/update", handleCustomerUpdate);

module.exports = router;
