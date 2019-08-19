import { ICalendarEvent } from "../../../shared/services/CalendarService";

export interface IEventCardProps {
    isEditMode: boolean;
    event: ICalendarEvent;
    isNarrow: boolean;
}

export interface IEventCardState {}
