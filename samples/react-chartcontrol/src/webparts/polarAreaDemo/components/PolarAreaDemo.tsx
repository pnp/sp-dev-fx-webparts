import * as React from 'react';
import styles from './PolarAreaDemo.module.scss';
import { IPolarAreaDemoProps } from './IPolarAreaDemo.types';
import * as strings from 'PolarAreaDemoWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';

// used to retrieve (fake) data from a (fake) service
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';

// used to render the toolbar above the chart
import {
  CommandBar
} from '@fluentui/react';

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

const borderColors: string[] = [
  styles.borderColor1,
  styles.borderColor2,
  styles.borderColor3,
  styles.borderColor4,
  styles.borderColor5
];

const DATA_LENGTH: number = 5;

export class PolarAreaDemo extends React.Component<IPolarAreaDemoProps, {}> {
  /**
  * The chart element
  */
  private _chartElem: ChartControl = undefined;

  public render(): React.ReactElement<IPolarAreaDemoProps> {
    return (
      <div className={styles.polarAreaDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.PolarArea}
          ref={this._linkElement}
          datapromise={this._loadAsyncData()}
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
        items={[
          {
            key: 'randomizeData',
            name: strings.RandomizeCommandLabel,
            iconProps: {
              iconName: 'Refresh'
            },
            ariaLabel: strings.RandomizeCommandLabel,
            onClick: () => { this._handleRandomizeData(); },
            ['data-automation-id']: 'randomizeData'
          },
          {
            key: 'addData',
            name: strings.AddDataCommandLabel,
            iconProps: {
              iconName: 'InsertColumnsRight'
            },
            onClick: () => { this._handleAddData(); },
            ['data-automation-id']: 'addDataset'
          },
          {
            key: 'removeData',
            name: strings.RemoveDataCommandLabel,
            icon: 'InsertColumnsLeft',
            onClick: () => { this._handleRemoveData(); },
            ['data-automation-id']: 'removeData'
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
  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
      // Get the mock data provider
      const dataProvider: IChartDataProvider = new MockChartDataProvider();

      // Create an async request
      dataProvider
        .getNumberArray(DATA_LENGTH)  // we only need 5 data elements for this demo
        .then((numbers: number[]) => {
          // get the chart's data
          const data: ChartData = {
            labels: strings.ChartLabels,
            datasets: [
              {
                backgroundColor: [...chartColors], // we use the spread (...) notation to copy the colors
                borderColor: [...borderColors], // we use the spread (...) notation to copy the colors
                borderWidth:1,
                data: numbers,
                label: strings.DataSetLabel
              }
            ]
          };
          resolve(data);
        });
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
    const data: ChartData = this._chartElem.getChart().data;

    const dataSet = data.datasets[0];

    const labels: string[] = data.labels as string[];
    labels.push('data #' + labels.length.toString());

    const colorName = chartColors[labels.length % 5];
    const backgroundColors: string[] = dataSet.backgroundColor as string[];
    backgroundColors.push(colorName);

    const borderColor: string[] = dataSet.borderColor as string[];
    borderColor.push(borderColors[labels.length % 5]);

    const dataElements: number[] = dataSet.data as number[];
    dataElements.push(MockChartDataProvider.getRandomNumber());

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveData = () => {
    const data: ChartData = this._chartElem.getChart().data;

    data.labels.pop();

    const backgroundColors: string[] = data.datasets[0].backgroundColor as string[];
    backgroundColors.pop();

    const borderColor: string[] = data.datasets[0].borderColor as string[];
    borderColor.pop();

    const dataElements: number[] = data.datasets[0].data as number[];
    dataElements.pop();

    // update that chart
    this._chartElem.update();
  }
}
