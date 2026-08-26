define([], function() {
  return {
    PropertyPaneDescription: "Show events from the selected calendars, in the selected view. Each calendar is shown in a different color.",
    BasicGroupName: "Settings",
    TitleFieldLabel: "Title",
    CalendarFieldLabel: "Select Calendar",
    HeightFieldLabel: "Height",
    AutoRefreshLabel: "Auto Refresh",
    AutoRefreshIntervalFieldLabel: "Auto Refresh Interval in minutes (default 1)",
    AutoRefreshIntervalDescription: "Time in minutes. Set to 0 to disable auto refresh.",
    CalendarViewLabel: "Calendar View",
    DefaultTitle: "My Calendars",
    calendarControl: {
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    },
    selectCalendarView: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    eventPopoverCard: {
      timeSeparator: " - ",
      hourSuffix: "H"
    },
    eventDetailsPopover: {
      start: "Start",
      end: "End",
      location: "Location",
      attendees: "Attendees",
      details: "Details"
    },
    dayView: {
      allDay: "All Day"
    },
    toolbar: {
      today: "Today",
      previous: "Previous",
      next: "Next"
    },
    weekView: {
      allDay: "All Day"
    },
    calendarMonth: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      shortDays: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],
      goToToday: "Go to today"
    },
    selectWeek: {
      selectWeekPlaceholder: "Select a week"
    }
  };
});