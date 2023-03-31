const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation,
  searchReservations
};

async function makeReservation(req, res) {
  req.body.user = req.user._id
  const reservation = await Reservation.create(req.body)
  res.json(reservation)
  
  
}

async function searchReservations(req, res) {
  console.log(req, 'made it to controller')
  const reservations = await Reservation.find(req.body)
  // res.json(reservations)
  
  
}
