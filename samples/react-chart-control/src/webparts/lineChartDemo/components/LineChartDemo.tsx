import * as React from 'react';
import styles from './LineChartDemo.module.scss';
import { ILineChartDemoProps, ILineChartDemoState } from './ILineChartDemo.types';
import * as strings from 'LineChartDemoWebPartStrings';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

/**
 * Demonstrates how to render line charts, using multiple datasets
 * Also demonstrates customizing axis labels and
 * custom tooltip providers.
 */
export default class LineChartDemo extends React.Component<ILineChartDemoProps, ILineChartDemoState> {
  constructor(props: ILineChartDemoProps) {
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
    dataProvider.getMultiDataset(2, 7).then((dataSets: Array<number[]>) => {
      this.setState({
        dataSets: dataSets
      });
    });
  }

  public render(): React.ReactElement<ILineChartDemoProps> {
    const {
      dataSets
    } = this.state;

    return (
      <div className={styles.lineChartDemo}>
        {
          dataSets!.length > 0 &&
          <ChartControl data={{
            labels: strings.ChartLabels,
            datasets: [{
              label: strings.DataSet1Label,
              fill: true,
              lineTension: 0.1,
              backgroundColor: styles.backgroundColor1,
              borderColor: styles.borderColor1,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: styles.pointBorderColor1,
              pointBackgroundColor: styles.pointBackgroundColor1,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: styles.pointHoverBackgroundColor1,
              pointHoverBorderColor: styles.pointHoverBorderColor1,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: dataSets[0],
            },
            {
              label: strings.DataSet2Label,
              fill: true,
              lineTension: 0.1,
              backgroundColor: styles.backgroundColor2,
              borderColor: styles.borderColor2,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: styles.pointBorderColor2,
              pointBackgroundColor: styles.pointBackgroundColor2,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: styles.pointHoverBackgroundColor2,
              pointHoverBorderColor: styles.pointHoverBorderColor2,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: dataSets[1],
            }
            ]
          }}
            type={ChartType.Line}
            options={{
              tooltips: {
                mode: 'index',
                callbacks: {
                  // Use the footer callback to display the sum of the items showing in the tooltip
                  footer: (tooltipItems, data) => {
                    var sum = 0;

                    tooltipItems.forEach((tooltipItem) => {
                      sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as number;
                    });
                    return strings.SumLabel + sum;
                  },
                },
                footerFontStyle: 'normal'
              },
              hover: {
                mode: 'index',
                intersect: true
              },
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: strings.XAxisLabel
                  }
                }],
                yAxes: [
                  {
                    stacked: true,
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: strings.YAxisLabel
                    }
                  }
                ]
              }
            }}
          />
        }
      </div>
    );
  }
}
