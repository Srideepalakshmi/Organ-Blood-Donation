require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// === Import routes ===
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactus');
const searchRoutes = require('./routes/search');
const donorRoutes = require('./routes/donor');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user'); // 👈 new for profile update

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Serve uploaded files (profile photos) ===
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/organ-donor-website";

// === Database connection ===
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

// === API routes ===
app.use('/api/auth', authRoutes);
app.use('/api/contactus', contactRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes); // 👈 add user profile routes
app.use("/api/admin", require("./routes/admin"));
// === Root test route ===
app.get('/', (req, res) =>
  res.send({ ok: true, message: 'Organ Donor backend running' })
);

// === Start server ===
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
