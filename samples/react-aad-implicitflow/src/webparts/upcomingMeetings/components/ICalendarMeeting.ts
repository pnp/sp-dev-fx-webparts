export interface ICalendarMeeting {
  id: string;
  subject: string;
  webLink: string;
  isAllDay: boolean;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  location: {
    displayName: string;
  };
  organizer: {
    emailAddress: {
      name: string;
      address: string;
    }
  };
  showAs: string;
}