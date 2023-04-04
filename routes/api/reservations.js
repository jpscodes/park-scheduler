const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../../controllers/api/reservations');

console.log('came here')
router.post('/', reservationsCtrl.makeReservation);
router.get('/:id', reservationsCtrl.searchReservations);
router.get('/:id/myres', reservationsCtrl.searchMyReservations);
router.get('/:id/myresgone', reservationsCtrl.deleteMyReservation);


module.exports = router;