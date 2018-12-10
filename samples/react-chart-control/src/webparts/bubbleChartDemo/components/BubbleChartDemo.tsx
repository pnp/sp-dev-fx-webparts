import * as React from 'react';
import styles from './BubbleChartDemo.module.scss';
import { IBubbleChartDemoProps } from './IBubbleChartDemo.types';
import * as strings from 'BubbleChartDemoWebPartStrings';
import * as Color from 'color';

// used to add a chart control
import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

// used to retrieve (fake) data from a (fake) service
import IChartDataProvider, { IBubblePoint } from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

// used to render the toolbar above the chart
import {
  CommandBar
} from "office-ui-fabric-react";

/**
 * Define the chart colors:
 * Red,
 * Orange,
 * Yellow,
 * Green,
 * Blue
 */
const chartColors: string[] = [
  styles.color1,
  styles.color2,
  styles.color3,
  styles.color4,
  styles.color5];

const DATA_COUNT: number = 16;
const DATSET_LENGTH: number = 2;

export default class BubbleChartDemo extends React.Component<IBubbleChartDemoProps, {}> {
  /**
 * The chart element
 */
  private _chartElem: ChartControl = undefined;

  /**
   * Handle to async requests
   */
  private _asyncRequest = undefined;

  /**
  * When component is mounted, get the data
  * It is better to use componentDidMount than
  * componentWillMount to prevent calling the service
  * more than once.
  */
  public componentDidMount(): void {
    // by default, load only one dataset
    this._loadAsyncData();
  }

  /**
   * Before we unmount, cancel any pending requests
   */
  public componentWillUnmount(): void {
    // any outstading requests?
    if (this._asyncRequest) {
      // cancel them!
      this._asyncRequest.cancel();
    }
  }

  public render(): React.ReactElement<IBubbleChartDemoProps> {
    return (
      <div className={styles.bubbleChartDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.Bubble}
          ref={this._linkElement}
          data={
            {
              datasets: [{
                label: strings.DataSet1Label,
                backgroundColor: Color(chartColors[0]).alpha(0.2).toString(),
                borderColor: chartColors[0],
                hoverBackgroundColor: 'transparent',
                borderWidth: 1,
                data: []
              }, {
                label: strings.DataSet2Label,
                backgroundColor: Color(chartColors[1]).alpha(0.2).toString(),
                borderColor: chartColors[1],
                hoverBackgroundColor: 'transparent',
                borderWidth: 2,
                data: []
              }]
            }}

          options={
            {
              aspectRatio: 1,
              legend: {
                display: false
              },
              tooltips: {
                enabled: false
              },
              animation: {
                duration: 3000 // The chart.js demo code was 10000 -- too slow for me
              },
              responsive: true,
              title: {
                display: true,
                text: strings.ChartTitle
              }
            }
          }
        />
      </div>
    );
  }

  /**
 * Renders the command bar control.
 */
  private _renderCommandBar(): JSX.Element {
    return (
      <CommandBar
        isSearchBoxVisible={false}
        items={[
          {
            key: "randomizeData",
            name: strings.RandomizeCommandLabel,
            iconProps: {
              iconName: "Refresh"
            },
            ariaLabel: strings.RandomizeCommandLabel,
            onClick: () => { this._handleRandomizeData(); },
            ["data-automation-id"]: "randomizeData"
          },
          {
            key: "addData",
            name: strings.AddDatasetCommandLabel,
            iconProps: {
              iconName: "Table"
            },
            onClick: () => { this._handleAddDataset(); },
            ["data-automation-id"]: "addDataset"
          },
          {
            key: "removeData",
            name: strings.RemoveDatasetCommandLabel,
            icon: "DeleteTable",
            onClick: () => { this._handleRemoveDataset(); },
            ["data-automation-id"]: "removeData"
          },
        ]}
      />
    );
  }

  /**
   * Links a reference to the chart so that we can
   * refer to it later and change its data
   */
  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData = () => {
    // Get the mock data provider
    const dataProvider: IChartDataProvider = new MockChartDataProvider();

    // Create an async request
    this._asyncRequest = dataProvider
      .getMultiBubbleArrays(DATSET_LENGTH, DATA_COUNT)  // we only need 5 data elements for this demo
      .then((bubbleArrays: Array<IBubblePoint[]>) => {
        // mark the request as done
        this._asyncRequest = undefined;

        // get the chart's data
        const data = this._chartElem.getChart().data;

        // map the colors
        for (var index = 0; index < bubbleArrays.length; ++index) {
          data.datasets[index].data = bubbleArrays[index];
        }

        // update the chart without refreshing the entire web part
        this._chartElem.update();
      });
  }

  /**
   * Called when user clicks on Randomize Data.
   * Reloads the entire dataset with newly retrieved randomized numbers
   */
  private _handleRandomizeData = () => {
    const data = this._chartElem.getChart().data;
    data.datasets.forEach((dataset) => {
      // get the data as array of IBubblePoint
      //const bubbleArray: IBubblePoint[] = dataset.data as IBubblePoint[];
      dataset.data = this._generateData();
      // bubbleArray.map((): IBubblePoint => {
      //   return {
      //     x: MockChartDataProvider.getRandomNumber(),
      //     y: MockChartDataProvider.getRandomNumber(),
      //     r: Math.abs(MockChartDataProvider.getRandomNumber()) /5
      //   };
      // });
    });

    this._chartElem.update();

  }

  /**
   * Handles requests to add a new dataset.
   */
  private _handleAddDataset = () => {
    // get the chart's data
    const data: Chart.ChartData = this._chartElem.getChart().data;

    data.datasets.push({
      backgroundColor: Color(chartColors[data.datasets.length % chartColors.length]).alpha(0.2).toString(),
      borderColor: chartColors[data.datasets.length % chartColors.length],
      hoverBackgroundColor: 'transparent',
      data: this._generateData(),
      borderWidth: Math.min(Math.max(1, data.datasets.length + 1), 8)
    });

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveDataset = () => {
    const data: Chart.ChartData = this._chartElem.getChart().data;
    data.datasets.shift();

    // update that chart
    this._chartElem.update();
  }

  private _generateData(): IBubblePoint[] {
    const data: IBubblePoint[] = [];

    for (let i = 0; i < DATA_COUNT; ++i) {
      data.push({
        x: MockChartDataProvider.getRandomNumber(),
        y: MockChartDataProvider.getRandomNumber(),
        r: Math.abs(MockChartDataProvider.getRandomNumber()) / 5
      });
    }

    return data;
  }
}
