const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  busId: { type: String, required: true },
  passengers: { type: Array, required: true }, // Array of passenger details
  payableAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
