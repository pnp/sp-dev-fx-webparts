/**
 * Provides sample chart data. All returned results are randomized.
 * Any resemblance to winning lottery numbers is purely coincidental.
 */
export default interface IChartDataProvider {
  getMultiBubbleArrays(numDatasets: number, length: number): Promise<Array<Chart.ChartPoint[]>>;
  getMultiDataset(numDatasets: number, length: number): Promise<Array<number[]>>;
  getNumberArray(length: number, waitduration?: number): Promise<number[]>;
  getPointArray(length: number): Promise<{}[]>;
  getScatterArray(length: number): Promise<{}[]>;
  getSignedNumberArray(length: number): Promise<number[]>;
}
