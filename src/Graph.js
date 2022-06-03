'use strict';

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    /**
     * @param {Node} node
     */
    registerNode(node) {
        this.nodes.set(node.name, node);
    }

    /**
     * @returns {Map}
     */
    getNodes() {
        return this.nodes;
    }
}