const convert = require('xml-js');
const SOAP = require('strong-soap').soap;

const Stop = require('../models/Stop');
const Bus = require('../models/Bus');
const Location = require('../models/Location');

const URL = 'http://sira.intecoingenieria.com/SWEstimacionParada.asmx?WSDL';

class SoapWrapper {

    static getNearbyStops(lat, long) {
        return new Promise((resolve, reject) => {
            SOAP.createClient(URL, (err, client) => {
                client.BuscarParadas({
                    Latitud: lat,
                    Longitud: long
                }, (err, xml) => {
                    if (err) reject(err, 'Something went weird');

                    console.log(xml)
                    const parsed = JSON.parse(convert.xml2json(xml.BuscarParadasResult, { compact: true }));
                    const stops = parsed.Paradas.Parada;
                    const shaped = constructStops(stops);

                    console.log(shaped);
                    
                    resolve(stops);
                });
            });
        });
    }

    static getEstimationsByStopId(id) {
        return new Promise((resolve, reject) => {
            SOAP.createClient(URL, (err, client) => {
                client.EstimacionParadaIdParada({
                    IdParada: id
                }, (err, xml) => {
                    // console.log('lalalalalalalalalala')
                    if (err) reject(err);

                    console.log('xml.EstimacionParadaIdParadaResult ===>', 
                    xml.EstimacionParadaIdParadaResult);
                    const parsed = JSON.parse(convert.xml2json(xml.EstimacionParadaIdParadaResult, { compact: true }));
                    const estimations = parsed.NewDataSet.Estimaciones;
                    const shaped = constructEstimations(estimations);

                    // console.log(shaped); 
                    resolve(shaped);
                });
            });
        });
    }

    static getEstimationsByCoordinates(lat, long) {
        return new Promise((resolve, reject) => {
            SOAP.createClient(URL, (err, client) => {
                client.EstimacionParadaCoordenadas({
                    LatitudParada: lat,
                    LongitudParada: long
                }, (err, xml) => {
                    if (err) reject(err, 'Could not get estimations.');

                    console.log(xml);
                    const parsed = JSON.parse(convert.xml2json(xml.EstimacionParadaCoordenadasResult, { compact: true }));
                    const estimations = parsed.NewDataSet.Estimaciones;
                    const shaped = constructEstimations(estimations);

                    console.log(shaped);
                    resolve(shaped);
                });
            });
        });
    }
}

const constructStops = (stops) => {
    return stops.length ?
        stops.map(stop =>
            new Stop(
                stop._attributes.idparada,
                stop._attributes.nombre,
                new Location(stop._attributes.latitud, stop._attributes.longitud),
                stop._attributes.distancia
            )
        ) : [ new Stop(
            stops._attributes.idparada,
            stops._attributes.nombre,
            new Location(stop._attributes.latitud, stop._attributes.longitud),
            stop._attributes.distancia
        ) ];
}

const constructEstimations = (estimations) => {
    return estimations.length ?
        estimations.map(estimation => 
            new Bus(
                estimation.Linea._text,
                estimation.Ruta._text,
                estimation.minutos._text,
                estimation.metros._text
            )
        ) : [ new Bus(
            estimations.Linea._text, 
            estimations.Ruta._text,
            estimations.minutos._text,
            estimations.metros._text
            ) ];
}

module.exports = { SoapWrapper };