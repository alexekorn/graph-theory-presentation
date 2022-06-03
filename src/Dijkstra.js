'use strict';

class Dijkstra {
    /**
     * @param {Graph} graph
     */
    constructor(graph) {
        this.graph = name;
        this.dist = new Map();
        this.prev = new Map();
        this.queue = new Map();
        // initialize distances and previous
        for (let node of graph.getNodes()) {
            this.dist.set(node.name, Infinity);
            this.prev.set(node.name, null);
            this.queue.set(node.name, node);
        }
    }

    /**
     * @param {Node} node
     */
    run(node) {
        this.dist.set(node.name, 0);
        while (this.queue.size > 0) {
            let u = this.getU();
            this.queue.delete(u.name);

            for (let uEdge of u.edges) {
                let v = uEdge.destination;
                if (!this.queue.get(v.name)) {
                    continue;
                }
                let potentialDistanceToV = this.dist.get(u.name) + uEdge.weight;
                if (potentialDistanceToV < this.dist.get(v.name)
                    && this.dist.get(u.name) !== Infinity) {
                    this.dist.set(v.name, potentialDistanceToV);
                    this.prev.set(v.name, u.name);
                }
            }
        }
    }

    /**
     * @returns {Node}
     */
    getU() {
        /** @var {Node} u */
        let u = null;
        console.log(this.queue);
        for (let [, potentialU] of this.queue) {
            console.log(potentialU);
            if (u === null) {
                u = potentialU;
                continue;
            }
            if (this.dist.get(potentialU.name) < this.dist.get(u.name)) {
                u = potentialU
                continue;
            }
        }
        return u;
    }
}