/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { tokens } from "@fluentui/react-components";
import { Provider as JotaiProvider } from "jotai";
import {
  FluentUIProvider,
  UniversalProvider,
  LocalizationProvider,
  EventFeed,
  IEventFeedItem,
  StackV2,
  TypographyControl,
} from "@spteck/react-controls-v2";
import {
  useEventManagement,
  ECalendarType,
  usePolling,
  IEvent,
} from "@spteck/m365-hooks";

import { ICalendarEventWithSource } from "../models/ICalendarEventWithSource";

import { IEventFeedWebPartRootProps } from "../models/IEventFeedWebPartRootProps";
import PlaceHolder from "./PlaceHolder/PlaceHolder";
import { EmptyState } from "./EmptyState/EmptyState";
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { mapEventToFeedItem } from "../utils/mappers";
import { FilterEvents } from "./FilterEvents/FilterEvents";
import * as strings from "EventsFeedWebPartStrings";
import { EventFeedAgendaSkeleton } from "./EventFeedAgendaSkeleton/EventFeedAgendaSkeleton";
import { EventFeedGridSkeleton } from "./EventFeedGridSkeleton/EventFeedGridSkeleton";
import { EventFeedListSkeleton } from "./EventFeedListSkeleton/EventFeedListSkeleton";
import { EventFeedFilmstripSkeleton } from "./EventFeedFilmstripSkeleton/EventFeedFilmstripSkeleton";
import { EventFeedMarqueeSkeleton } from "./EventFeedMarqueeSkeleton/EventFeedMarqueeSkeleton";
import { EventFeedCarouselSkeleton } from "./EventFeedCarouselSkeleton/EventFeedCarouselSkeleton";
import { EventFeedFeatureSkeleton } from "./EventFeedFeatureSkeleton/EventFeedFeatureSkeleton";
import { EventFeedMasonrySkeleton } from "./EventFeedMasonrySkeleton/EventFeedMasonrySkeleton";

interface IEventFeedContentProps extends IEventFeedWebPartRootProps {
  startDateTime: string;
  endDateTime: string;
}

const EventFeedContent: React.FC<IEventFeedContentProps> = ({
  spfxContext,
  layout,
  height,
  marqueeDirection,
  headlineLines,
  descriptionLines,
  allowDrag,
  showDescription,
  showMeta,
  showLocation,
  showOrganizer,
  selectedCalendars,
  maxEvents,
  refreshIntervalMinutes,
  onConfigure,
  startDateTime,
  endDateTime,
}) => {
  const selectedCalendarIdsKey = selectedCalendars.map((c) => c.id + c.type).join(",");

  const { listEvents } = useEventManagement(spfxContext as never);

  const listEventsRef = useRef(listEvents);
  listEventsRef.current = listEvents;

  const [items, setItems] = React.useState<IEventFeedItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const doFetchRef = useRef<() => Promise<IEventFeedItem[]>>();
  doFetchRef.current = async (): Promise<IEventFeedItem[]> => {
    if (selectedCalendars.length === 0) return [];

    const results = await Promise.all(
      selectedCalendars.map(async (calendar): Promise<ICalendarEventWithSource[]> => {
        try {
          const events = await listEventsRef.current(calendar, startDateTime, endDateTime) as ICalendarEventWithSource[];
          return events.map((e: IEvent): ICalendarEventWithSource => ({
            ...e,
            ...(calendar.type === ECalendarType.SHAREPOINT
              ? { _siteUrl: calendar.siteUrl, _listId: calendar.id }
              : {}),
          }));
        } catch {
          return [];
        }
      })
    );

    return ([] as ICalendarEventWithSource[])
      .concat(...results)
      .sort(
        (a: ICalendarEventWithSource, b: ICalendarEventWithSource) =>
          new Date(a.start?.dateTime ?? 0).getTime() -
          new Date(b.start?.dateTime ?? 0).getTime()
      )
      .slice(0, maxEvents)
      .map(mapEventToFeedItem);
  };

  // Initial load — shows skeleton; re-runs when data source config changes
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const fetched = await doFetchRef.current!();
        if (!cancelled) setItems(fetched);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedCalendarIdsKey, maxEvents, startDateTime, endDateTime]);

  // Background refresh — silent (no skeleton), pauses when tab is hidden
  const backgroundRefresh = useCallback(async (): Promise<void> => {
    try {
      const fetched = await doFetchRef.current!();
      setItems(fetched);
    } catch {
      // silent background refresh — errors are intentionally swallowed
    }
  }, []);

  usePolling(backgroundRefresh, (refreshIntervalMinutes ?? 5) * 60 * 1000, {
    immediate: false,
    pauseWhenHidden: true,
  });

  if (selectedCalendars.length === 0) {
    return (
      <PlaceHolder
        title={strings.EmptyStateTitleLabel}
        description={strings.EmptyStateDescriptionLabel}
        buttonLabel={strings.EmptyStateConfigureLabel}
        onConfigure={onConfigure}
        height={height}
      />
    );
  }

  if (!isLoading && items.length === 0) {
    return <EmptyState height={height} />;
  }

  if (isLoading) {
    switch (layout) {
      case "list":
      case "compactList":
        return <EventFeedListSkeleton height={height} />;
      case "filmstrip":
        return <EventFeedFilmstripSkeleton height={height} />;
      case "carousel":
        return <EventFeedCarouselSkeleton height={height} />;
      case "feature":
        return <EventFeedFeatureSkeleton height={height} />;
      case "marquee":
        return <EventFeedMarqueeSkeleton height={height} />;
      case "masonry":
        return <EventFeedMasonrySkeleton height={height} />;
      case "grid":
        return <EventFeedGridSkeleton height={height} />;
      case "agenda":
      default:
        return <EventFeedAgendaSkeleton height={height} />;
    }
  }

  return (
    <EventFeed
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layout={(layout === 'compactList' ? 'minilist' : layout) as any}
      items={items}
      height={height}
      marqueeDirection={marqueeDirection}
      headlineLines={headlineLines}
      descriptionLines={descriptionLines}
      draggable={allowDrag}
      showDescription={showDescription}
      showMeta={showMeta}
      showLocation={showLocation}
      showOrganizer={showOrganizer}
    />
  );
};

