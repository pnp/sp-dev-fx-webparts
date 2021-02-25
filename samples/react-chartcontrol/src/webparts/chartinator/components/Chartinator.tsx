import * as React from 'react';
import styles from './Chartinator.module.scss';
import { IChartinatorProps } from './Chartinator.types';
import * as strings from 'ChartinatorWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import {
  ChartScales,
  PositionType,
  ChartOptions,
  InteractionMode,
  ChartData,
  ChartPoint,
  ChartDataSets } from 'chart.js';

import { IBubbleChartData, IScatterChartData, INumberChartData } from '../controls/PropertyFieldRepeatingData';
import { WebPartTitle } from '@pnp/spfx-controls-react';

import { DashStrokes } from '../controls/PropertyPaneDashSelector/components/DashSelector.types';

// List methods to retrieve data
import { IListService, ListService, IListItem, MockListService } from '../../../services/ListService';

export class Chartinator extends React.Component<IChartinatorProps, {}> {
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

  /**
   * Render the chart
   */
  public render(): React.ReactElement<IChartinatorProps> {
    const { chartType } = this.props;
    const { radialChart } = this.props;

    // Scales should not be defined for radial charts.
    const chartScales: ChartScales = radialChart ? undefined : {
      yAxes: [{
        gridLines: {
          display: this.props.yAxisShowGridlines
        },
        ticks: {
          beginAtZero: this.props.yAxisBeginAtZero,
        },
        scaleLabel: {
          display: this.props.yAxisLabelEnabled,
          labelString: this.props.yAxisLabelText,
        }
      }],
      xAxes: [{
        gridLines: {
          display: this.props.xAxisShowGridlines

        },
        scaleLabel: {
          display: this.props.xAxisLabelEnabled,
          labelString: this.props.xAxisLabelText,
        }
      }]
    };

    // This option only applies to bar and horizontal bards
    if (chartType === ChartType.Bar) {
      chartScales.xAxes[0].gridLines.offsetGridLines = this.props.offsetGridLines;
    } else if (chartType === ChartType.HorizontalBar) {
      chartScales.yAxes[0].gridLines.offsetGridLines = this.props.offsetGridLines;
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
    const legendPosition: PositionType = this.props.legendPosition === 'none' ? 'top' : this.props.legendPosition as PositionType;

    // set the options
    const options: ChartOptions = {
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
        mode: this.props.tooltipMode as InteractionMode,
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

    // Only apply rotation to pie, doughnuts and polar area
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
        {/* <ChartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateTitle={this.props.updateTitle}
          placeholder={strings.ChartTitlePlaceholder}
        /> */}
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateTitle}
          placeholder={strings.ChartTitlePlaceholder}
          className={styles.webparttitle}
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
  private _linkElement = (e: ChartControl) => {
    this._chartElem = e;
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData(): Promise<ChartData> {

    const { data } = this.props;

    // Check if we received data
    if (data !== undefined && data.length > 0 && data[0].name !== '') {
      // Yes, load the manual data
      return this._loadManualData();
    } else {
      return this._loadListData();
    }
  }

  /**
   * Loads data from a list or, if no data is provided,
   * from a mock list.
   */
  private _loadListData = (): Promise<ChartData> => {
    const { chartType } = this.props;
    return new Promise<ChartData>((resolve, _reject) => {
      let service: IListService;

      // If the data source is configured, get the data from the list
      if (this.props.dataSourceListId && this.props.dataLabelField && this.props.dataValueField) {
        service = new ListService(this.props.context);
      } else {
        // no data provided, and no data source. Load bogus data
        service = new MockListService(chartType, strings.SampleLabels);
      }

      return service.getListItems(this.props.dataSourceListId,
        this.props.dataLabelField,
        this.props.dataValueField,
        this.props.dataYValueField,
        this.props.dataRValueField,
      ).then((listItems: IListItem[]) => {

        let dataItems = [];
        if (chartType === ChartType.Bubble) {
          dataItems = listItems.map((listItem: IListItem) => {
            const dataItem: ChartPoint = {
              x: listItem.Value,
              y: listItem.YValue,
              r: listItem.RValue
            };
            return dataItem;
          });
        } else if (chartType === ChartType.Scatter) {
          dataItems = listItems.map((listItem: IListItem) => {
            const dataItem: ChartPoint = {
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

        const data: ChartData =
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

  private _loadManualData = (): Promise<ChartData> => {
    const { chartType } = this.props;
    return new Promise<ChartData>((resolve, _reject) => {
      const labels: string[] = this.props.data.map(dataRow => {
        return dataRow.name;
      });

      let dataItems: Array<number | null | undefined> | ChartPoint[];

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


      const data: ChartData =
      {
        labels: labels,
        datasets: [
          {
            label: this.props.dataSetName,
            data: dataItems
          }
        ]
      };

      this._addDataOptions(data);

      resolve(data);
    });
  }

  private _addDataOptions = (data: ChartData): void => {
    const { chartType } = this.props;
    const primaryDataSet: ChartDataSets = data.datasets[0];

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
