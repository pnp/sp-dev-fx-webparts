import React from 'react';
import moment from 'moment';
import * as dates from 'date-arithmetic';
import styles from './Year.module.scss';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { css } from 'office-ui-fabric-react';

function createCalendar(currentDate) {
  if (!currentDate) {
    currentDate = moment();
  } else {
    currentDate = moment(currentDate);
  }

  const first = currentDate.clone().startOf('month');
  const last = currentDate.clone().endOf('month');
  const weeksCount = Math.ceil((first.day() + last.date()) / 7);
  let calendar: any = [];
  calendar.currentDate = currentDate;
  calendar.last = last;
  calendar.first = first;

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week = [];
    calendar.push(week);
    calendar.year = currentDate.year();
    calendar.month = currentDate.month();

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = currentDate.clone().set('date', day + 1 - first.day());
      date.calendar = calendar;
      week.push(date);
    }
  }
  return calendar;
}

function CalendarDate(props) {
  const { dateToRender, dateOfMonth } = props;
  const today =
    dateToRender.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? styles.today
      : '';

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className={css(styles.date, styles["prevMonth"])}>
        {dateToRender.date()}
      </button>
    );
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className={css(styles.date, styles["nextMonth"])}>
        {dateToRender.date()}
      </button>
    );
  }

  return (
    <button
      className={`${css(styles.date, styles.inMonth)} ${today}`}
      onClick={(e) => props.onClick(e, dateToRender)}>
      {dateToRender.date()}
    </button>
  );
}

export interface IYearCalendarProps {
  date: Date;
  onDrillDown: (date: any, view?: string) => void;
}

export interface IYearCalendarState {
  calendar: any;
}

export interface ICalendar {
  currentDate: any;
  first: any;
  last: any;
  year: any;
  month: any;
}

class YearCalendar extends React.Component<IYearCalendarProps, IYearCalendarState> {
  public constructor(props) {
    super(props);

    this.state = {
      calendar: undefined
    };

    this.openView = this.openView.bind(this);
  }

  public componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) });
  }

  public componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) });
    }
  }

  public render() {
    if (!this.state.calendar) {
      return null;
    }

    const weekdays: string[] = this.state.calendar.currentDate.localeData().weekdaysMin();

    return (
      <div className={styles.month}>
        <div className={styles.monthName}>
          {this.state.calendar.currentDate.format('MMMM').toUpperCase()}
        </div>
        {weekdays.map((day, index) => (
          <span key={index} className={styles.day}>
            {day}
          </span>
        ))}
        {this.state.calendar.map((week, index) => (
          <div key={index}>
            {week.map(date => (
              <CalendarDate
                key={date.date()}
                dateToRender={date}
                dateOfMonth={this.state.calendar.currentDate}
                onClick={(e, obj) => {
                  this.openView(obj.toDate(), "day", e); //open day-view
                }
                }
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  private openView = (date, view, e) => {
    e.preventDefault();
    this.props.onDrillDown(date, view);
  }

}

export interface IYearProps {
  date: string;
  onDrillDown: (date: any, view?: string) => void;
}


class Year extends React.Component<IYearProps> {
  private range = date => {
    return [dates.startOf(date, 'year')];
  }

  public static navigate = (date, action) => {
    switch (action) {
      case navigate.PREVIOUS:
        return dates.add(date, -1, 'year');

      case navigate.NEXT:
        return dates.add(date, 1, 'year');

      default:
        return date;
    }
  }

  public static title = (date, calendar) => {
    return calendar.localizer.format(date, "YYYY");
  }

  private handleHeadingClick = (date, view) => {
    this.props.onDrillDown(date, view);
  }

  public render() {
    let { date, ...props } = this.props;
    let range = this.range(date);
    const months = [];
    const firstMonth = dates.startOf(date, 'year');

    for (let i = 0; i < 12; i++) {
      months.push(
        <YearCalendar
          key={i + 1}
          date={dates.add(firstMonth, i, 'month')}
          onDrillDown={this.handleHeadingClick}
        />
      );
    }

    return <div className={styles.year}>{months.map(month => month)}</div>;
  }
}

export default Year;
