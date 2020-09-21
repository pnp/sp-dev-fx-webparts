import * as React from 'react';
import styles from './BubbleChartDemo.module.scss';
import { IBubbleChartDemoProps } from './IBubbleChartDemo.types';
import * as strings from 'BubbleChartDemoWebPartStrings';
import * as Color from 'color';

// used to add a chart control
import { ChartControl, ChartType, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';

// used to retrieve (fake) data from a (fake) service
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

// used to render the toolbar above the chart
import {
  CommandBar
} from 'office-ui-fabric-react';

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

const chartBackgroundColors: string[] = PaletteGenerator.alpha(chartColors, 0.2) as string[];

const DATA_COUNT: number = 16;
const DATSET_LENGTH: number = 2;
const MAX_BORDERWIDTH: number = 8;

export default class BubbleChartDemo extends React.Component<IBubbleChartDemoProps, {}> {
  /**
 * The chart element
 */
  private _chartElem: ChartControl = undefined;


  public render(): React.ReactElement<IBubbleChartDemoProps> {
    return (
      <div className={styles.bubbleChartDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.Bubble}
          ref={this._linkElement}
          datapromise={this._loadAsyncData()}
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
          onClick={(event: MouseEvent, _unused: {}[]) => {
            const eventItem = this._chartElem.getElementAtEvent(event);

            // don't do anything if we didn't click on a bubble
            if (eventItem[0] === undefined) {
              return;
            }

            // get the data item passed from the event
            const datasetIndex: number = eventItem![0]!['_datasetIndex'];
            const itemIndex: number = eventItem![0]!['_index'];

            // pop that bubble!
            if (datasetIndex !== undefined && itemIndex !== undefined) {
              // I wish I could make a 'pop' sound

              // get the chart's data
              const { data } = this._chartElem.getChart();

              // remove the data item that was clicked
              data.datasets[datasetIndex]!.data!.splice(itemIndex, 1);

              // update that chart!
              this._chartElem.update();
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
            name: strings.AddDatasetCommandLabel,
            iconProps: {
              iconName: 'Table'
            },
            onClick: () => { this._handleAddDataset(); },
            ['data-automation-id']: 'addDataset'
          },
          {
            key: 'removeData',
            name: strings.RemoveDatasetCommandLabel,
            icon: 'DeleteTable',
            onClick: () => { this._handleRemoveDataset(); },
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
  private _loadAsyncData(): Promise<Chart.ChartData> {
    return new Promise<Chart.ChartData>((resolve, reject) => {
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider
        .getMultiBubbleArrays(DATSET_LENGTH, DATA_COUNT)  // we only need 5 data elements for this demo
        .then((bubbleArrays: Array<Chart.ChartPoint[]>) => {
          const data: Chart.ChartData = {
            datasets: [{
              label: strings.DataSet1Label,
              backgroundColor: chartBackgroundColors[0],
              borderColor: chartColors[0],
              hoverBackgroundColor: chartColors[0],
              borderWidth: 1,
              data: bubbleArrays[0]
            }, {
              label: strings.DataSet2Label,
              backgroundColor: chartBackgroundColors[1],
              borderColor: chartColors[1],
              hoverBackgroundColor: chartColors[1],
              borderWidth: 2,
              data: bubbleArrays[1]
            }]
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
    const { data } = this._chartElem.getChart();
    data.datasets.forEach((dataset) => {
      // get the data as array of IBubblePoint
      dataset.data = this._generateData();
    });

    this._chartElem.update();
  }

  /**
   * Handles requests to add a new dataset.
   */
  private _handleAddDataset = () => {
    // get the chart's data
    const { data } = this._chartElem.getChart();

    data.datasets.push({
      backgroundColor: chartBackgroundColors[data.datasets.length % chartColors.length],
      borderColor: chartColors[data.datasets.length % chartColors.length],
      hoverBackgroundColor: chartColors[data.datasets.length % chartColors.length],
      data: this._generateData(),
      borderWidth: Math.min(Math.max(1, data.datasets.length + 1), MAX_BORDERWIDTH)
    });

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveDataset = () => {
    const { data } = this._chartElem.getChart();
    data.datasets.shift();

    // update that chart
    this._chartElem.update();
  }

  private _generateData(): Chart.ChartPoint[] {
    const data: Chart.ChartPoint[] = [];

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
