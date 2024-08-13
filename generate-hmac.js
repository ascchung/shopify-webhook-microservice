const crypto = require("crypto");

const secret = "107839242a32c9d78149dbdaba84f666";
const payload = JSON.stringify({
  id: 7757726548216,
  email: "henrique@cletile.com",
  email_marketing_consent: {
    state: "subscribed",
  },
});

const hmac = crypto.createHmac("sha256", secret);
hmac.update(payload);
const hmacHeader = hmac.digest("base64");

console.log(hmacHeader);
