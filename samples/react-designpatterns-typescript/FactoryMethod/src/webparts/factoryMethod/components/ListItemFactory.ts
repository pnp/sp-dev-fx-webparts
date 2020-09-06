import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IListItem} from "./models/IListItem";
import { IFactory } from "./IFactory";
import { INewsListItem } from "./models/INewsListItem";
import { IDirectoryListItem } from "./models/IDirectoryListItem";
import { IAnnouncementListItem } from "./models/IAnnouncementListItem";

export class ListItemFactory implements IFactory {
    // private _listItems: IListItem[];
    public getItems(requester: SPHttpClient, siteUrl: string, listName: string): Promise<any[]> {
        switch(listName) {
            case "GenericList":
                let items: IListItem[];
                // tslint:disable-next-line:max-line-length
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,Author/Title,Editor/Title&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IListItem[] }) => {
                    console.log(JSON.stringify(json.value));
                    return items=json.value.map((v,i)=>(
                        {
                            // key: v.id,
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title
                        }
                    ));
                });
            case "News":
                let newsitems: INewsListItem[];
                // tslint:disable-next-line:max-line-length
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,Created By,Modified By,newsheader,newsbody,expiryDate`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: INewsListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: INewsListItem[] }) => {
                    return newsitems=json.value.map((v,i)=>(
                        { 
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            newsheader: v.newsheader,
                            newsbody: v.newsbody,
                            expiryDate: v.expiryDate
                        }
                    ));
                });
            case "Announcements":
                let announcementitems: IAnnouncementListItem[];
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Created,Author/Title,Modified,Editor/Title,announcementBody,expiryDate&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IAnnouncementListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IAnnouncementListItem[] }) => {
                    return announcementitems=json.value.map((v,i)=>(
                        { 
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            announcementBody: v.announcementBody,
                            expiryDate: v.expiryDate
                        }
                    ));
                });
            case "Directory":
                let directoryitems: IDirectoryListItem[];
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IDirectoryListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IDirectoryListItem[] }) => {
                    return directoryitems=json.value.map((v,i)=>(
                        {
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            firstName: v.firstName,
                            lastName: v.lastName,
                            mobileNumber: v.mobileNumber,
                            internalNumber: v.internalNumber
                        }
                    ));
                });
            default:
                break;
            }
      }
}