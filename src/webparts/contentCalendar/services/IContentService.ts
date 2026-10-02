import { IContentCalendarConfig, IContentItem, IDateRange } from "../models"

// Payload for creating a new item from the quick-add flyout (M6). Kept here so
// both the live service and the sample provider share one contract.
export interface ICreateItemPayload {
  title: string
  date: Date
  end?: Date
}

// The data-layer contract. Components depend on this interface (via hooks),
// never on a concrete PnPjs implementation — so the sample provider and the
// live service are interchangeable.
export interface IContentService {
  getItems(range: IDateRange, config: IContentCalendarConfig): Promise<IContentItem[]>
  createItem(
    contentType: string,
    payload: ICreateItemPayload,
    config: IContentCalendarConfig,
  ): Promise<IContentItem>
  updateItem(
    id: number | string,
    changes: Partial<IContentItem>,
    config: IContentCalendarConfig,
  ): Promise<void>
  deleteItem(id: number | string, config: IContentCalendarConfig): Promise<void>
  // Creates a modern Site Page from a title and returns its (server-relative)
  // URL so the caller can open it.
  createPage(
    title: string,
    options?: { disableComments?: boolean },
  ): Promise<{ url: string }>
}
