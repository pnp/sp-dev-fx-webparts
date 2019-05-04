export interface Value {
    CheckInComment: string;
    CheckOutType: number;
    ContentTag: string;
    CustomizedPageStatus: number;
    ETag: string;
    Exists: boolean;
    IrmEnabled: boolean;
    Length: number;
    Level: number;
    LinkingUri?: any;
    LinkingUrl: string;
    MajorVersion: number;
    MinorVersion: number;
    Name: string;
    ServerRelativeUrl: string;
    TimeCreated: Date;
    TimeLastModified: Date;
    Title?: any;
    UIVersion: number;
    UIVersionLabel: string;
    UniqueId: string;
}

export interface IPhotosResponse {
    value: Value[];
}
