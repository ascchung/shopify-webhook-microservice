const crypto = require("crypto");

const secret = "107839242a32c9d78149dbdaba84f666";
const body = JSON.stringify({
  contact_email: "henrique@cletile.com",
  propertyName: "accepts_marketing",
  propertyValue: "false",
});

const hash = crypto
  .createHmac("sha256", secret)
  .update(body, "utf8")
  .digest("base64");

console.log(hash);
