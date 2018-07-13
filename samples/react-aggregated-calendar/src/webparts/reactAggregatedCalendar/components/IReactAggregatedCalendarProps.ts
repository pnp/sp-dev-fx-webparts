import { SelectedCalendar } from "../model/SelectedCalendar";
import { WebPartContext } from "@microsoft/sp-webpart-base";

/**
 *
 *
 * @export
 * @interface IReactAggregatedCalendarProps
 */
export interface IReactAggregatedCalendarProps {
  header: string;
  selectedCalendarLists: SelectedCalendar[];
  context: WebPartContext;
  domElement: HTMLElement;
  dateFormat: string;
  showLegend: boolean;
}
