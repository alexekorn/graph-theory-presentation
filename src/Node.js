'use strict';

class Node {
    /**
     * @param {Graph} graph
     * @param {String} name
     */
    constructor(graph, name) {
        graph.registerNode(this);
        this.name = name;
        this.edges = [];
    }

    /**
     * @param {Node} node
     * @param {Number} weight
     */
    connect(node, weight) {
        // connect both ways
        this.edges.push(new Edge(this, node, weight));
        node.edges.push(new Edge(node, this, weight))
    }
}