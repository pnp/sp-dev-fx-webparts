import IChartDataProvider, { IBubblePoint } from "./IChartDataProvider";

/**
 * Returns an array of chart points (x,y)
 */
export default class MockChartDataProvider implements IChartDataProvider {
  public getSignedNumberArray(length: number): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray: number[] = [];
        for (let index = 0; index < length; index++) {
          numArray.push(MockChartDataProvider.getRandomSignedNumber());
        }
        resolve(numArray);
      }, 500);
    });
  }

  public getMultiBubbleArrays(numDatasets: number, length: number): Promise<Array<IBubblePoint[]>> {
    return new Promise<Array<IBubblePoint[]>>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let dataSetArray: Array<IBubblePoint[]> = [];
        for (let dsIndex = 0; dsIndex < numDatasets; dsIndex++) {
          let bubbleArray: IBubblePoint[] = [];
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
      }, 500);
    });
  }

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
      }, 500);
    });
  }

  public getPointArray(length: number): Promise<{}[]> {
    return new Promise<{}[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray = [];
        for (let index = 0; index < length; index++) {
          numArray.push(
            {
              x: MockChartDataProvider.getRandomNumber(),
              y: MockChartDataProvider.getRandomNumber(),
            }
          );
        }
        resolve(numArray);
      }, 500);
    });
  }

  public getScatterArray(length: number): Promise<{}[]> {
    return new Promise<{}[]>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        let numArray = [];
        for (let index = 0; index < length; index++) {
          numArray.push(
            {
              x: MockChartDataProvider.getRandomNumber(),
              y: MockChartDataProvider.getRandomSignedNumber(),
            }
          );
        }
        resolve(numArray);
      }, 500);
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
      }, waitduration && 500);
    });
  }

  /**
   * Returns a random number between 1-100.
   * This method is only used for demo purposes.
   */
  public static getRandomNumber(): number {
    return Math.round(Math.random() * 101);
  }

  public static getRandomSignedNumber(): number {
    return Math.round(Math.random() * 201) - 100;
  }
}
