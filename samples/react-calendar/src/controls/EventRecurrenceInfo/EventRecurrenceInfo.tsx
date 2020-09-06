import * as React from 'react';
import styles from './EventRecurrenceInfo.module.scss';
import * as strings from 'CalendarWebPartStrings';
import { IEventRecurrenceInfoProps } from './IEventRecurrenceInfoProps';
import { IEventRecurrenceInfoState } from './IEventRecurrenceInfoState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';
import {
  ChoiceGroup,
  IChoiceGroupOption,

} from 'office-ui-fabric-react';

import { EventRecurrenceInfoDaily } from './../EventRecurrenceInfoDaily/EventRecurrenceInfoDaily';
import { EventRecurrenceInfoWeekly } from './../EventRecurrenceInfoWeekly/EventRecurrenceInfoWeekly';
import { EventRecurrenceInfoMonthly } from './../EventRecurrenceInfoMonthly/EventRecurrenceInfoMonthly';
import { EventRecurrenceInfoYearly } from './../EventRecurrenceInfoYearly/EventRecurrenceInfoYearly';
export class EventRecurrenceInfo extends React.Component<IEventRecurrenceInfoProps, IEventRecurrenceInfoState> {

  public constructor(props) {
    super(props);

    this._onRecurrenceFrequenceChange = this._onRecurrenceFrequenceChange.bind(this);

    this.state = {
      selectedKey: 'daily',
      selectPatern: 'every',
      startDate: moment().toDate(),
      endDate: moment().endOf('month').toDate(),
      numberOcurrences: '1',
      numberOfDays: '1',
      disableNumberOfDays: false,
      disableNumberOcurrences: true,
      selectdateRangeOption: 'noDate',
      disableEndDate: true,
      selectedRecurrenceRule: 'daily',

    };
  }



  private _onRecurrenceFrequenceChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void {
    this.setState({
      selectedRecurrenceRule: option.key
    });
  }


  /**
   *
   *
   * @memberof EventRecurrenceInfo
   */
  public async componentDidMount() {
    if (this.props.recurrenceData) {
      if (this.props.recurrenceData.indexOf('<daily') != -1) {
        this.setState({ selectedRecurrenceRule: 'daily' });
      }
      if (this.props.recurrenceData.indexOf('<weekly') != -1) {
        this.setState({ selectedRecurrenceRule: 'weekly' });
      }
      if (this.props.recurrenceData.indexOf('<monthly') != -1) {
        this.setState({ selectedRecurrenceRule: 'monthly' });
      }
      if (this.props.recurrenceData.indexOf('<monthlyByDay') != -1) {
        this.setState({ selectedRecurrenceRule: 'monthly' });
      }
      if (this.props.recurrenceData.indexOf('<yearly') != -1) {
        this.setState({ selectedRecurrenceRule: 'yearly' });
      }
    }
  }

  /**
   *
   *
   * @returns {React.ReactElement<IEventRecurrenceInfoProps>}
   * @memberof EventRecurrenceInfo
   */
  public render(): React.ReactElement<IEventRecurrenceInfoProps> {
    return (
      <div className={styles.divWrraper} >

        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <ChoiceGroup
            label={ strings.recurrenceInformationLabel }
            selectedKey={this.state.selectedRecurrenceRule}
            options={[
              {
                key: 'daily',
                iconProps: { iconName: 'CalendarDay' },
                text: strings.dailyLabel
              },
              {
                key: 'weekly',
                iconProps: { iconName: 'CalendarWeek' },
                text: strings.weeklyLabel
              },
              {
                key: 'monthly',
                iconProps: { iconName: 'Calendar' },
                text: strings.monthlyLabel,

              },
              {
                key: 'yearly',
                iconProps: { iconName: 'Calendar' },
                text: strings.yearlyLabel,
              }
            ]}
            onChange={this._onRecurrenceFrequenceChange}
          />
        </div>
        {
          this.state.selectedRecurrenceRule === 'daily' && (
            <EventRecurrenceInfoDaily
              display={true}
              recurrenceData={this.props.recurrenceData}
              startDate={this.props.startDate}
              context={this.props.context}
              siteUrl={this.props.siteUrl}
              returnRecurrenceData={this.props.returnRecurrenceData}
            />
          )
        }
        {
          this.state.selectedRecurrenceRule === 'weekly' && (
            <EventRecurrenceInfoWeekly
              display={true}
              recurrenceData={this.props.recurrenceData}
              startDate={this.props.startDate}
              context={this.props.context}
              siteUrl={this.props.siteUrl}
              returnRecurrenceData={this.props.returnRecurrenceData}
            />
          )
        }
        {
          this.state.selectedRecurrenceRule === 'monthly' && (
            <EventRecurrenceInfoMonthly
              display={true}
              recurrenceData={this.props.recurrenceData}
              startDate={this.props.startDate}
              context={this.props.context}
              siteUrl={this.props.siteUrl}
              returnRecurrenceData={this.props.returnRecurrenceData}
            />
          )
        }
         {
          this.state.selectedRecurrenceRule === 'yearly' && (
            <EventRecurrenceInfoYearly
              display={true}
              recurrenceData={this.props.recurrenceData}
              startDate={this.props.startDate}
              context={this.props.context}
              siteUrl={this.props.siteUrl}
              returnRecurrenceData={this.props.returnRecurrenceData}
            />
          )
        }
      </div>
    );
  }
}
