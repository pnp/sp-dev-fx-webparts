import * as React from 'react';
import styles from './Chartinator.module.scss';
import { IChartinatorProps } from './Chartinator.types';
import * as strings from 'ChartinatorWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType, ChartPalette, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { IBubbleChartData, IScatterChartData, INumberChartData } from '../controls/PropertyFieldRepeatingData';
import { ChartTitle } from '../controls/ChartTitle';
import { DashStrokes } from '../controls/PropertyPaneDashSelector/components/DashSelector.types';

// Patternomaly is used to render patterns
import * as pattern from 'patternomaly';
import { IListService, ListService, IListItem } from '../../../services/ListService';

const DATA_COUNT: number = 7;

const colors: string[] = PaletteGenerator.GetPalette(ChartPalette.OfficeColorful1, DATA_COUNT);

const patterns: CanvasPattern[] = [
  pattern.draw('plus', colors[0]),
  pattern.draw('cross', colors[1]),
  pattern.draw('dash', colors[2]),
  pattern.draw('cross-dash', colors[3]),
  pattern.draw('dot', colors[4]),
  pattern.draw('dot-dash', colors[5]),
  pattern.draw('disc', colors[6]),
  pattern.draw('ring', colors[7]),
  pattern.draw('line', colors[8]),
  pattern.draw('line-vertical', colors[9]),
  pattern.draw('weave', colors[10]),
  pattern.draw('zigzag', colors[11]),
  pattern.draw('zigzag-vertical', colors[12]),
  pattern.draw('diagonal', colors[13]),
  pattern.draw('diagonal-right-left', colors[14]),
  pattern.draw('square', colors[15]),
  pattern.draw('box', colors[16]),
  pattern.draw('triangle', colors[17]),
  pattern.draw('triangle-inverted', colors[18]),
  pattern.draw('diamond', colors[19]),
  pattern.draw('diamond-box', colors[20])
];

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
          palette={this.props.chartPalette}
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

    // Check if we received data
    if (data !== undefined && data.length > 0 && data[0].name !== '') {
      // Yes, load the manual data
      return this._loadManualData();
    } else {
      // If the data source is configured, get the data from the list
      if (this.props.dataSourceListId && this.props.dataLabelField && this.props.dataValueField) {
        return this._loadListData();
      }

      //No data from a list, no manual data. Load sample data
      return this._loadSampleData();
    }
  }

  private _loadListData = (): Promise<Chart.ChartData> => {
    const { chartType } = this.props;
    return new Promise<Chart.ChartData>((resolve, reject) => {

      const service: IListService = new ListService(this.props.context);
      return service.getListItems(this.props.dataSourceListId,
        this.props.dataLabelField,
        this.props.dataValueField,
        this.props.dataYValueField,
        this.props.dataRValueField,
      ).then((listItems: IListItem[]) => {

        let dataItems = [];
        if (chartType === ChartType.Bubble) {
          dataItems = listItems.map((listItem: IListItem) => {
            const dataItem: Chart.ChartPoint = {
              x: listItem.Value,
              y: listItem.YValue,
              r: listItem.RValue
            };
            return dataItem;
          });
        } else if (chartType === ChartType.Scatter) {
          dataItems = listItems.map((listItem: IListItem) => {
            const dataItem: Chart.ChartPoint = {
              x: listItem.Value,
              y: listItem.YValue
            };
            return dataItem;
          });
        } else {
          dataItems = listItems.map((listItem: IListItem) => {
            return listItem.Value;
          });
        }

        const data: Chart.ChartData =
        {
          labels: listItems.map((listItem: IListItem) => {
            return listItem.Label;
          }),
          datasets: [
            {
              label: this.props.dataSetName,
              data: dataItems
            }
          ]
        };

        // Line fill
        this._addDataOptions(data);
        resolve(data);

      });
    });
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

        this._addDataOptions(data);

        resolve(data);
      });
    });
  }

  private _getSampleBubbleData(): Promise<Chart.ChartData> {
    return new Promise<Chart.ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getMultiBubbleArrays(1, DATA_COUNT).then((dataSet: Array<Chart.ChartPoint[]>) => {
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
    const primaryDataSet: Chart.ChartDataSets = data.datasets[0];

    if (primaryDataSet === undefined) {
      return;
    }

    if (chartType === ChartType.Line) {
      primaryDataSet.showLine = this.props.lineShowLine === true;
      primaryDataSet.steppedLine = this.props.lineStepped;
      primaryDataSet.borderWidth = this.props.borderWidth;

      if (this.props.borderColor !== undefined) {
        primaryDataSet.borderColor = this.props.borderColor;
      }

      if (this.props.borderDash !== undefined) {
        primaryDataSet.borderDash = DashStrokes[this.props.borderDash];
      }

      if (this.props.borderJoinStyle !== undefined) {
        primaryDataSet.borderJoinStyle = this.props.borderJoinStyle;
      }

      if (this.props.borderCapStyle !== undefined) {
        primaryDataSet.borderCapStyle = this.props.borderCapStyle;
      }

      if (!this.props.lineCurved) {
        primaryDataSet.lineTension = 0;
      }

      // Line fill
      if (this.props.lineFill && chartType === ChartType.Line) {
        primaryDataSet.fill = this.props.lineFill;
      }
    }

    if (chartType === ChartType.Line || chartType === ChartType.Scatter) {
      primaryDataSet.pointRadius = this.props.pointRadius;
    }

    if (chartType === ChartType.Line || chartType === ChartType.Scatter || chartType === ChartType.Bubble) {
      primaryDataSet.pointStyle = this.props.pointStyle;

      // chart.js seems to not declare a point rotation, but it is a valid property
      primaryDataSet["pointRotation"] = this.props.pointRotation;
    }
  }
}
