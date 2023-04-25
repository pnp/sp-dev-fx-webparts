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
  'darkPink': '#7c158a',
  'purple': '#881798',
  'orange': '#fddb01',
  'keycolor': '#fdb400',
}
const configByFieldType: any = {
    'default': { color: colors.purple, figure: "Ellipse" },
    'Lookup': { color: colors.purple, figure: "TriangleLeft" },
    'Counter': { color: colors.keycolor, figure: "Diamond" },
    "Attachments": { color: colors.blue, figure: "Circle" },
    "Person or Group": { color: colors.green, figure: "Circle" },
    "Single line of text": { color: colors.blue, figure: "Circle" },
    "Multiple lines of text": { color: colors.blue, figure: "Circle" },
    "Computed": { color: colors.blue, figure: "Circle" },
    "Date and Time": { color: colors.pink, figure: "Circle" },
    "Choice": { color: colors.blue, figure: "Circle" },
    "Number": { color: colors.darkPink, figure: "Circle" },
    "Hyperlink or Picture": { color: colors.blue, figure: "Circle" }
}
const getNodeItemFromField = (f: SPTableField, fieldNameProperty: string = "name") : GoJSNodeItem => {
    const c = configByFieldType[f.type] || configByFieldType['default'];
    const prefix = f.type === "Counter" ? "PK | " : (f.iskey && f.type === "Lookup" ? "FK | " : "");
    return { 
        name: prefix + (f as any)[fieldNameProperty] + ` (${f.type})`, 
        iskey: f.iskey, 
        figure: c.figure, 
        color: f.iskey ? colors.keycolor : c.color,
        order: f.type === "Counter" ? "1" :
        f.type === "Lookup" && f.iskey ? "2" :
        f.type === "Lookup" ? "3" :
        f.type
    };
}
const configByAlert = {
    'Info': { color: colors.lightblue, figure: "Rectangle" },
    'Warning': { color: colors.orange, figure: "Rectangle" },
    'Error': { color: colors.red, figure: "Rectangle" },
}
const getNodeItemFromAlert = (a: SPTableAlert) : GoJSNodeItem => {
    const c = configByAlert[a.type];
    return { 
        name: "#" + a.type + " | " + a.title, 
        iskey: false, 
        figure: c.figure, 
        color: c.color,
        order: "#"
    };
}

export interface GoJSNode {
    key: string,
    items: GoJSNodeItem[]
}
export interface GoJSNodeItem {
    order: string,
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
const getGoJSNodesFromSPSiteData = (spSiteData: SPSiteData, fieldNameProperty: string = "name", alertsActive = true, fieldsActive = true) : { nodeDataArray: GoJSNode[], linkDataArray:  GoJSLink[] } => {

    let nodeDataArray: GoJSNode[] = [];
    let linkDataArray: GoJSLink[] = [];

    nodeDataArray = spSiteData.tables.map(t => { return {
        key: t.title,
        items: [
            ...(alertsActive ? t.alerts.map(a => getNodeItemFromAlert(a)) : []),
            ...(fieldsActive ? t.fields.map(f => getNodeItemFromField(f, fieldNameProperty)) : [])
        ].sort((a,b) => a.order.charCodeAt(0) - b.order.charCodeAt(0))
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