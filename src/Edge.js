'use strict';

class Edge {
    /**
     * @param {Node} source
     * @param {Node} destination
     * @param {Number} weight
     * @param {Number|null} capacity
     */
    constructor(source, destination, weight, capacity) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
        this.capacity = capacity;
        this.flow = 0;
    }
}