require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET);

exports.handler = async function (event, context) {
  const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
  const calculateOrderAmount = () => shipping_fee + total_amount;

  if (event.body) {
    console.log(cart);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      console.log(paymentIntent);
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "yall faggots",
  };
};
