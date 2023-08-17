const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ajmal",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

// /* import checksum generation utility */
// var PaytmChecksum = require("./PaytmChecksum");

// paytmChecksum = request.body.CHECKSUMHASH;
// delete request.body.CHECKSUMHASH;

// var isVerifySignature = PaytmChecksum.verifySignature(
//   request.body,
//   config.PAYTM_MERCHANT_KEY,
//   paytmChecksum
// );
// if (isVerifySignature) {
//   console.log("Checksum Matched");
// } else {
//   console.log("Checksum Mismatched");
// }

module.exports = router;
