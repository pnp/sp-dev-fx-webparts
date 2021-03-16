import IChartDataProvider from "./IChartDataProvider";
import { ChartPoint } from 'chart.js';

const FAKE_DELAY: number = 500;
/**
 * Returns an array of chart points (x,y)
 */
export class MockChartDataProvider implements IChartDataProvider {
  public getSignedNumberArray(length: number): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray: number[] = [];
        for (let index = 0; index < length; index++) {
          numArray.push(MockChartDataProvider.getRandomSignedNumber());
        }
        resolve(numArray);
      }, FAKE_DELAY);
    });
  }

  /**
   * Returns a multi-dataset array of points for a bubble chart
   * @param numDatasets How many datasets to generate
   * @param length How long should each dataset be?
   */
  public getMultiBubbleArrays(numDatasets: number, length: number): Promise<Array<ChartPoint[]>> {
    return new Promise<Array<ChartPoint[]>>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let dataSetArray: Array<ChartPoint[]> = [];
        for (let dsIndex = 0; dsIndex < numDatasets; dsIndex++) {
          let bubbleArray: ChartPoint[] = [];
          for (let index = 0; index < length; index++) {
            bubbleArray.push({
              x: MockChartDataProvider.getRandomNumber(),
              y: MockChartDataProvider.getRandomNumber(),
              r: Math.abs(MockChartDataProvider.getRandomNumber()) / 5
            });
          }
          dataSetArray.push(bubbleArray);
        }
        resolve(dataSetArray);
      }, FAKE_DELAY);
    });
  }

  /**
   * Returns a multi-dataset array of numbers for use in a chart
   * @param numDatasets The number of datasets you would like
   * @param length The length of each dataset
   */
  public getMultiDataset(numDatasets: number, length: number): Promise<Array<number[]>> {
    return new Promise<Array<number[]>>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let dataSetArray: Array<number[]> = [];
        for (let dsIndex = 0; dsIndex < numDatasets; dsIndex++) {
          let numArray: number[] = [];
          for (let index = 0; index < length; index++) {
            numArray.push(MockChartDataProvider.getRandomNumber());
          }

          dataSetArray.push(numArray);
        }

        resolve(dataSetArray);
      }, FAKE_DELAY);
    });
  }

  /**
   * Gets an array of points to render on a chart requiring X, Y coordinates
   * @param length Length of the dataset to generate
   */
  public getPointArray(length: number): Promise<ChartPoint[]> {
    return new Promise<ChartPoint[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray: ChartPoint[] = [];
        for (let index = 0; index < length; index++) {
          numArray.push(
            {
              x: MockChartDataProvider.getRandomNumber(),
              y: MockChartDataProvider.getRandomNumber(),
            }
          );
        }
        resolve(numArray);
      }, FAKE_DELAY);
    });
  }

  /**
   * Gets an array of points for a scatter chart
   * @param length Length of the dataset to generate
   */
  public getScatterArray(length: number): Promise<ChartPoint[]> {
    return new Promise<ChartPoint[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray: ChartPoint[] = [];
        for (let index = 0; index < length; index++) {
          numArray.push(
            {
              x: MockChartDataProvider.getRandomNumber(),
              y: MockChartDataProvider.getRandomSignedNumber(),
            }
          );
        }
        resolve(numArray);
      }, FAKE_DELAY);
    });
  }

  /**
   * Returns an array of numbers
   */
  public getNumberArray(length: number, waitduration?: number): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray: number[] = [];
        for (let index = 0; index < length; index++) {
          numArray.push(MockChartDataProvider.getRandomNumber());
        }
        resolve(numArray);
      }, waitduration && FAKE_DELAY);
    });
  }

  /**
   * Returns a random number between 1-100.
   */
  public static getRandomNumber(): number {
    return Math.round(Math.random() * 101);
  }

  /**
   * Returns a random signed number between -100 and 100
   * This method is used for charts with signed numbers,
   * such as line charts.
   */
  public static getRandomSignedNumber(): number {
    return Math.round(Math.random() * 201) - 100;
  }
}
