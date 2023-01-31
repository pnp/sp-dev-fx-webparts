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
    id: string,
    title: string,
    fields: SPTableField[],
    alerts: SPTableAlert[]
}
export interface SPTableField {
    name: string,
    displayName: string,
    iskey: boolean,
    isunique: boolean,
    type: string
}
export interface SPTableAlert {
    type: "Warning" | "Error" | "Info",
    title: string,
}
export interface SPRelation {
    fromTableTitle: string,
    toTableTitle: string,
    fromX: number | "n",
    toX: number | "m"
}
const storageKey = "reactpnpjsdiagram_sitegraphdata"
const getSPSiteData = async (spfxContext: any, force?: boolean, progress?: (number: number) => void) : Promise<SPSiteData> => {

    // return from cache
    let spSiteDataFromCache = JSON.parse(localStorage.getItem(storageKey));
    if (spSiteDataFromCache && !force) {
        progress(100);
        return spSiteDataFromCache;
    }

    // Load from site
    const spSiteData: SPSiteData = {
        relations: [],
        tables: []
    }
    const tmp_listNames: any = {};

    const sp = spfi().using(SPFx(spfxContext));
    const lists = await sp.web.lists.filter("Hidden ne 1")();

    const totalCount = lists.filter(l => !l.Hidden).length;
    let loadedCount = 0;

    for(const list of lists) {
        if(!list.Hidden) {
            loadedCount++;
            progress && progress(loadedCount/totalCount * 100);

            // save names for later
            tmp_listNames[`{${list.Id.toLocaleLowerCase()}}`] = list.Title;

            // Tables/Lists
            const table: SPTable = { id: list.Id, title: list.Title, fields: [], alerts: [] };
            // Fields
            const fields = (await sp.web.lists.getById(list.Id).fields.filter("Hidden ne 1")())
            .filter(f => !f.Hidden && (f as any).LookupList !== "AppPrincipals" && 
                ((f as any).CanBeDeleted || (f as any).InternalName === "Title" || (f as any).InternalName === "ID")
            )
            //.sort((a,b) => a.InternalName.charCodeAt(0) - b.InternalName.charCodeAt(0) );
            table.fields = fields.map(f => {
                f.InternalName.indexOf("_") > -1 && console.log(f);
                return { 
                    name: f.InternalName, 
                    displayName: f.Title, 
                    iskey: (f as any).TypeDisplayName === "Lookup" && (f as any).IsRelationship && (f as any).LookupList !== '' && (f as any).LookupList !== "AppPrincipals",
                    isunique: f.EnforceUniqueValues,
                    type: f.TypeDisplayName
                    } 
                });  

            // Table Alerts
            list.ItemCount > 3500 && list.ItemCount < 5000 && table.alerts.push({ title: `Itemcount (${list.ItemCount}) will reach soon 5k => check if all necessary columns are indexed !!`, type:"Error" });
            list.ItemCount > 5000 && table.alerts.push({ title: `Itemcount (${list.ItemCount}) > 5k. Filter or sorting might not work anymore`, type:"Error" });
            !list.EnableVersioning && table.alerts.push({ title: "no versioning activated", type: "Warning" });
            list.MajorVersionLimit && list.MajorVersionLimit > 100 && table.alerts.push({ title: `high max. version limit (${list.MajorVersionLimit})`, type: "Warning" });
            // Infos
            table.alerts.push({ title: `Crawling is ${list.NoCrawl ? 'inactive' : 'active'}`, type:"Info" });
            table.alerts.push({ title: `Item Count: ${list.ItemCount}`, type:"Info" });
            table.alerts.push({ title: `ContentTypes ${list.ContentTypesEnabled ? 'enabled' : 'disabled'}`, type:"Info" });

            // add Table
            spSiteData.tables.push(table);

            // Links/Lookups
            const relations: SPRelation[] = fields.filter(f => f.TypeDisplayName === "Lookup" && 
            (f as any).IsRelationship &&
            (f as any).LookupList !== '' && (f as any).LookupList !== "AppPrincipals"
            ).map<SPRelation>(f => 
            {
                return {
                    fromTableTitle: list.Title,
                    toTableTitle: (f as any).LookupList!, 
                    fromX: "n",
                    toX: 1
                }
            });
            
            spSiteData.relations = [...spSiteData.relations, ...relations];
        }
    }

    // resolve Ids
    console.log("tmp_listNames",tmp_listNames);
    console.log("asd", [...spSiteData.relations]);
    spSiteData.relations = spSiteData.relations.map<SPRelation>((r) => {return {...r, toTableTitle: tmp_listNames[r.toTableTitle.toLocaleLowerCase()]}})

    localStorage.setItem(storageKey, JSON.stringify(spSiteData));

    return spSiteData
}

export default getSPSiteData;
