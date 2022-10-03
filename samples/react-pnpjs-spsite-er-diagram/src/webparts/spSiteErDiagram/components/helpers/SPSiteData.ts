/*
  Hit 'ctrl + d' or 'cmd + d' to run the code, view console for results
*/
import { spfi, SPFx } from "@pnp/sp";
import { Caching, CacheKey } from "@pnp/queryable";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";
import { IFieldInfo } from "@pnp/sp/fields";

const storageKeyPrefix = "hs365_sitegraphdata_"


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

const getNodeFromField = (f: IFieldInfo) => {

  let isLookup = (f as any).TypeDisplayName == "Lookup" && (f as any).IsRelationship;

  return { 
    name: f.InternalName, 
    iskey: false, 
    figure: "Decision", 
    color: isLookup ? colors.orange : colors.purple 
  };
}



const getSiteData = async (spfxContext: any) => {

  let nodeDataArray: any = [];
  let linkDataArray: any = [];
  let listNames: any = {};

  const sp = spfi().using(SPFx(spfxContext)); //.using(Caching({ store: "local" }));
  let lists = await sp.web.lists.filter("Hidden ne 1").using(CacheKey(storageKeyPrefix+"lists"))();
  //lists = lists.slice(0,15); 

  for(let list of lists) {
    if(!list.Hidden) {

      listNames[`{${list.Id}}`] = list.Title;

      // Tables/Lists
      let node = { key: list.Title, items: [] as any };
      let fields = (await sp.web.lists.getById(list.Id).fields.filter("Hidden ne 1").using(CacheKey(storageKeyPrefix+"fields_"+list.Id))())
      .filter(f => !f.Hidden).sort((a,b) => a.InternalName.charCodeAt(0) - b.InternalName.charCodeAt(0) );
      node.items = fields.map(f => {return getNodeFromField(f) });  
      nodeDataArray.push(node);

      // Links/Lookups
      let links = fields.filter(f => f.TypeDisplayName == "Lookup" && 
      (f as any).IsRelationship &&
      (f as any).LookupList != '' && 
      (f as any).LookupList != "AppPrincipals"
      ).map(f => 
      {return { from: list.Title, to: (f as any).LookupList!, text: "0..N", toText: "1" }});
      linkDataArray= [...linkDataArray, ...links];

    }
  }

  linkDataArray = linkDataArray.map((l: any) => {return {...l, to: listNames[l.to]}})

  console.log("listNames", listNames);
  console.log("nodeDataArray", nodeDataArray);
  console.log("linkDataArray", linkDataArray);

  return {nodeDataArray: nodeDataArray, linkDataArray: linkDataArray}
}

export default getSiteData;