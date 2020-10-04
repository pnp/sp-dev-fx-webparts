export interface PageCollection<T> {
    value: T[];
    "@odata.nextLink"?: string;
    "@odata.prevLink"?: string;
    "@odata.count"?: number;
    [Key: string]: any;
}