import React from 'react'
import moment from 'moment'

import dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'

function createCalendar(currentDate) {
  if (!currentDate) {
    currentDate = moment()
  } else {
    currentDate = moment(currentDate)
  }

  const first = currentDate.clone().startOf('month')
  const last = currentDate.clone().endOf('month')
  const weeksCount = Math.ceil((first.day() + last.date()) / 7)
  //const a = { currentDate, first, last };
  const calendar = [currentDate, first, last];

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week = []
    calendar.push(week)
    //calendar.year = currentDate.year()
    //calendar.month = currentDate.month()

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = currentDate.clone().set('date', day + 1 - first.day())
      date.calendar = calendar
      week.push(date)
    }
  }

  return calendar
}

function CalendarDate(props) {
  const { dateToRender, dateOfMonth } = props
  const today =
    dateToRender.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'today'
      : ''

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className="date prev-month">
        {dateToRender.date()}
      </button>
    )
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className="date next-month">
        {dateToRender.date()}
      </button>
    )
  }

  return (
    <button
      className={`date in-month ${today}`}
      onClick={() => props.onClick(dateToRender)}>
      {dateToRender.date()}
    </button>
  )
}


export interface IYearCalendarProps {
    date: Date;
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
  }

  public componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) })
  }

  public componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) })
    }
  }

  render() {
    if (!this.state.calendar) {
      return null
    }

    return (
      <div className="month">
        <div className="month-name">
          {this.state.calendar.currentDate.format('MMMM').toUpperCase()}
        </div>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={index} className="day">
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
                onClick={date =>
                  alert(`Will go to daily-view of ${date.format('YYYY-MM-DD')}`)
                }
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}



export interface IYearProps {
    date: any;
}

class Year extends React.Component<IYearProps> {

    private range = date => {
        return [dates.startOf(date, 'year')]
      }
    
    private navigate = (date, action) => {
        switch (action) {
          case navigate.PREVIOUS:
            return dates.add(date, -1, 'year')
      
          case navigate.NEXT:
            return dates.add(date, 1, 'year')
      
          default:
            return date
        }
      }

    //private title = (date, { localizer }) => {
    //    localizer.format(date, 'yearHeaderFormat');
    //}

  public render() {
    let { date, ...props } = this.props
    let range = this.range(date)
    const months = []
    const firstMonth = dates.startOf(date, 'year')

    for (let i = 0; i < 12; i++) {
      months.push(
        <YearCalendar key={i + 1} date={dates.add(firstMonth, i, 'month')} />
      )
    }

    return <div className="year">{months.map(month => month)}</div>
  }
}


export default Year
