const express = require('express');
const router = express.Router();
const convert = require('xml-js');
const soap = require('strong-soap').soap;
const url = 'http://sira.intecoingenieria.com/SWEstimacionParada.asmx?WSDL';

const Moeder = require('../moeder');
const moeder = new Moeder(soap, url);

const STOPS = require('../stops');

router.get('/stops', async (req, res) => {
    res.json(STOPS);
});

router.get('/stops/:lat/:lng/', async (req, res) => {
    const stops = await moeder.getNearbyStops(req.params.lat, req.params.lng);

    res.json(stops);
});

router.get('/:id', async (req, res) => {
    const info = await moeder.getStopInfoByStopId(req.params.id);

    res.json(info);
});

router.get('/:id/estimations', async (req, res) => {
    const stop = await moeder.getStopInfoByStopId(req.params.id);
    const info = await moeder.getEstimationByStopId(req.params.id);

    const merged = {
        stop: stop,
        buses: info.NewDataSet
    }

    res.json(merged);
});


module.exports = router;
