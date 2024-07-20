const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  seatNo: { type: String, required: true },
  busId: { type: String, required: true } // Add busId field
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
