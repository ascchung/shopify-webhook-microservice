const express = require("express");
require("dotenv").config();

const app = express();
const subscriptionRoutes = require("../routes/subscription-routes");

app.use(express.json());

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
