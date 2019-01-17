import * as React from 'react';
import styles from './Chartinator.module.scss';
import { IChartinatorProps } from './Chartinator.types';
import * as strings from 'ChartinatorWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import IChartDataProvider, { IBubblePoint } from '../../../services/ChartDataProvider/IChartDataProvider';
import { IBubbleChartData, IScatterChartData, INumberChartData } from '../controls/PropertyFieldRepeatingData';
import { ChartTitle } from '../controls/ChartTitle';

const DATA_COUNT: number = 7;

export default class Chartinator extends React.Component<IChartinatorProps, {}> {
  /**
* The chart element
*/
  private _chartElem: ChartControl = undefined;

  public componentWillReceiveProps(nextProps: IChartinatorProps): void {
    // Remove data before changing chart type
    // -- prevents running into issues with different kinds of data required for each kind of chart
    if (this._chartElem) {
      const chart = this._chartElem.getChart();
      if (chart) {
        chart.data!.datasets = [];
      }
    }
  }

  public render(): React.ReactElement<IChartinatorProps> {
    const { chartType } = this.props;
    const { radialChart } = this.props;
    const chartScales: Chart.ChartScales = radialChart ? undefined : {
      yAxes: [{
        ticks: {
          beginAtZero: this.props.yAxisBeginAtZero,
        },
        scaleLabel: {
          display: this.props.yAxisLabelEnabled,
          labelString: this.props.yAxisLabelText,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: this.props.xAxisLabelEnabled,
          labelString: this.props.xAxisLabelText,
        }
      }]
    };

    if (chartType === ChartType.Bar) {
      chartScales.xAxes[0].gridLines = {
        offsetGridLines: this.props.offsetGridLines
      };
    } else if (chartType === ChartType.HorizontalBar) {
      chartScales.yAxes[0].gridLines = {
        offsetGridLines: this.props.offsetGridLines
      };
    }
    // some of these settings should only be defined if there are values

    // set the minimum Y axis -- if available
    if (chartScales && this.props.yAxisMin && !this.props.yAxisBeginAtZero) {
      chartScales.yAxes[0].ticks.min = this.props.yAxisMin;
    }

    // set the maximum Y axis -- if available
    if (chartScales && this.props.yAxisMax) {
      chartScales.yAxes[0].ticks.max = this.props.yAxisMax;
    }

    // set the maximum number of lines
    if (chartScales && this.props.yAxisMaxTicksLimit) {
      chartScales.yAxes[0].ticks.maxTicksLimit = this.props.yAxisMaxTicksLimit;
    }

    // set the step size
    if (chartScales && this.props.yAxisStepSize) {
      chartScales.yAxes[0].ticks.stepSize = this.props.yAxisStepSize;
    }

    // set the legend position
    const legendPosition: Chart.PositionType = this.props.legendPosition === 'none' ? 'top' : this.props.legendPosition as Chart.PositionType;

    // set the options
    const options: Chart.ChartOptions = {
      title: {
        display: false
      },
      animation: {
        duration: this.props.animationDuration,
        easing: this.props.animationEasing
      },
      layout: {
        padding: {
          left: this.props.leftPadding,
          right: this.props.rightPadding,
          top: this.props.topPadding,
          bottom: this.props.bottomPadding
        }
      },
      legend: {
        position: legendPosition,
        display: this.props.legendPosition !== 'none',
        reverse: this.props.legendReversed
      },
      tooltips: {
        enabled: this.props.tooltipEnabled,
        intersect: this.props.tooltipIntersect,
        mode: this.props.tooltipMode as Chart.InteractionMode,
        position: this.props.tooltipPosition
      },
      scales: chartScales
    };

    if (chartType == ChartType.Doughnut) {
      options.cutoutPercentage = this.props.cutoutPercentage;
    }

    if (chartType === ChartType.Doughnut || chartType === ChartType.Pie) {
      options.circumference = (this.props.circumference / 100) * 2 * Math.PI;
    }

    if (chartType === ChartType.Doughnut || chartType === ChartType.Pie || chartType === ChartType.PolarArea) {
      options.rotation = (this.props.chartRotation / 360) * Math.PI;

      // Add chart animation
      if (options.animation === undefined) {
        options.animation = {};
      }
      options.animation.animateRotate = this.props.animateRotate;
      options.animation.animateScale = this.props.animateScale;
    }

    return (
      <div className={styles.chartinator}>
        <ChartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateTitle={this.props.updateTitle}
          placeholder={strings.ChartTitlePlaceholder}
        />
        <ChartControl
          type={chartType}
          ref={this._linkElement}
          palette={ChartPalette[this.props.chartPalette]}
          datapromise={this._loadAsyncData()}
          options={options}
        />
      </div>
    );
  }

