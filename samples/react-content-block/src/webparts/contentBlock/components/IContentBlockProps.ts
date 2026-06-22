import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export type LayoutType = '50-50' | '75-25' | '25-75';

export interface IContentBlockProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  listId?: string;
  layout?: LayoutType;
  onListChange?: (newListId: string) => void;
  onLayoutChange?: (newLayout: LayoutType) => void;
}
