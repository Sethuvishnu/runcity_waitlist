require('dotenv').config();  // Load .env variables

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
console.log("hello")


// MongoDB connection string
const uri = process.env.MONGODB;
console.log(uri);
console.log("hello");
// 
// Connect to MongoDB using Mongoose
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Define the email schema
const emailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});
const Email = mongoose.model('Email', emailSchema); // CHANGING SCHEMA NAME CREATE ANOTHER COLLECTION AUTOMATICALLY

// While changing the scheme also restart the server to avoid any other confusions

app.post('/waitlist', async (req, res) => {
  const { email, name } = req.body;

  try {
    const existing = await Email.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already in waitlist" });
    }

    const newEmail = new Email({ name, email });
    await newEmail.save();

    const count = await Email.countDocuments();
    res.status(200).json({ success: true, message: 'Email saved!', total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error saving email' });
  }
});

const PORT = process.env.PORT || 3000;
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
