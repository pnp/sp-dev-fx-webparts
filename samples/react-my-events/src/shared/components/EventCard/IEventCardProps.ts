import { ICalendarEvent } from "../../models/ICalendarEvent";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IEventCardProps {
    layout?: any;
    event: ICalendarEvent;
    isEditMode?: boolean;
    isCompact?: any;
    themeVariant?: IReadonlyTheme;
}