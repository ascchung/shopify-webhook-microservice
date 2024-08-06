const express = require("express");
const bodyParser = require("body-parser");
const subscriptionRoutes = require("../routes/subscription-routes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/api", subscriptionRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
});

module.exports = app;
