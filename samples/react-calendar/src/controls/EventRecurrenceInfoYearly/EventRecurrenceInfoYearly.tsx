import * as React from 'react';
import styles from './EventRecurrenceInfoYearly.module.scss';
import * as strings from 'CalendarWebPartStrings';
import { IEventRecurrenceInfoYearlyProps } from './IEventRecurrenceInfoYearlyProps';
import { IEventRecurrenceInfoYearlyState } from './IEventRecurrenceInfoYearlyState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';
import { parseString, Builder } from "xml2js";
import {
  ChoiceGroup,
  IChoiceGroupOption,
  Dropdown,
  IDropdownOption,
  Label,
  MaskedTextField
} from 'office-ui-fabric-react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { toLocaleShortDateString }  from '../../utils/dateUtils';
import spservices from '../../services/spservices';

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};

/**
 *
 *
 * @export
 * @class EventRecurrenceInfoDaily
 * @extends {React.Component<IEventRecurrenceInfoYearlyProps, IEventRecurrenceInfoYearlyState>}
 */
export class EventRecurrenceInfoYearly extends React.Component<IEventRecurrenceInfoYearlyProps, IEventRecurrenceInfoYearlyState> {
  private spService: spservices = null;
  public constructor(props) {
    super(props);


    this.onPaternChange = this.onPaternChange.bind(this);
    this.state = {
      selectedKey: 'daily',
      selectPatern: 'yearly',
      startDate: this.props.startDate ? this.props.startDate : moment().toDate(),
      endDate: moment().endOf('month').toDate(),
      numberOcurrences: '1',
      disableDayOfMonth: false,
      disableNumberOcurrences: true,
      selectdateRangeOption: 'noDate',
      disableEndDate: true,
      selectedRecurrenceRule: 'yearly',
      dayOfMonth: this.props.startDate ? moment(this.props.startDate).format('D') : moment().format('D'),
      isLoading: false,
      errorMessageDayOfMonth: '',
      selectedWeekOrderMonth: 'first',
      selectedWeekDay: 'day',
      selectedMonth: moment().format('M'),
      selectedYearlyByDayMonth: moment().format('M'),

    };

    //
    this.onDayOfMonthChange = this.onDayOfMonthChange.bind(this);
    this.onNumberOfOcurrencesChange = this.onNumberOfOcurrencesChange.bind(this);
    this.onDataRangeOptionChange = this.onDataRangeOptionChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onApplyRecurrence = this.onApplyRecurrence.bind(this);
    this.onYearlyByDayMonthChange = this.onYearlyByDayMonthChange.bind(this);
    this.onSelectedWeekDayChange = this.onSelectedWeekDayChange.bind(this);
    this.onWeekOrderMonthChange = this.onWeekOrderMonthChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.spService = new spservices(this.props.context);
  }

  /**
   *
   *
   * @private
   * @param {Date} date
   * @memberof EventRecurrenceInfoDaily
   */
  private onStartDateChange(date: Date) {
    this.setState({ startDate: date });
    this.applyRecurrence();
  }

  /**
   *
   *
   * @private
   * @param {Date} date
   * @memberof EventRecurrenceInfoDaily
   */
  private onEndDateChange(date: Date) {
    this.setState({ endDate: date });
    this.applyRecurrence();
  }

  /**
   *
   *
   * @private
   * @param {React.SyntheticEvent<HTMLElement>} ev
   * @param {string} value
   * @memberof EventRecurrenceInfoDaily
   */
  private onDayOfMonthChange(ev: React.SyntheticEvent<HTMLElement>, value: string) {
    ev.preventDefault();

    setTimeout(() => {
      let errorMessage = '';
      if (Number(value.trim()) < 1 || Number(value.trim()) > 31) {
        value = '1 ';
        errorMessage = 'Allowed values 1 to 31';

      }
      this.setState({ dayOfMonth: value, errorMessageDayOfMonth: errorMessage });
      this.applyRecurrence();
    }, 3000);

  }


  private onMonthChange(ev: React.SyntheticEvent<HTMLElement>, item: IDropdownOption) {
    this.setState({ selectedMonth: item.key });
    this.applyRecurrence();
  }

