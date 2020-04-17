import { ICalendarEvent } from "../../services/CalendarService";

export interface IEventCardProps {
    isEditMode: boolean;
    event: ICalendarEvent;
    isNarrow: boolean;
}
