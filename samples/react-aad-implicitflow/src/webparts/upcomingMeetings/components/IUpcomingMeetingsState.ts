import { IMeeting } from './IMeeting';

export interface IUpcomingMeetingsState {
  loading: boolean;
  error: string;
  upcomingMeetings: IMeeting[];
  signedIn: boolean;
}