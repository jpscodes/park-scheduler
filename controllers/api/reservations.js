const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation,
  searchReservations,
  searchMyReservations
};

async function makeReservation(req, res) {
  req.body.user = req.user._id
  const reservation = await Reservation.create(req.body)
  res.json(reservation)
  
  
}

async function searchReservations(req, res) {
  // console.log(`${req.params.id}`, 'made it to controller')
  try {
    const reservations = await Reservation.find({park: req.params.id}); 
    // console.log(reservations, 'resssssss')
    res.json(reservations);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function searchMyReservations(req, res) {
  // console.log(`${req.params.id}`, 'myres made it to controller')
  try {
    const reservations = await Reservation.find({user: req.params.id}); 
    // console.log(reservations, 'resssssss')
    res.json(reservations);
  } catch (error) {
    res.status(400).json(error);
  }
}