import * as React from 'react';
import styles from './ComboChartDemo.module.scss';
import { IComboChartDemoProps } from './IComboChartDemo.types';
import * as strings from 'ComboChartDemoWebPartStrings';

import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';

import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';

const DATA_LENGTH: number = 7;
const DATASET_LENGTH: number = 3;

export  class ComboChartDemo extends React.Component<IComboChartDemoProps, {}> {

  /**
  * Renders the command bar and the chart
  */
  public render(): React.ReactElement<IComboChartDemoProps> {

    return (
      <div className={styles.comboChartDemo}>
        <ChartControl
          type={ChartType.Bar}
          datapromise={this._loadAsyncData()}
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
 * Loads data from a service.
 * This is where you would replace for your own code
 */
  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getMultiDataset(DATASET_LENGTH, DATA_LENGTH)  // we only need 5 data elements for this demo
        .then((numberArrays: Array<number[]>) => {

          const data: ChartData =
          {
            labels: strings.ChartLabels,
            datasets: [{
              type: 'line',
              label: `${strings.DataSetLabel}  1`,
              borderColor: styles.border1,
              borderWidth: 2,
              fill: false,
              data: numberArrays[0]
            },
            {
              type: 'bar',
              label: `${strings.DataSetLabel}  2`,
              backgroundColor: styles.background2,
              data: numberArrays[1],
              borderColor: styles.border2,
              borderWidth: 2
            },
            {
              type: 'bar',
              label: `${strings.DataSetLabel}  3`,
              backgroundColor: styles.background3,
              data: numberArrays[2]
            }]
          };
          resolve(data);
        });
    });
  }
}
