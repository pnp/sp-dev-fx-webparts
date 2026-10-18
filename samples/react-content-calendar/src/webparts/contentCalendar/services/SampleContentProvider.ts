import {
  ContentStatus,
  IContentCalendarConfig,
  IContentItem,
  IDateRange,
} from "../models"
import { resolveContentType } from "../utils/contentTypeResolver"
import { addDays } from "../utils/dateUtils"
import { IContentService, ICreateItemPayload } from "./IContentService"

// In-memory demo data so the web part renders usefully on first drop, before an
// editor configures a real list. This is intentionally isolated from the live
// PnPjs path — ContentService delegates here only when no list is configured.
export class SampleContentProvider implements IContentService {
  // Deterministic spread of items across the month the range falls in.
  public async getItems(
    range: IDateRange,
    config: IContentCalendarConfig,
  ): Promise<IContentItem[]> {
    const enabled = config.contentTypes.filter((t) => t.enabled)
    if (enabled.length === 0) return []

    const titles: Record<string, string[]> = {
      News: ["Quarterly update", "Leadership Q&A", "Office reopening"],
      Event: ["All-hands meeting", "Lunch & learn", "Team offsite"],
      FAQ: ["Benefits FAQ", "IT support FAQ"],
      Job: ["Senior Developer", "UX Designer"],
      Incident: ["VPN outage", "Email delays"],
      Notification: ["Policy update", "Maintenance window"],
      Newsletter: ["July newsletter", "Weekly digest"],
      Page: ["New intranet homepage", "Onboarding guide"],
      Placeholder: ["Reserved — campaign", "Reserved — launch"],
    }

    const items: IContentItem[] = []
    const anchor = new Date(range.start)
    // Seed a handful of items per enabled type on spaced-out days.
    enabled.forEach((type, typeIndex) => {
      const names = titles[type.name] ?? [`${type.name} item`]
      names.forEach((title, i) => {
        const dayOffset = 3 + typeIndex * 2 + i * 5
        const start = addDays(anchor, dayOffset % 27)
        items.push({
          id: `sample-${type.name}-${i}`,
          title,
          contentType: type.name,
          start,
          status:
            type.name === "Placeholder"
              ? ContentStatus.Draft
              : ContentStatus.Scheduled,
          color: type.color,
          icon: type.icon,
          isPlaceholder: type.name === "Placeholder",
          owner: "Sample Author",
          author: { name: "Alex Wilber", email: "alexw@contoso.com" },
          editor: { name: "Megan Bowen", email: "meganb@contoso.com" },
          created: addDays(start, -7),
          modified: addDays(start, -1),
        })
      })
    })
    return items
  }

  public async createItem(
    contentType: string,
    payload: ICreateItemPayload,
    config: IContentCalendarConfig,
  ): Promise<IContentItem> {
    const type = resolveContentType(contentType, config.contentTypes)
    return {
      id: `sample-new-${Date.now()}`,
      title: payload.title,
      contentType: type.name,
      start: payload.date,
      end: payload.end,
      status: ContentStatus.Draft,
      color: type.color,
      icon: type.icon,
      isPlaceholder: type.name === "Placeholder",
    }
  }

  public async updateItem(): Promise<void> {
    // No-op for sample data.
  }

  public async deleteItem(): Promise<void> {
    // No-op for sample data.
  }

  public async createPage(): Promise<{ url: string }> {
    // Page creation requires the live SharePoint web (ContentService).
    throw new Error("Creating a page isn't available with sample data.")
  }
}
