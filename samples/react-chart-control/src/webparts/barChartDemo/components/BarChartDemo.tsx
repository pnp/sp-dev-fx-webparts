import * as React from 'react';
import styles from './BarChartDemo.module.scss';
import * as strings from 'BarChartDemoWebPartStrings';
import { IBarChartDemoProps, IBarChartDemoState } from './IBarChartDemo.types';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

const DATA_LENGTH: number = 7;

export default class BarChartDemo extends React.Component<IBarChartDemoProps, IBarChartDemoState> {
  /**
   * Handle to async requests
   */
  private _asyncRequest = undefined;

  /**
   * Always start showing "loading" and with an empty dataset
   * @param props
   */
  constructor(props: IBarChartDemoProps) {
    super(props);
    this.state = {
      dataSet: [],
    };
  }

  /**
   * Loads data asynchronously and stores it in the component's
   * state.
   */
  public componentDidMount(): void {
    this._loadAsyncData();
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
   * Renders the "Loading" spinner if the state is currently loading,
   * or the chart once data is loladed
   */
  public render(): React.ReactElement<IBarChartDemoProps> {
    const {
      dataSet
    } = this.state;

    return (
      <div className={styles.barChartDemo}>
      { dataSet && dataSet.length > 0 &&
        <ChartControl
          data={
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
            }}
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
            }
          }}
          type={ChartType.Bar} />}
      </div>
    );
  }

  /**
  * Loads data from a service.
  * This is where you would replace for your own code
  */
  private _loadAsyncData = () => {
    const dataProvider: IChartDataProvider = new MockChartDataProvider();
    this._asyncRequest = dataProvider.getNumberArray(DATA_LENGTH).then((dataSet: number[]) => {
      // mark the request as done
      this._asyncRequest = undefined;

      this.setState({
        dataSet: dataSet,
      });
    });
  }
}
