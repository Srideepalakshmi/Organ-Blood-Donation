const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

/**
 * === Get all users (Admin Dashboard) ===
 * Protected: Only logged-in users with admin role should see
 */
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error fetching users" });
  }
});

/**
 * === Delete user by ID (Admin only) ===
 */
router.delete("/users/:id", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error deleting user" });
  }
});

module.exports = router;