export const EventFeedWebPartRoot: React.FC<IEventFeedWebPartRootProps> = (
  props
) => {
  const [startDateTime, setStartDateTime] = useState<string>(
    () => new Date().toISOString()
  );
  const [endDateTime, setEndDateTime] = useState<string>(
    () => new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
  );
  const [filterDescription, setFilterDescription] = useState<string>(
    strings.FilterEventsDescriptionAllUpcoming
  );

  const handleDateRangeChange = useCallback(
    (start: string, end: string): void => {
      setStartDateTime(start);
      setEndDateTime(end);
    },
    []
  );

  return (
    <JotaiProvider>
      <FluentUIProvider
        theme={props.theme}
        applicationName="events-feed-webpart"
        targetDocument={document}
        styles={{ backgroundColor: "transparent", padding: 10 }}
        applyStylesToPortals
      >
        <UniversalProvider context={props.context}>
          <LocalizationProvider
            locale={props.context?.pageContext?.cultureInfo?.currentUICultureName}
          >
            <ErrorBoundary>
              <StackV2 direction="vertical">
                <StackV2 direction="vertical" paddingBottom="xxl" gap="xs">
                  <StackV2
                    direction="horizontal"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {!!props.title && (
                      <TypographyControl fontWeight="semibold" fontSize="l">
                        {props.title}
                      </TypographyControl>
                    )}
                    {props.showFilters && props.layout !== 'compactList' && (
                      <FilterEvents
                        onChange={handleDateRangeChange}
                        onDescriptionChange={setFilterDescription}
                      />
                    )}
                  </StackV2>
                  {props.showFilters && props.layout !== 'compactList' && !!filterDescription && (
                    <TypographyControl fontSize="s" color={tokens.colorNeutralForeground2}>
                      {filterDescription}
                    </TypographyControl>
                  )}
                </StackV2>
                <EventFeedContent
                  {...props}
                  startDateTime={startDateTime}
                  endDateTime={endDateTime}
                />
              </StackV2>
            </ErrorBoundary>
          </LocalizationProvider>
        </UniversalProvider>
      </FluentUIProvider>
    </JotaiProvider>
  );
};

EventFeedWebPartRoot.displayName = "EventFeedWebPartRoot";

export default EventFeedWebPartRoot;
