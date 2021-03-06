'use strict';

class Dijkstra {
    /**
     * @param {Graph} graph
     */
    constructor(graph) {
        this.graph = graph;
        this.dist = new Map();
        this.prev = new Map();
        this.queue = new Map();
        // initialize distances and previous
        for (let [, node] of graph.getNodes()) {
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
                if (this.dist.get(u.name) === Infinity) {
                    continue;
                }
                let potentialDistanceToV = this.dist.get(u.name) + uEdge.weight;
                if (potentialDistanceToV < this.dist.get(v.name)) {
                    this.dist.set(v.name, potentialDistanceToV);
                    this.prev.set(v.name, u.name);
                }
            }
        }
    }

    /**
     * @param {Node} node
     * @param {GraphRenderer} graphRenderer
     * @returns {Promise<void>}
     */
    async runVisualize(node, graphRenderer) {
        this.dist.set(node.name, 0);

        await graphRenderer.updateDijkstra(this, null, null);

        while (this.queue.size > 0) {
            const u = this.getU();
            this.queue.delete(u.name);

            await graphRenderer.updateDijkstra(this, u, null);

            for (let uEdge of u.edges) {
                const v = uEdge.destination;
                if (!this.queue.get(v.name)) {
                    continue;
                }
                if (this.dist.get(u.name) === Infinity) {
                    continue;
                }
                const potentialDistanceToV = this.dist.get(u.name) + uEdge.weight;

                await graphRenderer.updateDijkstra(this, u, v,
                    potentialDistanceToV + ' < ' + this.dist.get(v.name));

                if (potentialDistanceToV < this.dist.get(v.name)) {
                    this.dist.set(v.name, potentialDistanceToV);
                    this.prev.set(v.name, u.name);

                    await graphRenderer.updateDijkstra(this, u, v, null);
                }
            }
            // u is null now because we're done with it
            await graphRenderer.updateDijkstra(this, null, null);
        }
        await graphRenderer.updateDijkstra(this, null, null);
    }

    /**
     * @returns {Node}
     */
    getU() {
        /** @var {Node} u */
        let u = null;
        for (let [, potentialU] of this.queue) {
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

    /**
     * @returns {string}
     */
    summarizeResults() {
        let result = '';
        for (let [nodeName, distance] of this.dist) {
            result += nodeName + ': ' + distance + ' mi';
            let nodeNameIter = nodeName;
            let prevNodes = [];
            while (this.prev.get(nodeNameIter)) {
                nodeNameIter = this.prev.get(nodeNameIter);
                prevNodes.push(nodeNameIter);
            }
            if (prevNodes.length > 0) {
                result += ', from ';
            }
            result += prevNodes.join(", ") + "\n";
        }
        return result;
    }
}