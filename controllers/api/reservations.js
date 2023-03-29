const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation
};

async function makeReservation(req, res) {
  console.log(req, 'made it to controller')
  
}