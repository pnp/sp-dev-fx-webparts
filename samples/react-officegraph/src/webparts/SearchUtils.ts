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

export class SearchUtils {
  public static getValueFromResults(key: string, results: ICell[]): string {
    let value: string = '';

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
}