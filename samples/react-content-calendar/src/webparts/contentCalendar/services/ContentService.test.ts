const mockQuery = jest.fn()
const mockTop = jest.fn(() => mockQuery)
const mockOrderBy = jest.fn(() => mockQuery)
const mockFilter = jest.fn(() => ({ top: mockTop, orderBy: mockOrderBy }))
const mockSelect = jest.fn(() => ({ filter: mockFilter }))
const mockGetById = jest.fn()
const mockContentTypeSelect = jest.fn(() => mockQuery)

jest.mock("@pnp/sp", () => ({
  spfi: () => ({
    web: { lists: { select: mockSelect, getById: mockGetById } },
    using: () => ({
      web: { lists: { select: mockSelect, getById: mockGetById } },
    }),
  }),
  SPFx: jest.fn(),
}))
jest.mock("@pnp/sp/webs", () => ({}))
jest.mock("@pnp/sp/lists", () => ({}))
jest.mock("@pnp/sp/items", () => ({}))
jest.mock("@pnp/sp/fields", () => ({}))
jest.mock("@pnp/sp/content-types", () => ({}))
jest.mock("@pnp/sp/clientside-pages", () => ({}))
jest.mock("@pnp/sp/comments/clientside-page", () => ({}))
jest.mock("@pnp/queryable", () => ({ Caching: jest.fn() }))

import { WebPartContext } from "@microsoft/sp-webpart-base"
import { ContentStatus, getDefaultConfig, SITE_PAGE_CONTENT_TYPE_ID } from "../models"
import { ContentService } from "./ContentService"

