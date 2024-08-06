const HttpError = require("../models/http-error");

const handleCustomerUpdate = async (req, res, next) => {
  const payload = req.body;

  try {
    const { id, email, accepts_marketing } = payload.customer;
    console.log(
      `Customer ${email} marketing consent status changed to: ${accepts_marketing}`
    );

    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error(error);
    return next(new HttpError("Internal server error", 500));
  }
};

module.exports = {
  handleCustomerUpdate,
};
