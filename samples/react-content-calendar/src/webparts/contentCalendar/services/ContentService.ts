import { WebPartContext } from "@microsoft/sp-webpart-base"
import { spfi, SPFI, SPFx } from "@pnp/sp"
import "@pnp/sp/webs"
import "@pnp/sp/lists"
import "@pnp/sp/items"
import "@pnp/sp/fields"
import "@pnp/sp/content-types"
import "@pnp/sp/clientside-pages"
import "@pnp/sp/comments/clientside-page"
import { Caching } from "@pnp/queryable"

import {
  ALL_CONTENT_STATUSES,
  ContentStatus,
  IContentCalendarConfig,
  IContentItem,
  IDateRange,
  IFieldMapping,
  IPersonRef,
  SITE_PAGE_CONTENT_TYPE_ID,
} from "../models"
import { resolveContentType } from "../utils/contentTypeResolver"
import { IContentService, ICreateItemPayload } from "./IContentService"

type SpRow = Record<string, unknown>

interface IStatusFields {
  moderation?: string
  publishStart?: string
  firstPublished?: string
}

const STATUS_FIELD_NAMES = ["_ModerationStatus", "_PublishStartDate", "PublishStartDate", "FirstPublishedDate"]
// Prefix stamped onto session-cache keys so reads can be invalidated (e.g.
// after creating a page) without touching unrelated sessionStorage entries.
const CACHE_KEY_PREFIX = "cc-cache:"

// Built-in audit columns selected on every query. Author/Editor are person
// fields projected via $expand (see _expandFields). FileRef is the item's
// server-relative URL (the page URL for Site Pages).
const AUDIT_SELECT = [
  "Created",
  "Modified",
  "FileRef",
  "Author/Title",
  "Author/EMail",
  "Editor/Title",
  "Editor/EMail",
]

// Live SharePoint data layer (PnPjs). Components access it through IContentService.
export class ContentService implements IContentService {
  private readonly _sp: SPFI
  // Which status columns actually exist, per list (avoids a 400 on lists that
  // don't expose them). Resolved once per list.
  private readonly _statusFieldsCache = new Map<string, IStatusFields>()

  constructor(context: WebPartContext) {
    this._sp = spfi().using(SPFx(context))
  }

  public async getSitePagesListId(): Promise<string> {
    // Template 119 identifies Site Pages independently of its localized title.
    const lists = await this._sp.web.lists
      .select("Id")
      .filter("BaseTemplate eq 119")
      .top(1)<{ Id: string }[]>()
    if (!lists.length) {
      throw new Error("The current site does not have an accessible Site Pages library.")
    }
    return lists[0].Id
  }

  public async getPageContentTypes(listId: string): Promise<{ key: string; text: string }[]> {
    const types = await this._sp.web.lists.getById(listId).contentTypes
      .select("StringId", "Name")<{ StringId: string; Name: string }[]>()
    return types
      .filter((type) => type.StringId.toLowerCase().startsWith(SITE_PAGE_CONTENT_TYPE_ID.toLowerCase()))
      .map((type) => ({ key: type.StringId, text: type.Name }))
      .sort((a, b) => a.text.localeCompare(b.text))
  }

  public async getItems(
    range: IDateRange,
    config: IContentCalendarConfig,
  ): Promise<IContentItem[]> {
    if (!config.listId) {
      throw new Error("Site Pages is not configured. Open the web part properties to retry loading page content types.")
    }

    try {
      const items = await this._getFromSingleList(range, config)
      return items.sort((a, b) => a.start.getTime() - b.start.getTime())
    } catch (e) {
      throw new Error(
        `Failed to load calendar items. Check the list and field mappings. (${(e as Error).message})`,
      )
    }
  }

  public async createItem(
    contentType: string,
    payload: ICreateItemPayload,
    config: IContentCalendarConfig,
  ): Promise<IContentItem> {
    if (!config.listId) {
      throw new Error("Site Pages is not configured. Open the web part properties before creating an item.")
    }
    const type = resolveContentType(contentType, config.contentTypes)
    const fm = config.fieldMapping
    const list = this._sp.web.lists.getById(config.listId)

    const body: SpRow = { [fm.title]: payload.title, [fm.start]: payload.date.toISOString() }
    if (fm.end && payload.end) body[fm.end] = payload.end.toISOString()
    // Skip the built-in ContentType navigation — it isn't a settable scalar.
    if (fm.contentType && !this._isContentTypeNav(fm.contentType)) {
      body[fm.contentType] = type.sourceValue
    }
    if (fm.status) body[fm.status] = ContentStatus.Draft

    const added = await list.items.add(body)
    return {
      id: (added as SpRow).Id as number,
      title: payload.title,
      contentType: type.name,
      start: payload.date,
      end: payload.end,
      status: ContentStatus.Draft,
      color: type.color,
      icon: type.icon,
      isPlaceholder: type.name.toLowerCase() === "placeholder",
    }
  }

