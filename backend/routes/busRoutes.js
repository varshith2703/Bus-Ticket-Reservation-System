// busRoutes.js
const express = require('express');
const router = express.Router();
const BusDetails = require('../models/busDetails');

// Route to search for buses based on criteria
router.post('/search', async (req, res) => {
  const { fromStation, toStation, departureDate } = req.body;

  try {
    // Query MongoDB to find buses matching the search criteria
    const buses = await BusDetails.find({
      fromStation: fromStation,
      toStation: toStation,
      departureDate: new Date(departureDate).toISOString()
    });

    // Send the list of matching buses as JSON response
    res.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    // Send an error response with status code 500 (Internal Server Error)
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
