import * as React from 'react';
import * as moment from 'moment';

import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DatePicker, DayOfWeek, IDatePickerProps, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react/lib/ComboBox';

import * as strings from 'FormFieldStrings';
import { IFieldSchema } from '../../../../common/services/datatypes/RenderListData';


export interface IDateFormFieldProps extends IDatePickerProps {
  locale: string;
  fieldSchema: IFieldSchema;
  valueChanged(newValue: any): void;
  value: any;
}
export interface IDateFormFieldState {
  date?: Date;
  hours: number;
  minutes: number;
}

export default class DateFormField extends React.Component<IDateFormFieldProps, IDateFormFieldState> {
  constructor(props) {
    super(props);
    this._createComboBoxHours = this._createComboBoxHours.bind(this);
    this._createComboBoxMinutes = this._createComboBoxMinutes.bind(this);
    this.state = {
      hours: 0,
      minutes: 0
    };
  }

  public componentDidUpdate(prevProps: IDateFormFieldProps, prevState: IDateFormFieldState) {
    //Component Value property got updated from List State
    if (this.props.value && prevProps.value != this.props.value) {
      let momentDate = moment(this.props.value, moment.localeData(this.props.locale).longDateFormat('L'));
      this.setState({
        hours: momentDate.hour(),
        minutes: momentDate.minute(),
        date: momentDate.toDate()
      });
    }
    //Component value updated 
    if (this.state.date && this.state.date != prevState.date) {
      let result = this.props.fieldSchema.DisplayFormat == 1 ?
        this.state.date.toLocaleDateString(this.props.locale) + " " + this.state.date.toLocaleTimeString(this.props.locale, { hour: "2-digit", minute: "2-digit" }) : //Date + Time
        this.state.date.toLocaleDateString(this.props.locale); //Only date
      this.props.valueChanged(result);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <DatePicker
          allowTextInput={this.props.allowTextInput}
          ariaLabel={this.props.ariaLabel}
          className={css(this.props.className, this.props.fieldSchema.DisplayFormat == 1 ? "ms-sm12 ms-md12 ms-lg6 ms-xl8" : "ms-sm12")}
          firstDayOfWeek={this.props.firstDayOfWeek}
          formatDate={(date: Date) => (typeof date.toLocaleDateString === 'function') ? date.toLocaleDateString(this.props.locale) : ''}
          isRequired={this.props.isRequired}
          onSelectDate={this._onSelectDate}
          parseDateFromString={(dateStr: string) => new Date(Date.parse(dateStr))}
          placeholder={this.props.placeholder}
          strings={strings}
          value={this.state.date}

        />
        {this.props.fieldSchema.DisplayFormat == 1 &&
          <React.Fragment>
            <ComboBox
              onChange={this._onHoursChanged}
              selectedKey={this.state.hours}
              allowFreeform
              autoComplete="on"
              persistMenu={true}
              options={this._createComboBoxHours()}
              className={css(this.props.className, "ms-sm6", "ms-md6", "ms-lg3", "ms-xl2")}
            />
            <ComboBox
              selectedKey={this.state.minutes}
              onChange={this._onMinutesChanged}
              allowFreeform
              autoComplete="on"
              persistMenu={true}
              options={this._createComboBoxMinutes()}
              className={css(this.props.className, "ms-sm6", "ms-md6", "ms-lg3", "ms-xl2")}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

  private _onSelectDate = (inputDate: Date | null | undefined): void => {
    let date = inputDate ? moment(inputDate) : moment();
    date.hour(this.state.hours);
    date.minute(this.state.minutes);
    this.setState({ date: date.toDate() });
  }
  private _onHoursChanged = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
    if (option) {
      let date = this.state.date ? moment(this.state.date) : moment();
      let hours = parseInt(option.key.toString());
      date.hour(hours);
      this.setState({ date: date.toDate(), hours });
    }
  }
  private _onMinutesChanged = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
    if (option) {
      let date = this.state.date ? moment(this.state.date) : moment();
      let minutes = parseInt(option.key.toString());
      date.minute(minutes);
      this.setState({ date: date.toDate(), minutes });
    }
  }

  private _createComboBoxHours(): IComboBoxOption[] {
    let results = new Array<IComboBoxOption>();
    if (this.props.fieldSchema.HoursOptions) {
      results = this.props.fieldSchema.HoursOptions.map((item, index) => {
        return {
          key: index,
          text: item
        } as IComboBoxOption;
      });
    }
    return results;
  }
  private _createComboBoxMinutes(): IComboBoxOption[] {
    let results = new Array<IComboBoxOption>();
    for (var i = 0; i < 60; i++) {
      results.push({
        key: i,
        text: ("00" + i).slice(-2)
      });
    }
    return results;
  }

}
