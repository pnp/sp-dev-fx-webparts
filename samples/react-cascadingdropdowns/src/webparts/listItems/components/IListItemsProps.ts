import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IListItemsProps {
  listName: string;
  itemName: string;
  context: WebPartContext;
  onConfigure: () => void;
}
