import * as go from 'gojs';

export const initDiagram = () => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, // must name or refer to the DIV HTML element
    {
        allowDelete: false,
        allowCopy: false,
        initialAutoScale: go.Diagram.Uniform,
        layout: $(go.ForceDirectedLayout),
        model: $(go.GraphLinksModel,
        {
            linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            // positive keys for nodes
            makeUniqueKeyFunction: (m: go.Model, data: any) => {
            let k = data.key || 1;
            while (m.findNodeDataForKey(k)) k++;
            data.key = k;
            return k;
            },
            // negative keys for links
            makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
            let k = data.key || -1;
            while (m.findLinkDataForKey(k)) k--;
            data.key = k;
            return k;
            }
        }),
        "undoManager.isEnabled": true
    });

    diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0, fill: 'white' },
            // Shape.fill is bound to Node.data.color
            new go.Binding('fill', 'color')),
        $(go.TextBlock,
            { margin: 8 },  // some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding('text', 'key'))
        );

    // the template for each attribute in a node's array of item data
    var itemTempl =
        $(go.Panel, "Horizontal",
        $(go.Shape,
            { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
            new go.Binding("figure", "figure"),
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "color")),
        $(go.TextBlock,
            {
            stroke: "#333333",
            font: "bold 14px sans-serif"
            },
            new go.Binding("text", "name"))
        );


    // define the Node template, representing an entity
    diagram.nodeTemplate =
        $(go.Node, "Auto",  // the whole node panel
        {
            selectionAdorned: true,
            resizable: true,
            layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
            isShadowed: true,
            shadowOffset: new go.Point(3, 3),
            shadowColor: "#C5C1AA"
        },
        new go.Binding("location", "location").makeTwoWay(),
        // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
        // clear out any desiredSize set by the ResizingTool.
        new go.Binding("desiredSize", "visible", v => new go.Size(NaN, NaN)).ofObject("LIST"),
        // define the node's outer shape, which will surround the Table
        $(go.Shape, "RoundedRectangle",
            { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
        $(go.Panel, "Table",
            { margin: 8, stretch: go.GraphObject.Fill },
            $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
            // the table header
            $(go.TextBlock,
            {
                row: 0, alignment: go.Spot.Center,
                margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                font: "bold 16px sans-serif"
            },
            new go.Binding("text", "key")),
            // the collapse/expand button
            $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
            { row: 0, alignment: go.Spot.TopRight }),
            // the list of Panels, each showing an attribute
            $(go.Panel, "Vertical",
            {
                name: "LIST",
                row: 1,
                padding: 3,
                alignment: go.Spot.TopLeft,
                defaultAlignment: go.Spot.Left,
                stretch: go.GraphObject.Horizontal,
                itemTemplate: itemTempl
            },
            new go.Binding("itemArray", "items"))
        )  // end Table Panel
        );  // end Node

    // define the Link template, representing a relationship
    diagram.linkTemplate =
        $(go.Link,  // the whole link panel
        {
            selectionAdorned: true,
            layerName: "Foreground",
            reshapable: true,
            routing: go.Link.AvoidsNodes,
            corner: 5,
            curve: go.Link.JumpOver
        },
        $(go.Shape,  // the link shape
            { stroke: "#303B45", strokeWidth: 2.5 }),
        $(go.TextBlock,  // the "from" label
            {
            textAlign: "center",
            font: "bold 16px sans-serif",
            stroke: "#333333",
            segmentIndex: 0,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text", "text")),
        $(go.TextBlock,  // the "to" label
            {
            textAlign: "center",
            font: "bold 16px sans-serif",
            stroke: "#333333",
            segmentIndex: -1,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text", "toText"))
        );


    return diagram;
}