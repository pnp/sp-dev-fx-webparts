import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IQuickLinksProProps {
  description: string;
  context: WebPartContext;
  displayMode: DisplayMode;
  selectedListId: string;
  selectedListTitle: string;
  displayStyle: 'cards' | 'buttons' | 'list';
  updateProperty: (value: { selectedListId: string; selectedListTitle: string }) => void;
}