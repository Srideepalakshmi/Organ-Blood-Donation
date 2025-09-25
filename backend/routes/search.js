const express = require('express');
const router = express.Router();
const User = require('../models/User');

// q can be blood type like "O-" or organ like "liver"
router.get('/', async (req,res)=>{
  try{
    const q = (req.query.q || '').trim().toLowerCase();
    if(!q) return res.json([]);
    // search donors by blood type or organ type or hospital
    const results = await User.find({
      $or: [
        {'donorDetails.bloodType': { $regex: q, $options: 'i' }},
        {'donorDetails.organType': { $regex: q, $options: 'i' }},
        { hospital: { $regex: q, $options: 'i' } }
      ],
      'donorDetails.donationType': { $exists: true }
    }).select('-password');
    res.json(results);
  }catch(err){ console.error(err); res.status(500).send('Server error');}
});

module.exports = router;
