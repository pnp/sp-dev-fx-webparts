import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

import { IDocument } from "../common/IObjects";
import IDataProvider from "./IDataProvider";
import { Utils } from '../common/Utils';


export default class SharePointDataProvider implements IDataProvider {

    private _webPartContext: IWebPartContext;
    private _libraryAbsoluteUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext, libraryUrl: string) {
        this._webPartContext = value;
        this._libraryAbsoluteUrl =
            libraryUrl.lastIndexOf("/") == libraryUrl.length - 1 ?
                libraryUrl.substr(0, libraryUrl.length - 1) :
                libraryUrl;
        this._webAbsoluteUrl = value.pageContext.web.absoluteUrl;
    }

    /**
     * Check is all settings passed in the constructor are correctly initialized 
     */
    public validateSettings(): boolean {

        if (!this._libraryAbsoluteUrl) {
            return false;
        }
        return true;
    }

    /**
     * Returns all documents from the Search index where the Path contains the library url
     * Note: Library url is passed as parameter in the constructor
     */
    public readDocumentsFromSearch(): Promise<IDocument[]> {
        let utility = new Utils();
        let searchQuery = '(path:"' + encodeURIComponent(this._libraryAbsoluteUrl) + '*")AND(IsDocument:1)';
        let webAbsoluteUrl = this._webPartContext.pageContext.web.absoluteUrl;
        const searchRequestUrl1: string = `${webAbsoluteUrl}/_api/search/query?querytext='${searchQuery}'` +
            "&selectproperties='DocId,ContentType,ModifiedBy,LastModifiedTime,FileExtension,Path,SPWebURL,UIVersionStringOWSTEXT,UniqueId'";
        // log in the console for debugging purpose
        console.log(searchQuery);
        return this._webPartContext.spHttpClient.get(
            searchRequestUrl1,
            SPHttpClient.configurations.v1,
            {
                headers: {
                    "odata-version": "3.0",
                    "accept": "application/json;odata=verbose"
                },
                method: "GET"
            })
            .then((response: any) => {
                debugger;
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            }).then((response: any) => {
                debugger;
                //convert the reuselts in object with properties
                let results: any[] = response.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                var obj = [];
                for (let l = 0; l < results.length; l++) {
                    var cells = results[l].Cells.results;
                    var cell = {};
                    for (let m = 0; m < cells.length; m++) {
                        cell[cells[m].Key] = cells[m].Value;
                    }
                    obj.push(cell);
                }
                // use the search results as objects
                let docs: IDocument[] = [];
                for (let i = 0; i < obj.length; i++) {
                    docs.push({
                        Id: parseInt(obj[i].DocId),
                        FileRef: utility.GetFileRef(obj[i].OriginalPath),
                        Modified: utility.GetFormatedDateString(obj[i].LastModifiedTime),
                        ModifiedBy: obj[i].ModifiedBy,
                        FileIcon: utility.GetImgUrlByFileExtension(obj[i].FileExtension),
                        Name: utility.GetFileName(obj[i].Path),
                        VersionString: obj[i].UIVersionStringOWSTEXT,
                        ContentType: utility.GetContentType(obj[i].ContentType),
                        ParentWebUrl: obj[i].SPWebURL,
                        UniqueId: obj[i].UniqueId.replace("{", "").replace("}", "")
                    });
                }
                return docs;
            });

        /*
        NOTE: 
        the above code use get request for retrieving the search results; alternatively, you can use POST request
        Sample code: 

        var body = {
            'request': {
                '__metadata': { 'type': 'Microsoft.Office.Server.Search.REST.SearchRequest' },
                'Querytext': searchQuery,
                'RowLimit': '100',
                'TrimDuplicates': 'False',
                'SelectProperties': {
                    'results':
                    ['DocId', 'ModifiedBy', 'OriginalPath', 'LastModifiedTime', 'FileExtension', 'Path', 'SPWebURL']
                }
            }
        };
        const searchRequestUrl: string = `${webAbsoluteUrl}/_api/search/postquery`;
        return this._webPartContext.spHttpClient.post(
            searchRequestUrl,
            SPHttpClient.configurations.v1,
            {
                headers: {
                    "odata-version": "3.0",
                    "accept": "application/json;odata=verbose"
                },
                body: JSON.stringify(body),
                method: "POST"
            })
        */
    }

    /**
     * Returns all documents from the library  
     * Note: Library url is passed as parameter in the constructor
     */
    public readDocumentsFromLibrary(): Promise<IDocument[]> {

        debugger;
        let utility = new Utils();
        let libraryRelativeUrl = utility.GetRelativePathFromAbsolute(this._libraryAbsoluteUrl);

        return this._readListId(libraryRelativeUrl).then((listId: string): Promise<IDocument[]> => {


            const queryUrlGetAllItems: string = this._webAbsoluteUrl + `/_api/web/lists(guid'${listId}')/Items` +
                "?$select=ID,DocIcon,FileLeafRef,FileRef,Modified,UniqueId,OData__UIVersionString,ContentTypeId,ContentType/Name,Editor/Title&$expand=Editor,ContentType";

            /*
               The above query will get all items, including folders and items in the folders.
               After that we remove those items, that are not based on the Document Content Type. 
               Depending on your logic, you can use different endpoints, like:

                /_api/web/lists(guid'${listId}')/GetItems(query=@v1)?@v1={"FolderServerRelativeUrl" : "${libraryRelativeUrl}", "ViewXml":"<View Scope='RecursiveAll'></View>"}
                /_api/web/GetFolderByServerRelativePath(decodedurl='${libraryRelativeUrl}')?$select=ID,FileLeafRef,FileRef,ModifiedBy&$expand=Files,ModifiedBy
                /_api/web/GetFolderByServerRelativeUrl('${libraryRelativeUrl}')/Files?$expand=ListItemAllFields
            */
            return this._webPartContext.spHttpClient.get(
                queryUrlGetAllItems,
                SPHttpClient.configurations.v1)
                .then(
                (response: any) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return Promise.reject(new Error(JSON.stringify(response)));
                    }
                })
                .then((data: any) => {
                    debugger;
                    let documents: IDocument[] = [];
                    if (data) {
                        for (let i = 0; i < data.value.length; i++) {
                            let item = data.value[i];

                            //check the content type; Include only documents in the response
                            if (item.ContentTypeId.indexOf("0x0101") == 0) {
                                var doc: IDocument = {
                                    Id: item.Id,
                                    FileRef: item.FileRef,
                                    Name: item.FileLeafRef,
                                    VersionString: item.OData__UIVersionString,
                                    ContentType: item.ContentType.Name,
                                    ModifiedBy: item.Editor.Title,
                                    Modified: utility.GetFormatedDateString(item.Modified),
                                    UniqueId: item.UniqueId,
                                    ParentWebUrl: this._webAbsoluteUrl,// this will work in case the library is in the same web as the web part!
                                    //icon for the Folder content type is a different
                                    FileIcon: item.ContentType.Name != "Folder" ? utility.GetImgUrlByFileExtension(item.DocIcon) : utility.GetImgUrlByFileExtension("folder")
                                };
                                documents.push(doc);
                            }
                        }
                    }
                    return documents;

                }).catch((ex) => {
                    console.log("readDocumentsFromLibrary > spHttpClient.get()...catch:", ex);
                    throw ex;
                });

        });
    }

    // Helper Methods

    /**
     * Returns the list's ID based on its site relative url
     * listRelativeUrl format: '/sites/mysite/shared documents'
     * returned value: Guid if succeeded, otherwise - empty string
     */
    private _readListId(listRelativeUrl: string): Promise<string> {

        let queryUrlGetList = this._webAbsoluteUrl + "/_api/web/GetFolderByServerRelativePath(decodedurl='" + decodeURIComponent(listRelativeUrl) + "')/Properties";

        return this._webPartContext.spHttpClient.get(
            queryUrlGetList,
            SPHttpClient.configurations.v1)
            .then(
            (response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            })
            .then((data: any) => {
                debugger;
                if (data) {
                    let listIdValue: string = data.vti_x005f_listname; // string format '{00000000-0000-0000-0000-000000000000}'
                    let listId = listIdValue.replace("{", "").replace("}", "");
                    return listId;
                }
                else {
                    console.log("no list info");
                }
                return "";
            }).catch((ex) => {
                console.log("_readListId > spHttpClient.get()...catch:", ex);
                throw ex;
            });
    }
}