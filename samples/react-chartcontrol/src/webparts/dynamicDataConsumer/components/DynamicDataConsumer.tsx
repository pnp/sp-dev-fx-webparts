import * as React from 'react';
import styles from './DynamicDataConsumer.module.scss';
import { IDynamicDataConsumerProps } from './IDynamicDataConsumerProps';

// localization
import * as strings from 'DynamicDataConsumerWebPartStrings';

// used to add a chart control
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartOptions } from 'chart.js';

// used to format date
import * as moment from 'moment';

/**
 * This component is designed to render a line chart that looks and behave like the
 * Office 365 Admin center dashboards.
 * Unlike most samples in this solution, most of the business logic/data retrieval isn't here, but
 * in the web part.
 */
export class DynamicDataConsumer extends React.Component<IDynamicDataConsumerProps, {}> {

  public render(): React.ReactElement<IDynamicDataConsumerProps> {
    const { alias, data } = this.props;
    const options: ChartOptions = {
      legend: {
        display: false // don't display a legend -- there's only one data point
      },
      title: {
        display: true,
        text: [alias, strings.ChartTitle] // when title is a string array, it spans over multiple lines
      },
      hover: {
        mode: 'nearest', // will automatically select the nearest point
        intersect: false
      },
      tooltips: {
        mode: 'label', // work with label
        intersect: false,
        callbacks: {
          // custom tooltip logic for title
          title: ((tooltipItems, _tooltipData) => {
            // format the date as 'AbbreviatedMonth Year' e.g.: Nov 2018
            return moment(tooltipItems[0].xLabel).format(strings.TooltipDateFormat);
          })
        }
      },
      scales: {
        xAxes: [{
          type: 'time', // Format as a time series
          gridLines: {
            display: false
          },
          time: {
            displayFormats: {
              // Pass the same format so that it is always consistent, regardless of the scale
              'millisecond': strings.MonthLabel,
              'second': strings.MonthLabel,
              'minute': strings.MonthLabel,
              'hour': strings.MonthLabel,
              'day': strings.MonthLabel,
              'week': strings.MonthLabel,
              'month': strings.MonthLabel,
              'quarter': strings.MonthLabel,
              'year': strings.MonthLabel,
            }
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return (
      <div className={styles.dynamicDataConsumer}>
        <ChartControl
          type={ChartType.Line}
          data={data}
          options={options}
        />
      </div>
    );
  }
}