describe("ContentService data source", () => {
  let service: ContentService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new ContentService({} as WebPartContext)
  })

  it("resolves Site Pages by template instead of its display name", async () => {
    mockQuery.mockResolvedValue([{ Id: "site-pages-id" }])

    await expect(service.getSitePagesListId()).resolves.toBe("site-pages-id")
    expect(mockSelect).toHaveBeenCalledWith("Id")
    expect(mockFilter).toHaveBeenCalledWith("BaseTemplate eq 119")
    expect(mockTop).toHaveBeenCalledWith(1)
  })

  it("reports a missing Site Pages library", async () => {
    mockQuery.mockResolvedValue([])

    await expect(service.getSitePagesListId()).rejects.toThrow(
      "The current site does not have an accessible Site Pages library.",
    )
  })

  it("includes only Site Page and custom descendants, sorted by name, with no blank option", async () => {
    const customId = `${SITE_PAGE_CONTENT_TYPE_ID}00ABCDEF`
    mockGetById.mockReturnValue({ contentTypes: { select: mockContentTypeSelect } })
    mockQuery.mockResolvedValue([
      { StringId: SITE_PAGE_CONTENT_TYPE_ID, Name: "Site Page" },
      { StringId: customId.toLowerCase(), Name: "Announcement" },
      { StringId: "0x0120", Name: "Folder" },
      { StringId: "0x0101", Name: "Document" },
      { StringId: "0x0100", Name: "Item" },
    ])

    await expect(service.getPageContentTypes("pages-id")).resolves.toEqual([
      { key: customId.toLowerCase(), text: "Announcement" },
      { key: SITE_PAGE_CONTENT_TYPE_ID, text: "Site Page" },
    ])
    expect(mockGetById).toHaveBeenCalledWith("pages-id")
    expect(mockContentTypeSelect).toHaveBeenCalledWith("StringId", "Name")
  })

  it("does not insert a blank option when no page types are available", async () => {
    mockGetById.mockReturnValue({ contentTypes: { select: mockContentTypeSelect } })
    mockQuery.mockResolvedValue([{ StringId: "0x0120", Name: "Folder" }])

    await expect(service.getPageContentTypes("pages-id")).resolves.toEqual([])
  })

  it("surfaces page content-type lookup failures", async () => {
    mockGetById.mockReturnValue({ contentTypes: { select: mockContentTypeSelect } })
    mockQuery.mockRejectedValue(new Error("Access denied"))

    await expect(service.getPageContentTypes("pages-id")).rejects.toThrow("Access denied")
  })

  it("propagates lookup failures instead of returning a dummy list", async () => {
    mockQuery.mockRejectedValue(new Error("Access denied"))

    await expect(service.getSitePagesListId()).rejects.toThrow("Access denied")
  })

  it("rejects reads without a selected list instead of returning sample content", async () => {
    await expect(
      service.getItems(
        { start: new Date(2026, 9, 1), end: new Date(2026, 10, 1) },
        getDefaultConfig(),
      ),
    ).rejects.toThrow("Site Pages is not configured")
    expect(mockGetById).not.toHaveBeenCalled()
  })

  it("rejects item creation without a selected list", async () => {
    await expect(
      service.createItem(
        "Page",
        { title: "New page", date: new Date(2026, 9, 1) },
        getDefaultConfig(),
      ),
    ).rejects.toThrow("Site Pages is not configured")
    expect(mockGetById).not.toHaveBeenCalled()
  })

  it.each([undefined, `${SITE_PAGE_CONTENT_TYPE_ID}00ABCDEF`])(
    "filters empty-library reads by page content type %s",
    async (contentTypeId) => {
    const items = jest.fn().mockResolvedValue([])
    const itemFilter = jest.fn((_filter: string) => items)
    Object.assign(items, {
      select: () => items,
      filter: itemFilter,
      orderBy: () => items,
      top: () => items,
      expand: () => items,
    })
    mockGetById.mockReturnValue({
      fields: { select: () => ({ filter: () => async () => [] }) },
      items,
    })
    const config = getDefaultConfig()
    config.listId = "selected-list-id"
    config.contentTypeId = contentTypeId
    config.cacheDurationMinutes = 0

    await expect(
      service.getItems(
        { start: new Date(2026, 9, 1), end: new Date(2026, 10, 1) },
        config,
      ),
    ).resolves.toEqual([])
    expect(mockGetById).toHaveBeenCalledWith("selected-list-id")
    expect(itemFilter).toHaveBeenCalledWith(
      expect.stringContaining(`and startswith(ContentTypeId,'${contentTypeId || SITE_PAGE_CONTENT_TYPE_ID}')`),
    )
    expect(itemFilter.mock.calls[0][0]).toContain("Created ge datetime")
  })

  describe("scheduled page status", () => {
    const range = {
      start: new Date("2030-02-01T00:00:00Z"),
      end: new Date("2030-03-01T00:00:00Z"),
    }
    const config = {
      ...getDefaultConfig(),
      listId: "pages-id",
      cacheDurationMinutes: 0,
    }
    const publishDate = "2030-02-12T09:30:00Z"
    const createdDate = "2030-01-01T00:00:00Z"
    let rows: Record<string, unknown>[]
    let fields: { InternalName: string; EntityPropertyName: string }[]
    const fieldQuery = jest.fn()
    const items = jest.fn()
    const selectItems = jest.fn(() => items)
    const filterItems = jest.fn((_filter: string) => items)

    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date("2030-02-01T12:00:00Z"))
      fields = []
      rows = []
      fieldQuery.mockImplementation(async () => fields)
      items.mockImplementation(async () => rows)
      Object.assign(items, {
        select: selectItems,
        filter: filterItems,
        orderBy: () => items,
        top: () => items,
        expand: () => items,
      })
      mockGetById.mockReturnValue({
        fields: { select: () => ({ filter: () => fieldQuery }) },
        items,
      })
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it.each([
      ["_PublishStartDate", "OData__PublishStartDate"],
      ["_PublishStartDate", "_PublishStartDate"],
      ["PublishStartDate", "PublishStartDate"],
    ])("uses %s metadata (%s) for status, placement, and range filtering", async (internal, entity) => {
      fields = [
        { InternalName: internal, EntityPropertyName: entity },
        { InternalName: "_ModerationStatus", EntityPropertyName: "OData__ModerationStatus" },
      ]
      rows = [{
        Id: 1,
        Title: "Scheduled page",
        Created: createdDate,
        [entity]: publishDate,
        OData__ModerationStatus: 3,
        FieldValuesAsText: { [entity]: "12 February 2030 09:30" },
      }]

      const result = await service.getItems(range, config)

      expect(result[0].status).toBe(ContentStatus.Scheduled)
      expect(result[0].scheduledDateText).toBe("12 February 2030 09:30")
      expect(result[0].start.toISOString()).toBe(new Date(publishDate).toISOString())
      expect(selectItems.mock.calls[0]).toContain(entity)
      expect(selectItems.mock.calls[0]).toContain(`FieldValuesAsText/${entity}`)
      expect(filterItems.mock.calls[0][0]).toContain(
        `${entity} ge datetime'2030-02-01T00:00:00.000Z'`,
      )
      expect(filterItems.mock.calls[0][0]).toContain(
        `${entity} eq null and Created ge datetime`,
      )
    })

    it.each([
      [null, 3, ContentStatus.Draft],
      [null, 0, ContentStatus.Published],
      ["2030-01-20T09:00:00Z", 0, ContentStatus.Published],
      ["2030-02-01T12:00:00Z", 0, ContentStatus.Published],
    ])("preserves non-scheduled status for publish date %s and moderation %s", async (date, moderation, status) => {
      fields = [
        { InternalName: "_PublishStartDate", EntityPropertyName: "OData__PublishStartDate" },
        { InternalName: "_ModerationStatus", EntityPropertyName: "OData__ModerationStatus" },
      ]
      rows = [{
        Id: 1,
        Title: "Page",
        Created: createdDate,
        OData__PublishStartDate: date,
        OData__ModerationStatus: moderation,
      }]

      const result = await service.getItems(range, config)

      expect(result[0].status).toBe(status)
      expect(result[0].start.toISOString()).toBe(new Date(date || createdDate).toISOString())
    })

    it("surfaces metadata failures and retries instead of caching an incorrect Published fallback", async () => {
      fieldQuery.mockRejectedValueOnce(new Error("Access denied"))

      await expect(service.getItems(range, config)).rejects.toThrow("Access denied")
      expect(items).not.toHaveBeenCalled()

      fields = [{ InternalName: "_PublishStartDate", EntityPropertyName: "OData__PublishStartDate" }]
      rows = [{
        Id: 1,
        Title: "Scheduled page",
        Created: createdDate,
        OData__PublishStartDate: publishDate,
      }]
      const result = await service.getItems(range, config)
      expect(result[0].status).toBe(ContentStatus.Scheduled)
      expect(fieldQuery).toHaveBeenCalledTimes(2)
    })

    it("keeps working when scheduling is not enabled on the library", async () => {
      fields = [{ InternalName: "_ModerationStatus", EntityPropertyName: "OData__ModerationStatus" }]
      rows = [{
        Id: 1,
        Title: "Draft page",
        Created: createdDate,
        OData__ModerationStatus: 3,
      }]

      const result = await service.getItems(range, config)

      expect(result[0].status).toBe(ContentStatus.Draft)
      expect(result[0].start.toISOString()).toBe(new Date(createdDate).toISOString())
      expect(filterItems.mock.calls[0][0]).not.toContain("PublishStartDate")
      await service.getItems(range, config)
      expect(fieldQuery).toHaveBeenCalledTimes(1)
    })

    it.each([true, false])("maps the published timestamp and formatted text (first published available: %s)", async (available) => {
      fields = available
        ? [{ InternalName: "FirstPublishedDate", EntityPropertyName: "FirstPublishedDate" }]
        : []
      rows = [{
        Id: 1,
        Title: "Published page",
        Created: createdDate,
        FirstPublishedDate: available ? "2030-01-15T15:45:00Z" : null,
        FieldValuesAsText: {
          FirstPublishedDate: "15 January 2030 15:45",
          Created: "1 January 2030 00:00",
        },
      }]

      const result = await service.getItems(range, config)

      expect(result[0].published?.toISOString()).toBe(
        new Date(available ? "2030-01-15T15:45:00Z" : createdDate).toISOString(),
      )
      expect(result[0].publishedDateText).toBe(
        available ? "15 January 2030 15:45" : "1 January 2030 00:00",
      )
      expect(result[0].start.toISOString()).toBe(new Date(createdDate).toISOString())
      expect(selectItems.mock.calls[0]).toContain("FieldValuesAsText/Created")
    })

    it("rejects incomplete scheduling metadata rather than guessing a REST property", async () => {
      fields = [{ InternalName: "_PublishStartDate", EntityPropertyName: "" }]

      await expect(service.getItems(range, config)).rejects.toThrow(
        "The status field _PublishStartDate has no REST entity property name.",
      )
      expect(items).not.toHaveBeenCalled()
    })
  })
})
