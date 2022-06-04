'use strict';

class EdmondsKarp {
    /**
     * @param {Graph} graph
     */
    constructor(graph) {
        this.graph = graph;
    }

    /**
     * @param {Node} source
     * @param {Node} sink
     */
    run(source, sink) {
        while (true) {
            const pred = this.breadthFirstSearch(source, sink);
            if (pred === null) {
                break;
            }
            let maxFlow = Infinity;
            const pathEdges = [];
            let edge = pred.get(sink.name);
            while (true) {
                console.log('- ' + edge.source.name + '->' + edge.destination.name);
                pathEdges.push(edge);
                if (!pred.has(edge.source.name)) {
                    break;
                }
                edge = pred.get(edge.source.name);
            }
            for (edge of pathEdges) {
                maxFlow = Math.min(edge.capacity - edge.flow, maxFlow);
            }
            for (edge of pathEdges) {
                edge.flow += maxFlow
            }
        }
    }

    /**
     * @param {Node} source
     * @param {Node} sink
     * @returns {null|Map<string, Edge>}
     */
    breadthFirstSearch(source, sink) {
        let queue = [];
        let pred = new Map();
        queue.push(source);
        while (queue.length > 0) {
            let node = queue.pop();
            for (const edge of node.edges) {
                const dest = edge.destination;
                if (!pred.has(edge.destination)
                    //&& dest !== source
                    && edge.flow < edge.capacity) {
                    pred.set(dest.name, edge);
                    queue.push(dest);
                }
            }
        }
        if (!pred.has(sink.name)) {
            return null;
        }
        return pred;
    }

    summarizeResults() {
        let result = '';
        for (let [, node] of graph.getNodes()) {
            result += node.name + ': ';
            for (let edge of node.edges) {
                result += edge.destination.name + ' (' + edge.flow + '/' + edge.capacity + '), ';
            }
            result += "\n";
        }
        return result;
    }
}