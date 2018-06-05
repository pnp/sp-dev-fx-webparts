import { ILocation } from ".";

/**
 * Represents event
 */
export interface IEvent extends ILocation {
  /**
   * The start date of the event
   */
  date: string;
  /**
   * The name of the event
   */
  name: string;
  /**
   * The e-mail address of the person organizing the event
   */
  organizerEmail: string;
  /**
   * The name of the person organizing the event
   */
  organizerName: string;
}