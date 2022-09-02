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
  date: Date,
  options: {
    hours: IComboBoxOption[],
    minutes: IComboBoxOption[]
  }
}

export default class DateFormField extends React.Component<IDateFormFieldProps, IDateFormFieldState> {
  constructor(props) {
    super(props);
    this.state = {
      date: this._parseDateString(this.props.value),
      options: {
        hours: this._createComboBoxHours(),
        minutes: this._createComboBoxMinutes()
      }
    };
  }

  public render() {

    return (
      <React.Fragment>
        <DatePicker
          allowTextInput={this.props.allowTextInput}
          ariaLabel={this.props.ariaLabel}
          className={css(this.props.className, this.props.fieldSchema.DisplayFormat == 1 ? "ms-sm12 ms-md12 ms-lg6 ms-xl8" : "ms-sm12")}
          firstDayOfWeek={this.props.firstDayOfWeek}
          formatDate={(date: Date) => (date && typeof date.toLocaleDateString === 'function') ? date.toLocaleDateString(this.props.locale) : ''}
          isRequired={this.props.isRequired}
          onSelectDate={this._onSelectDate}
          parseDateFromString={this._parseDateString}
          placeholder={this.props.placeholder}
          strings={strings}
          value={this.state.date}

        />
        {this.props.fieldSchema.DisplayFormat == 1 &&
          <React.Fragment>
            <ComboBox
              onChange={this._onHoursChanged}
              selectedKey={this.state.date ? this.state.date.getHours() : 0}
              allowFreeform
              autoComplete="on"
              persistMenu={true}
              options={this.state.options.hours}
              className={css(this.props.className, "ms-sm6", "ms-md6", "ms-lg3", "ms-xl2")}
            />
            <ComboBox
              selectedKey={this.state.date ? this.state.date.getMinutes() : 0}
              onChange={this._onMinutesChanged}
              allowFreeform
              autoComplete="on"
              persistMenu={true}
              options={this.state.options.minutes}
              className={css(this.props.className, "ms-sm6", "ms-md6", "ms-lg3", "ms-xl2")}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

  private _onSelectDate = (inputDate: Date | null | undefined): void => {
    console.log("Date has been selected" + !inputDate ? "" : inputDate.toLocaleDateString());
    if (inputDate) {

      this.setState(prevState => {
        return {
          date: inputDate,
          ...prevState
        };
      });
      //this._onValueChanged(inputDate);
    }
  }
  private _onHoursChanged = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
    console.log(event);
    console.log(option);
    if (option) {
      let hours = parseInt(option.key.toString());
      this.setState(prevState => {
        let momentDate = prevState.date ? moment(prevState.date) : moment();
        momentDate.hour(hours);
        let date = momentDate.toDate()
        //this._onValueChanged(date);
        return {
          date: date,
          ...prevState
        };
      });
    }
  }
  private _onMinutesChanged = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
    if (option) {
      let minutes = parseInt(option.key.toString());
      this.setState(prevState => {
        let momentDate = prevState.date ? moment(prevState.date) : moment();
        momentDate.minutes(minutes);
        let date = momentDate.toDate()
        // this._onValueChanged(date);
        return {
          date: date,
          ...prevState
        };
      });
    }
  }

  private _onValueChanged(date: Date) {
    let result = '';
    if (date) {
      result = this.props.fieldSchema.DisplayFormat == 1 ?
        date.toLocaleDateString(this.props.locale) + " " + date.toLocaleTimeString(this.props.locale, { hour: "2-digit", minute: "2-digit" }) : //Date + Time
        date.toLocaleDateString(this.props.locale); //Only date
    }
    this.props.valueChanged(result);
  }

  private _parseDateString(inputDate: string): Date {
    if (!inputDate) {
      return null;
    }

    let momentDate = this.props.fieldSchema.DisplayFormat == 1 ?
      moment(inputDate, moment.localeData(this.props.locale).longDateFormat('LT')) :
      moment(inputDate, moment.localeData(this.props.locale).longDateFormat('L'))
    return momentDate.toDate()
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
