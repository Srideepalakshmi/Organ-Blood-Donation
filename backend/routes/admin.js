const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Admin sees all users
router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// Delete user by id
router.delete("/users/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;   // ✅ important
