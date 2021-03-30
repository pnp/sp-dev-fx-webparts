import * as React from 'react';
import styles from './AccessibleTable.module.scss';
import { IAccessibleTableProps } from './IAccessibleTable.types';
import * as strings from 'AccessibleTableWebPartStrings';
import { escape } from '@microsoft/sp-lodash-subset';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

import { ChartControl, ChartType, OFFICE_COLORFUL1, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';

import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';

export  class AccessibleTable extends React.Component<IAccessibleTableProps, {}> {
  public render(): React.ReactElement<IAccessibleTableProps> {

    return (
      <div className={styles.accessibleTable}>
        <MessageBar>
          {strings.TableWarning}
        </MessageBar>

        <ChartControl
          type={ChartType.Bar}
          data={{labels: strings.DataLabels,
            datasets: [
              {
                backgroundColor: PaletteGenerator.alpha(OFFICE_COLORFUL1, 0.2),
                borderColor: OFFICE_COLORFUL1,
                label: escape(this.props.datasetlabel),
                data: [
                  MockChartDataProvider.getRandomNumber(),
                  MockChartDataProvider.getRandomNumber(),
                  MockChartDataProvider.getRandomNumber(),
                  MockChartDataProvider.getRandomNumber(),
                  MockChartDataProvider.getRandomNumber(),
                  MockChartDataProvider.getRandomNumber(),
                ],
                borderWidth: 1
              }
            ]}}
          loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} ariaLive="assertive" />}
          options={{
            title: {
              display: true,
              text: escape(this.props.title),
            }
          }}
          accessibility={
            {
              className: styles.shomMeTheTable,
              summary: this.props.summary,
              caption: this.props.caption !== '' ? this.props.caption : this.props.title
            }
          }
        />
      </div>
    );
  }
}
