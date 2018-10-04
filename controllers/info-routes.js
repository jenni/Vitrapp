const express = require('express');
const router = express.Router();
const convert = require('xml-js');
const soap = require('strong-soap').soap;
const url = 'http://sira.intecoingenieria.com/SWEstimacionParada.asmx?WSDL';

const Moeder = require('../models/moeder');
const moeder = new Moeder(soap, url);

const STOPS = require('../stops');

router.get('/', async (req, res) => {
    res.json(STOPS);
});

router.get('/:lat/:lng/', async (req, res) => {
    const stops = await moeder.getNearbyStops(req.params.lat, req.params.lng);

    res.json(stops);
});

router.get('/:id', async (req, res) => {
    const info = await moeder.getStopInfoByStopId(req.params.id);

    res.json(info);
});

router.get('/info/:id/estimation/', async (req, res) => {
    const estimation = await moeder.getEstimationByStopId(req.params.id);

    res.json(estimation);
});

router.get('/info/:id/estimations/', async (req, res) => {
    const estimations = await moeder.getEstimationsByStopId(req.params.id);

    res.json(estimations);
});


module.exports = router;
