const express = require('express');
const router = express.Router();

const STOPS = require('../stops');
const SW = require('../services/SoapWrapper').SoapWrapper;

// get all stops
router.get('/all', async (req, res) => {
    res.json(STOPS);
});

// get stops by location
router.get('/nearby/:lat/:lng/', async (req, res) => {
    const stops = await SW.getNearbyStops(req.params.lat, req.params.lng);

    res.json(stops);
});

// get estimations by stop id
router.get('/:stopId/estimations', async (req, res) => {
    const info = await SW.getEstimationsByStopId(req.params.stopId);

    res.json(info);
});

// get estimations by location
router.get('/location/:lat/:lng/estimations', async (req, res) => {
    const estimations = await SW.getEstimationsByCoordinates(req.params.lat, req.params.lng);

    res.json(estimations);
});


module.exports = router;