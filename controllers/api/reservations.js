const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  makeReservation,
  searchReservations,
  searchMyReservations,
  deleteMyReservation
};

async function makeReservation(req, res) {
  req.body.user = req.user._id
  req.body.reservationDate += 'T00:00'
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
    const reservations = await Reservation.find({user: req.params.id})
      .populate('park')
    // console.log(reservations, 'resssssss')
    res.json(reservations);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteMyReservation(req, res) {
  console.log(req, 'controller wowww')
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this reservation' });
    }
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Failed to delete reservation', error);
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
}