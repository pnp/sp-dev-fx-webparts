import { ICalendarItem } from './ICalendarItem';
import { ICustomer } from './ICustomer';

export interface IVisit {
    calendarItem: ICalendarItem;
    customer: ICustomer;
}