  /**
   *
   *
   * @private
   * @param {React.SyntheticEvent<HTMLElement>} ev
   * @param {string} value
   * @memberof EventRecurrenceInfoDaily
   */
  private onNumberOfOcurrencesChange(ev: React.SyntheticEvent<HTMLElement>, value: string) {
    ev.preventDefault();
    this.setState({ numberOcurrences: value });
    this.applyRecurrence();
  }

  /**
   *
   *
   * @private
   * @param {React.SyntheticEvent<HTMLElement>} ev
   * @param {IChoiceGroupOption} option
   * @memberof EventRecurrenceInfoDaily
   */
  private onDataRangeOptionChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void {
    ev.preventDefault();

    this.setState({
      selectdateRangeOption: option.key,
      disableNumberOcurrences: option.key == 'endAfter' ? false : true,
      disableEndDate: option.key == 'endDate' ? false : true,
    });
    this.applyRecurrence();
  }


  /**
   *
   *
   * @private
   * @param {React.SyntheticEvent<HTMLElement>} ev
   * @param {IChoiceGroupOption} option
   * @memberof EventRecurrenceInfoYearly
   */
  private onPaternChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void {
    ev.preventDefault();
    this.setState({
      selectPatern: option.key,
      disableDayOfMonth: option.key == 'yearly' ? false : true,
    });
    this.applyRecurrence();
  }

  public async componentDidMount() {


  }
  public async componentWillMount() {
    await this.load();
  }

  /**
   *
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} ev
   * @param {IDropdownOption} item
   * @memberof EventRecurrenceInfoYearly
   */
  private onWeekOrderMonthChange(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    this.setState({ selectedWeekOrderMonth: item.key.toString() });
    this.applyRecurrence();
  }

  /**
   *
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} ev
   * @param {IDropdownOption} item
   * @memberof EventRecurrenceInfoYearly
   */
  private onYearlyByDayMonthChange(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    this.setState({ selectedYearlyByDayMonth: item.key });
    this.applyRecurrence();
  }
  /**
   *
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} ev
   * @param {IDropdownOption} item
   * @memberof EventRecurrenceInfoYearly
   */
  private onSelectedWeekDayChange(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    this.setState({ selectedWeekDay: item.key.toString() });
    this.applyRecurrence();
  }

  public async  componentDidUpdate(prevProps: IEventRecurrenceInfoYearlyProps, prevState: IEventRecurrenceInfoYearlyState) {

  }

