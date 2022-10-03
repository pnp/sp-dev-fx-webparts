import { List } from "@pnp/sp/lists";
import { SPSiteData, SPTableField } from "./SPSiteData";


const colors = {
  'red': '#be4b15',
  'green': '#52ce60',
  'blue': '#6ea5f8',
  'lightred': '#fd8852',
  'lightblue': '#afd4fe',
  'lightgreen': '#b9e986',
  'pink': '#faadc1',
  'purple': '#d689ff',
  'orange': '#fdb400',
}
const colorByType: any = {
  'Lookup': colors.orange
}

const getNodeFromField = (f: SPTableField) => {
  let isLookup = (f as any).TypeDisplayName == "Lookup" && (f as any).IsRelationship;
  return { 
    name: f.name, 
    iskey: false, 
    figure: "Decision", 
    color: isLookup ? colors.orange : colors.purple 
  };
}

const getGoJSNodesFromSPSiteData = (spSiteData: SPSiteData) : { nodeDataArray: [], linkDataArray: [] } => {

    let nodeDataArray: any = [];
    let linkDataArray: any = [];

    nodeDataArray = spSiteData.tables.map(t => { return {
        key: t.title,
        items: t.fields.map(f => getNodeFromField(f))
    }})

    linkDataArray = spSiteData.relations.map(r => { return {
        from: r.fromTableTitle,
        to: r.toTableTitle,
        text: r.fromX+":"+r.toX
    }})

    return { nodeDataArray, linkDataArray}
}
export default getGoJSNodesFromSPSiteData;