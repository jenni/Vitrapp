class Bus {
    constructor(line, route, minutes = 0, distance = 0) {
        this.line = line;
        this.route = route.toLowerCase();
        this.minutes = minutes;
        this.distance = distance;
    }
}

module.exports = Bus;