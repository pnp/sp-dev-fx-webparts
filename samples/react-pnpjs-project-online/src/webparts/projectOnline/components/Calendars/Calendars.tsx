import * as React from 'react';
import styles from './Calendars.module.scss';
import { ICalendarsProps } from './ICalendarsProps';
import { project, Calendar, CommandResult, CalendarCollection, CalendarExceptionCollection, CalendarException } from "pnpjs-project-online-package";
import { Button } from "office-ui-fabric-react/lib/Button";
import { dateAdd } from '@pnp/common';

export class Calendars extends React.Component<ICalendarsProps, {}> {

  private _calendars: CalendarCollection[];

  public render(): React.ReactElement<ICalendarsProps> {
    return (
      <div className={styles.calendars}>
        <Button text='Get all calendars' onClick={this._getAllCalendars}></Button>
        <Button text='Get calendar by Id' onClick={this._getCalendarById}></Button>
        {/* <Button text='Add calendar' onClick={this._addCalendar}></Button> */}
        {/* <Button text='Add calendar exception' onClick={this._addCalendarException}></Button> */}
        <Button text='Copy calendar' onClick={this._copyCalendar}></Button>
        <Button text='Delete calendar' onClick={this._deleteCalendar}></Button>
      </div>
    );
  }

  private _getAllCalendars = async () => {
    this._calendars = await project.calendars.get();
    console.log('Calendars', this._calendars);
  }

  // private _addCalendar = async () => {
  //   const calendar: CommandResult<Calendar> = await project.calendars.add({
  //     Name: 'Test Calendar ' + Date.now()
  //   });
  //   console.log(calendar);
  // }

  private _getCalendarById = async () => {
    const calendar: Calendar = await project.calendars.getById('c421980e-457e-e911-b07c-00155d088c05').get();
    console.log('Calendar', calendar);

    const calendarExceptions: CalendarExceptionCollection[] = await project.calendars.getById('c421980e-457e-e911-b07c-00155d088c05').baseCalendarExceptions.get();
    console.log('Calendar exceptions', calendarExceptions);
  }

  private _copyCalendar = async () => {
    const newCalendarName = 'Test Calendar ' + Date.now();
    const calendar: CommandResult<Calendar> = await project.calendars.getById('b6635b2e-e747-4771-a78b-24f7509629d0').copyTo(newCalendarName);
    console.log('Calendar', calendar);
  }

  private _deleteCalendar = async () => {
    await project.calendars.getById('1cdc823e-417e-e911-b08a-00155d10891f').delete();
    console.log('Calendar deleted');

  }

  // private _addCalendarException = async () => {
  //   const calendarException:  CommandResult<CalendarException> = await project.calendars.getById('c421980e-457e-e911-b07c-00155d088c05').baseCalendarExceptions.add({
  //     Name: 'Test Calendar exception ' + Date.now(),
  //     Start: new Date(2019,1,15),
  //     Finish: new Date(2019,12,15),
  //     Shift1Start: 1,
  //     Shift1Finish: 60,
  //     Shift2Start: 1,
  //     Shift2Finish: 60,
  //     Shift3Start: 1,
  //     Shift3Finish: 60,
  //     Shift4Start: 1,
  //     Shift4Finish: 60,
  //     Shift5Start: 1,
  //     Shift5Finish: 60,
  //   });
  //   console.log('Calendar exception', calendarException);
  // }

}
