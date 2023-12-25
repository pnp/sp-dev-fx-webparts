/* eslint-disable */
export namespace ObjectHelper {
    const RemoveODataProperties = (obj: any) => {
        for (let prop of Object.keys(obj))
            if (prop.indexOf("odata.") == 0)
                delete obj[prop];
        return obj;
    }


    const ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i
    const isISO8601 = (str: string) => (str + "").match(ISO_8601_FULL);

    const ParseAllDates = (obj: any) => {
        for (let prop of Object.keys(obj))
            if (isISO8601(obj[prop]))
                obj[prop] = new Date(obj[prop]);
        return obj;
    }

    const RemoveProps: string[] = ["Attachments", "ComplianceAssetId", "FileSystemObjectType", "GUID", "ID", "OData__ColorTag", "OData__UIVersionString", "ServerRedirectedEmbedUri", "ServerRedirectedEmbedUrl"];
    const RemoveDefaultFields = (obj: any) => {
        for (let prop of RemoveProps)
            delete obj[prop];
        return obj;
    }


    export const ParseItem: <T>(item: T) => T = <T>(item: any) => {
        if (Array.isArray(item)) {
            for (let i of item) {
                i = RemoveODataProperties(i);
                i = ParseAllDates(i);
                i = RemoveDefaultFields(i);
            }
        } else {
            item = RemoveODataProperties(item);
            item = ParseAllDates(item);
            item = RemoveDefaultFields(item);
        }
        return item;
    }

}