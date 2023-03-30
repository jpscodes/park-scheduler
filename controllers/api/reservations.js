const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation
};

async function makeReservation(req, res) {
  req.body.user = req.user._id
  const reservation = await Reservation.create(req.body)
  res.json(reservation)
  console.log(req.body, 'made it to controller')
  
}