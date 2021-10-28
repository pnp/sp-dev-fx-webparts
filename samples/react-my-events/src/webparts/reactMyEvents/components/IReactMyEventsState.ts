import { ICalendarEvent } from '../../../shared/models/ICalendarEvent';

export interface IReactMyEventsState {
    events: ICalendarEvent[];
    currentPage: number;
    loading: boolean;
    errorMessage: string;
    noEventsFoundMessage: string;
}