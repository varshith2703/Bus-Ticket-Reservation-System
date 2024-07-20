const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const Booking = require('../models/booking.model');
const BusDetails = require('../models/busDetails'); 

// Create a new booking
router.post('/', bookingController.createBooking);

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find(); // Retrieve all bookings from the database
        res.json(bookings); // Send the bookings as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update seatNos in BusDetails
router.patch('/updateSeatNos', async (req, res) => {
    const { busId, seatNosToRemove } = req.body;
  
    try {
      // Find the BusDetails document by busId
      const bus = await BusDetails.findById(busId);
      if (!bus) {
        return res.status(404).json({ message: 'Bus not found' });
       }
  
        // Remove the selected seat numbers from seatNos array
        bus.seatNos = bus.seatNos.filter(seatNo => !seatNosToRemove.includes(seatNo));
  
        // Save the updated BusDetails document
        await bus.save();
  
      // Respond with success message
      res.status(200).json({ message: 'Seat numbers removed successfully' });
    } 
    catch (error) {
      // Handle errors
      console.error('Error updating seatNos:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
module.exports = router;

