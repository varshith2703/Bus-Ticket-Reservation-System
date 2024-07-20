const express = require('express');
const router = express.Router();
const Passenger = require('../models/passenger.model');

// Route to insert passenger details
router.post('/passengers', async (req, res) => {
  try {
    const { passengers, busId } = req.body;

    // Add busId to each passenger object
    const passengersWithBusId = passengers.map(passenger => ({ ...passenger, busId }));

    // Insert passengers into MongoDB
    const insertedPassengers = await Passenger.insertMany(passengersWithBusId);

    res.status(201).json(insertedPassengers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch passengers by busId
router.get('/passengers/bus/:busId', async (req, res) => {
    const { busId } = req.params;
    try {
      const passengers = await Passenger.find({ busId });
      res.status(200).json(passengers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
module.exports = router;
