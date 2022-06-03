'use strict';

class GraphRenderer {
    constructor() {
        this.el = document.getElementById('graphSvg');
    }

    render(graph, locations) {
        this.locations = locations;
        let xmlns = "http://www.w3.org/2000/svg";
        for (let nodeName in locations) {
            let pos = locations[nodeName];

            // node el
            let el = document.createElementNS(xmlns, 'circle');
            el.setAttribute('cx', pos[0]);
            el.setAttribute('cy', pos[1]);
            el.setAttribute('r', 20);
            el.setAttribute('class', 'node');
            el.setAttribute('id', nodeName);
            this.el.appendChild(el);

            // node distance
            let elDist = document.createElementNS(xmlns, 'text');
            elDist.setAttribute('x', pos[0] + 20);
            elDist.setAttribute('y', pos[1] - 20);
            elDist.setAttribute('id', nodeName + 'Dist');
            elDist.setAttribute('class', 'nodeDist');
            elDist.innerHTML = 'Inf';
            this.el.appendChild(elDist);

            let node = graph.getNodes().get(nodeName);
            for (let edge of node.getEdges()) {
                if (!locations[edge.destination.name]) {
                    continue;
                }
                let lineEl = document.createElementNS(xmlns, 'line');
                const x1 = pos[0];
                const y1 = pos[1];
                const x2 = locations[edge.destination.name][0];
                const y2 = locations[edge.destination.name][1];
                lineEl.setAttribute('x1', x1);
                lineEl.setAttribute('y1', y1);
                lineEl.setAttribute('x2', x2);
                lineEl.setAttribute('y2', y2);
                lineEl.setAttribute('class', 'line');
                this.el.appendChild(lineEl);
                const lineWeightEl = document.createElementNS(xmlns, 'text');
                lineWeightEl.setAttribute('x', (x1 + x2) / 2 + 5);
                lineWeightEl.setAttribute('y', (y1 + y2) / 2 - 5);
                lineWeightEl.innerHTML = edge.weight;
                this.el.appendChild(lineWeightEl);
            }

        }
    }

    /**
     * @param {Map} queue
     * @param {Node|null} u
     * @param {Node|null} v
     */
    update(graph, dist, prev, queue, u, v, distOverride) {
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
            //debugger;
            let distEl = document.getElementById(nodeName + 'Dist');
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
    }

    sleepTil() {
        return new Promise(resolve => this.runNextStep = resolve);
    }
}