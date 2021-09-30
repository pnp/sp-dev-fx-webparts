import { SPHttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IReactAccordionProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  enablePaging:boolean;
  totalItems:number;
  customSortField:string;
  sortById:boolean;
  sortByModified:boolean;
  updateProperty: (value: string) => void;
}