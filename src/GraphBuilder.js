'use strict';

class GraphBuilder {
    constructor() {
    }

    /**
     * @returns {Graph}
     */
    buildGraph() {
        let graph = new Graph();
        let minneapolis = new Node(graph, 'Minneapolis');
        let rochester = new Node(graph, 'Rochester');
        let madison = new Node(graph, 'Madison');
        let desMoines = new Node(graph, 'Des Moines');
        let chicago = new Node(graph, 'Chicago');
        let milwaukee = new Node(graph, 'Milwaukee');
        let stCloud = new Node(graph, 'St Cloud');
        let fargo = new Node(graph, 'Fargo');
        let siouxFalls = new Node(graph, 'Sioux Falls');
        minneapolis.connect(rochester, 88);
        rochester.connect(madison, 209);
        madison.connect(minneapolis, 273);
        rochester.connect(desMoines, 212);
        desMoines.connect(chicago, 333);
        madison.connect(chicago, 147);
        milwaukee.connect(chicago, 92);
        milwaukee.connect(madison, 79);
        stCloud.connect(minneapolis, 65);
        fargo.connect(stCloud, 172);
        siouxFalls.connect(fargo, 243);
        siouxFalls.connect(rochester, 237);

        return graph;
    }

    /**
     * @returns {Graph}
     */
    buildFlowGraph() {
        let graph = new Graph();
        let minneapolis = new Node(graph, 'Minneapolis');
        let rochester = new Node(graph, 'Rochester');
        let madison = new Node(graph, 'Madison');
        let desMoines = new Node(graph, 'Des Moines');
        let chicago = new Node(graph, 'Chicago');
        let milwaukee = new Node(graph, 'Milwaukee');
        minneapolis.connectFlow(rochester, 350);
        minneapolis.connectFlow(madison, 200);
        rochester.connectFlow(madison, 200);
        rochester.connectFlow(desMoines, 250);
        desMoines.connectFlow(chicago, 500);
        madison.connectFlow(chicago, 175);
        madison.connectFlow(milwaukee, 150);
        milwaukee.connectFlow(chicago, 100);

        return graph;
    }
}