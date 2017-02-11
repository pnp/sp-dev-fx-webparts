export interface ISearchResults {
  PrimaryQueryResult: IPrimaryQueryResult;
}

export interface IPrimaryQueryResult {
  RelevantResults: IRelevantResults;
}

export interface IRelevantResults {
  Table: ITable;
}

export interface ITable {
  Rows: IResults;
}

export interface IResults {
  results: Array<ICells>;
}

export interface ICells {
  Cells: IResultValues;
}

export interface IResultValues {
  results: Array<ICellValue>;
}

export interface ICellValue {
  Key: string;
  Value: string;
  ValueType: string;
}