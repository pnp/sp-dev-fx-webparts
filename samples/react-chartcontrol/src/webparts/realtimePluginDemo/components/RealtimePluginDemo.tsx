import * as React from 'react';
import styles from './RealtimePluginDemo.module.scss';
import { IRealtimePluginDemoProps } from './IRealtimePluginDemo.types';
import * as Color from 'color';
import * as strings from 'RealtimePluginDemoWebPartStrings';

// used to add a chart control
import { ChartControl } from '@pnp/spfx-controls-react/lib/ChartControl';

// used to import the real-time plugin
import * as realTime from 'chartjs-plugin-streaming';
import { ChartData } from 'chart.js';

// used to render the toolbar above the chart
import {
  CommandBar
} from '@fluentui/react';

const chartColors = {
  red: styles.red,
  orange: styles.orange,
  yellow: styles.yellow,
  green: styles.green,
  blue: styles.blue,
  purple: styles.purple,
  grey: styles.grey
};


export class RealtimePluginDemo extends React.Component<IRealtimePluginDemoProps, {}> {
  /**
 * The chart element
 */
  private _chartElem: ChartControl = undefined;

  public render(): React.ReactElement<IRealtimePluginDemoProps> {
    const options: any = {
      title: {
        display: true,
        text: strings.ChartTitle
      },
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            duration: 20000,
            refresh: 1000,
            delay: 2000,
            onRefresh: (chart) => this._onRefresh(chart)
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      },
      tooltips: {
        mode: 'nearest',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: false
      }
    };
    return (
      <div className={styles.realtimePluginDemo}>
        {this._renderCommandBar()}
        <ChartControl
          type='line'
          plugins={[realTime]}
          ref={this._linkElement}
          data={{
            datasets: [{
              label: strings.Dataset1Label,
              backgroundColor: Color(chartColors.red).alpha(0.5).toString(),
              borderColor: chartColors.red,
              fill: false,
              lineTension: 0,
              borderDash: [8, 4],
              data: []
            }, {
              label: strings.Dataset2Label,
              backgroundColor: Color(chartColors.blue).alpha(0.5).toString(),
              borderColor: chartColors.blue,
              fill: false,
              cubicInterpolationMode: 'monotone',
              data: []
            }]
          }}
          options={options}
        />
      </div>
    );
  }

  private _randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }

  private _onRefresh(chart) {
    chart.config.data.datasets.forEach((dataset) => {
      dataset.data.push({
        x: Date.now(),
        y: this._randomScalingFactor()
      });
    });
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
            onClick: () => { this._handleRandomizeData(); },
            ['data-automation-id']: 'randomizeData'
          },
          {
            key: 'addDataset',
            name: strings.AddDatasetCommandLabel,
            iconProps: {
              iconName: 'Table'
            },
            onClick: () => { this._handleAddDataset(); },
            ['data-automation-id']: 'addDataset'
          },
          {
            key: 'removeDataset',
            name: strings.RemoveDatasetCommandLabel,
            icon: 'DeleteTable',
            onClick: () => { this._handleRemoveDataset(); },
            ['data-automation-id']: 'removeDataset'
          },
          {
            key: 'addData',
            name: strings.AddDataCommandLabel,
            iconProps: {
              iconName: 'InsertColumnsRight'
            },
            onClick: () => { this._handleAddData(); },
            ['data-automation-id']: 'addDataset'
          },
        ]}
      />
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
   * Called when user clicks on Randomize Data.
   * Reloads the entire dataset with newly retrieved randomized numbers
   */
  private _handleRandomizeData = () => {
    const data = this._chartElem.getChart().data;

    data.datasets.forEach((dataset) => {
      (dataset.data as any[]).forEach((dataObj: any) => {
        dataObj.y = this._randomScalingFactor();
      });
    });

    this._chartElem.update();
  }

  /**
     * Handles requests to add a new dataset.
     */
  private _handleAddDataset = () => {
    // get the chart's data
    const data: ChartData = this._chartElem.getChart().data;

    var colorNames = Object.keys(chartColors);
    var colorName = colorNames[data.datasets.length % colorNames.length];
    var newColor = chartColors[colorName];
    var newDataset = {
      label: `${strings.DatasetPrefix} ${data.datasets.length + 1}`,
      backgroundColor: Color(newColor).alpha(0.5).toString(),
      borderColor: newColor,
      fill: false,
      lineTension: 0,
      data: []
    };

    data.datasets.push(newDataset);

    // update that chart
    this._chartElem.update();
  }

  /**
   * Removes the oldset dataset
   */
  private _handleRemoveDataset = () => {
    const data: ChartData = this._chartElem.getChart().data;

    data.datasets.pop();

    // update that chart
    this._chartElem.update();
  }

  /**
   * Handles requests to add a new data point
   */
  private _handleAddData = () => {
    // get the chart
    const myChart = this._chartElem.getChart();

    this._onRefresh(myChart);

    // update that chart
    this._chartElem.update();
  }

}

