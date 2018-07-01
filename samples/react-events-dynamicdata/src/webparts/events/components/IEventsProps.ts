import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IEvent } from "../../../data";

/**
 * Events components properties
 */
export interface IEventsProps {
  /**
   * Web part display mode. Used for inline editing of the web part title
   */
  displayMode: DisplayMode;
  /**
   * Event handler for selecting an event in the list
   */
  onEventSelected: (event: IEvent) => void;
  /**
   * The absolute URL of the current web
   */
  siteUrl: string;
  /**
   * The title of the web part
   */
  title: string;
  /**
   * Event handler after updating the web part title
   */
  updateProperty: (value: string) => void;
}
