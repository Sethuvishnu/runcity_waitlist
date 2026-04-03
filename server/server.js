require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);









// ── Firebase Admin ──────────────────────────────────────────────────
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const razorpay = new Razorpay({
  key_id: process.env.LIVE_KEY_ID,
  key_secret: process.env.LIVE_KEY_SECRET,
});

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors({ origin: "https://runcity-waitlist.vercel.app" }));

app.use(express.json());

// ── Store items ─────────────────────────────────────────────────────
const storeItems = new Map([
  [1, { priceInCents: 99900, name: "Early Adopter — Lifetime Access" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

// ── Routes ──────────────────────────────────────────────────────────

app.post("/waitlist", async (req, res) => {
  const { email, name } = req.body;
  try {
    const emailsRef = db.collection("emails");

    // Check for duplicate
    const existing = await emailsRef.where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      return res.status(400).json({ success: false, message: "Email already in waitlist" });
    }

    // Save new entry
    await emailsRef.add({ name, email, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    // Count total
    const countSnap = await emailsRef.count().get();
    const count = countSnap.data().count;

    res.status(200).json({ success: true, message: "Email saved!", total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving email" });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const totalAmountUSD = req.body.items.reduce((total, item) => {
      const storeItem = storeItems.get(item.id);
      return total + storeItem.priceInCents * item.quantity;
    }, 0);

    const order = await razorpay.orders.create({
      amount: totalAmountUSD,
      currency: "USD",
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