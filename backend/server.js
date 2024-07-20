const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const busRoutes = require('./routes/busRoutes');
const insertBusDetails = require('./insert/busInsertion');
const passengerRoutes = require('./routes/passenger.route')
const bookingRoutes = require('./routes/booking.route');



const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BTRS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
console.log('Connected to MongoDB');

  // Insert predefined bus details into MongoDB
  await insertBusDetails();

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());


  // Routes
  app.use('/busDetails', busRoutes);
  app.use('/api', passengerRoutes);
  app.use('/api/bookings', bookingRoutes); 

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
