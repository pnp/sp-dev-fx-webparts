import { IContentCalendarConfig, IContentItem, IDateRange } from "../models"

// Payload for creating a new item from the quick-add flyout.
export interface ICreateItemPayload {
  title: string
  date: Date
  end?: Date
}

// Components depend on this data-layer contract rather than a PnPjs implementation.
export interface IContentService {
  getPageContentTypes(listId: string): Promise<{ key: string; text: string }[]>
  getSitePagesListId(): Promise<string>
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
