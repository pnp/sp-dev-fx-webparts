import { HttpClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";
import { DynamicProperty } from "@microsoft/sp-component-base";
import { ILocation } from "../../../data";

/**
 * Map component properties
 */
export interface IMapProps {
  /**
   * The address to show on the map
   */
  address: ILocation | string | undefined;
  /**
   * The Bing maps API key to use when communicating with the Bing maps API
   */
  bingMapsApiKey: string;
  /**
   * Web part display mode. Used for inline editing of the web part title
   */
  displayMode: DisplayMode;
  /**
   * Indicates if the component retrieves its address from a dynamic data source
   * or not. Used to display different message to the user if no address data
   * is available.
   */
  dynamicAddress: boolean;
  /**
   * Web part height. Used to render the map
   */
  height: number;
  /**
   * Instance of the HttpClient. Used to communicate with the Bing maps API to
   * get coordinates for the specified address
   */
  httpClient: HttpClient;
  /**
   * Determines if the web part has been connected to a dynamic data source or
   * not
   */
  needsConfiguration: boolean;
  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  onConfigure: () => void;
  /**
   * The title of the web part
   */
  title: string;
  /**
   * Event handler after updating the web part title
   */
  updateProperty: (value: string) => void;
  /**
   * Web part width. Used to render the map
   */
  width: number;
}
