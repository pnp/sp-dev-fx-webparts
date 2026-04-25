export interface IDocumentAnalysisResult {
  content: string;
  pages: number;
  tables: ITable[];
  keyValuePairs: IKeyValuePair[];
  paragraphs: IParagraph[];
}

export interface ITable {
  rowCount: number;
  columnCount: number;
  cells: ITableCell[];
}

export interface ITableCell {
  rowIndex: number;
  columnIndex: number;
  content: string;
}

export interface IKeyValuePair {
  key: string;
  value: string;
  confidence: number;
}

export interface IParagraph {
  content: string;
  role?: string;
  boundingBox?: number[];
}
