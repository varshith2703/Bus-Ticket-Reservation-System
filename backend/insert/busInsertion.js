const mongoose = require('mongoose');
const BusDetails = require('../models/busDetails');


function generateSeatNos() {
  const rows = ['1', '2', '3', '4', '5', '6']; // Rows
  const cols = ['A', 'B', 'C']; // Columns
  const seatNos = [];
  rows.forEach(row => {
    cols.forEach(col => {
      seatNos.push(row + col); // Concatenate row and column to generate seat number
    });
  });
  return seatNos;
}

const predefinedBusDetails = [
  {
    name: 'Morning Star',
    fromStation: 'Machilipatnam',
    toStation: 'Hyderabad',
    departureDate: new Date('2024-05-02'),
    departureTime: '08:00 AM',
    arrivalTime: '04:00 PM',
    price: 900,
    seatNos: generateSeatNos()
  },
  {
    name: 'Eswar Travels',
    fromStation: 'Machilipatnam',
    toStation: 'Hyderabad',
    departureDate: new Date('2024-05-02'),
    departureTime: '09:00 AM',
    arrivalTime: '3:00 PM',
    price: 600,
    seatNos: generateSeatNos()
  },
  {
    name: 'Dasari Travels',
    fromStation: 'Machilipatnam',
    toStation: 'Hyderabad',
    departureDate: new Date('2024-05-02'),
    departureTime: '10:00 AM',
    arrivalTime: '6:00 PM',
    price: 800,
    seatNos: generateSeatNos()
  }
];

async function insertBusDetails() {
  try {
    await BusDetails.insertMany(predefinedBusDetails);
    console.log('Predefined bus details inserted successfully');
  } catch (error) {
    console.error('Error inserting predefined bus details:', error);
  }
}

module.exports = insertBusDetails;
