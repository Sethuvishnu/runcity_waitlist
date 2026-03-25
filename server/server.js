require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
const razorpay = new Razorpay({
  key_id: process.env.LIVE_KEY_ID,
  key_secret: process.env.LIVE_KEY_SECRET
});

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({
  origin: 'https://runcity-waitlist.vercel.app'
}))
app.use(express.json());

// ── Stripe ─────────────────────────────────────────────────────────

const storeItems = new Map([
  [1, { priceInCents: 99900,   name: "Early Adopter — Lifetime Access" }],
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
    // Calculate total in **USD cents**
    const totalAmountUSD = req.body.items.reduce((total, item) => {
      const storeItem = storeItems.get(item.id);
      return total + storeItem.priceInCents * item.quantity;
    }, 0);

    // Create Razorpay order in USD
    const order = await razorpay.orders.create({
      amount: totalAmountUSD,      // in **cents**, e.g., 99900 = $999.00
      currency: "USD",             // changed from INR to USD
      receipt: "receipt_" + Date.now(),
    });

    res.json({ order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// ── Start ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});