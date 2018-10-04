const convert = require('xml-js');
const stops = require('../stops');

class Moeder {
    constructor(soap, url) {
        this.soap = soap;
        this.url = url;
    }

    getStops() {
        return JSON.stringify(stops, null, 4);
    }

    async getStopInfoByStopId(id) {
        return new Promise((resolve, reject) => {
            this.soap.createClient(this.url, (err, client) => {
                client.BuscarParadasIdParada({
                    IdParada: id
                }, (err, xml) => {
                    if (err) reject(err, 'Something went weird');

                    const parsed = JSON.parse(toJson(xml.BuscarParadasIdParadaResult));
                    const stop = flatStopInfo(parsed.Paradas.Parada);

                    resolve(stop);
                });
            });
        })
    }

    async getEstimationByStopId(id) {
        return new Promise((resolve, reject) => {
            this.soap.createClient(this.url, (err, client) => {
                client.EstimacionParadaIdParada({
                    IdParada: id
                }, (err, xml) => {
                    if (err) reject(err);

                    const parsed = JSON.parse(toJson(xml.EstimacionParadaIdParadaResult));
                    const estimations = parsed.NewDataSet.Estimaciones;
                    const shaped = estimations.length ?
                        estimations.map(estimation => flatBusInfo(estimation)) :
                        estimations;

                    resolve(shaped);
                });
            });
        });
    }

    async getEstimationsByStopId(id) {
        const stop = await this.getStopInfoByStopId(id);
        const buses = await this.getEstimationByStopId(id);
        stop['buses'] = buses;

        return stop;
    }

    getNearbyStops(lat, lng) {
        return new Promise((resolve, reject) => {
            this.soap.createClient(this.url, (err, client) => {
                client.BuscarParadas({
                    Latitud: lat,
                    Longitud: lng
                }, (err, xml) => {
                    if (err) reject(err, 'Something went weird');

                    const parsed = JSON.parse(toJson(xml.BuscarParadasResult));
                    const stops = parsed.Paradas.Parada;
                    const shaped = stops.map(stop => flatStopInfo(stop));

                    resolve(shaped);
                });
            });
        });
    }
}

const toJson = (xml) => convert.xml2json(xml, { compact: true, spaces: 4 });

const flatBusInfo = (busData) => {
    const bus = {
        line: busData.Linea._text,
        route: busData.Ruta._text,
        minutes: busData.minutos._text,
        meters: busData.metros._text
    };

    return bus;
}

const flatStopInfo = (stopData) => {
    const stop = {
        id: stopData._attributes.idparada,
        name: stopData._attributes.nombre,
        distance: stopData._attributes.distancia,
        location: {
            latitude: stopData._attributes.latitud,
            longitude: stopData._attributes.longitud
        }
    }

    return stop;
}


module.exports = Moeder;
