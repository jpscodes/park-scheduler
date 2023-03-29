const express = require('express');
const router = express.Router();
const reservationsCtrl = require('../../controllers/api/reservations');


router.post('/:id', reservationsCtrl.makeReservation);


module.exports = router;