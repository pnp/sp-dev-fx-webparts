function htmlToText(html: string | undefined): string | undefined {
  if (!html) return html;
  return new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
}

import { ICalendarEventWithSource } from "../models/ICalendarEventWithSource";
import { IEventFeedItem } from "@spteck/react-controls-v2";

/**
 * Maps an ICalendarEventWithSource (Graph-format event from @spteck/m365-hooks listEvents,
 * optionally enriched with _siteUrl/_listId for SharePoint deep links) to the
 * IEventFeedItem shape expected by the EventFeed control.
 */
export function mapEventToFeedItem(event: ICalendarEventWithSource): IEventFeedItem {
  return {
    id: event.id ?? '',
    title: event.subject ?? '',
    startDate: event.start?.dateTime ?? new Date().toISOString(),
    endDate: event.end?.dateTime,
    isAllDay: event.isAllDay ?? false,
    location: event.location?.displayName ?? undefined,
    organizer: event.organizer?.emailAddress?.name ?? undefined,
    description: htmlToText(event.bodyPreview ?? event.body?.content ?? undefined),
    imageUrl: event.bannerImageUrl ?? (event.extensions as Record<string, string> | undefined)?.bannerImageUrl,
    linkUrl:
      event._siteUrl && event._listId
        ? `${event._siteUrl}/_layouts/15/Event.aspx?ListGuid=${event._listId}&ItemId=${event.id}`
        : event.webLink ?? undefined,
    category:
      Array.isArray(event.categories) && event.categories.length > 0
        ? event.categories[0]
        : undefined,
    attendees: Array.isArray(event.attendees) ? event.attendees.length : undefined,
    isVirtual: event.isOnlineMeeting ?? undefined,
    joinUrl: event.onlineMeetingUrl ?? undefined,
  };
}
