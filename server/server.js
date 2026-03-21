require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000", "http://localhost:5173"],
}));
app.use(express.json());

// ── Stripe ─────────────────────────────────────────────────────────
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 500,   name: "Early Adopter — Lifetime Access" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

// ── MongoDB ─────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ MongoDB connection error:", error));

const emailSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true },
});
const Email = mongoose.model("Email", emailSchema);

// ── Routes ──────────────────────────────────────────────────────────

app.post("/waitlist", async (req, res) => {
  const { email, name } = req.body;
  try {
    const existing = await Email.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already in waitlist" });
    }
    const newEmail = new Email({ name, email });
    await newEmail.save();
    const count = await Email.countDocuments();
    res.status(200).json({ success: true, message: "Email saved!", total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving email" });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: { name: storeItem.name },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url:  `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Start ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});