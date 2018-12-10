import * as React from 'react';
import styles from './HorizontalBarDemo.module.scss';
import { IHorizontalBarDemoProps } from './IHorizontalBarDemo.types';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import * as strings from 'HorizontalBarDemoWebPartStrings';
import * as Color from 'color';

import {
  CommandBar
} from "office-ui-fabric-react";

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

/**
 * The standard office colors
 */
const chartColors: string[] = [
  styles.color1,
  styles.color2,
  styles.color3,
  styles.color4,
  styles.color5,
  styles.color6,
  styles.color7,
  styles.color8,
  styles.color9,
  styles.color10,
  styles.color11,
  styles.color12,
  styles.color13,
  styles.color14,
  styles.color15,
  styles.color16,
  styles.color17,
  styles.color18,
  styles.color19,
  styles.color20,
  styles.color21,
  styles.color22,
  styles.color23,
  styles.color24,
  styles.color25,
  styles.color26,
  styles.color27,
  styles.color28,
  styles.color29,
  styles.color30,
  styles.color31,
  styles.color32,
  styles.color32,
  styles.color33,
  styles.color34,
  styles.color35,
  styles.color36,
  styles.color37,
  styles.color38,
  styles.color39,
  styles.color40,
  styles.color41,
  styles.color42,
  styles.color43,
  styles.color44,
  styles.color45,
  styles.color46,
  styles.color47,
  styles.color48,
  styles.color49,
  styles.color50,
  styles.color51,
  styles.color52,
  styles.color53
];

/**
 * Demonstrates how to use a horizontal bar chart.
 * Also shows how to use an Office Fabric CommandBar to change
 * data and settings.
 * This sample uses the state to store the entire chart's
 */
export default class HorizontalBarDemo extends React.Component<IHorizontalBarDemoProps, {}> {
  private _chartElem: ChartControl = undefined;

  /**
 * Handle to async requests
 */
  private _asyncRequest = undefined;

  /**
   * Loads data asynchronously and stores it in the component's
   * state.
   */
  public componentDidMount(): void {
    this._loadAsyncData();
  }

  public render(): React.ReactElement<IHorizontalBarDemoProps> {
    // Get the command bar control
    const commandBar: JSX.Element = this._renderCommandBar();

    return (
      <div className={styles.horizontalBarDemo}>
        {commandBar}
          <ChartControl
            ref={this._linkElement}
            data={
              {}
            }
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
            type={ChartType.HorizontalBar} />
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
        isSearchBoxVisible={false}
        items={[
          {
            key: "addData",
            name: strings.AddDataButton,
            iconProps: {
              iconName: "InsertColumnsRight"
            },
            ariaLabel: strings.AddDataButton,
            onClick: () => { this._addData(); },
            ["data-automation-id"]: "addDataItemMenu"
          },
          {
            key: "removeData",
            name: strings.RemoveDataButton,
            iconProps: {
              iconName: "InsertColumnsLeft"
            },
            ariaLabel: strings.AddDataButton,
            onClick: () => { this._removeData(); },
            ["data-automation-id"]: "editButton"
          },
          {
            key: "addDataSet",
            name: strings.AddDatasetButton,
            icon: "Table",
            ariaLabel: strings.AddDatasetButton,
            onClick: () => { this._handleAddDataset(); },
            ["data-automation-id"]: "addDataItemMenu"
          },
          {
            key: "deleteDataSet",
            name: strings.RemoveDatasetButton,
            icon: "DeleteTable",
            onClick: () => { this._handleRemoveDataset(); },
            ["data-automation-id"]: "deleteDatasetButton"
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
  private _loadAsyncData = () => {
    const dataProvider: IChartDataProvider = new MockChartDataProvider();
    this._asyncRequest = dataProvider.getMultiDataset(1, 7).then((dataSets: Array<number[]>) => {
      // mark the request as done
      this._asyncRequest = undefined;

      const chartData: Chart.ChartData =
      {
        labels: strings.ChartLabels,
        datasets: [
          {
            backgroundColor: Color(chartColors[0]).alpha(0.2).toString(),
            borderColor: chartColors[0],
            label: strings.DataSetLabel + "1",
            data: dataSets[0],
            borderWidth: 1
          }
        ]
      };

      // Get a reference to the chart's data
      this._chartElem.getChart().data = chartData;
      this._chartElem.update();
    });
  }

  /**
   * Removes a data item from a dataset
   */
  private _removeData = (): void => {
    // Get a reference to the chart's data
    const data: any = this._chartElem.getChart().data;

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

    // Get the next color
    const colorHex: string = chartColors[data.datasets.length % chartColors.length];

    // Get a color from its hex value
    const dataSetColor = Color(colorHex);

    // Create a new dataset
    const newDataset = {
      label: strings.DataSetLabel + (data.datasets.length + 1),
      // Create a 20 percent opaque background
      backgroundColor: Color(dataSetColor).alpha(0.2).rgb(),
      borderColor: dataSetColor,
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
