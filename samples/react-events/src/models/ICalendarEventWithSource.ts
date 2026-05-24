import { IEvent } from "@spteck/m365-hooks";

/**
 * An IEvent enriched with optional source coordinates and banner URL.
 *
 * - `bannerImageUrl` is set by m365-hooks (useSharePointCalendarEvents) from the BannerUrl field.
 * - `_siteUrl` / `_listId` are injected by EventFeedWebPartRoot to build Event.aspx deep links.
 */
export interface ICalendarEventWithSource extends IEvent {
  bannerImageUrl?: string;
  _siteUrl?: string;
  _listId?: string;
}
