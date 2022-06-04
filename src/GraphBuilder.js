'use strict';

class GraphBuilder {
    constructor() {
    }

    /**
     * @returns {Graph}
     */
    buildGraph() {
        const graph = new Graph();
        const minneapolis = new Node(graph, 'Minneapolis');
        const rochester = new Node(graph, 'Rochester');
        const madison = new Node(graph, 'Madison');
        const desMoines = new Node(graph, 'Des Moines');
        const chicago = new Node(graph, 'Chicago');
        const milwaukee = new Node(graph, 'Milwaukee');
        const stCloud = new Node(graph, 'St Cloud');
        const fargo = new Node(graph, 'Fargo');
        const siouxFalls = new Node(graph, 'Sioux Falls');
        //const space = new Node(graph, 'Space');
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
        //minneapolis.connect(space, 275);
        //space.connect(chicago, 1);

        return graph;
    }

    /**
     * @returns {Graph}
     */
    buildFlowGraph() {
        const graph = new Graph();
        const minneapolis = new Node(graph, 'Minneapolis');
        const rochester = new Node(graph, 'Rochester');
        const madison = new Node(graph, 'Madison');
        const desMoines = new Node(graph, 'Des Moines');
        const chicago = new Node(graph, 'Chicago');
        const milwaukee = new Node(graph, 'Milwaukee');
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