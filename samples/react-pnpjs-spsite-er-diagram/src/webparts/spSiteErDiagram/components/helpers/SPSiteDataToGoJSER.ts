import { List } from "@pnp/sp/lists";
import { SPSiteData, SPTableAlert, SPTableField } from "./SPSiteData";


const colors = {
  'red': '#be4b15',
  'green': '#52ce60',
  'blue': '#186ddf',
  'lightred': '#fd8852',
  'lightblue': '#afd4fe',
  'lightgreen': '#b9e986',
  'pink': '#f31eaf',
  'purple': '#881798',
  'orange': '#fddb01',
  'keycolor': '#fdb400',
}
const configByFieldType: any = {
    'default': { color: colors.purple, figure: "Ellipse" },
    'Lookup': { color: colors.orange, figure: "TriangleRight" },
    'Counter': { color: colors.keycolor, figure: "Diamond" },
    "Attachments": { color: colors.blue, figure: "Rectangle" },
    "Person or Group": { color: colors.green, figure: "RoundedRectangle" },
    "Single line of text": { color: colors.blue, figure: "Circle" },
    "Multiple lines of text": { color: colors.blue, figure: "Circle" },
    "Computed": { color: colors.blue, figure: "Ellipse" },
    "Date and Time": { color: colors.pink, figure: "Ellipse" },
    "Choice": { color: colors.blue, figure: "Ellipse" },
    "Hyperlink or Picture": { color: colors.blue, figure: "Ellipse" }
}
const getNodeFromField = (f: SPTableField) => {
    let c = configByFieldType[f.type] || configByFieldType['default'];
    let prefix = f.type == "Counter" ? "PK | " : (f.iskey && f.type == "Lookup" ? "FK | " : "");
    return { 
        name: prefix + f.name + ` (${f.type})`, 
        iskey: f.iskey, 
        figure: c.figure, 
        color: f.iskey ? colors.keycolor : c.color
    };
}
const configByAlert: any = {
    'Info': { color: colors.lightblue, figure: "LineRight" },
    'Warning': { color: colors.orange, figure: "LineRight" },
    'Error': { color: colors.red, figure: "LineRight" },
}
const getNodeFromAlert = (a: SPTableAlert) => {
    let c = configByAlert[a.type];
    return { 
        name: "#" + a.type + " | " + a.title, 
        iskey: false, 
        figure: c.figure, 
        color: c.color
    };
}

const getGoJSNodesFromSPSiteData = (spSiteData: SPSiteData) : { nodeDataArray: [], linkDataArray: [] } => {

    let nodeDataArray: any = [];
    let linkDataArray: any = [];

    nodeDataArray = spSiteData.tables.map(t => { return {
        key: t.title,
        items: [
            ...t.alerts.map(a => getNodeFromAlert(a)),
            ...t.fields.map(f => getNodeFromField(f))
        ]
    }})

    linkDataArray = spSiteData.relations.map(r => { return {
        from: r.fromTableTitle,
        to: r.toTableTitle,
        text: r.fromX+":"+r.toX,
        toText: "1"
    }})

    return { nodeDataArray, linkDataArray}
}
export default getGoJSNodesFromSPSiteData;