/**
 * Interface representing the strings used in various components of the calendar control.
 */
declare interface ICalendarWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  CalendarFieldLabel: string;
  HeightFieldLabel: string;
  AutoRefreshLabel: string;
  AutoRefreshIntervalFieldLabel: string;
  AutoRefreshIntervalDescription: string;
  CalendarViewLabel: string;
  DefaultTitle: string;

  /**
   * Strings related to the calendar control.
   */
  calendarControl: ICalendarControlStrings;

  /**
   * Strings related to the calendar view selection.
   */
  selectCalendarView: ISelectCalendarViewStrings;

  /**
   * Strings related to the event popover card.
   */
  eventPopoverCard: IEventPopoverCardStrings;

  /**
   * Strings related to the event details popover.
   */
  eventDetailsPopover: IEventDetailsPopoverStrings;

  /**
   * Strings related to the day view.
   */
  dayView: IDayViewStrings;

  /**
   * Strings related to the toolbar.
   */
  toolbar: IToolbarStrings;

  /**
   * Strings related to the week view.
   */
  weekView: IWeekViewStrings;

  /**
   * Strings related to the calendar month view.
   */
  calendarMonth: ICalendarMonthStrings;

  /**
   * Strings related to the week selection.
   */
  selectWeek: ISelectWeekStrings;
}

declare interface ICalendarControlStrings {
  daysOfWeek: string[];
}

declare interface ISelectCalendarViewStrings {
  month: string;
  week: string;
  day: string;
}

declare interface IEventPopoverCardStrings {
  timeSeparator: string;
  hourSuffix: string;
}

declare interface IEventDetailsPopoverStrings {
  start: string;
  end: string;
  location: string;
  attendees: string;
  details: string;
}

declare interface IDayViewStrings {
  allDay: string;
}

declare interface IToolbarStrings {
  today: string;
  previous: string;
  next: string;
}

declare interface IWeekViewStrings {
  allDay: string;
}

declare interface ICalendarMonthStrings {
  months: string[];
  shortMonths: string[];
  days: string[];
  shortDays: string[];
  goToToday: string;
}

declare interface ISelectWeekStrings {
  selectWeekPlaceholder: string;
}

declare module "CalendarWebPartStrings" {
  const strings: ICalendarWebPartStrings;
  export = strings;
}
