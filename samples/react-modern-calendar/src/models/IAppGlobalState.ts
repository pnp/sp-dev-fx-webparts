import { ICalendarProps } from "../components/ICalendarProps";
import { IEvent } from "@nuvemerudita/react-controls";

export interface IAppGlobalState extends ICalendarProps {
  refresh: boolean;
  calendarEvents: IEvent[];

 

}
