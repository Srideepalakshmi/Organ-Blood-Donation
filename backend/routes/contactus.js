const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactUs');

router.post('/', async (req,res)=>{
  try{
    const {name,email,message} = req.body;
    const c = new Contact({name,email,message});
    await c.save();
    res.json({ok:true, contact:c});
  }catch(err){
    console.error(err); res.status(500).send('Server error');
  }
});

router.get('/', async (req,res)=>{
  try{
    const contacts = await Contact.find().sort({createdAt:-1});
    res.json(contacts);
  }catch(err){ console.error(err); res.status(500).send('Server error');}
});

module.exports = router;
