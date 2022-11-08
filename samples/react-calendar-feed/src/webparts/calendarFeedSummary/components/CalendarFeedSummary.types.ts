/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * CalendarFeedSummary Types
 * Contains the various types used by the component.
 * (I like to  keep my props and state in a separate ".types"
 * file because that's what the Office UI Fabric team does and
 * I kinda liked it.
 */
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Moment } from "moment";
import { ICalendarEvent, ICalendarService } from "../../../shared/services/CalendarService";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

/**
 * The props for the calendar feed summary component
 */
export interface ICalendarFeedSummaryProps {
  title: string;
  displayMode: DisplayMode;
  context: WebPartContext;
  updateProperty: (value: string) => void;
  isConfigured: boolean;
  provider: ICalendarService;
  maxEvents: number;
  themeVariant: IReadonlyTheme;
  clientWidth: number;
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
