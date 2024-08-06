const crypto = require("crypto");

// Replace with your actual Shopify API secret
const secret = "107839242a32c9d78149dbdaba84f666";
const body = JSON.stringify({
  customer: {
    id: 123456,
    email: "henrique@cletile.com",
    accepts_marketing: false,
  },
});

const hash = crypto
  .createHmac("sha256", secret)
  .update(body, "utf8")
  .digest("base64");

console.log(hash);
