/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import * as strings from "CalendarWebPartStrings";

import {
  CalendarControl,
  EMessageType,
  IStrings,
  RenderSpinner,
  ShowMessage,
  Stack,
} from "@nuvemerudita/react-controls";
import { IEvent, IUnifiedCalendar } from "@nuvemerudita/m365-hooks";

import { IEvent as ICalendarEvent } from "@nuvemerudita/react-controls";
import { ICalendarProps } from "./ICalendarProps";
import { Subtitle1 } from "@fluentui/react-components";
import { Theme } from "@fluentui/react";
import { convertThemeV8toV9 } from "../utils/themeUtils";
import { useCalendars } from "./../hooks/useCalendars";
import { usePolling } from "../hooks/usePooling";
import { useUtils } from "../utils/useUtils";

interface state {
  refresh: boolean;
  calendarEvents: ICalendarEvent[];
  isLoading: boolean;
  error: Error | undefined;
}

const calendarStrings: IStrings = {
  calendarControl: strings.calendarControl,
  selectCalendarView: strings.selectCalendarView,
  eventPopoverCard: strings.eventPopoverCard,
  eventDetailsPopover: strings.eventDetailsPopover,
  dayView: strings.dayView,
  toolbar: strings.toolbar,
  weekView: strings.weekView,
  calendarMonth: strings.calendarMonth,
  selectWeek: strings.selectWeek,
};

const USER_PHOTO_URL = "/_layouts/15/userphoto.aspx?size=m&accountname=";

export const CalendarAppControl: React.FunctionComponent<ICalendarProps> = (
  props: React.PropsWithChildren<ICalendarProps>
) => {
  const {
    theme,
    hasTeamsContext,
    themeString,
    context,
    title,
    height,
    defaultView,
    selectedCalendars = [],
    autoRefresh,
    refreshInterval,
  } = props;

  const { getEventsForMonth } = useCalendars(context);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const eventsCalendarRef = React.useRef<ICalendarEvent[]>([]);

  const { formatConsoleMessage } = useUtils();
  const [state, setState] = React.useState<state>({
    refresh: false,
    calendarEvents: [],
    isLoading: true,
    error: undefined,
  });

  const { isLoading } = state;
  const Fui9Theme = React.useMemo(
    () => convertThemeV8toV9(theme as Theme, hasTeamsContext, themeString),
    [theme, hasTeamsContext, themeString]
  );

  const mappingEvents = React.useCallback(
    async (events: IEvent[]): Promise<ICalendarEvent[]> => {
      const calendarEvents: ICalendarEvent[] = [];
      for (const event of events) {
        const calendarEvent: ICalendarEvent = {
          id: event.id!,
          title: event.subject!,
          start: event.start?.dateTime || "",
          end: event.end?.dateTime || "",
          location: event.location?.displayName || "",
          category: event.categories?.[0] || "No Category",
          description: event.body?.content || "",
          attendees:
            event.attendees?.map((attendee) => ({
              email: attendee?.emailAddress?.address || "",
              name: attendee.emailAddress?.name || "",
              id: attendee.emailAddress?.address || "",
              imageUrl: `${context?.pageContext?.web?.absoluteUrl}${USER_PHOTO_URL}${attendee.emailAddress?.address}`,
            })) || [],
          isFullDay: event.isAllDay!,
          weblink: event.webLink || "",
          enableOnHouver: true,
          color: event.color,
        };
        calendarEvents.push(calendarEvent);
      }
      return calendarEvents;
    },
    [context]
  );

  // Get events for the month
  const getEvents = React.useCallback(
    async (calendars: IUnifiedCalendar[], year: number, month: number) => {
      const calendarEvents = await getEventsForMonth(calendars, year, month);
      const mappedEvents = await mappingEvents(calendarEvents);
      eventsCalendarRef.current = mappedEvents;
      setState((prev) => ({
        ...prev,
        calendarEvents: mappedEvents,
        isLoading: false,
      }));
    },
    [getEventsForMonth, mappingEvents]
  );
  // Handle month change
  const handleMonthChange = React.useCallback(
    async (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      await getEvents(selectedCalendars, year, month);
    },
    [selectedCalendars]
  );

  // Get events on mount
  React.useEffect(() => {
    (async () => {
      try {
        await getEvents(selectedCalendars, currentYear, currentMonth);
      } catch (error) {
        formatConsoleMessage({
          appName: "CalendarAppControl",
          functionName: "useEffect",
          messageType: "error",
          message: (error as Error).message,
        });
        setState((prev) => ({
          ...prev,
          error: error as Error,
          isLoading: false,
        }));
      }
    })();
  }, [selectedCalendars]);
  // Polling for events if autoRefresh is enabled
  if (autoRefresh) {
    usePolling(async () => {
      await getEvents(selectedCalendars, currentYear, currentMonth);
    }, refreshInterval * 60000);
  }

  if (isLoading) {
    return <RenderSpinner size="medium" />;
  }
  if (state.error) {
    return (
      <ShowMessage
        message={state.error.message}
        messageType={EMessageType.ERROR}
      />
    );
  }
  console.log(eventsCalendarRef.current);
  return (
    <>
      <Stack RowGap={10} horizontalAlign="center" width={"100%"}>
        <Subtitle1>{title}</Subtitle1>
        <CalendarControl
          events={eventsCalendarRef.current}
          theme={Fui9Theme}
          height={height}
          onMonthChange={handleMonthChange}
          defaultView={defaultView}
          strings={calendarStrings}
        />
      </Stack>
    </>
  );
};
