import * as React from 'react';
import styles from './BarChartStatic.module.scss';
import { IBarChartStaticProps } from './IBarChartStaticProps';

import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

/**
 * Renders a static bar chart.
 * This demo is intended to demonstrate how to take a sample from Chart.js
 * and use it with the ChartControl.
 * You shouldn't hard-code the data or the text, but we're trying to keep
 * this sample as simple as possible.
 * @see https://www.chartjs.org/docs/latest/ for the original sample code.
 */
export  class BarChartStatic extends React.Component<IBarChartStaticProps, {}> {
  public render(): React.ReactElement<IBarChartStaticProps> {
    return (
      <div className={styles.barChartStatic}>
        <ChartControl
          data={
            {
              // Please localize strings in real life!
              labels: [
                'David',
                'Mikael',
                'Simon-Pierre',
                'Velin',
                'Vesa',
                'Waldek'
              ], // any resemblance to real people's names is purely coincidental
              datasets: [
                {
                  label: '# of Votes', // Please localize strings in real life!
                  data: [12, 19, 3, 5, 2, 3], // You should really get the data from somewhere... not hard coded
                  borderWidth: 1
                }
              ]
            }}
          type={ChartType.Bar} />
      </div>
    );
  }
}
