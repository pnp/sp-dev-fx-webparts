export interface ISearchQueryResponse {
    PrimaryQueryResult: IPrimaryQueryResult;
}
export interface IPrimaryQueryResult {
    RelevantResults?: IRelevantResults;
}
export interface IRelevantResults {
    RowCount: number;
    Table?: ITable;
}
export interface ITable {
    Rows?: IRow[];
}
export interface IRow {
    Cells: ICell[];
}
export interface ICell {
    Key: string;
    Value: string;
    ValueType: string;
}
export interface IEdge {
    ActorId: number;
    ObjectId: number;
    Properties: IEdgeProperties;
}
export interface IEdgeProperties {
    Action: number;
    Blob: any[];
    BlobContent: string;
    ObjectSource: number;
    Time: string;
    Weight: number;
}
export declare class SearchUtils {
    static getValueFromResults(key: string, results: ICell[]): string;
    static getPreviewImageUrl(result: ICell[], siteUrl: string): string;
    static getActionName(actionId: number): string;
}
