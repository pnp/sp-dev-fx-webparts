export interface Author {
    Name: string;
    Title: string;
}

export interface Value {
    Modified: string;
    FileLeafRef: string;
    Title: string;
    FileRef: string;
    UniqueId: string;
    Author: Author;
}

export interface IDocumentsResponse {
    value: Value[];
}
