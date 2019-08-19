/**
 * CalendarFeedSummary Types
 * Contains the various types used by the component.
 * (I like to  keep my props and state in a separate ".types"
 * file because that's what the Office UI Fabric team does and
 * I kinda liked it.
 */
import { DisplayMode } from "@microsoft/sp-core-library";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Moment } from "moment";
import { ICalendarEvent, ICalendarService } from "../../../shared/services/CalendarService";

/**
 * The props for the calendar feed summary component
 */
export interface ICalendarFeedSummaryProps {
  title: string;
  displayMode: DisplayMode;
  context: IWebPartContext;
  updateProperty: (value: string) => void;
  isConfigured: boolean;
  isNarrow: boolean;
  provider: ICalendarService;
  maxEvents: number;
}

/**
 * The state for the calendar feed summary component
 */
export interface ICalendarFeedSummaryState {
  events: ICalendarEvent[];
  error: any|undefined;
  isLoading: boolean;
  currentPage: number;
}

/**
 * Interface to store cached events with an expiry date
 */
export interface IFeedCache {
  events: ICalendarEvent[];
  expiry: Moment;
  feedType: string;
  feedUrl: string;
}
