import { WebPartContext } from "@microsoft/sp-webpart-base"
import { ContentService } from "./ContentService"
import { IContentService } from "./IContentService"

export * from "./IContentService"
export * from "./ContentService"
export * from "./PlaceholderStore"

// Single place the web part constructs the data layer. Returns the interface so
// callers stay decoupled from the concrete implementation.
export function createContentService(context: WebPartContext): IContentService {
  return new ContentService(context)
}
