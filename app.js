const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/api");

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
});

app.get("/", (req, res, next) => {
  res.send("Sample text" + " running on this server");
  res.end();
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("Server started on port ${PORT}"));
