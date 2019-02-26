import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentLibraryBrowserProps {
  context: WebPartContext;
  onOpenLibrary: (selectedLibrary: ILibrary) => void;
}

export interface IDocumentLibraryBrowserState {
  isLoading: boolean;
  lists: ILibrary[];
}

export interface ILibrary {
  title: string;
  absoluteUrl: string;
  serverRelativeUrl: string;
}
