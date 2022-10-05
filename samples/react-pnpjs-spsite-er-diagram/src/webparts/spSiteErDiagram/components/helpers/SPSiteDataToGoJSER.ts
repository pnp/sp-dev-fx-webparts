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
    'Lookup': { color: colors.purple, figure: "TriangleLeft" },
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
const getNodeItemFromField = (f: SPTableField, fieldNameProperty: string = "name") : GoJSNodeItem => {
    let c = configByFieldType[f.type] || configByFieldType['default'];
    let prefix = f.type == "Counter" ? "PK | " : (f.iskey && f.type == "Lookup" ? "FK | " : "");
    return { 
        name: prefix + (f as any)[fieldNameProperty] + ` (${f.type})`, 
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
const getNodeItemFromAlert = (a: SPTableAlert) : GoJSNodeItem => {
    let c = configByAlert[a.type];
    return { 
        name: "#" + a.type + " | " + a.title, 
        iskey: false, 
        figure: c.figure, 
        color: c.color
    };
}

export interface GoJSNode {
    key: string,
    items: GoJSNodeItem[]
}
export interface GoJSNodeItem {
    name: string,
    iskey: boolean,
    figure: string,
    color: string
}
export interface GoJSLink {
    from: string,
    to: string,
    text: string,
    toText: string
}
const getGoJSNodesFromSPSiteData = (spSiteData: SPSiteData, fieldNameProperty: string = "name") : { nodeDataArray: GoJSNode[], linkDataArray:  GoJSLink[] } => {

    let nodeDataArray: GoJSNode[] = [];
    let linkDataArray: GoJSLink[] = [];

    nodeDataArray = spSiteData.tables.map(t => { return {
        key: t.title,
        items: [
            ...t.alerts.map(a => getNodeItemFromAlert(a)),
            ...t.fields.map(f => getNodeItemFromField(f, fieldNameProperty))
        ]
    }})

    linkDataArray = spSiteData.relations.map(r => { return {
        from: r.fromTableTitle,
        to: r.toTableTitle,
        text: r.fromX+":"+r.toX,
        toText: "1"
    }})

    return { nodeDataArray, linkDataArray }
}
export default getGoJSNodesFromSPSiteData;