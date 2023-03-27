const express = require('express');
const router = express.Router();
const parksCtrl = require('../../controllers/api/parks');
// const ensureLoggedIn = require('../config/ensureLoggedIn');

// const token = process.env.PARKS_APP_TOKEN;
// const ROOT_URL = 'https://data.seattle.gov/resource/2cer-njie.json';

router.get('/', parksCtrl.searchAPI);

module.exports = router;