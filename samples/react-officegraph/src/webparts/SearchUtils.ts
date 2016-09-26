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

export class SearchUtils {
  public static getValueFromResults(key: string, results: ICell[]): string {
    let value: string = undefined;

    if (results && results.length > 0 && key) {
      for (let i: number = 0; i < results.length; i++) {
        const resultItem: ICell = results[i];
        if (resultItem.Key === key) {
          value = resultItem.Value;
          break;
        }
      }
    }

    return value;
  }

  public static getPreviewImageUrl(result: ICell[], siteUrl: string): string {
    const uniqueID: string = SearchUtils.getValueFromResults('uniqueID', result);
    const siteId: string = SearchUtils.getValueFromResults('siteID', result);
    const webId: string = SearchUtils.getValueFromResults('webID', result);
    const docId: string = SearchUtils.getValueFromResults('DocId', result);
    if (uniqueID && siteId && webId && docId) {
      return `${siteUrl}/_layouts/15/getpreview.ashx?guidFile=${uniqueID}&guidSite=${siteId}&guidWeb=${webId}&docid=${docId}
      &metadatatoken=300x424x2&ClientType=CodenameOsloWeb&size=small`;
    }
    else {
      return '';
    }
  }

  public static getActionName(actionId: number): string {
    switch (actionId) {
      case 1001:
        return 'Viewed';
      case 1003:
        return 'Modified';
      default:
        return '';
    }
  }
}