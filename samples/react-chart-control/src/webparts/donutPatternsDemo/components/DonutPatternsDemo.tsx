import * as React from 'react';
import styles from './DonutPatternsDemo.module.scss';
import { IDonutPatternsDemoProps, IDonutPatternsDemoState } from './IDonutPatternsDemo.types';
import * as strings from 'DonutPatternsDemoWebPartStrings';
import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
import MockChartDataProvider from '../../../services/ChartDataProvider/MockChartDataProvider';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

// Patternomal is used to render patterns
import * as pattern from 'patternomaly';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

/**
 * The colors we will use for this chart
 */
const colors: string[] = [
  styles.color1,
  styles.color2,
  styles.color3,
  styles.color4,
  styles.color5,
  styles.color6,
  styles.color7,
  styles.color8,
  styles.color9,
  styles.color10,
  styles.color11
];

/**
 * The patterns generated using the colors above
 */
const patterns: CanvasPattern[] = pattern.generate(colors);

/**
 * This sample demonstrates how you can use
 * patternomaly to render a chart that uses patterns instead
 * of (only) colours.
 * @see https://github.com/ashiguruma/patternomaly
 * @see https://github.com/ashiguruma/patternomaly/blob/master/examples/optional.html
 * @see https://www.chartjs.org/docs/latest/general/colors.html
 *
 * This sample also demonstrates how you can use the getChart and Update methods of the Chart
 * to get access to and modified the data without refreshing the entire web part
 */
export default class DonutPatternsDemo extends React.Component<IDonutPatternsDemoProps, IDonutPatternsDemoState> {
  private _chartElem: ChartControl = undefined;

  /**
   * Always start showing "loading" and with an empty dataset
   * @param props
   */
  constructor(props: IDonutPatternsDemoProps) {
    super(props);
    this.state = {
      dataSet: []
    };
  }

  /**
   * Loads data asynchronously and stores it in the component's
   * state.
   */
  public componentDidMount(): void {
    const dataProvider: IChartDataProvider = new MockChartDataProvider();
    dataProvider.getNumberArray(11).then((dataSet: number[]) => {
      this.setState({
        dataSet: dataSet
      });
    });
  }

  /**
   * Renders the "Loading" spinner if the state is currently loading,
   * or the chart once data is loladed
   */
  public render(): React.ReactElement<IDonutPatternsDemoProps> {
    const {
      dataSet
    } = this.state;



    return (
      <div className={styles.donutPatternsDemo}>
        {
          // Are we still loading?
          dataSet!.length > 0 &&
          <ChartControl
            ref={this._linkElement}
            data={
              {
                labels: strings.ChartLabels,
                datasets: [
                  {
                    label: strings.DataSetLabel,
                    data: dataSet,
                    backgroundColor: patterns
                  }
                ]
              }}
            options={{
              legend: {
                display: true,
                position: 'left',
              },
              title: {
                display: true,
                text: "Developer Activities"
              }
            }}
            type={ChartType.Doughnut} />
        }

        {/* Couldn't get the toggle to work properly */}
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

    // Get access to the chart's dataset
    this._chartElem.getChart().data.datasets[0].backgroundColor = fill;

    // Update the chart (without updating the entire web part)
    this._chartElem.update();
  }
}

