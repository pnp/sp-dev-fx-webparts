import { IListService } from "./IListService";
import { IListField } from "./IListField";
import { IListItem } from "./IListItem";
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { MockChartDataProvider } from "../ChartDataProvider/MockChartDataProvider";
import IChartDataProvider from "../ChartDataProvider/IChartDataProvider";
import { ChartPoint } from 'chart.js';

const DATA_COUNT: number = 7;

export class MockListService implements IListService {
  private _chartType: ChartType;
  private _labels: string[];

  constructor(chartType: ChartType, labels: string[]) {
    this._chartType = chartType;
    this._labels = labels;
  }

  public getFields(_listId: string): Promise<IListField[]> {
    throw new Error("Method not implemented for Mock service.");
  }

  public getListItems(_listId: string, _labelField: string, _valueField: string, _yValueField?: string, _rValueField?: string): Promise<Array<IListItem>> {

    if (this._chartType === ChartType.Bubble) {
      return this._getSampleBubbleData();
    }

    if (this._chartType === ChartType.Scatter) {
      return this._getSampleScatterData();
    }

    return this._getSampleArrayData();
  }

  private _getSampleArrayData = (): Promise<Array<IListItem>> => {
    return new Promise<Array<IListItem>>((resolve, _reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getNumberArray(DATA_COUNT, 500).then((dataSet: number[]) => {
        const listRows: Array<IListItem> = dataSet.map((value: number, index: number) => {
          const listRow: IListItem = {
            Id: `row_${index}`,
            Label: this._labels[index],
            Value: value
          };
          return listRow;
        });

        resolve(listRows);
      });
    });
  }

  private _getSampleBubbleData(): Promise<Array<IListItem>> {

    return new Promise<Array<IListItem>>((resolve, _reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getMultiBubbleArrays(1, DATA_COUNT).then((dataSet: Array<ChartPoint[]>) => {
        const listRows: Array<IListItem> = dataSet[0].map((value: ChartPoint, index: number) => {
          const listRow: IListItem = {
            Id: `row_${index}`,
            Label: this._labels[index],
            Value: value.x as number,
            YValue: value.y as number,
            RValue: value.r
          };
          return listRow;
        });

        resolve(listRows);
      });
    });
  }

  private _getSampleScatterData(): Promise<Array<IListItem>> {
    return new Promise<Array<IListItem>>((resolve, _reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getScatterArray(DATA_COUNT).then((dataSet: ChartPoint[]) => {
        const listRows: Array<IListItem> = dataSet.map((value: ChartPoint, index: number) => {
          const listRow: IListItem = {
            Id: `row_${index}`,
            Label: this._labels[index],
            Value: value.x as number,
            YValue: value.y as number
          };
          return listRow;
        });

        resolve(listRows);
      });
    });
  }
}