  public async updateItem(
    id: number | string,
    changes: Partial<IContentItem>,
    config: IContentCalendarConfig,
  ): Promise<void> {
    if (!config.listId) {
      throw new Error("Reschedule requires a single configured list.")
    }
    const fm = config.fieldMapping
    const body: SpRow = {}
    if (changes.start) body[fm.start] = changes.start.toISOString()
    if (fm.end && changes.end) body[fm.end] = changes.end.toISOString()
    if (fm.status && changes.status) body[fm.status] = changes.status
    await this._sp.web.lists.getById(config.listId).items.getById(Number(id)).update(body)
  }

  public async deleteItem(
    id: number | string,
    config: IContentCalendarConfig,
  ): Promise<void> {
    if (!config.listId) {
      throw new Error("Delete requires a single configured list.")
    }
    await this._sp.web.lists.getById(config.listId).items.getById(Number(id)).delete()
  }

  // Creates a modern Site Page in the site's Site Pages library and returns its
  // server-relative URL. Saved as a draft (not published). Optionally disables
  // the page comments.
  public async createPage(
    title: string,
    options?: { disableComments?: boolean },
  ): Promise<{ url: string }> {
    const page = await this._sp.web.addClientsidePage(
      pageFileName(title),
      title,
      "Article",
    )
    // save(false) persists without publishing, leaving the page as a draft.
    await page.save(false)
    if (options?.disableComments) {
      await page.disableComments()
    }
    // Drop cached reads so the new page appears on the next refresh.
    this._clearReadCache()
    const item = await page.getItem<{ FileRef: string }>("FileRef")
    return { url: item.FileRef }
  }

  // Removes this web part's session-cache entries (keys carry CACHE_KEY_PREFIX).
  private _clearReadCache(): void {
    try {
      const ss = window.sessionStorage
      const keys: string[] = []
      for (let i = 0; i < ss.length; i++) {
        const k = ss.key(i)
        if (k && k.indexOf(CACHE_KEY_PREFIX) !== -1) keys.push(k)
      }
      keys.forEach((k) => ss.removeItem(k))
    } catch {
      // sessionStorage unavailable — nothing to clear.
    }
  }

  // --- internals ---------------------------------------------------------

  // Read the configured Site Pages library, scoped to the visible range.
  private async _getFromSingleList(
    range: IDateRange,
    config: IContentCalendarConfig,
  ): Promise<IContentItem[]> {
    const fm = config.fieldMapping
    const sp = this._withCaching(config)
    const listId = config.listId as string
    const list = sp.web.lists.getById(listId)

    // Only select status columns that this list actually exposes.
    const statusFields = await this._resolveStatusFields(sp, listId)
    const selects = Array.from(
      new Set([
        ...this._selectFields(fm),
        ...Object.values(statusFields),
        "FieldValuesAsText/Created",
        ...[statusFields.publishStart, statusFields.firstPublished]
          .filter((field): field is string => !!field)
          .map((field) => `FieldValuesAsText/${field}`),
      ]),
    )

    const contentTypeId = config.contentTypeId || SITE_PAGE_CONTENT_TYPE_ID
    if (!/^0x[0-9a-f]+$/i.test(contentTypeId) ||
        !contentTypeId.toLowerCase().startsWith(SITE_PAGE_CONTENT_TYPE_ID.toLowerCase())) {
      throw new Error("Choose a valid page content type in the web part properties.")
    }
    const query = list.items
      .select(...selects)
      .filter(`(${this._effectiveRangeFilter(fm.start, range, statusFields)}) and startswith(ContentTypeId,'${contentTypeId}')`)
      .orderBy(fm.start, true)
      .top(config.maxItems)

    const expands = this._expandFields(fm)
    const rows = (await (expands.length
      ? query.expand(...expands)
      : query)()) as SpRow[]

    return rows.map((r) => this._mapRow(r, config, statusFields))
  }

