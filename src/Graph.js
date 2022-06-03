'use strict';

class Graph {
    constructor() {
        this.nodes = [];
    }

    /**
     * @param {Node} node
     */
    registerNode(node) {
        this.nodes.push(node);
    }

    /**
     * @returns {[Node]}
     */
    getNodes() {
        return this.nodes;
    }
}