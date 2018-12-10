import * as React from 'react';
import styles from './PolarAreaDemo.module.scss';
import { IPolarAreaDemoProps } from './IPolarAreaDemo.types';
import * as strings from 'PolarAreaDemoWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

// used to retrieve (fake) data from a (fake) service
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
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
  styles.color5
];

const DATA_LENGTH: number = 5;

export default class PolarAreaDemo extends React.Component<IPolarAreaDemoProps, {}> {
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

  public render(): React.ReactElement<IPolarAreaDemoProps> {
    return (
      <div className={styles.polarAreaDemo}>
        {this._renderCommandBar()}
        <ChartControl
          ref={this._linkElement}
          data={
            {
              labels: strings.ChartLabels,
              datasets: []
            }}
          type={ChartType.PolarArea}
          options={{
            responsive: true,
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: strings.ChartTitle
            },
            // scale: {
            //   ticks: {
            //     beginAtZero: true
            //   },
            //   reverse: false
            // },
            animation: {
              animateRotate: false,
              animateScale: true
            }
          }}
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
            name: strings.AddDataCommandLabel,
            iconProps: {
              iconName: "InsertColumnsRight"
            },
            onClick: () => { this._handleAddData(); },
            ["data-automation-id"]: "addDataset"
          },
          {
            key: "removeData",
            name: strings.RemoveDataCommandLabel,
            icon: "InsertColumnsLeft",
            onClick: () => { this._handleRemoveData(); },
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
      .getNumberArray(DATA_LENGTH)  // we only need 5 data elements for this demo
      .then((dataSet: number[]) => {
        // mark the request as done
        this._asyncRequest = undefined;

        // get the chart's data
        const data = this._chartElem.getChart().data;

        if (data.datasets.length === 1) {
          data.datasets = [];
        }

        const newDataset = {
          backgroundColor: [],
          data: [],
          label: strings.DataSetLabel
        };

        // get the retrieved data
        newDataset.data = dataSet;

        // map the colors
        for (var index = 0; index < data.labels.length; ++index) {
          //newDataset.data.push(returnedData[index]);
          var newColor = chartColors[index % chartColors.length];
          newDataset.backgroundColor.push(newColor);
        }

        // add the dataset
        data.datasets.push(newDataset);

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
    data.datasets.forEach((piece, i) => {
      const dataElements: number[] = piece.data as number[];
      dataElements.forEach((value, j) => {
        data.datasets[i].data[j] = MockChartDataProvider.getRandomNumber();
      });
    });

    this._chartElem.update();

  }

  /**
   * Handles requests to add a new dataset.
   */
  private _handleAddData = () => {
    // get the chart's data
    const data: Chart.ChartData = this._chartElem.getChart().data;

    const dataSet = data.datasets[0];

    const labels: string[] = data.labels as string[];
    labels.push("data #" + labels.length.toString());

    console.log("Where we're at", labels.length, chartColors.length, labels.length % 5);
    const colorName = chartColors[labels.length % 5];
    console.log("Color name", colorName);
    const backgroundColors: string[] = dataSet.backgroundColor as string[];
    backgroundColors.push(colorName);

    const dataElements: number[] = dataSet.data as number[];
    dataElements.push(MockChartDataProvider.getRandomNumber());

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveData = () => {
    const data: Chart.ChartData = this._chartElem.getChart().data;

    data.labels.pop();

    const backgroundColors: string[] = data.datasets[0].backgroundColor as string[];
    backgroundColors.pop();

    const dataElements: number[] = data.datasets[0].data as number[];
    dataElements.pop();

    // update that chart
    this._chartElem.update();
  }
}
