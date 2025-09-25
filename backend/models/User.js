const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor','agent','admin'], default: 'donor' },
  phone: String,
  hospital: String,
  donorDetails: {
    donationType: { type: String, enum: ['blood','organ'] },
    bloodType: String,
    organType: String,
    notes: String,
    location: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
