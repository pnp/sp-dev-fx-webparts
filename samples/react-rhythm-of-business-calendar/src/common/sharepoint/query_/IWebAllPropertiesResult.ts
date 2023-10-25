export interface IWebAllPropertiesResult {
    FollowLinkEnabled: 'TRUE' | 'FALSE';
    GroupAlias: string; // ex: "MyAppDevSite"
    GroupDocumentListId: string; // GUID
    GroupDocumentsUrl: string; // ex: "Shared Documents"
    GroupId: string; // GUID
    GroupType: 'Public' | 'Private';
    SiteNotebookGuid: string; // GUID
    taxonomyHiddenList: string; // GUID
}