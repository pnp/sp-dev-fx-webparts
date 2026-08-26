/**
 * NavigationLinksService
 *
 * Data access layer for the Navigation Tabs web part. Handles:
 * - Fetching active links from a SharePoint list via renderListDataAsStream
 * - Incrementing the ClickCount field when a user clicks a link
 * - Creating a new SharePoint list with all required columns and a default view
 *
 * Uses an in-memory cache with a 5-minute TTL to reduce REST API calls
 * during normal page browsing. The cache is keyed by list GUID.
 */

import { getSP } from './pnpjsConfig';
import { INavigationLink } from '../models/INavigationLink';

/** Shape of a single cache entry: the fetched data plus an expiry timestamp. */
interface ICacheEntry {
  data: INavigationLink[];
  expiry: number;
}

/** Cache time-to-live: 5 minutes in milliseconds. */
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/** In-memory cache keyed by SharePoint list GUID. */
const cache: Map<string, ICacheEntry> = new Map();

export class NavigationLinksService {

  /**
   * Fetches all active navigation links from the specified SharePoint list.
   *
   * Uses `renderListDataAsStream` instead of the standard REST items endpoint
   * because the standard endpoint does NOT return Thumbnail/Image column data
   * when `$select` is used. `renderListDataAsStream` is the same API that
   * SharePoint's own list views use internally, and it reliably includes
   * Image field values.
   *
   * Results are cached for 5 minutes to avoid redundant API calls.
   *
   * @param listId - GUID of the SharePoint list to query.
   * @returns Array of INavigationLink objects sorted by SortOrder then Title.
   */
  public static async getLinks(listId: string): Promise<INavigationLink[]> {
    if (!listId) {
      return [];
    }

    // Return cached data if it hasn't expired yet
    const now = Date.now();
    const cached = cache.get(listId);
    if (cached && cached.expiry > now) {
      return cached.data;
    }

    const sp = getSP();

    // CAML query: only active items, sorted by SortOrder then Title.
    // ViewFields limits the columns returned to only what we need.
    const result = await sp.web.lists.getById(listId).renderListDataAsStream({
      ViewXml: `<View>
        <Query>
          <Where><Eq><FieldRef Name="IsActive" /><Value Type="Boolean">1</Value></Eq></Where>
          <OrderBy>
            <FieldRef Name="SortOrder" Ascending="TRUE" />
            <FieldRef Name="Title" Ascending="TRUE" />
          </OrderBy>
        </Query>
        <ViewFields>
          <FieldRef Name="ID" />
          <FieldRef Name="Title" />
          <FieldRef Name="LinkURL" />
          <FieldRef Name="Category" />
          <FieldRef Name="LinkDescription" />
          <FieldRef Name="LinkIcon" />
          <FieldRef Name="SortOrder" />
          <FieldRef Name="OpenInNewTab" />
        </ViewFields>
        <RowLimit>500</RowLimit>
      </View>`,
    });

    // Map the raw row data into typed INavigationLink objects.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const links: INavigationLink[] = (result.Row || []).map((item: any) => {
      // Derive the list's server-relative path from the item's FileRef.
      // FileRef looks like "/sites/X/Lists/NavLinks/1_.000" — strip the last segment.
      const listPath = item.FileRef ? item.FileRef.replace(/\/[^/]+$/, '') : '';
      return {
        id: parseInt(item.ID, 10),
        title: item.Title || '',
        linkUrl: item.LinkURL || '',
        category: item.Category || 'General',
        linkDescription: item.LinkDescription || '',
        iconUrl: NavigationLinksService._parseImageField(item.LinkIcon, item.ID, listPath),
        sortOrder: parseInt(item.SortOrder, 10) || 100,
        openInNewTab: item.OpenInNewTab !== '0',
      };
    });

    // Store in cache with a fresh TTL
    cache.set(listId, { data: links, expiry: now + CACHE_TTL_MS });
    return links;
  }

  /**
   * Increments the ClickCount field on a list item by 1.
   *
   * This is a fire-and-forget operation — failures are logged but never
   * block the user's navigation. For same-tab navigations the caller
   * waits for this promise; for new-tab navigations it's truly fire-and-forget.
   *
   * @param listId - GUID of the SharePoint list.
   * @param itemId - ID of the list item that was clicked.
   */
  public static async trackClick(listId: string, itemId: number): Promise<void> {
    if (!listId || !itemId) return;

    try {
      const sp = getSP();
      const item = sp.web.lists.getById(listId).items.getById(itemId);

      // Read current count, then increment. Not atomic, but acceptable for analytics.
      const current = await item.select('ClickCount')();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const count = (current as any).ClickCount || 0;
      await item.update({ ClickCount: count + 1 });
    } catch (err) {
      // Fire-and-forget: don't block navigation on tracking failure
      console.warn('NavigationTabs: Failed to track click', err);
    }
  }

  /**
   * Creates a new SharePoint list pre-configured with all the columns
   * required by the Navigation Tabs web part.
   *
   * Columns created:
   * - LinkURL (Hyperlink, required)
   * - Category (Choice, required) — default choices: General, Resources, Tools
   * - LinkDescription (Multiline plain text)
   * - LinkIcon (Thumbnail/Image)
   * - SortOrder (Number)
   * - OpenInNewTab (Yes/No)
   * - IsActive (Yes/No)
   * - ClickCount (Number, hidden from new/edit forms)
   *
   * All custom columns are also added to the list's default view.
   *
   * @param listName - Display name for the new list.
   * @returns The GUID of the newly created list.
   */
  public static async createList(listName: string): Promise<string> {
    const sp = getSP();

    // Create a Generic List (template 100)
    const listInfo = await sp.web.lists.add(listName, 'Navigation links for the Navigation Tabs web part', 100);
    const list = sp.web.lists.getById(listInfo.Id);
    const fields = list.fields;

    // LinkURL - Hyperlink field for the destination URL
    await fields.addUrl('LinkURL', {
      Description: 'Destination URL for the link',
      Required: true,
      Group: 'Navigation Tabs',
    });

    // Category - Choice field for grouping links into tabs
    await fields.addChoice('Category', {
      Choices: ['General', 'Resources', 'Tools'],
      Description: 'Tab category for grouping links',
      Required: true,
      Group: 'Navigation Tabs',
    });

    // LinkDescription - Multiline plain text shown in Card layout
    await fields.addMultilineText('LinkDescription', {
      NumberOfLines: 3,
      RichText: false,
      Description: 'Shown in Card layout',
      Group: 'Navigation Tabs',
    });

    // LinkIcon - Image/Thumbnail field (must use CAML XML; no typed API for Thumbnail fields)
    await fields.createFieldAsXml(
      '<Field Type="Thumbnail" DisplayName="LinkIcon" StaticName="LinkIcon" Name="LinkIcon" Description="Icon image for the link" Group="Navigation Tabs" />'
    );

    // SortOrder - Number field controlling display order within a category
    await fields.addNumber('SortOrder', {
      MinimumValue: 0,
      Description: 'Sort order within category. Default: 100',
      Group: 'Navigation Tabs',
    });

    // OpenInNewTab - Boolean field to override the web part's default new-tab behavior
    await fields.addBoolean('OpenInNewTab', {
      Description: 'Whether the link opens in a new tab',
      Group: 'Navigation Tabs',
    });

    // IsActive - Boolean field to soft-delete links without removing them
    await fields.addBoolean('IsActive', {
      Description: 'Set to No to hide a link without deleting it',
      Group: 'Navigation Tabs',
    });

    // ClickCount - Number field for analytics, hidden from new/edit forms.
    // Uses CAML XML because the REST API doesn't support ShowInNewForm/ShowInEditForm.
    await fields.createFieldAsXml(
      '<Field Type="Number" DisplayName="ClickCount" StaticName="ClickCount" Name="ClickCount" Min="0" Description="Click tracking counter" Group="Navigation Tabs" ShowInNewForm="FALSE" ShowInEditForm="FALSE" />'
    );

    // Add all custom columns to the list's default view so they're visible immediately
    const defaultView = await list.defaultView();
    const view = list.views.getById(defaultView.Id);
    const viewFields = view.fields;
    const fieldsToAdd = ['LinkURL', 'Category', 'LinkIcon', 'SortOrder', 'OpenInNewTab', 'IsActive', 'ClickCount'];
    for (const fieldName of fieldsToAdd) {
      await viewFields.add(fieldName);
    }

    return listInfo.Id;
  }

  /**
   * Parses a SharePoint Image/Thumbnail field value into a usable URL.
   *
   * The Image column can return data in multiple formats depending on
   * how and where the image was uploaded:
   * - A JSON string that needs parsing (e.g., from renderListDataAsStream)
   * - An already-parsed object with serverUrl + serverRelativeUrl (Site Assets storage)
   * - An object with just a fileName (list item attachment storage)
   * - A plain URL string
   *
   * @param value    - Raw field value from the API response.
   * @param itemId   - List item ID, used to construct attachment URLs.
   * @param listPath - Server-relative path to the list, used for attachment URLs.
   * @returns Resolved image URL, or empty string if no image is available.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static _parseImageField(value: any, itemId?: string, listPath?: string): string {
    if (!value) return '';

    // Value may arrive as a JSON string or an already-parsed object
    let img = value;
    if (typeof value === 'string') {
      try { img = JSON.parse(value); } catch {
        // Plain URL string — use it directly if it looks like a valid path
        return value.startsWith('http') || value.startsWith('/') ? value : '';
      }
    }

    if (typeof img === 'object') {
      // Full URL available (image stored in Site Assets or similar library)
      if (img.serverUrl && img.serverRelativeUrl) {
        return img.serverUrl + img.serverRelativeUrl;
      }
      if (img.serverRelativeUrl) return img.serverRelativeUrl;

      // Image stored as a list item attachment — construct the URL from the fileName
      if (img.fileName && itemId && listPath) {
        return `${listPath}/Attachments/${itemId}/${img.fileName}`;
      }
      if (img.Url) return img.Url;
    }

    return '';
  }

  /** Clears the in-memory link cache. Useful after list modifications. */
  public static clearCache(): void {
    cache.clear();
  }
}
