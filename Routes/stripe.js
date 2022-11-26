const express = require("express");
const dotenv = require("dotenv");
const stripe = require("stripe")(
  "sk_test_51M4l1ySJGwpaZLmzNkTXx1PNlo2wRaLwieCthi3EDe4badrdd4o7RNhiQwumSqwNxWTQbrCgPeUsuXVZMy0Qw1E2000a4mNRJm"
);
const router = express.Router();
dotenv.config();

router.post("/create-checkout-session", async (req, res) => {
  const Line_item_rec = req.body.cartItem;

  const line_items = Line_item_rec.map((item) => {
    // const price = Integer.parse(item.price);
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartTotalQty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.REACT_CLIENT_URL}/payment-successful`,
    cancel_url: `${process.env.REACT_CLIENT_URL}/cart`,
  });
  res.status(200).send({ url: session.url });
});

module.exports = router;
