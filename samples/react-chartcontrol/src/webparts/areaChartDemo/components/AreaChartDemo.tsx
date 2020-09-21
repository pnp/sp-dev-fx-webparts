import * as React from 'react';
import styles from './AreaChartDemo.module.scss';
import { IAreaChartDemoProps, IAreaChartDemoState } from './IAreaChartDemo.types';
import * as strings from 'AreaChartDemoWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

// used to retrieve (fake) data from a (fake) service
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';

// used to render the toolbar above the chart
import {
  CommandBar,
  IContextualMenuItem,
  DirectionalHint
} from 'office-ui-fabric-react';

/**
In chart.js, there are really no "area" chart types; They're just line charts with a 'fill'
value.
This demo shows the following:
- Render a line chart with random data
- Store data in the state and randomize it
- Generate a gradient for a background color
- Change the fill value
 */
export default class AreaChartDemo extends React.Component<IAreaChartDemoProps, IAreaChartDemoState> {
  /**
* The chart element
*/
  private _chartElem: ChartControl = undefined;


  /**
   * Always start showing 'loading' and with an empty dataset
   * @param props
   */
  constructor(props: IAreaChartDemoProps) {
    super(props);
    this.state = {
      dataSet: [
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
      ],
      fill: 'origin',
      curved: false
    };
  }

  /**
   * Renders the command bar and the chart
   */
  public render(): React.ReactElement<IAreaChartDemoProps> {
    const {
      dataSet,
      fill,
      curved
    } = this.state;


    const data: Chart.ChartData = {
      labels:
        [
          'January', 'February', 'March', 'April', 'May', 'June', 'July'
        ],
      datasets: [
        {
          label: 'My First Dataset',
          fill: fill,
          lineTension: curved ? 0.4 : 0.000001,
          backgroundColor: styles.backgroundColor, // 20% opacity red
          borderColor: styles.borderColor, // opaque red
          borderWidth: 1,
          data: dataSet
        }
      ]
    };

    // set the options
    const options: Chart.ChartOptions = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'My First Area Chart'
      }
    };

    return (
      <div className={styles.areaChartDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.Line}
          ref={this._linkElement}
          data={data}
          options={options}
        />
      </div>
    );
  }

  public componentDidMount(): void {
    this._applyGradientFill();

  }

  public componentDidUpdate(prevProps: IAreaChartDemoProps, prevState: IAreaChartDemoState): void {
    this._applyGradientFill();
  }

  /**
 * Renders the command bar control.
 */
  private _renderCommandBar(): JSX.Element {
    return (
      <CommandBar
        items={[
          {
            key: 'randomizeData',
            name: strings.RandomizeCommandLabel,
            iconProps: {
              iconName: 'Refresh'
            },
            ariaLabel: strings.RandomizeCommandLabel,
            onClick: () => { this._handleRandomizeData(); },
            ['data-automation-id']: 'randomizeData'
          },
          {
            key: 'fill',
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
                  key: 'fillOrigin',
                  name: 'origin',
                  canCheck: true,
                  isChecked: this.state.fill === 'origin',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: 'fillStart',
                  name: 'start',
                  canCheck: true,
                  isChecked: this.state.fill === 'start',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: 'fillEnd',
                  name: 'end',
                  canCheck: true,
                  isChecked: this.state.fill === 'end',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                }
              ]
            },
            name: this.state.fill === false ? 'fill: false' : `fill: '${this.state.fill}'`,
            canCheck: false,
            split: true,
          },
          {
            key: 'alignment',
            iconProps: {
              iconName: 'Line'
            },
            subMenuProps: {
              directionalHint: DirectionalHint.bottomLeftEdge,
              items: [
                {
                  key: 'smoothOff',
                  name: strings.NotSmooth,
                  canCheck: true,
                  isChecked: this.state.curved === false,
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleSmooth(ev, item); }
                },
                {
                  key: 'smoothOn',
                  name: strings.Smooth,
                  canCheck: true,
                  isChecked: this.state.curved === true,
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
   * Called when user clicks on Randomize Data.
   * Reloads the entire dataset with newly retrieved randomized numbers
   */
  private _handleRandomizeData = () => {
    this.setState({
      dataSet: [
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
        MockChartDataProvider.getRandomSignedNumber(),
      ],
    });
  }

  /**
   * Changes the line type from straight to curved, and vice-versa
   */
  private _handleToggleSmooth = (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => {
    ev!.preventDefault();

    // Should it be curved -- or smooth
    const isSmooth: boolean = item.key === 'smoothOn';
    this.setState({
      curved: isSmooth
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

  /**
 * Links a reference to the chart so that we can
 * refer to it later and change its data
 */
  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  private _applyGradientFill() {
    const canvas: HTMLCanvasElement = this._chartElem.getCanvas();
    const ctx = canvas.getContext('2d');
    let gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradientFill.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
    gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');

    let data: Chart.ChartDataSets = this._chartElem.getChart().data.datasets[0];
    data.backgroundColor = gradientFill;
    this._chartElem.update();
  }
}
