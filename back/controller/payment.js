const Schemapay = require("../model/payment");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const paymentInsert = async (req, res) => {
  try {
    const { name, amount } = req.body;

    const userData = new Schemapay({
      name,
      amount,
    });
    const storepayment = await userData.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Donation",
            },

            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.STRIPE_URL}/Donate?success=true`,
      cancel_url: `${process.env.STRIPE_URL}/Donate?success=false`,
    });
    // console.log(session);
    res.json({ id: session.id });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPayment = async (req, res) => {
  try {
    const getData = await Schemapay.find();
    if (!getData || getData.length === 0) {
      // console.log("Data not found");
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json(getData);
    }
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  paymentInsert,
  getPayment,
};
