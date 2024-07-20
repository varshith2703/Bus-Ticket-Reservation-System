const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const { busId, passengers, payableAmount } = req.body;

    const newBooking = new Booking({
      busId,
      passengers,
      payableAmount
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
