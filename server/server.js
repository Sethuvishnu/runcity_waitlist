require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");




// ── Firebase Admin ──────────────────────────────────────────────────
const serviceAccount = require("./serviceAccount.json"); // <-- uses local file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "https://runcity-waitlist.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ]
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Runcity API" });
});

// Join waitlist
app.post("/waitlist", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  try {
    const emailsRef = db.collection("emails");

    // Check duplicate
    const existing = await emailsRef.where("email", "==", email.toLowerCase()).limit(1).get();
    if (!existing.empty) {
      return res.status(400).json({ success: false, message: "You're already on the waitlist!" });
    }

    // Save entry
    await emailsRef.add({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Get total count
    const countSnap = await emailsRef.count().get();
    const count = countSnap.data().count;

    res.status(200).json({
      success: true,
      message: "You're on the list!",
      total: count,
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Try again." });
  }
});

// Get waitlist count (for displaying live count on frontend)
app.get("/waitlist/count", async (req, res) => {
  try {
    const countSnap = await db.collection("emails").count().get();
    const count = countSnap.data().count;
    res.status(200).json({ success: true, total: count });
  } catch (error) {
    console.error("Count error:", error);
    res.status(500).json({ success: false, message: "Could not fetch count" });
  }
});

// ── Start ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Runcity API running at http://localhost:${PORT}`);
});