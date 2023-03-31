const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../../controllers/api/reservations');


router.post('/', reservationsCtrl.makeReservation);
router.get('/:id', reservationsCtrl.searchReservations);


module.exports = router;