/**
 * Represents a SharePoint list item where information about an event is stored
 */
export interface IEventItem {
  /**
   * The name of the event
   */
  Title: string;
  /**
   * The city where the event is located
   */
  PnPCity: string;
  /**
   * The address where the event is located
   */
  PnPAddress: string;
  /**
   * The start date of the event
   */
  PnPEventDate: string;
  /**
   * The name of the person organizing the event
   */
  PnPOrganizerName: string;
  /**
   * The e-mail address of the person organizing the event
   */
  PnPOrganizerEmail: string;
}