export interface IMeeting {
  id: string;
  subject: string;
  start: Date;
  end: Date;
  webLink: string;
  isAllDay: boolean;
  location: string;
  organizer: string;
  status: string;
}