const convert = require('xml-js');
const stops = require('./stops');

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
                    if (err) reject(err);

                    const res = JSON.parse(toJson(xml.BuscarParadasIdParadaResult));
                    const stop = {
                        id: res.Paradas.Parada._attributes.idparada,
                        name: res.Paradas.Parada._attributes.nombre,
                        distance: res.Paradas.Parada._attributes.distancia,
                        latitude: res.Paradas.Parada._attributes.latitud,
                        longitude: res.Paradas.Parada._attributes.longitud
                    }

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
                    if (err) throw new Error();

                    const parsed = JSON.parse(toJson(xml.EstimacionParadaIdParadaResult));

                    resolve(parsed);
                });
            });
        });
    }

    getNearbyStops(lat, lng) {
        return new Promise((resolve, reject) => {
            this.soap.createClient(this.url, (err, client) => {
                client.BuscarParadas({
                    Latitud: lat,
                    Longitud: lng
                }, (err, xml) => {
                    if (err) throw new Error();

                    const parsed = JSON.parse(toJson(xml.BuscarParadasResult));
                    const stops = parsed.Paradas.Parada;

                    resolve(stops);
                });
            });
        });
    }
}

const toJson = (xml) => convert.xml2json(xml, { compact: true, spaces: 4 });

module.exports = Moeder;
