// tslint:disable-next-line:max-line-length
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-webpart-base";
import { CalloutTriggers } from "@pnp/spfx-property-controls/lib/PropertyFieldHeader";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
import { PropertyFieldSliderWithCallout } from "@pnp/spfx-property-controls/lib/PropertyFieldSliderWithCallout";
import { PropertyFieldTextWithCallout } from "@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout";
import { PropertyFieldToggleWithCallout } from "@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout";
import * as strings from "CalendarFeedSummaryWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { CalendarEventRange, DateRange, ICalendarService } from "../../shared/services/CalendarService";
import { CalendarServiceProviderList } from "../../shared/services/CalendarService/CalendarServiceProviderList";
import { ICalendarFeedSummaryWebPartProps } from "./CalendarFeedSummaryWebPart.types";
import CalendarFeedSummary from "./components/CalendarFeedSummary";
import { ICalendarFeedSummaryProps } from "./components/CalendarFeedSummary.types";

// this is the same width that the SharePoint events web parts use to render as narrow
const MaxMobileWidth: number = 480;

/**
 * Calendar Feed Summary Web Part
 * This web part shows a summary of events, in a film-strip (for normal views) or list view (for narrow views)
 * It is called a summary web part because it doesn't allow the user to filter events.
 */
export default class CalendarFeedSummaryWebPart extends BaseClientSideWebPart<ICalendarFeedSummaryWebPartProps> {
  // the list of proviers available
  private _providerList: any[];

  constructor() {
    super();

    // get the list of providers so that we can offer it to users
    this._providerList = CalendarServiceProviderList.getProviders();
  }

  /**
   * Renders the web part
   */
  public render(): void {
    // see if we need to render a mobile view
    const isNarrow: boolean = this.domElement.clientWidth <= MaxMobileWidth;

    // display the summary (or the configuration screen)
    const element: React.ReactElement<ICalendarFeedSummaryProps> = React.createElement(
      CalendarFeedSummary,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        context: this.context,
        isConfigured: this._isConfigured(),
        isNarrow: isNarrow,
        maxEvents: this.properties.maxEvents,
        provider: this._getDataProvider(),
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * We're disabling reactive property panes here because we don't want the web part to try to update events as
   * people are typing in the feed URL.
   */
  protected get disableReactivePropertyChanges(): boolean {
    // require an apply button on the property pane
    return true;
  }

  /**
   * Show the configuration pane
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // create a drop down of feed providers from our list
    const feedTypeOptions: IPropertyPaneDropdownOption[] = this._providerList.map(provider => {
      return { key: provider.key, text: provider.label };
    });

    // make sure to set a default date range if it isn't defined
    // somehow this is an issue when binding to properties that are enums
    if (this.properties.dateRange === undefined) {
      this.properties.dateRange = DateRange.Year;
    }

    if (this.properties.cacheDuration === undefined) {
      // default to 15 minutes
      this.properties.cacheDuration = 15;
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                // feed type drop down. Add your own types in the drop-down list
                PropertyPaneDropdown("feedType", {
                  label: strings.FeedTypeFieldLabel,
                  options: feedTypeOptions
                }),
                // feed url input box
                PropertyFieldTextWithCallout("feedUrl", {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: "feedUrlFieldId",
                  label: strings.FeedUrlFieldLabel,
                  calloutContent:
                    React.createElement("p", {}, strings.FeedUrlCallout),
                  calloutWidth: 200,
                  value: this.properties.feedUrl,
                  deferredValidationTime: 500,
                  onGetErrorMessage: this._validateFeedUrl.bind(this)
                }),
                // how days ahead from today are we getting
                PropertyPaneDropdown("dateRange", {
                  label: strings.DateRangeFieldLabel,
                  options: [
                    { key: DateRange.OneWeek, text: strings.DateRangeOptionWeek },
                    { key: DateRange.TwoWeeks, text: strings.DateRangeOptionTwoWeeks },
                    { key: DateRange.Month, text: strings.DateRangeOptionMonth },
                    { key: DateRange.Quarter, text: strings.DateRangeOptionQuarter },
                    { key: DateRange.Year, text: strings.DateRangeOptionUpcoming },
                  ]
                }),
              ]
            },
            // advanced group
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [
                 // how many items are we diplaying in a page
                 PropertyFieldNumber("maxEvents", {
                  key: "maxEventsFieldId",
                  label: strings.MaxEventsFieldLabel,
                  description: strings.MaxEventsFieldDescription,
                  value: this.properties.maxEvents,
                  minValue: 0,
                  disabled: false
                }),
                // use CORS toggle
                PropertyFieldToggleWithCallout("useCORS", {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: "useCORSFieldId",
                  label: strings.UseCORSFieldLabel,
                  calloutWidth: 200,
                  calloutContent: React.createElement("p", {}, strings.UseCORSFieldCallout),
                  onText: strings.CORSOn,
                  offText: strings.CORSOff,
                  checked: this.properties.useCORS
                }),
                // cache duration slider
                PropertyFieldSliderWithCallout("cacheDuration", {
                  calloutContent: React.createElement("p", {}, strings.CacheDurationFieldCallout),
                  calloutTrigger: CalloutTriggers.Hover,
                  calloutWidth: 200,
                  key: "cacheDurationFieldId",
                  label: strings.CacheDurationFieldLabel,
                  max: 1440,
                  min: 0,
                  step: 15,
                  showValue: true,
                  value: this.properties.cacheDuration
                })
              ],
            }
          ]
        }
      ]
    };
  }

  /**
   * If we get resized, call the Render method so that we can switch between the narrow view and the regular view
   */
  protected onAfterResize(newWidth: number): void {
    // redraw the web part
    this.render();
  }

  /**
   * Returns true if the web part is configured and ready to show events. If it returns false, we'll show the configuration placeholder.
   */
  private _isConfigured(): boolean {
    const { feedUrl, feedType } = this.properties;

    // see if web part has a feed url configured
    const hasFeedUrl: boolean = feedUrl !== null
      && feedUrl !== undefined
      && feedUrl !== "";

    // see if web part has a feed type configured
    const hasFeedType: boolean = feedType !== null
      && feedType !== undefined;

    // if we have a feed url and a feed type, we are configured
    return hasFeedUrl && hasFeedType;
  }

  /**
   * Validates a URL when users type them in the configuration pane.
   * @param feedUrl The URL to validate
   */
  private _validateFeedUrl(feedUrl: string): string {
    if (feedUrl === null ||
      feedUrl.trim().length === 0) {
      return strings.FeedUrlValidationNoUrl;
    }

    if (!feedUrl.match(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)) {
      return strings.FeedUrlValidationInvalidFormat;
    } else {
      return "";
    }
  }

  /**
   * Initialize a feed data provider from the list of existing providers
   */
  private _getDataProvider(): ICalendarService {
    const {
      feedUrl,
      useCORS,
      cacheDuration
    } = this.properties;

    // get the first provider matching the type selected
    let providerItem: any = this._providerList.filter(p => p.key === this.properties.feedType)[0];

    // make sure we got a valid provider
    if (!providerItem) {
      // return nothing. This should only happen if we removed a provider that we used to support or changed our provider keys
      return undefined;
    }

    // get an instance
    let provider: ICalendarService = providerItem.initialize();

    // pass props
    provider.Context = this.context;
    provider.FeedUrl = feedUrl;
    provider.UseCORS = useCORS;
    provider.CacheDuration = cacheDuration;
    provider.EventRange = new CalendarEventRange(this.properties.dateRange);
    return provider;
  }
}
