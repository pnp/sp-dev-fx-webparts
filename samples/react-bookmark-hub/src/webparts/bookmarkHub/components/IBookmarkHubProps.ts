import { WebPartContext } from "@microsoft/sp-webpart-base";
import { BookmarkHubService } from "../../../services/BookmarkHubService";

export interface IBookmarkHubProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  bookmarkHubService: BookmarkHubService;
  context: WebPartContext;
}
