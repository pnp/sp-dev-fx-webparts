import * as React from 'react';
import styles from './PieChartDemo.module.scss';
import { IPieChartDemoProps } from './IPieChartDemo.types';
import * as strings from 'PieChartDemoWebPartStrings';

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

const DATA_LENGTH: number = 5;
/**
 * This sample demonstrates add and modifying the data in a pie chart
 */
export class PieChartDemo extends React.Component<IPieChartDemoProps, {}> {
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
    this._loadAsyncData(1);
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

  /**
   * Renders the pie chart with a toolbar above it
   */
  public render(): React.ReactElement<IPieChartDemoProps> {
    return (
      <div className={styles.pieChartDemo}>
        {this._renderCommandBar()}
        <ChartControl
          ref={this._linkElement}
          data={
            {
              labels: strings.ChartLabels,
              datasets: [
                // start with an empty dataset
              ]
            }}
          type={ChartType.Pie} />
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
            key: 'addDataSet',
            name: strings.AddDatasetCommandLabel,
            iconProps: {
              iconName: 'Table'
            },
            onClick: () => { this._handleAddDataset(); },
            ['data-automation-id']: 'addDataset'
          },
          {
            key: 'removeDataSet',
            name: strings.RemoveDatasetCommandLabel,
            icon: 'DeleteTable',
            onClick: () => { this._handleRemoveDataset(); },
            ['data-automation-id']: 'removeDataset'
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
  private _loadAsyncData = (numDatasets: number) => {
    // Get the mock data provider
    const dataProvider: IChartDataProvider = new MockChartDataProvider();

    // Create an async request
    this._asyncRequest = dataProvider
      .getMultiDataset(numDatasets, DATA_LENGTH)  // we only need 5 data elements for this demo
      .then((dataSets: Array<number[]>) => {
        // we got the data back

        // mark the request as done
        this._asyncRequest = undefined;

        // get the chart's data
        const { data } = this._chartElem.props;

        // iterate through all the datasets we have received
        dataSets.forEach((returnedData: number[], dsIndex: number) => {
          // if we already have that dataset, simply replace the data
          if (data.datasets.length > dsIndex) {
            // replace the data
            data.datasets[dsIndex].data = returnedData;
          } else {
            // this is a new dataset!
            const newDataset = {
              backgroundColor: [],
              data: [],
              // create a dataset label (e.g.: Dataset 1)
              label: strings.DataSetLabel + (dsIndex + 1).toString(),
            };

            // get the retrieved data
            newDataset.data = returnedData;

            // map the colors
            for (var index = 0; index < data.labels.length; ++index) {
              //newDataset.data.push(returnedData[index]);
              var newColor = chartColors[index % chartColors.length];
              newDataset.backgroundColor.push(newColor);
            }

            // add the dataset
            data.datasets.push(newDataset);
          }
        });

        // update the chart without refreshing the entire web part
        this._chartElem.update();
      });
  }

  /**
   * Called when user clicks on Randomize Data.
   * Reloads the entire dataset with newly retrieved randomized numbers
   */
  private _handleRandomizeData = () => {
    this._loadAsyncData(this._chartElem.getChart().data.datasets.length);
  }

  /**
   * Handles requests to add a new dataset.
   */
  private _handleAddDataset = () => {
    // get the chart's data
    const data: ChartData = this._chartElem.getChart().data;

    // create a new dataset
    var newDataset = {
      backgroundColor: [],
      data: [],
      // give it a label (e.g.: Dataset 1)
      label: strings.DataSetLabel + data.datasets.length.toString(),
    };

    // add new numbers and background colors
    for (var index = 0; index < data.labels.length; ++index) {
      // add a random number
      newDataset.data.push(MockChartDataProvider.getRandomNumber());

      // add the background color
      var newColor = chartColors[index % chartColors.length];
      newDataset.backgroundColor.push(newColor);
    }

    // add the new dataset
    data.datasets.push(newDataset);

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveDataset = () => {
    // get the data from the chart
    const data: ChartData = this._chartElem.getChart().data;

    // splice the array and remove a dataset
    data.datasets.splice(0, 1);

    // update the chart.
    this._chartElem.update();

    // that's all there is to it!
  }
}
