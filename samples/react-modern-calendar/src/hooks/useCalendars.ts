import {
  IEvent,
  IUnifiedCalendar,
  useEventManagement,
} from "@nuvemerudita/m365-hooks";

import { AvatarNamedColor } from "@fluentui/react-components";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { useCallback } from "react";

interface IUseCalendars {
  getEventsForMonth: (
    calendars: IUnifiedCalendar[],
    year: number,
    month: number
  ) => Promise<IEvent[]>;
}

/**
 * useCallendars
 *
 * A hook that returns all events for a specified month from a list of calendars.
 * It fetches the events for each calendar in parallel using listEventsDelta with an OData filter
 * for optimal performance.
 *
 * @param context - The SPFx BaseComponentContext
 * @returns An object with a function getEventsForMonth that accepts an array of calendars, a year, and a month.
 */
export const useCalendars = (context: BaseComponentContext): IUseCalendars => {
  // Get the event management functions.
  const { listEvents } = useEventManagement(context);

  /**
   * getEventsForMonth
   *
   * For the provided calendars, retrieves all events that occur within the specified month and year.
   
   *
   * @param calendars - An array of unified calendar objects.
   * @param year - The target year (e.g., 2025).
   * @param month - The target month (1-12).
   * @returns A promise that resolves with an array of events for the specified month.
   */
  const getEventsForMonth = useCallback(
    async (
      calendars: IUnifiedCalendar[],
      year: number,
      month: number
    ): Promise<IEvent[]> => {
      // Calculate the start and end dates for the month.
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 1); // first day of the next month

      // If the events are cached, return them

      // Build the OData filter string.
      const startDateAndTime = monthStart.toISOString();
      const endDateAndTime = monthEnd.toISOString();

      // Run each calendar's event retrieval in parallel.
      const eventsByCalendarArrays = await Promise.all(
        calendars?.map(async (calendar) => {
          try {
            // Use listEvents  with the filter.
            const events: IEvent[] = await listEvents(
              calendar,
              startDateAndTime,
              endDateAndTime
            );
            // for each event set calendar color

            return events.map((event) => {
              event.color = calendar.color as AvatarNamedColor;
              return event;
            });
          } catch (error) {
            console.error(
              `Error fetching events for calendar ${calendar.id}:`,
              error
            );
            throw new Error(
              `Error fetching events for calendar ${calendar.id}: ${error}`
            );
          }
        })
      );

      // Flatten the arrays and return the combined list of events.
      return eventsByCalendarArrays.flat();
    },
    [listEvents]
  );

  return { getEventsForMonth };
};

export default useCalendars;
