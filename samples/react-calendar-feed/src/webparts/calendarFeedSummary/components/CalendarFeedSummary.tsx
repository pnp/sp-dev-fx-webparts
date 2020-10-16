import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from "CalendarFeedSummaryWebPartStrings";
import * as moment from "moment";
import { FocusZone, FocusZoneDirection, List, Spinner, css } from "office-ui-fabric-react";
import * as React from "react";
import { EventCard } from "../../../shared/components/EventCard";
import { Pagination } from "../../../shared/components/Pagination";
import { CalendarServiceProviderType, ICalendarEvent, ICalendarService } from "../../../shared/services/CalendarService";
import styles from "./CalendarFeedSummary.module.scss";
import { ICalendarFeedSummaryProps, ICalendarFeedSummaryState, IFeedCache } from "./CalendarFeedSummary.types";
import { FilmstripLayout } from "../../../shared/components/filmstripLayout/index";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

// the key used when caching events
const CacheKey: string = "calendarFeedSummary";

// this is the same width that the SharePoint events web parts use to render as narrow
const MaxMobileWidth: number = 480;

/**
 * Displays a feed summary from a given calendar feed provider. Renders a different view for mobile/narrow web parts.
 */
export default class CalendarFeedSummary extends React.Component<ICalendarFeedSummaryProps, ICalendarFeedSummaryState> {
  constructor(props: ICalendarFeedSummaryProps) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
      error: undefined,
      currentPage: 1
    };
  }

  /**
   * When components are mounted, get the events
   */
  public componentDidMount(): void {
    if (this.props.isConfigured) {
      this._loadEvents(true);
    }
  }

  /**
   * When someone changes the property pane, it triggers this event. Use it to determine if we need to refresh the events or not
   * @param prevProps The previous props before changes are applied
   * @param prevState The previous state before changes are applied
   */
  public componentDidUpdate(prevProps: ICalendarFeedSummaryProps, prevState: ICalendarFeedSummaryState): void {
    // only reload if the provider info has changed
    const prevProvider: ICalendarService = prevProps.provider;
    const currProvider: ICalendarService = this.props.provider;

    // if there isn't a current provider, do nothing
    if (currProvider === undefined) {
      return;
    }

    // if we didn't have a provider and now we do, we definitely need to update
    if (prevProvider === undefined) {
      if (currProvider !== undefined) {
        this._loadEvents(false);
      }

      // there's nothing to do because there isn't a provider
      return;
    }

    const settingsHaveChanged: boolean = prevProvider.CacheDuration !== currProvider.CacheDuration ||
      prevProvider.Name !== currProvider.Name ||
      prevProvider.FeedUrl !== currProvider.FeedUrl ||
      prevProvider.Name !== currProvider.Name ||
      prevProvider.EventRange.DateRange !== currProvider.EventRange.DateRange ||
      prevProvider.UseCORS !== currProvider.UseCORS ||
      prevProvider.MaxTotal !== currProvider.MaxTotal ||
      prevProvider.ConvertFromUTC !== currProvider.ConvertFromUTC;

    if (settingsHaveChanged) {
      // only load from cache if the providers haven't changed, otherwise reload.
      this._loadEvents(false);
    }
  }

  /**
   * Renders the view. There can be three different outcomes:
   * 1. Web part isn't configured and we show the placeholders
   * 2. Web part is configured and we're loading events, or
   * 3. Web part is configured and events are loaded
   */
  public render(): React.ReactElement<ICalendarFeedSummaryProps> {
    const {
      isConfigured,
    } = this.props;

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    // if we're not configured, show the placeholder
    if (!isConfigured) {
      return <Placeholder
        iconName="Calendar"
        iconText={strings.PlaceholderTitle}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.ConfigureButton}
        onConfigure={this._onConfigure} />;
    }

    // we're configured, let's show stuff

    // put everything together in a nice little calendar view
    return (
      <div className={css(styles.calendarFeedSummary, styles.webPartChrome)} style={{ backgroundColor: semanticColors.bodyBackground }}>
        <div className={css(styles.webPartHeader, styles.headerSmMargin)}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
          />
        </div>
        <div className={styles.content}>
          {this._renderContent()}
        </div>
      </div>
    );
  }

  /**
   * Render your web part content
   */
  private _renderContent(): JSX.Element {
    const isNarrow: boolean = this.props.clientWidth < MaxMobileWidth;

    const {
      displayMode
    } = this.props;
    const {
      events,
      isLoading,
      error
    } = this.state;

    const isEditMode: boolean = displayMode === DisplayMode.Edit;
    const hasErrors: boolean = error !== undefined;
    const hasEvents: boolean = events.length > 0;

    if (isLoading) {
      // we're currently loading
      return (<div className={styles.spinner}><Spinner label={strings.Loading} /></div>);
    }

    if (hasErrors) {
      // we're done loading but got some errors
      if (!isEditMode) {
        // otherwise, just show a friendly message
        return (<div className={styles.errorMessage}>{strings.ErrorMessage}</div>);
      } else {
        // render a more advanced diagnostic of what went wrong
        return this._renderError();
      }
    }

    if (!hasEvents) {
      // we're done loading, no errors, but have no events
      return (<div className={styles.emptyMessage}>{strings.NoEventsMessage}</div>);
    }

    // we're loaded, no errors, and got some events
    if (isNarrow) {
      return this._renderNarrowList();
    } else {
      return this._renderNormalList();
    }
  }

  /**
   * Tries to make sense of the returned error messages and provides
   * (hopefully) helpful guidance on how to fix the issue.
   * It isn't the best piece of coding I've seen. I'm open to suggested improvements
   */
  private _renderError(): JSX.Element {
    const { error } = this.state;
    const { provider } = this.props;
    let errorMsg: string = strings.ErrorMessage;
    switch (error) {
      case "Not Found":
        errorMsg = strings.ErrorNotFound;
        break;
      case "Failed to fetch":
        if (!provider.UseCORS) {
          // maybe it is because of mixed content?
          if (provider.FeedUrl.toLowerCase().substr(0, 7) === "http://") {
            errorMsg = strings.ErrorMixedContent;
          } else {
            errorMsg = strings.ErrorFailedToFetchNoProxy;
          }
        } else {
          errorMsg = strings.ErrorFailedToFetch;
        }
        break;
      default:
        // specific provider messages
        if (provider.Name === CalendarServiceProviderType.RSS) {
          switch (error) {
            case "No result":
              errorMsg = strings.ErrorRssNoResult;
              break;
            case "No root":
              errorMsg = strings.ErrorRssNoRoot;
              break;
            case "No channel":
              errorMsg = strings.ErrorRssNoChannel;
              break;
          }
        } else if (provider.Name === CalendarServiceProviderType.iCal &&
          error.indexOf("Unable to get property 'property' of undefined or null reference") !== -1) {
          errorMsg = strings.ErrorInvalidiCalFeed;
        } else if (provider.Name === CalendarServiceProviderType.WordPress && error.indexOf("Failed to read") !== -1) {
          errorMsg = strings.ErrorInvalidWordPressFeed;
        }
    }

    return (<div className={styles.errorMessage} >
      <div className={styles.moreDetails}>
        {errorMsg}
      </div>
    </div>);
  }

  /**
   * Renders a narrow view of the calendar feed when the webpart is less than 480 pixels
   */
  private _renderNarrowList(): JSX.Element {
    const {
      events,
      currentPage
    } = this.state;

    const { maxEvents } = this.props;

    // if we're in edit mode, let's not make the events clickable
    const isEditMode: boolean = this.props.displayMode === DisplayMode.Edit;

    let pagedEvents: ICalendarEvent[] = events;
    let usePaging: boolean = false;

    if (maxEvents > 0 && events.length > maxEvents) {
      // calculate the page size
      const pageStartAt: number = maxEvents * (currentPage - 1);
      const pageEndAt: number = (maxEvents * currentPage);

      pagedEvents = events.slice(pageStartAt, pageEndAt);
      usePaging = true;
    }

    return (<FocusZone
      direction={FocusZoneDirection.vertical}
      isCircularNavigation={false}
      data-automation-id={"narrow-list"}
      aria-label={isEditMode ? strings.FocusZoneAriaLabelEditMode : strings.FocusZoneAriaLabelReadMode}
    >
      <List
        items={pagedEvents}
        onRenderCell={(item, _index) => (
          <EventCard
            isEditMode={isEditMode}
            event={item}
            isNarrow={true}
            themeVariant={this.props.themeVariant}
          />
        )} />
      {usePaging &&
        <Pagination
          showPageNum={false}
          currentPage={currentPage}
          itemsCountPerPage={maxEvents}
          totalItems={events.length}
          onPageUpdate={this._onPageUpdate} />
      }
    </FocusZone>
    );
  }

  private _onPageUpdate = (pageNumber: number): void => {
    this.setState({
      currentPage: pageNumber
    });
  }
  /**
   * Render a normal view for devices that are wider than 480
   */
  private _renderNormalList(): JSX.Element {
    const {
      events } = this.state;
    const isEditMode: boolean = this.props.displayMode === DisplayMode.Edit;

    return (<div>
      <div>
        <div role="application">
          <FilmstripLayout
            ariaLabel={strings.FilmStripAriaLabel}
            clientWidth={this.props.clientWidth}
            themeVariant={this.props.themeVariant}
          >
            {events.map((event: ICalendarEvent, index: number) => {
              return (<EventCard
                key={`eventCard${index}`}
                isEditMode={isEditMode}
                event={event}
                isNarrow={false}
                themeVariant={this.props.themeVariant} />
              );
            })}
          </FilmstripLayout>
        </div>
      </div>
    </div>);
  }

  /**
   * When users click on the Configure button, we display the property pane
   */
  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  /**
   * Load events from the cache or, if expired, load from the event provider
   */
  private async _loadEvents(useCacheIfPossible: boolean): Promise<void> {
    // before we do anything with the data provider, let's make sure that we don't have stuff stored in the cache

    // load from cache if: 1) we said to use cache, and b) if we have something in cache
    if (useCacheIfPossible && localStorage.getItem(CacheKey)) {
      let feedCache: IFeedCache = JSON.parse(localStorage.getItem(CacheKey));

      const { Name, FeedUrl } = this.props.provider;
      const cacheStillValid: boolean = moment().isBefore(feedCache.expiry);

      // make sure the cache hasn't expired or that the settings haven't changed
      if (cacheStillValid && feedCache.feedType === Name && feedCache.feedUrl === FeedUrl) {
        this.setState({
          isLoading: false,
          events: feedCache.events
        });
        return;
      }
    }

    // nothing in cache, load fresh
    const dataProvider: ICalendarService = this.props.provider;
    if (dataProvider) {
      this.setState({
        isLoading: true
      });

      try {
        let events = await dataProvider.getEvents();
        if (dataProvider.MaxTotal > 0) {
          events = events.slice(0, dataProvider.MaxTotal);
        }
        // don't cache in the case of errors
        this.setState({
          isLoading: false,
          error: undefined,
          events: events
        });
        return;
      }
      catch (error) {
        console.log("Exception returned by getEvents", error.message);
        this.setState({
          isLoading: false,
          error: error.message,
          events: []
        });
      }
    }
  }
}
