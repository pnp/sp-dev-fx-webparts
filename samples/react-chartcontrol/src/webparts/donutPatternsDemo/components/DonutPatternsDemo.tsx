import * as React from 'react';
import styles from './DonutPatternsDemo.module.scss';
import { IDonutPatternsDemoProps, IDonutPatternsDemoState } from './IDonutPatternsDemo.types';
import * as strings from 'DonutPatternsDemoWebPartStrings';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

// Patternomaly is used to render patterns
import * as pattern from 'patternomaly';

import { ChartControl, ChartType, PaletteGenerator, ChartPalette } from "@pnp/spfx-controls-react/lib/ChartControl";
import { ChartData } from 'chart.js';

// There are 21 different patterns
const NUM_PATTERNS: number = 21;

const colors: string[] = PaletteGenerator.GetPalette(ChartPalette.OfficeColorful1, NUM_PATTERNS);
/**
 * The patterns generated using the colors above.
 * You could also just generate the patterns randomly by writing:
 * const patterns: CanvasPattern[] = pattern.generate(colors);
 */
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

/**
 * This sample demonstrates how you can use
 * patternomaly to render a chart that uses patterns instead
 * of (only) colours.
 * @see https://github.com/ashiguruma/patternomaly
 * @see https://github.com/ashiguruma/patternomaly/blob/master/examples/optional.html
 * @see https://www.chartjs.org/docs/latest/general/colors.html
 *
 * This sample also demonstrates how you can use get the chart's data and
 * call the update methods to get access to and modified the data without
 * refreshing the entire web part
 */
export  class DonutPatternsDemo extends React.Component<IDonutPatternsDemoProps, IDonutPatternsDemoState> {
  private _chartElem: ChartControl = undefined;

  /**
   * Renders the "Loading" spinner if the state is currently loading,
   * or the chart once data is loladed
   */
  public render(): React.ReactElement<IDonutPatternsDemoProps> {
    return (
      <div className={styles.donutPatternsDemo}>
        {
          <ChartControl
            type={ChartType.Doughnut}
            ref={this._linkElement}
            datapromise={this._loadAsyncData()}
            options={{
              legend: {
                display: true,
                position: 'left',
              },
              title: {
                display: true,
                text: strings.DataSetLabel
              }
            }} />
        }

        <Checkbox
          label={strings.UsePatternsLabel}
          onChange={(ev: React.FormEvent<HTMLElement>, checked: boolean) => this._onCheckboxChange(ev, checked)}
          defaultChecked={true} />
      </div>
    );
  }

  //  tslint:disable-next-line no-any
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  /**
   * Toggles between displaying patterns and not
   * @param ev
   * @param checked
   */
  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    // Use a pattern if checked, colors if not
    var fill = (checked) ? patterns : colors;

    const { data } = this._chartElem.getChart();

    // Get access to the chart's dataset
    data.datasets[0].backgroundColor = fill;

    // Update the chart (without updating the entire web part)
    this._chartElem.update();
  }

  /**
* Loads data from a service.
* This is where you would replace for your own code
*/
  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, _reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IChartDataProvider = new MockChartDataProvider();
      dataProvider.getNumberArray(NUM_PATTERNS).then((dataSet: number[]) => {
        const data: ChartData =
        {
          labels: strings.ChartLabels,
          datasets: [
            {
              label: strings.DataSetLabel,
              data: dataSet,
              backgroundColor: patterns
            }
          ]
        };
        resolve(data);
      });
    });
  }
}


