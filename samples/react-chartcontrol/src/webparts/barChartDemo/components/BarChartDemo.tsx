import * as React from 'react';
import styles from './BarChartDemo.module.scss';
import * as strings from 'BarChartDemoWebPartStrings';
import { IBarChartDemoProps, IBarChartDemoState } from './IBarChartDemo.types';
import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';

const DATA_LENGTH: number = 7;

/**
 * This demo shows how to easily load data from an asynchronous service
 * and display the results, rendering a "please wait" message while
 * data is loading.
 */
export class BarChartDemo extends React.Component<IBarChartDemoProps, IBarChartDemoState> {
  /**
   * Renders the "Loading" spinner if the state is currently loading,
   * or the chart once data is loladed
   */
  public render(): React.ReactElement<IBarChartDemoProps> {
    return (
      <div className={styles.barChartDemo}>
        <ChartControl
          type={ChartType.Bar}
          datapromise={this._loadAsyncData()}
          loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.PleaseWait} ariaLive="assertive" />}
          options={{
            scales:
            {
              yAxes:
                [{
                  ticks:
                  {
                    beginAtZero: true // optional, but makes the chart start at zero instead of the minimum value
                  }
                }]
            },
            // animation is totally unecessary -- it just makes this demo pretty
            animation: {
              easing: 'easeInOutBack'
            }
          }}
        />
      </div>
    );
  }

  /**
  * Loads data from a service.
  * This is where you would replace for your own code
  */
  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getNumberArray(DATA_LENGTH, 2000).then((dataSet: number[]) => {
        const data: ChartData =
        {
          labels: strings.ChartLabels,
          datasets: [
            {
              label: strings.DataSetLabel,
              data: dataSet,
              backgroundColor: [
                styles.background1,
                styles.background2,
                styles.background3,
                styles.background4,
                styles.background5,
                styles.background6
              ],
              borderColor: [
                styles.border1,
                styles.border2,
                styles.border3,
                styles.border4,
                styles.border5,
                styles.border6
              ],
              borderWidth: 1
            }
          ]
        };
        resolve(data);
      });
    });
  }
}
