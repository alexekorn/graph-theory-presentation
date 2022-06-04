'use strict';

class GraphRenderer {
    constructor() {
        this.el = document.getElementById('graphSvgG');
    }

    render(graph, locations) {
        const xmlns = "http://www.w3.org/2000/svg";
        for (let nodeName in locations) {
            const pos = locations[nodeName];

            // node el
            const el = document.createElementNS(xmlns, 'circle');
            el.setAttribute('cx', pos[0]);
            el.setAttribute('cy', pos[1]);
            el.setAttribute('r', '20');
            el.setAttribute('class', 'node');
            el.setAttribute('id', nodeName);
            this.el.appendChild(el);

            // node distance
            const elDist = document.createElementNS(xmlns, 'text');
            elDist.setAttribute('x', String(pos[0] + 20));
            elDist.setAttribute('y', String(pos[1] - 20));
            elDist.setAttribute('id', nodeName + 'Dist');
            elDist.setAttribute('class', 'nodeDist');
            elDist.innerHTML = nodeName;
            this.el.appendChild(elDist);

            const node = graph.getNodes().get(nodeName);
            for (let edge of node.getEdges()) {
                if (!locations[edge.destination.name]) {
                    continue;
                }
                const lineEl = document.createElementNS(xmlns, 'line');
                const x1 = pos[0];
                const y1 = pos[1];
                const x2 = locations[edge.destination.name][0];
                const y2 = locations[edge.destination.name][1];
                lineEl.setAttribute('x1', x1);
                lineEl.setAttribute('y1', y1);
                lineEl.setAttribute('x2', x2);
                lineEl.setAttribute('y2', y2);
                lineEl.setAttribute('class', 'line');
                lineEl.setAttribute('id', this.getDomIdForEdge(edge));
                this.el.appendChild(lineEl);
                const lineWeightEl = document.createElementNS(xmlns, 'text');
                lineWeightEl.setAttribute('id', this.getDomIdForEdgeText(edge));
                lineWeightEl.setAttribute('x', String((x1 + x2) / 2 + 5));
                lineWeightEl.setAttribute('y', String((y1 + y2) / 2 - 5));
                lineWeightEl.innerHTML = edge.weight;
                this.el.appendChild(lineWeightEl);
            }
        }
    }

    /**
     * @param {Dijkstra} dijkstra
     * @param {Node|null} u
     * @param {Node|null} v
     * @param {String|null} distOverride
     * @return {Promise}
     */
    updateDijkstra(dijkstra, u, v, distOverride = null) {
        const graph = dijkstra.graph;
        const dist = dijkstra.dist;
        const queue = dijkstra.queue;
        for (let [nodeName,] of graph.getNodes()) {
            let cls = 'node';
            if (u && nodeName === u.name)  {
                cls += ' u';
            }
            else if (v && nodeName === v.name)  {
                cls += ' v';
            }
            else if (!queue.has(nodeName)) {
                cls += ' visited';
            }
            document.getElementById(nodeName).setAttribute('class', cls);
        }

        for (let [nodeName, nodeDist] of dist) {
            let html;
            const distEl = document.getElementById(nodeName + 'Dist');
            if (distOverride && v && v.name === nodeName) {
                html = distOverride;
                distEl.setAttribute('class', 'nodeDist distConsider');
            }
            else {
                html = nodeDist;
                distEl.setAttribute('class', 'nodeDist');
            }
            distEl.innerHTML = nodeName + ': ' + html;
        }
        document.getElementById('consoleOutput').innerHTML
            = dijkstra.summarizeResults().replaceAll(/\n/g, '<br><br>');
        return this.sleepTilNextStep();
    }

    /**
     * @param {EdmondsKarp} edmondsKarp
     * @param {Node} source
     * @param {[Edge]} path
     * @return {Promise}
     */
    updateEdmondsKarp(edmondsKarp, source, path, maxFlow) {
        const graph = edmondsKarp.graph;

        for (let edge of this.getAllEdges(source)) {
            document.getElementById(this.getDomIdForEdgeText(edge)).innerHTML
                = edge.flow + ' / ' + edge.capacity
            let cls = 'line';
            if (edge.flow === edge.capacity) {
                cls += ' filled';
            }
            document.getElementById(this.getDomIdForEdge(edge))
                .setAttribute('class', cls);
            //edgeDom.setAttribute('class', 'line');
        }

        if (path) {
            for (let edge of path) {
                document.getElementById(this.getDomIdForEdge(edge)).setAttribute('class', 'line path');
                document.getElementById(this.getDomIdForEdgeText(edge)).innerHTML
                    = '+' + maxFlow + '; ' + edge.flow + ' / ' + edge.capacity
            }
        }

        //document.getElementById('consoleOutput').innerHTML
            //= edmondsKarp.summarizeResults().replaceAll(/\n/g, '<br><br>');
        return this.sleepTilNextStep();
    }

    /**
     * @param {Node} source
     * @returns {[Edge]}
     */
    getAllEdges(source) {
        let queue = [];
        let allEdges = [];
        queue.push(source);
        while (queue.length > 0) {
            const node = queue.pop();
            for (const edge of node.edges) {
                allEdges.push(edge);
                const dest = edge.destination;
                if (dest !== source) {
                    queue.push(dest);
                }
            }
        }
        return allEdges;
    }

    getDomIdForEdge(edge) {
        return 'edge' + edge.source.name + '-' + edge.destination.name
    }

    getDomIdForEdgeText(edge) {
        return this.getDomIdForEdge(edge) + 'Text';
    }

    sleepTilNextStep() {
        return new Promise(resolve => this.runNextStep = resolve);
    }
}