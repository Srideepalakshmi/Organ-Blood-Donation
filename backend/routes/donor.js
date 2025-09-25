const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// === Get donor’s own details ===
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const donor = await User.findById(req.user.userId).select("-password");
    if (!donor) return res.status(404).json({ msg: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error("GET /me error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// === Update donor’s details ===
router.put("/update", auth, async (req, res) => {
  try {
    if (req.user.role !== "donor") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const {
      age,
      dob,
      donationType,
      bloodType,
      organType,
      location,
      hospital,   // ✅ add hospital from body
      phone,
      email,
    } = req.body;

    const donor = await User.findById(req.user.userId);
    if (!donor) return res.status(404).json({ msg: "Donor not found" });

    // Update top-level fields
    donor.age = age || donor.age;
    donor.dob = dob || donor.dob;
    donor.hospital = hospital || donor.hospital;  // ✅ FIX
    donor.phone = phone || donor.phone;
    donor.email = email || donor.email;

    // Update donorDetails subdocument
    donor.donorDetails = {
      donationType,
      bloodType: donationType === "blood" ? bloodType : undefined,
      organType: donationType === "organ" ? organType : undefined,
      location,
    };

    await donor.save();

    res.json({ msg: "Donor details updated successfully", donor });
  } catch (err) {
    console.error("PUT /update error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
