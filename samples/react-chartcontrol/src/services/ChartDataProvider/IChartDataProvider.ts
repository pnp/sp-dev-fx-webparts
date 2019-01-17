export default interface IChartDataProvider {
  getNumberArray(length: number, waitduration?: number): Promise<number[]>;
  getMultiDataset(numDatasets: number, length: number): Promise<Array<number[]>>;
  getPointArray(length: number): Promise<{}[]>;
  getScatterArray(length: number): Promise<{}[]>;
  getSignedNumberArray(length: number): Promise<number[]>;
  getMultiBubbleArrays(numDatasets: number, length: number): Promise<Array<IBubblePoint[]>>;
}

export interface IBubblePoint {
  x: number;
  y: number;
  r: number;
}
