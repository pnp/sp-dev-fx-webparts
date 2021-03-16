import * as React from 'react';
import * as strings from 'RadarDemoWebPartStrings';
import styles from './RadarDemo.module.scss';
import { IRadarDemoProps, IRadarDemoState } from './IRadarDemo.types';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import { ChartData } from 'chart.js';

const DATASET_LENGTH: number = 2;
const DATA_LENGTH: number = 7;
export class RadarDemo extends React.Component<IRadarDemoProps, IRadarDemoState> {

 public render(): React.ReactElement<IRadarDemoProps> {

    return (
      <div className={styles.radarDemo}>
              <ChartControl
                datapromise={this._loadAsyncData()}
                type={ChartType.Radar}
                options={{
                  scales: {
                    display: false
                  }
                }}
              />
      </div>
    );
  }

  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
        // Get the mock data provider
        const dataProvider: IChartDataProvider = new MockChartDataProvider();

        // Create an async request
        dataProvider
          .getMultiDataset(DATASET_LENGTH, DATA_LENGTH)
          .then((numbersArrays: Array<number[]>) => {

            const data: ChartData =  {
              labels: strings.ChartLabels,
              datasets: [{
                label: strings.DataSet1Label,
                backgroundColor: styles.menBackground,
                borderColor: styles.menBorder,
                pointBackgroundColor: styles.menBackground,
                pointBorderColor: styles.pointBorder,
                pointHoverBackgroundColor: styles.pointBorder,
                pointHoverBorderColor: styles.menBorder,
                data: numbersArrays[0]
              }, {
                label: strings.DataSet2Label,
                backgroundColor: styles.womenBackground,
                borderColor: styles.womenBorder,
                pointBackgroundColor: styles.womenBackground,
                pointBorderColor: styles.pointBorder,
                pointHoverBackgroundColor: styles.pointBorder,
                pointHoverBorderColor: styles.womenBorder,
                data: numbersArrays[1]
              }],
            };
            resolve(data);
          });
      });
    }
}
