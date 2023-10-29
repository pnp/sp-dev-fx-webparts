import { DisplayMode } from "@microsoft/sp-core-library";
import { ListSubscriptionFactory } from "@microsoft/sp-list-subscription";

export interface IDashboardProps {
  /**
   * Web part display mode
   */
  displayMode: DisplayMode;
  /**
   * ID of the list to retrieve documents from. Undefined, if no library
   * has been selected
   */
  libraryId?: string;
  /**
   * Instance of the ListSubscriptionFactory to use to create a list
   * subscription
   */
  listSubscriptionFactory: ListSubscriptionFactory;
  /**
   * Event handler after clicking the 'Configure' button in the Placeholder
   * component
   */
  onConfigure: () => void;
  /**
   * URL of the site where the selected library is located. Undefined, if the
   * selected library is in the current site
   */
  siteUrl?: string;
  /**
   * Web part title to show in the title
   */
  title: string;
  /**
   * Web part description to show in the header
   */
  description: string;
}
