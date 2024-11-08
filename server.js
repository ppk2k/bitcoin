const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your Stripe Secret Key
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body; // Amount is expected to be in dollars (e.g., 100 for $1)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert dollars to cents
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
