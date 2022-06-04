'use strict';

class Node {
    /**
     * @param {Graph} graph
     * @param {String} name
     */
    constructor(graph, name) {
        this.name = name;
        this.edges = [];
        graph.registerNode(this);
    }

    /**
     * @param {Node} node
     * @param {Number} weight
     */
    connect(node, weight) {
        // connect both ways
        this.edges.push(new Edge(this, node, weight, null));
        node.edges.push(new Edge(node, this, weight, null))
    }

    /**
     * @param {Node} node
     * @param {Number} capacity
     */
    connectFlow(node, capacity) {
        // connect one way
        this.edges.push(new Edge(this, node, null, capacity));
    }

    getEdges() {
        return this.edges;
    }
}