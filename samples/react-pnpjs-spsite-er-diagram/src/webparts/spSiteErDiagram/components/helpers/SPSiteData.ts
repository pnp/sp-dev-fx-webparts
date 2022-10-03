/*
  Hit 'ctrl + d' or 'cmd + d' to run the code, view console for results
*/
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";

export interface SPSiteData {
    tables: SPTables[],
    relations: SPRelations[]
}
export interface SPTables {
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
export interface SPRelations {
    fromTableTitle: string,
    toTableTitle: string,
    fromX: number | "n",
    toX: number | "m"
}
const storageKeyPrefix = "reactpnpjsdiagram_sitegraphdata_"
const getSPSiteData = async (spfxContext: any) : Promise<SPSiteData> => {

    let spSiteData: SPSiteData = {
        relations: [],
        tables: []
    }
    let tmp_listNames: any = {};

    const sp = spfi().using(SPFx(spfxContext));
    let lists = await sp.web.lists.filter("Hidden ne 1")();

    for(let list of lists) {
        if(!list.Hidden) {

            // save names for later
            tmp_listNames[`{${list.Id}}`] = list.Title;

            // Tables/Lists
            let table: SPTables = { title: list.Title, fields: [], alerts: [] };
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
            let relations: SPRelations[] = fields.filter(f => f.TypeDisplayName == "Lookup" && 
            (f as any).IsRelationship &&
            (f as any).LookupList != '' && 
            (f as any).LookupList != "AppPrincipals"
            ).map<SPRelations>(f => 
            {return {
                fromTableTitle: f.Title,
                toTableTitle: (f as any).LookupList!, 
                fromX: "n",
                toX: 1
            }});
            
            spSiteData.relations = [...spSiteData.relations, ...relations];
        }
    }

    // resolve Ids
    spSiteData.relations = spSiteData.relations.map((r) => {return {...r, to: tmp_listNames[r.toTableTitle]}})

    console.log("SPSiteData", spSiteData);

    return spSiteData
}

export default getSPSiteData;