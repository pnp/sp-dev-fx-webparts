import { ICalendarItem } from '../../model/ICalendarItem';

export interface ICalendarService {
    
    getGroupCalendarItems (groupId?: string, groupEmail?: string) : Promise<ICalendarItem[]>;
    
}