  /**
   *
   *
   * @private
   * @memberof EventRecurrenceInfoYearly
   */
  private async load() {
    let patern: any = {};
    let dateRange: { repeatForever?: string, repeatInstances?: string, windowEnd?: Date } = {};
    let yearlyPatern: { yearFrequency?: string, day?: string, month?: string } = {};
    let yearlyByDayPatern: { yearFrequency?: string, weekdayOfMonth?: string, weekDay?: string, month?: string } = {};
    let recurrenceRule: string;

    if (this.props.recurrenceData) {

      parseString(this.props.recurrenceData, { explicitArray: false }, (error, result) => {

        if (result.recurrence.rule.repeat) {
          patern = result.recurrence.rule.repeat;
        }

        //
        if (result.recurrence.rule.repeatForever) {
          dateRange = { repeatForever: result.recurrence.rule.repeatForever };
        }
        if (result.recurrence.rule.repeatInstances) {
          dateRange = { repeatInstances: result.recurrence.rule.repeatInstances };
        }
        if (result.recurrence.rule.windowEnd) {
          dateRange = { windowEnd: result.recurrence.rule.windowEnd };
        }

      });
      // yearly Patern
      if (patern.yearly) {
        recurrenceRule = 'yearly';
        if (patern.yearly.$.yearFrequency && patern.yearly.$.day) {
          yearlyPatern = { yearFrequency: patern.yearly.$.yearFrequency, day: patern.yearly.$.day, month: patern.yearly.$.month };
        }
      }
      // yearlyByDay Patern
      if (patern.yearlyByDay) {
        recurrenceRule = 'yearly';
        let weekDay = 'day';

        if (patern.yearlyByDay.$.su) weekDay = 'sunday';
        if (patern.yearlyByDay.$.mo) weekDay = 'monday';
        if (patern.yearlyByDay.$.tu) weekDay = 'tuesday';
        if (patern.yearlyByDay.$.we) weekDay = 'wednesday';
        if (patern.yearlyByDay.$.th) weekDay = 'thursday';
        if (patern.yearlyByDay.$.fr) weekDay = 'friday';
        if (patern.yearlyByDay.$.sa) weekDay = 'saturday';
        if (patern.yearlyByDay.$.day) weekDay = 'day';
        if (patern.yearlyByDay.$.weekday) weekDay = 'weekday';
        if (patern.yearlyByDay.$.weekend_day) weekDay = 'weekdendday';

        yearlyByDayPatern = {
          yearFrequency: patern.yearlyByDay.$.yearFrequency,
          weekdayOfMonth: patern.yearlyByDay.$.weekdayOfMonth,
          weekDay: weekDay,
          month: patern.yearlyByDay.$.month,
        };

      }

      let selectDateRangeOption: string = 'noDate';
      if (dateRange.repeatForever) {
        selectDateRangeOption = 'noDate';
      } else if (dateRange.repeatInstances) {
        selectDateRangeOption = 'endAfter';
      } else if (dateRange.windowEnd) {
        selectDateRangeOption = 'endDate';
      }

      // weekday patern
      this.setState({
        selectedRecurrenceRule: recurrenceRule,
        selectPatern: patern.yearly ? 'yearly' : 'yearlyByDay',
        dayOfMonth: yearlyPatern.day ? yearlyPatern.day : '1',
        selectedMonth: yearlyPatern.month ? yearlyPatern.month : moment().month(),
        selectedYearlyByDayMonth: yearlyByDayPatern.month ? yearlyByDayPatern.month : moment().format('M'),
        selectedWeekOrderMonth: yearlyByDayPatern.weekdayOfMonth ? yearlyByDayPatern.weekdayOfMonth : 'first',
        selectedWeekDay: yearlyByDayPatern.weekDay ? yearlyByDayPatern.weekDay : 'day',
        disableDayOfMonth: patern.yearly ? false : true,
        selectdateRangeOption: selectDateRangeOption,
        numberOcurrences: dateRange.repeatInstances ? dateRange.repeatInstances : '10',
        disableNumberOcurrences: dateRange.repeatInstances ? false : true,
        endDate: dateRange.windowEnd ? new Date(moment(dateRange.windowEnd).format('YYYY/MM/DD')) : this.state.endDate,
        disableEndDate: dateRange.windowEnd ? false : true,
        isLoading: false,
      });
    }
    await this.applyRecurrence();
  }


  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof EventRecurrenceInfoYearly
   */
  private async onApplyRecurrence(ev: React.MouseEvent<HTMLButtonElement>) {
    await this.applyRecurrence();
  }
  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof EventRecurrenceInfoDaily
   */
  private async applyRecurrence() {

    const siteTimeZoneHours: number = await this.spService.getSiteTimeZoneHours(this.props.siteUrl);
    const eventDate = new Date(moment(this.state.startDate).add(siteTimeZoneHours, 'hours').toISOString());
    const endDate = moment(this.state.endDate).add(siteTimeZoneHours, 'hours').toISOString();
    let selectDateRangeOption;
    switch (this.state.selectdateRangeOption) {
      case 'noDate':
        selectDateRangeOption = `<repeatForever>FALSE</repeatForever>`;
        break;
      case 'endAfter':
        selectDateRangeOption = `<repeatInstances>${this.state.numberOcurrences}</repeatInstances>`;
        break;
      case 'endDate':
        selectDateRangeOption = `<windowEnd>${endDate}</windowEnd>`;
        break;
      default:
        break;
    }
    let recurrencePatern: string = '';
    if (this.state.selectPatern == 'yearly') {
      recurrencePatern = `<yearly  yearFrequency="1" day="${this.state.dayOfMonth}" month="${this.state.selectedMonth}" /></repeat>${selectDateRangeOption}</rule></recurrence>`;
    }

    if (this.state.selectPatern == 'yearlyByDay') {

      recurrencePatern = `<yearlyByDay weekdayOfMonth="${this.state.selectedWeekOrderMonth}"  month="${this.state.selectedYearlyByDayMonth}"`;

      switch (this.state.selectedWeekDay) {
        case 'day':
          recurrencePatern = recurrencePatern + `day="TRUE"`;
          break;
        case 'weekday':
          recurrencePatern = recurrencePatern + `weekday="TRUE"`;
          break;
        case 'weekendday':
          recurrencePatern = recurrencePatern + `weekend_day="TRUE"`;
          break;
        case 'sunday':
          recurrencePatern = recurrencePatern + `su="TRUE"`;
          break;
        case 'monday':
          recurrencePatern = recurrencePatern + `mo="TRUE"`;
          break;
        case 'tuesday':
          recurrencePatern = recurrencePatern + `tu="TRUE"`;
          break;
        case 'wednesday':
          recurrencePatern = recurrencePatern + `we="TRUE"`;
          break;
        case 'thursday':
          recurrencePatern = recurrencePatern + `th="TRUE"`;
          break;
        case 'friday':
          recurrencePatern = recurrencePatern + `fr="TRUE"`;
          break;
        case 'saturday':
          recurrencePatern = recurrencePatern + `sa="TRUE"`;
          break;
        default:
          break;
      }

      recurrencePatern = recurrencePatern + ` yearFrequency="1" /></repeat>${selectDateRangeOption}</rule></recurrence>`;
    }

    const recurrenceXML = `<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat>` + recurrencePatern;


    this.props.returnRecurrenceData(this.state.startDate, recurrenceXML);
  }
  /**
   *
   *
   * @returns {React.ReactElement<IEventRecurrenceInfoDailyProps>}
   * @memberof EventRecurrenceInfoDaily
   */
  public render(): React.ReactElement<IEventRecurrenceInfoYearlyProps> {
    return (
      <div >
        {
          <div>
            <div style={{ display: 'inline-block', float: 'right', paddingTop: '10px', height: '40px' }}>

            </div>
            <div style={{ width: '100%', paddingTop: '10px' }}>
              <Label>{strings.PaternLabel}</Label>
              <ChoiceGroup
                selectedKey={this.state.selectPatern}
                options={[
                  {
                    key: 'yearly',
                    text: strings.every,
                    ariaLabel: strings.every,
                    onRenderField: (props, render) => {
                      return (
                        <div >
                          {render!(props)}
                          <div style={{ display: 'inline-block', verticalAlign: 'top', width: '100px', paddingLeft: '10px' }}>
                            <Dropdown
                              selectedKey={this.state.selectedMonth}
                              onChange={this.onMonthChange}
                              disabled={this.state.disableDayOfMonth}
                              options={[
                                { key: '1', text: strings.January },
                                { key: '2', text: strings.February },
                                { key: '3', text: strings.March },
                                { key: '4', text: strings.April },
                                { key: '5', text: strings.May },
                                { key: '6', text: strings.June },
                                { key: '7', text: strings.July },
                                { key: '8', text: strings.August },
                                { key: '9', text: strings.September },
                                { key: '10', text: strings.October },
                                { key: '11', text: strings.November },
                                { key: '12', text: strings.December },
                              ]}
                            />
                          </div>

                          <MaskedTextField
                            styles={{ root: { display: 'inline-block', verticalAlign: 'top', width: '100px', paddingLeft: '10px' } }}
                            mask="99"
                            maskChar=' '
                            disabled={this.state.disableDayOfMonth}
                            value={this.state.dayOfMonth}
                            errorMessage={this.state.errorMessageDayOfMonth}
                            onChange={this.onDayOfMonthChange} />
                        </div>
                      );
                    }
                  },
                  {
                    key: 'yearlyByDay',
                    text: strings.theLabel,
                    onRenderField: (props, render) => {
                      return (
                        <div  >
                          {render!(props)}
                          <div style={{ display: 'inline-block', verticalAlign: 'top', width: '80px', paddingLeft: '10px' }}>
                            <Dropdown
                              selectedKey={this.state.selectedWeekOrderMonth}
                              onChange={this.onWeekOrderMonthChange}
                              disabled={!this.state.disableDayOfMonth}
                              options={[
                                { key: 'first', text: strings.firstLabel },
                                { key: 'second', text: strings.secondLabel },
                                { key: 'third', text: strings.thirdLabel },
                                { key: 'fourth', text: strings.fourthLabel },
                                { key: 'last', text: strings.lastLabel },

                              ]}
                            />
                          </div>
                          <div style={{ display: 'inline-block', verticalAlign: 'top', width: '100px', paddingLeft: '5px' }}>
                            <Dropdown
                              selectedKey={this.state.selectedWeekDay}
                              disabled={!this.state.disableDayOfMonth}
                              onChange={this.onSelectedWeekDayChange}
                              options={[
                                { key: 'day', text: strings.dayLable },
                                { key: 'weekday', text: strings.weekDayLabel },
                                { key: 'weekendday', text: strings.weekEndDay },
                                { key: 'sunday', text: strings.Sunday },
                                { key: 'monday', text: strings.Monday },
                                { key: 'tuesday', text: strings.Tuesday },
                                { key: 'wednesday', text: strings.Wednesday },
                                { key: 'thursday', text: strings.Thursday },
                                { key: 'friday', text: strings.Friday },
                                { key: 'saturday', text: strings.Saturday },
                              ]}
                            />
                          </div>
                          <Label styles={{ root: { display: 'inline-block', verticalAlign: 'top', width: '30px', paddingLeft: '10px' } }}>{ strings.ofMonthLabel} </Label>
                          <div style={{ display: 'inline-block', verticalAlign: 'top', width: '100px', paddingLeft: '5px' }}>
                            <Dropdown
                              selectedKey={this.state.selectedYearlyByDayMonth}
                              onChange={this.onYearlyByDayMonthChange}
                              disabled={!this.state.disableDayOfMonth}
                              options={[
                                { key: '1', text: strings.January },
                                { key: '2', text: strings.February },
                                { key: '3', text: strings.March },
                                { key: '4', text: strings.April },
                                { key: '5', text: strings.May },
                                { key: '6', text: strings.June },
                                { key: '7', text: strings.July },
                                { key: '8', text: strings.August },
                                { key: '9', text: strings.September },
                                { key: '10', text: strings.October },
                                { key: '11', text: strings.November },
                                { key: '12', text: strings.December },
                              ]}
                            />
                          </div>

                        </div>
                      );
                    }

                  }
                ]}
                onChange={this.onPaternChange}
                required={true}
              />
            </div>

            <div style={{ paddingTop: '22px' }}>
              <Label>{ strings.dateRangeLabel }</Label>
              <div style={{ display: 'inline-block', verticalAlign: 'top', paddingRight: '35px', paddingTop: '10px' }}>

                <DatePicker
                  firstDayOfWeek={DayOfWeek.Sunday}
                  strings={DayPickerStrings}
                  placeholder={strings.StartDatePlaceHolder}
                  ariaLabel={strings.StartDatePlaceHolder}
                  label={strings.StartDateLabel}
                  value={this.state.startDate}
                  onSelectDate={this.onStartDateChange}
                  formatDate={toLocaleShortDateString}
                />

              </div>
              <div style={{ display: 'inline-block', verticalAlign: 'top', paddingTop: '10px' }}>
                <ChoiceGroup
                  selectedKey={this.state.selectdateRangeOption}
                  onChange={this.onDataRangeOptionChange}
                  options={[
                    {
                      key: 'noDate',
                      text: strings.noEndDate,
                    },
                    {
                      key: 'endDate',
                      text: strings.EndByLabel,
                      onRenderField: (props, render) => {
                        return (
                          <div  >
                            {render!(props)}
                            <DatePicker
                              firstDayOfWeek={DayOfWeek.Sunday}
                              strings={DayPickerStrings}
                              placeholder={strings.StartDatePlaceHolder}
                              ariaLabel={strings.StartDatePlaceHolder}
                              style={{ display: 'inline-block', verticalAlign: 'top', paddingLeft: '22px', }}
                              onSelectDate={this.onEndDateChange}
                              formatDate={toLocaleShortDateString}
                              value={this.state.endDate}
                              disabled={this.state.disableEndDate}
                            />
                          </div>
                        );
                      }
                    },
                    {
                      key: 'endAfter',
                      text: strings.EndAfterLabel,
                      onRenderField: (props, render) => {
                        return (
                          <div  >
                            {render!(props)}
                            <MaskedTextField
                              styles={{ root: { display: 'inline-block', verticalAlign: 'top', width: '100px', paddingLeft: '10px' } }}
                              mask="999"
                              maskChar=' '
                              value={this.state.numberOcurrences}
                              disabled={this.state.disableNumberOcurrences}
                              onChange={this.onNumberOfOcurrencesChange} />
                            <Label styles={{ root: { display: 'inline-block', verticalAlign: 'top', paddingLeft: '10px' } }}>{strings.OcurrencesLabel}</Label>
                          </div>
                        );
                      }
                    },
                  ]}
                  required={true}
                />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
