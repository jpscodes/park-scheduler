const express = require('express');
const router = express.Router();

const token = process.env.PARKS_APP_TOKEN;
const ROOT_URL = 'https://data.seattle.gov/resource/2cer-njie.json';

module.exports = router;