const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation,
  searchReservations
};

async function makeReservation(req, res) {
  req.body.user = req.user._id

  let date = new Date()
  let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
  console.log(newDate)
  const reservation = await Reservation.create(req.body)
  res.json(reservation)
  
  
}

async function searchReservations(req, res) {
  console.log(`${req.params.id}`, 'made it to controller')
  try {
    const reservations = await Reservation.find({park: req.params.id}); // how do I only return reservations that match the park id in the request params
    console.log(reservations, 'resssssss')
    res.json(reservations);
  } catch (error) {
    res.status(400).json(error);
  }
}

