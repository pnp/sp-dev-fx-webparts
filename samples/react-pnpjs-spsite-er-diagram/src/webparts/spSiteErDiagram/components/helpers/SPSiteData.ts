/*
  Hit 'ctrl + d' or 'cmd + d' to run the code, view console for results
*/
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";

export interface SPSiteData {
    tables: SPTable[],
    relations: SPRelation[]
}
export interface SPTable {
    title: string,
    fields: SPTableField[],
    alerts: SPTableAlert[]
}
export interface SPTableField {
    name: string,
    displayName: string,
    iskey: boolean,
    type: string
}
export interface SPTableAlert {
    type: "Warning" | "Error",
    title: string,
}
export interface SPRelation {
    fromTableTitle: string,
    toTableTitle: string,
    fromX: number | "n",
    toX: number | "m"
}
const storageKeyPrefix = "reactpnpjsdiagram_sitegraphdata_"
const getSPSiteData = async (spfxContext: any, force?: boolean, progress?: (number: number) => void) : Promise<SPSiteData> => {

    // return from cache
    let spSiteDataFromCache = JSON.parse(localStorage.getItem(storageKeyPrefix));
    if (spSiteDataFromCache && !force) {
        progress(100);
        return spSiteDataFromCache;
    }

    // Load from site
    let spSiteData: SPSiteData = {
        relations: [],
        tables: []
    }
    let tmp_listNames: any = {};

    const sp = spfi().using(SPFx(spfxContext));
    let lists = await sp.web.lists.filter("Hidden ne 1")();

    const totalCount = lists.filter(l => !l.Hidden).length;
    let loadedCount = 0;

    for(let list of lists) {
        if(!list.Hidden) {
            loadedCount++;
            progress && progress(loadedCount/totalCount * 100);

            // save names for later
            tmp_listNames[`{${list.Id}}`] = list.Title;

            // Tables/Lists
            let table: SPTable = { title: list.Title, fields: [], alerts: [] };
            // Fields
            let fields = (await sp.web.lists.getById(list.Id).fields.filter("Hidden ne 1")())
            .filter(f => !f.Hidden).sort((a,b) => a.InternalName.charCodeAt(0) - b.InternalName.charCodeAt(0) );
            table.fields = fields.map(f => {
                return { 
                    name: f.InternalName, 
                    displayName: f.Title, 
                    iskey: (f as any).TypeDisplayName == "Lookup" && (f as any).IsRelationship,
                    type: f.TypeDisplayName
                    } 
                });  
            // add Table
            spSiteData.tables.push(table);

            // Links/Lookups
            let relations: SPRelation[] = fields.filter(f => f.TypeDisplayName == "Lookup" && 
            (f as any).IsRelationship &&
            (f as any).LookupList != '' && 
            (f as any).LookupList != "AppPrincipals"
            ).map<SPRelation>(f => 
            {return {
                fromTableTitle: list.Title,
                toTableTitle: (f as any).LookupList!, 
                fromX: "n",
                toX: 1
            }});
            
            spSiteData.relations = [...spSiteData.relations, ...relations];
        }
    }

    // resolve Ids
    spSiteData.relations = spSiteData.relations.map<SPRelation>((r) => {return {...r, toTableTitle: tmp_listNames[r.toTableTitle]}})

    console.log("SPSiteData", spSiteData);

    localStorage.setItem(storageKeyPrefix, JSON.stringify(spSiteData));

    return spSiteData
}

export default getSPSiteData;