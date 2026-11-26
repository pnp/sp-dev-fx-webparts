import {
  ContentStatus,
  IContentCalendarConfig,
  IContentItem,
  IDateRange,
} from "../models"
import { resolveContentType } from "../utils/contentTypeResolver"

const KEY_PREFIX = "contentCalendar.placeholders."

// A locally-reserved date slot, persisted to localStorage until it's replaced
// by real content. Not stored in SharePoint.
export interface IStoredPlaceholder {
  id: string
  title: string
  date: string // ISO
  notes?: string
  createdAt: string // ISO
}

// Persists placeholders in localStorage, scoped per web-part instance so two
// calendars on the same page don't share reservations.
export class PlaceholderStore {
  private readonly _key: string

  constructor(scope: string) {
    this._key = `${KEY_PREFIX}${scope}`
  }

  public getAll(): IStoredPlaceholder[] {
    try {
      const raw = window.localStorage.getItem(this._key)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? (parsed as IStoredPlaceholder[]) : []
    } catch {
      return []
    }
  }

  public add(input: { title: string; date: Date; notes?: string }): IStoredPlaceholder {
    const placeholder: IStoredPlaceholder = {
      id: `ph-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`,
      title: input.title,
      date: input.date.toISOString(),
      notes: input.notes,
      createdAt: new Date().toISOString(),
    }
    const all = this.getAll()
    all.push(placeholder)
    this._save(all)
    return placeholder
  }

  public remove(id: string): void {
    this._save(this.getAll().filter((p) => p.id !== id))
  }

  private _save(items: IStoredPlaceholder[]): void {
    try {
      window.localStorage.setItem(this._key, JSON.stringify(items))
    } catch {
      // Storage unavailable or full — reservations just won't persist.
    }
  }
}

// Converts stored placeholders that fall within the visible range into
// renderable items, resolving the Placeholder type's color/icon from config.
export function placeholdersToItems(
  placeholders: IStoredPlaceholder[],
  config: IContentCalendarConfig,
  range: IDateRange,
): IContentItem[] {
  const type = resolveContentType("Placeholder", config.contentTypes)
  return placeholders
    .map((p) => ({ p, start: new Date(p.date) }))
    .filter(({ start }) => start >= range.start && start < range.end)
    .map(({ p, start }) => ({
      id: p.id,
      title: p.title,
      contentType: "Placeholder",
      start,
      status: ContentStatus.Draft,
      color: type.color,
      icon: type.icon,
      isPlaceholder: true,
    }))
}
