import * as React from 'react';
import styles from './AreaChartDemo.module.scss';
import { IAreaChartDemoProps, IAreaChartDemoState } from './IAreaChartDemo.types';
import * as strings from 'AreaChartDemoWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

// used to retrieve (fake) data from a (fake) service
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

// used to render the toolbar above the chart
import {
  CommandBar,
  IContextualMenuItem,
  DirectionalHint
} from "office-ui-fabric-react";

const DATA_LENGTH: number = 8;

export default class AreaChartDemo extends React.Component<IAreaChartDemoProps, IAreaChartDemoState> {
  /**
  * Handle to async requests
  */
  private _asyncRequest = undefined;

  /**
   * Always start showing "loading" and with an empty dataset
   * @param props
   */
  constructor(props: IAreaChartDemoProps) {
    super(props);
    this.state = {
      dataSet: [],
      fill: 'origin',
      smooth: false
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
   * Renders the command bar and the chart
   */
  public render(): React.ReactElement<IAreaChartDemoProps> {
    const {
      dataSet,
      fill,
      smooth
    } = this.state;

    return (
      <div className={styles.areaChartDemo}>
        {this._renderCommandBar()}
        {dataSet!.length > 0 &&
          <ChartControl
            type={ChartType.Line}
            data={
              {
                labels: strings.ChartLabels,
                datasets: [
                  {
                    data: dataSet,
                    backgroundColor: styles.backgroundColor, // 20% opacity red
                    borderColor: styles.borderColor, // opaque red
                    borderWidth: 1,
                    fill: fill
                  }
                ]
              }}
            options={{
              legend: {
                display: false
              },
              spanGaps: false,
              elements: {
                line: {
                  // changing the line tension changes whether lines are curved or straight
                  tension: smooth ? 0.4 : 0.000001
                }
              },
              plugins: {
                filler: {
                  propagate: false
                }
              },
              scales: {
                xAxes: [{
                  ticks: {
                    autoSkip: false,
                    maxRotation: 0
                  }
                }]
              }
            }}
          />}
      </div>
    );
  }

  /**
 * Renders the command bar control.
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
          {
            key: "fill",
            iconProps: {
              iconName: 'BucketColor'
            },
            subMenuProps: {
              directionalHint: DirectionalHint.bottomCenter,
              items: [
                {
                  key: 'fillNegative',
                  name: 'false',
                  canCheck: true,
                  isChecked: this.state.fill === false,
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: "fillOrigin",
                  name: 'origin',
                  canCheck: true,
                  isChecked: this.state.fill === "origin",
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: "fillStart",
                  name: 'start',
                  canCheck: true,
                  isChecked: this.state.fill === "start",
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: "fillEnd",
                  name: 'end',
                  canCheck: true,
                  isChecked: this.state.fill === "end",
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                }
              ]
            },
            name: this.state.fill === false ? 'fill: false' : `fill: '${this.state.fill}'`,
            canCheck: false,
            split: true,
          },
          {
            key: "lineType",
            iconProps: {
              iconName: 'Line'
            },
            subMenuProps: {
              directionalHint: DirectionalHint.bottomCenter,
              items: [
                {
                  key: 'smoothOff',
                  name: strings.NotSmooth,
                  canCheck: true,
                  isChecked: this.state.smooth === false,
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleSmooth(ev, item); }
                },
                {
                  key: "smoothOn",
                  name: strings.Smooth,
                  canCheck: true,
                  isChecked: this.state.smooth === true,
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleSmooth(ev, item); }
                },
              ]
            },
            name: strings.LineTypeCommandLabel,
            canCheck: false,
            split: true,
          }
        ]}
      />
    );
  }

  /**
  * Loads data from a service.
  * This is where you would replace for your own code
  */
  private _loadAsyncData = () => {
    const dataProvider: IChartDataProvider = new MockChartDataProvider();
    this._asyncRequest = dataProvider.getSignedNumberArray(DATA_LENGTH).then((dataSet: number[]) => {
      // mark the request as done
      this._asyncRequest = undefined;

      this.setState({
        dataSet: dataSet,
      });
    });
  }

  /**
   * Called when user clicks on Randomize Data.
   * Reloads the entire dataset with newly retrieved randomized numbers
   */
  private _handleRandomizeData = () => {
    this._loadAsyncData();
  }

  /**
   * Changes the line type from straight to curved, and vice-versa
   */
  private _handleToggleSmooth = (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => {
    ev!.preventDefault();

    // Should it be curved -- or smooth
    const isSmooth: boolean = item.key === "smoothOn";
    this.setState({
      smooth: isSmooth
    }, () => {
      this.forceUpdate();
    });
  }

  /**
   * Changes the type of fill
   */
  private _handleToggleFill = (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => {
    ev!.preventDefault();

    let fillType: false | 'origin' | 'start' | 'end' = undefined;
    switch (item.key) {
      case 'fillOrigin':
        fillType = 'origin';
        break;
      case 'fillStart':
        fillType = 'start';
        break;
      case 'fillEnd':
        fillType = 'end';
        break;
      default:
        fillType = false;
    }

    this.setState({
      fill: fillType
    }, () => {
      this.forceUpdate();
    });
  }
}
