import { IEvent } from "../../../data";

/**
 * Events component state
 */
export interface IEventsState {
  /**
   * Error message that occurred while loading the data
   */
  error: string;
  /**
   * The list of events
   */
  events: IEvent[];
  /**
   * Indicates if the component is currently loading data or not
   */
  loading: boolean;
}