  /**
 * Links a reference to the chart so that we can
 * refer to it later and change its data
 */
  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData(): Promise<Chart.ChartData> {

    const { data } = this.props;

    if (data !== undefined && data.length > 0 && data[0].name !== '') {
      return this._loadManualData();
    } else {
      return this._loadSampleData();
    }
  }

  private _loadSampleData = (): Promise<Chart.ChartData> => {
    const { chartType } = this.props;
    if (chartType === ChartType.Bubble) {
      return this._getSampleBubbleData();
    }

    if (chartType === ChartType.Scatter) {
      return this._getSampleScatterData();
    }

    return this._getSampleArrayData();
  }

  private _loadManualData = (): Promise<Chart.ChartData> => {
    const { chartType } = this.props;
    return new Promise<Chart.ChartData>((resolve, reject) => {
      const labels: string[] = this.props.data.map(dataRow => {
        return dataRow.name;
      });

      let dataItems: Array<number | null | undefined> | Chart.ChartPoint[];

      if (chartType === ChartType.Bubble) {
        dataItems = this.props.data.map((dataRow: IBubbleChartData) => {
          return {
            x: dataRow.x,
            y: dataRow.y,
            r: dataRow.r
          };
        });
      } else if (chartType === ChartType.Scatter) {
        dataItems = this.props.data.map((dataRow: IScatterChartData) => {
          return {
            x: dataRow.x,
            y: dataRow.y,
          };
        });
      } else {
        dataItems = this.props.data.map((dataRow: INumberChartData) => {
          return dataRow.value;
        });
      }


      const data: Chart.ChartData =
      {
        labels: labels,
        datasets: [
          {
            label: this.props.dataSetName,
            data: dataItems
          }
        ]
      };

      // // Line fill
      // if (this.props.lineFill && this.props.chartType === 'line') {
      //   data.datasets[0].fill = this.props.lineFill;
      // }
      this._addDataOptions(data);

      resolve(data);
    });
  }

  private _getSampleArrayData = (): Promise<Chart.ChartData> => {
    return new Promise<Chart.ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getNumberArray(DATA_COUNT, 500).then((dataSet: number[]) => {
        const data: Chart.ChartData =
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              data: dataSet,
            }
          ]
        };

        // // Line fill
        // if (this.props.lineFill && this.props.chartType === 'line') {
        //   data.datasets[0].fill = this.props.lineFill;
        // }
        this._addDataOptions(data);

        resolve(data);
      });
    });
  }

  private _getSampleBubbleData(): Promise<Chart.ChartData> {
    return new Promise<Chart.ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getMultiBubbleArrays(1, DATA_COUNT).then((dataSet: Array<IBubblePoint[]>) => {
        const data: Chart.ChartData =
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              data: dataSet[0],
            }
          ]
        };

        this._addDataOptions(data);

        resolve(data);
      });
    });
  }

  private _getSampleScatterData(): Promise<Chart.ChartData> {
    return new Promise<Chart.ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getScatterArray(DATA_COUNT).then((dataSet: {}[]) => {
        const data: Chart.ChartData =
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              data: dataSet,
            }
          ]
        };

        this._addDataOptions(data);

        resolve(data);
      });
    });
  }

  private _addDataOptions = (data: Chart.ChartData): void => {
    const { chartType } = this.props;


    if (chartType === ChartType.Line) {
      data.datasets[0].showLine = this.props.lineShowLine === true;
      data.datasets[0].steppedLine = this.props.lineStepped;

      if (!this.props.lineCurved) {
        data.datasets[0].lineTension = 0;
      }

      // Line fill
      if (this.props.lineFill && chartType === ChartType.Line) {
        data.datasets[0].fill = this.props.lineFill;
      }
    }

    if (chartType === ChartType.Line || chartType === ChartType.Scatter) {
      data.datasets[0].pointRadius = this.props.pointRadius;
    }

    if (chartType === ChartType.Line || chartType === ChartType.Scatter || chartType === ChartType.Bubble) {
      data.datasets[0].pointStyle = this.props.pointStyle;

      // chart.js seems to not declare a point rotation, but it is a valid property
      data.datasets[0]["pointRotation"] = this.props.pointRotation;
    }
  }
}
