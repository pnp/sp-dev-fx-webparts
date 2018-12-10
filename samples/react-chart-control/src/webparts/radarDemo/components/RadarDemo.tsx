import * as React from 'react';
import * as strings from 'RadarDemoWebPartStrings';
import styles from './RadarDemo.module.scss';
import { IRadarDemoProps, IRadarDemoState } from './IRadarDemo.types';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

const DATASET_LENGTH: number = 2;
const DATA_LENGTH: number = 7;
export default class RadarDemo extends React.Component<IRadarDemoProps, IRadarDemoState> {
  constructor(props: IRadarDemoProps) {
    super(props);

    this.state = {
      dataSets: []
    };
  }

  /**
   * Loads data asynchronously and stores it in the component's
   * state.
   */
  public componentDidMount(): void {
    const dataProvider: IChartDataProvider = new MockChartDataProvider();
    dataProvider.getMultiDataset(DATASET_LENGTH, DATA_LENGTH).then((dataSets: Array<number[]>) => {
      this.setState({
        dataSets: dataSets
      });
    });
  }

  public render(): React.ReactElement<IRadarDemoProps> {
    const {
      dataSets
    } = this.state;

    return (
      <div className={styles.radarDemo}>
        {
          dataSets!.length === 2 && // No - Render the chart
              <ChartControl
                data={
                  {
                    labels: strings.ChartLabels,
                    datasets: [{
                      label: strings.DataSet1Label,
                      backgroundColor: styles.menBackground,
                      borderColor: styles.menBorder,
                      pointBackgroundColor: styles.menBackground,
                      pointBorderColor: styles.pointBorder,
                      pointHoverBackgroundColor: styles.pointBorder,
                      pointHoverBorderColor: styles.menBorder,
                      data: dataSets[0]
                    }, {
                      label: strings.DataSet2Label,
                      backgroundColor: styles.womenBackground,
                      borderColor: styles.womenBorder,
                      pointBackgroundColor: styles.womenBackground,
                      pointBorderColor: styles.pointBorder,
                      pointHoverBackgroundColor: styles.pointBorder,
                      pointHoverBorderColor: styles.womenBorder,
                      data: dataSets[1]
                    }],
                  }}
                type={ChartType.Radar}
                options={{
                  scales: {
                    display: false
                  }
                }}
              />
        }
      </div>
    );
  }
}
