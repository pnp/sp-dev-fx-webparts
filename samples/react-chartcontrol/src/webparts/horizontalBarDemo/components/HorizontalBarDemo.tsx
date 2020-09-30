import * as React from 'react';
import styles from './HorizontalBarDemo.module.scss';
import { IHorizontalBarDemoProps } from './IHorizontalBarDemo.types';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import * as strings from 'HorizontalBarDemoWebPartStrings';
import * as Color from 'color';

import {
  CommandBar
} from 'office-ui-fabric-react';

import { ChartControl, ChartType,OFFICE_COLORFUL1, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';


/**
 * The standard office colors
 */
const chartColors: string[] = OFFICE_COLORFUL1;
const backgroundColors: string[] = PaletteGenerator.alpha(OFFICE_COLORFUL1, 0.2) as string[];
/**
 * Demonstrates how to use a horizontal bar chart.
 * Also shows how to use an Office Fabric CommandBar to change
 * data and settings.
 * This sample uses the state to store the entire chart's
 */
export default class HorizontalBarDemo extends React.Component<IHorizontalBarDemoProps, {}> {
  private _chartElem: ChartControl = undefined;

  public render(): React.ReactElement<IHorizontalBarDemoProps> {
    // Get the command bar control
    const commandBar: JSX.Element = this._renderCommandBar();

    return (
      <div className={styles.horizontalBarDemo}>
        {commandBar}
        <ChartControl
          type={ChartType.HorizontalBar}
          ref={this._linkElement}
          datapromise={this._loadAsyncData()}
          options={{
            // Disable events
            events: [],
            // Hide legend
            legend: {
              display: false
            },
            // Disable tooltips
            tooltips: {
              enabled: false
            },
            // Stack bar charts
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }}
        />
      </div>
    );
  }

  /**
   * Renders the command bar control.
   * The dataMenuItems and dataSetMenuItems are
   * in separate arrays in case we want to hide/show
   * some menu options
   */
  private _renderCommandBar(): JSX.Element {
    return (
      <CommandBar
        items={[
          {
            key: 'addData',
            name: strings.AddDataButton,
            iconProps: {
              iconName: 'InsertColumnsRight'
            },
            ariaLabel: strings.AddDataButton,
            onClick: () => { this._addData(); },
            ['data-automation-id']: 'addDataItemMenu'
          },
          {
            key: 'removeData',
            name: strings.RemoveDataButton,
            iconProps: {
              iconName: 'InsertColumnsLeft'
            },
            ariaLabel: strings.AddDataButton,
            onClick: () => { this._removeData(); },
            ['data-automation-id']: 'editButton'
          },
          {
            key: 'addDataSet',
            name: strings.AddDatasetButton,
            icon: 'Table',
            ariaLabel: strings.AddDatasetButton,
            onClick: () => { this._handleAddDataset(); },
            ['data-automation-id']: 'addDataItemMenu'
          },
          {
            key: 'deleteDataSet',
            name: strings.RemoveDatasetButton,
            icon: 'DeleteTable',
            onClick: () => { this._handleRemoveDataset(); },
            ['data-automation-id']: 'deleteDatasetButton'
          }
        ]}
      />
    );
  }

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
      dataProvider.getMultiDataset(1, 7).then((dataSets: Array<number[]>) => {
        const data: Chart.ChartData =
        {
          labels: strings.ChartLabels,
          datasets: [
            {
              backgroundColor: backgroundColors[0],
              borderColor: chartColors[0],
              label: strings.DataSetLabel + '1',
              data: dataSets[0],
              borderWidth: 1
            }
          ]
        };
        resolve(data);
      });
    });
  }

  /**
   * Removes a data item from a dataset
   */
  private _removeData = (): void => {
    // Get a reference to the chart's data
    const data: Chart.ChartData = this._chartElem.getChart().data;

    // Don't allow people to remove the last data
    if (data.datasets.length > 0) {
      if (data.labels.length < 2) {
        return;
      }

      // Remove the label
      data.labels.splice(-1, 1);

      // Remove the data from the dataset
      data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });

      this._chartElem.update();
    }

  }

  /**
   * Adds a data item to a dataset
   */
  private _addData = (): void => {
    // Get a reference to chart's data
    const data: any = this._chartElem.getChart().data;

    // Don't let people add data if there are no datasets
    // or if we've added all the months
    if (data.datasets.length > 0) {
      if (data.labels.length > 11) {
        return;
      }

      // Get the name of the next month to add
      var month: string = strings.Months[data.labels.length % strings.Months.length];

      // Add it to the month labels
      data.labels.push(month);

      // Add a new data item to every dataset
      for (var index = 0; index < data.datasets.length; ++index) {
        data.datasets[index].data.push(MockChartDataProvider.getRandomNumber());
      }

      this._chartElem.update();
    }
  }

  /**
   * Removes a dataset from the chart
   */
  private _handleRemoveDataset = (): void => {
    // Get a reference to the chart
    const data: any = this._chartElem.getChart().data;

    // Don't let them remove the last dataset
    if (data.datasets.length > 1) {
      // Pop the dataset off the dataset array
      data.datasets.pop();
    }

    this._chartElem.update();
  }

  /**
   * Adds a dataset to the chart
   */
  private _handleAddDataset = (): void => {
    // Get a reference to the chart's data
    const data: any = this._chartElem.getChart().data;

    // Create a new dataset
    const newDataset = {
      label: strings.DataSetLabel + (data.datasets.length + 1),
      // Create a 20 percent opaque background
      backgroundColor: backgroundColors[data.datasets.length % chartColors.length],
      borderColor: chartColors[data.datasets.length % chartColors.length],
      borderWidth: 1,
      // Start with blank data, we'll add some next
      data: []
    };

    // Add data for every month
    for (var index = 0; index < data.labels.length; ++index) {
      newDataset.data.push(MockChartDataProvider.getRandomNumber());
    }

    // Add the new dataset
    data.datasets.push(newDataset);

    this._chartElem.update();
  }
}
