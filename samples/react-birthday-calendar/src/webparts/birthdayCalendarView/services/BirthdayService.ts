import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IBirthday } from '../models/IBirthday';

interface ISPUserValue {
  Id?: number;
  Title?: string;
  EMail?: string;
  Name?: string;
}

interface ISPListItem {
  Id: number;
  Title: string;
  BDate: string;
}

interface ISPListItemsResponse {
  value: ISPListItem[];
  'odata.nextLink'?: string;
}

export class BirthdayService {
  public static async getBirthdays(
    spHttpClient: SPHttpClient,
    siteUrl: string,
    listName: string,
    dateFieldName: string,
    personFieldName?: string
  ): Promise<IBirthday[]> {
    const escapedListName: string = listName.replace(/'/g, "''");
    const baseUrl: string = siteUrl.replace(/\/$/, '');
    const listUrl: string = `${baseUrl}/_api/web/lists/getbytitle('${escapedListName}')/items`;

    const person: string | undefined = personFieldName ? personFieldName.trim() : undefined;
    let items: ISPListItem[];

    if (person) {
      try {
        items = await BirthdayService._fetchAllItems(
          spHttpClient,
          listName,
          baseUrl,
          `${listUrl}?$select=Id,Title,${dateFieldName},${person}/Title,${person}/EMail,${person}/Name` +
            `&$expand=${person}&$top=500`
        );
      } catch (err) {
        // A wrong person-column name should not break the calendar itself -- fall back to
        // the plain query so dates still render, just without profile details.
        console.warn(
          `[BirthdayCalendarView] Could not expand person column "${person}"; ` +
            `showing birthdays without profile details.`,
          err
        );
        items = await BirthdayService._fetchAllItems(
          spHttpClient,
          listName,
          baseUrl,
          `${listUrl}?$select=Id,Title,${dateFieldName}&$top=500`
        );
      }
    } else {
      items = await BirthdayService._fetchAllItems(
        spHttpClient,
        listName,
        baseUrl,
        `${listUrl}?$select=Id,Title,${dateFieldName}&$top=500`
      );
    }

    const birthdays: IBirthday[] = [];
    for (const item of items) {
      const fields: Record<string, unknown> = item as unknown as Record<string, unknown>;
      const rawDate: string = fields[dateFieldName] as string;
      if (!rawDate) {
        continue;
      }
      const parsed: Date = new Date(rawDate);
      if (isNaN(parsed.getTime())) {
        continue;
      }

      const user: ISPUserValue | undefined = person
        ? (fields[person] as ISPUserValue | undefined)
        : undefined;

      birthdays.push({
        id: item.Id,
        name: (user && user.Title) || item.Title,
        month: parsed.getUTCMonth(),
        day: parsed.getUTCDate(),
        loginName: BirthdayService._resolveLoginName(user),
        email: user ? user.EMail : undefined
      });
    }

    return birthdays;
  }

  /**
   * The expanded user value carries the claims login name in `Name`. When the list stores
   * only an address, rebuild the standard cloud membership claim from it.
   */
  private static _resolveLoginName(user: ISPUserValue | undefined): string | undefined {
    if (!user) {
      return undefined;
    }
    if (user.Name) {
      return user.Name;
    }
    return user.EMail ? `i:0#.f|membership|${user.EMail}` : undefined;
  }

  private static async _fetchAllItems(
    spHttpClient: SPHttpClient,
    listName: string,
    baseUrl: string,
    firstUrl: string
  ): Promise<ISPListItem[]> {
    const items: ISPListItem[] = [];
    let requestUrl: string | undefined = firstUrl;

    while (requestUrl) {
      const response: SPHttpClientResponse = await spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Failed to load list "${listName}" from ${baseUrl} (${response.status}): ${errorText}`);
      }

      const data: ISPListItemsResponse = await response.json();
      items.push(...data.value);
      requestUrl = data['odata.nextLink'];
    }

    return items;
  }
}
