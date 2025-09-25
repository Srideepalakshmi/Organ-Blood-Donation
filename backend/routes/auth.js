const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register new user
// @route   POST /api/auth/signup
// @desc    Register new user
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password1, password2, role, phone, hospital, donorDetails } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // check password match
    if (password1 !== password2) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // save user
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role,
      phone,
      hospital,
      donorDetails,
    });

    await user.save();

    // return user with role so frontend can redirect
    res.json({
      success: true,
      msg: "Signup successful",
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // create token
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret123", {
      expiresIn: "1h",
    });

    res.json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
