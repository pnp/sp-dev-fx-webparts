import { IUser } from './IUser';

export interface ICalendarItem {
    Title?: string;
    DateTime: Date;
    Attendees: IUser[];
}