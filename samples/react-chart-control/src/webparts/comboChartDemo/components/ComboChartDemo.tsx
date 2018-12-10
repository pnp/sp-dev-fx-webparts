import * as React from 'react';
import styles from './ComboChartDemo.module.scss';
import { IComboChartDemoProps } from './IComboChartDemo.types';
import * as strings from 'ComboChartDemoWebPartStrings';

import {
  CommandBar
} from "office-ui-fabric-react";

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

const DATA_LENGTH: number = 7;
const DATASET_LENGTH: number = 3;

export default class ComboChartDemo extends React.Component<IComboChartDemoProps, {}> {
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

  /**
  * Renders the command bar and the chart
  */
  public render(): React.ReactElement<IComboChartDemoProps> {

    return (
      <div className={styles.comboChartDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.Bar}
          ref={this._linkElement}
          data={
            {
              labels: strings.ChartLabels,
              datasets: [{
                type: 'line',
                label: `${strings.DataSetLabel}  1`,
                borderColor: styles.border1,
                borderWidth: 2,
                fill: false,
                data: []
              },
              {
                type: 'bar',
                label: `${strings.DataSetLabel}  1`,
                backgroundColor: styles.background2,
                data: [],
                borderColor: styles.border2,
                borderWidth: 2
              },
              {
                type: 'bar',
                label: `${strings.DataSetLabel}  1`,
                backgroundColor: styles.background3,
                data: []
              }]
            }}
          options={{
            title: {
              display: true,
              text: strings.ChartTitle
            },
            tooltips: {
              mode: 'index',
              intersect: true
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
        ]}
      />
    );
  }

  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  /**
     * Called when user clicks on Randomize Data.
     * Reloads the entire dataset with newly retrieved randomized numbers
     */
  private _handleRandomizeData = () => {
    this._loadAsyncData();
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
      .getMultiDataset(DATASET_LENGTH, DATA_LENGTH)  // we only need 5 data elements for this demo
      .then((numberArrays: Array<number[]>) => {
        // mark the request as done
        this._asyncRequest = undefined;

        // get the chart's data
        const data = this._chartElem.getChart().data;

        // map the colors
        for (var index = 0; index < numberArrays.length; ++index) {
          data.datasets[index].data = numberArrays[index];
        }

        // update the chart without refreshing the entire web part
        this._chartElem.update();
      });
  }
}
