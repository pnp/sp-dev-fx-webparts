export interface ISPListItemAuthor {
    FirstName?: string;
    LastName?: string;
    "@odata.type"?: string;
    "@odata.id"?: string;
}

export interface ISPListItem {
    Id: number;
    ID: number;
    Title?: string;
    Created?: string;
    Modified?: string;
    Author?: ISPListItemAuthor;
    Editor?: ISPListItemAuthor;

    "@odata.type"?: string;
    "@odata.id"?: string;
    "@odata.etag"?: string;
    "@odata.editLink"?: string;
    "File@odata.navigationLink"?: string;
    "Author@odata.navigationLink"?: string;
    "Editor@odata.navigationLink"?: string;
}