  private _mapRow(
    row: SpRow,
    config: IContentCalendarConfig,
    statusFields: IStatusFields,
  ): IContentItem {
    const fm = config.fieldMapping
    // The built-in Content Type is a navigation property, not a scalar column,
    // so it must be read from the expanded ContentType.Name (see _expandFields).
    const rawType = fm.contentType
      ? this._isContentTypeNav(fm.contentType)
        ? str((row.ContentType as { Name?: string } | undefined)?.Name)
        : str(row[fm.contentType])
      : undefined
    const type = resolveContentType(rawType, config.contentTypes)

    // Effective calendar date: the scheduled publish date if the page has one,
    // otherwise the mapped start (Created). This places scheduled/draft pages on
    // the day they're scheduled for rather than when they were created.
    const scheduled =
      statusFields.publishStart
        ? str(row[statusFields.publishStart])
        : undefined
    const startRaw = scheduled ?? str(row[fm.start])
    const formatted = row.FieldValuesAsText as Record<string, string | undefined> | undefined
    const publishedRaw = statusFields.firstPublished
      ? str(row[statusFields.firstPublished])
      : undefined

    return {
      id: (row.Id ?? row.ID) as number,
      title: str(row[fm.title]) ?? "(untitled)",
      contentType: type.name,
      start: new Date(startRaw as string),
      end: fm.end && row[fm.end] ? new Date(str(row[fm.end]) as string) : undefined,
      status: this._deriveStatus(row, statusFields, fm),
      owner: fm.owner ? str(row[fm.owner]) : undefined,
      // Fall back to FileRef (the page's server-relative URL) when no url column
      // is mapped, so the detail popover can link to the page.
      url: fm.url ? extractUrl(row[fm.url]) : str(row.FileRef),
      thumbnailUrl: fm.thumbnail ? extractUrl(row[fm.thumbnail]) : undefined,
      color: type.color,
      icon: type.icon,
      isPlaceholder: type.name.toLowerCase() === "placeholder",
      author: extractPerson(row.Author),
      editor: extractPerson(row.Editor),
      created: row.Created ? new Date(str(row.Created) as string) : undefined,
      modified: row.Modified ? new Date(str(row.Modified) as string) : undefined,
      published: publishedRaw
        ? new Date(publishedRaw)
        : row.Created ? new Date(str(row.Created) as string) : undefined,
      publishedDateText: publishedRaw && statusFields.firstPublished
        ? formatted?.[statusFields.firstPublished]
        : formatted?.Created,
      scheduledDateText: statusFields.publishStart
        ? formatted?.[statusFields.publishStart]
        : undefined,
    }
  }

  // Site Pages status = scheduled publish date in the future -> Scheduled;
  // else moderation status 0 (Approved) -> Published, otherwise Draft. Falls
  // back to a mapped text status column for non-Pages lists.
  private _deriveStatus(
    row: SpRow,
    statusFields: IStatusFields,
    fm: IFieldMapping,
  ): ContentStatus {
    if (statusFields.publishStart) {
      const raw = str(row[statusFields.publishStart])
      if (raw && new Date(raw).getTime() > Date.now()) {
        return ContentStatus.Scheduled
      }
    }
    if (statusFields.moderation) {
      const mod = row[statusFields.moderation]
      if (mod !== null && mod !== undefined) {
        // 0 = Approved (Published); anything else (Draft/Pending) = Draft.
        return Number(mod) === 0 ? ContentStatus.Published : ContentStatus.Draft
      }
    }
    return parseStatus(fm.status ? str(row[fm.status]) : undefined)
  }

  // REST entity property names can differ from field internal names.
  private async _resolveStatusFields(
    sp: SPFI,
    listId: string,
  ): Promise<IStatusFields> {
    const cached = this._statusFieldsCache.get(listId)
    if (cached) return cached

    const filter = STATUS_FIELD_NAMES.map(
      (name) => `InternalName eq '${name}'`,
    ).join(" or ")
    const fields = await sp.web.lists
      .getById(listId)
      .fields.select("InternalName", "EntityPropertyName")
      .filter(filter)<{ InternalName: string; EntityPropertyName: string }[]>()
    const present: IStatusFields = {}
    for (const name of STATUS_FIELD_NAMES) {
      const field = fields.find((candidate) => candidate.InternalName === name)
      if (!field) continue
      if (!field.EntityPropertyName) {
        throw new Error(`The status field ${name} has no REST entity property name.`)
      }
      if (name === "_ModerationStatus") {
        present.moderation = field.EntityPropertyName
      } else if (name === "FirstPublishedDate") {
        present.firstPublished = field.EntityPropertyName
      } else if (!present.publishStart) {
        present.publishStart = field.EntityPropertyName
      }
    }

    this._statusFieldsCache.set(listId, present)
    return present
  }

