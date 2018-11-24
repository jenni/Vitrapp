const stops = require('../stops');

class Stop {
    constructor(id, name, Location, distance = 0, buses = []) {
        this.id = id;
        this.name = name.toLowerCase();
        this.location = Location;
        this.distance = distance;
        this.buses = buses;
    }

    static getAll() {
        return JSON.stringify(stops, null, 4);  
    }

    static getById(id) {
        return stops.filter(stop => stop.id == id);
    }
}

module.exports = Stop;