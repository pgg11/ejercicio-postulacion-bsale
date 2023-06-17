const express = require('express');
const router = express.Router();

const flightPassengersController = require('../controllers/flightPassengersController');

router.get("/flights/:id/passengers" , flightPassengersController.getFlightPassengers)


module.exports = router;