  // Fresh, cache-wrapped clone for reads. Create/update/delete use the base
  // (uncached) instance so writes are never served from cache.
  private _withCaching(config: IContentCalendarConfig): SPFI {
    const minutes = config.cacheDurationMinutes
    if (!minutes || minutes <= 0) return spfi(this._sp)
    return spfi(this._sp).using(
      Caching({
        store: "session",
        // Prefixed key so _clearReadCache can invalidate just our entries.
        keyFactory: (url) => `${CACHE_KEY_PREFIX}${url}`,
        expireFunc: () => new Date(Date.now() + minutes * 60_000),
      }),
    )
  }

  // Built-in Content Type is a lookup/navigation field; selecting it directly
  // returns an object. Detect it so we can select ContentType/Name + expand.
  private _isContentTypeNav(field: string): boolean {
    return field.trim().toLowerCase() === "contenttype"
  }

  private _selectFields(fm: IFieldMapping): string[] {
    const fields = ["Id", fm.title, fm.start, ...AUDIT_SELECT]
    ;[fm.end, fm.status, fm.owner, fm.url, fm.thumbnail].forEach((f) => {
      if (f) fields.push(f)
    })
    if (fm.contentType) {
      fields.push(
        this._isContentTypeNav(fm.contentType) ? "ContentType/Name" : fm.contentType,
      )
    }
    return Array.from(new Set(fields))
  }

  private _expandFields(fm: IFieldMapping): string[] {
    // Author/Editor are person navigation fields and must be expanded for the
    // projected Title/EMail selects above.
    const expands = ["Author", "Editor", "FieldValuesAsText"]
    if (fm.contentType && this._isContentTypeNav(fm.contentType)) {
      expands.push("ContentType")
    }
    return expands
  }

  // Range filter over the *effective* date: a page whose scheduled publish date
  // falls in the window, OR (when it has no schedule) whose start/Created does.
  // Mirrors the effective-start logic in _mapRow so scheduled items are fetched
  // for the month they're scheduled in, not the month they were created.
  private _effectiveRangeFilter(
    startField: string,
    range: IDateRange,
    statusFields: IStatusFields,
  ): string {
    const s = range.start.toISOString()
    const e = range.end.toISOString()
    const inRange = (field: string): string =>
      `${field} ge datetime'${s}' and ${field} lt datetime'${e}'`

    if (statusFields.publishStart) {
      return (
        `(${inRange(statusFields.publishStart)}) or ` +
        `(${statusFields.publishStart} eq null and ${inRange(startField)})`
      )
    }
    return inRange(startField)
  }
}

function str(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined
  return typeof v === "string" ? v : String(v)
}

// Hyperlink columns come back as { Url, Description }; text columns as strings.
function extractUrl(v: unknown): string | undefined {
  if (!v) return undefined
  if (typeof v === "string") return v
  const obj = v as { Url?: string }
  return obj.Url
}

// Expanded person field -> { name, email }. Undefined when the field is empty.
function extractPerson(v: unknown): IPersonRef | undefined {
  if (!v) return undefined
  const p = v as { Title?: string; EMail?: string }
  if (!p.Title && !p.EMail) return undefined
  return { name: p.Title ?? p.EMail ?? "", email: p.EMail }
}

// Builds a safe .aspx file name from a page title (slug, capped length).
function pageFileName(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
  return `${slug || "page"}.aspx`
}

function parseStatus(raw: string | undefined): ContentStatus {
  const needle = (raw ?? "").trim().toLowerCase()
  const match = ALL_CONTENT_STATUSES.find((s) => s.toLowerCase() === needle)
  // Default to Published: an item surfacing on the calendar with no mapped
  // status is most likely a live page.
  return match ?? ContentStatus.Published
}
