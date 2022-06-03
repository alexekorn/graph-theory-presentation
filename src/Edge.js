'use strict';

class Edge {
    /**
     * @param {Node} source
     * @param {Node} destination
     * @param weight
     */
    constructor(source, destination, weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
}