const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Agent sees all donors
router.get("/donors", auth, async (req, res) => {
  try {
    if (req.user.role !== "agent") return res.status(403).json({ msg: "Access denied" });

    const donors = await User.find({ role: "donor" }).select("-password");
    res.json(donors);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Example: Agent updates donor status (processed)
router.put("/donor/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "agent") return res.status(403).json({ msg: "Access denied" });

    const { notes } = req.body;
    const donor = await User.findByIdAndUpdate(req.params.id, { "donorDetails.notes": notes }, { new: true });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
