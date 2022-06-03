'use strict';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// TODO https://stackoverflow.com/questions/65915371/how-do-i-make-the-program-wait-for-a-button-click-to-go-to-the-next-loop-iterati
function sleepTil(shouldCompleteFn) {
    return new Promise(resolve => setTimeout(sleepTilHelper, 100, resolve, shouldCompleteFn));
}
function sleepTilHelper(resolve, shouldCompleteFn) {
    if (shouldCompleteFn()) {
        resolve();
        return;
    }
    setTimeout(sleepTilHelper, 100, resolve, shouldCompleteFn);
}

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

    async runVisualize(node, renderUpdateFn) {
        this.dist.set(node.name, 0);
        let sleepTilFn = function() {
            let result = nextStep;
            nextStep = false;
            return result;
        };
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
                renderUpdateFn(this.graph, this.dist, this.prev, this.queue, u, v,
                    potentialDistanceToV + ' < ' + this.dist.get(v.name));
                await sleepTil(sleepTilFn);
                if (potentialDistanceToV < this.dist.get(v.name)) {
                    this.dist.set(v.name, potentialDistanceToV);
                    this.prev.set(v.name, u.name);
                    renderUpdateFn(this.graph, this.dist, this.prev, this.queue, u, v);
                    await sleepTil(sleepTilFn);
                }
                renderUpdateFn(this.graph, this.dist, this.prev, this.queue, u, v);
                await sleepTil(sleepTilFn);
            }
            await sleepTil(sleepTilFn);
        }
        renderUpdateFn(this.graph, this.dist, this.prev, this.queue, null, null);
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