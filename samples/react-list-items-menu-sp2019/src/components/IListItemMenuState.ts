import {  INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
export interface IListItemsMenuState {
  navLinkGroups: INavLinkGroup[];
  isLoading: boolean;
  hasError:boolean;
  errorMessage:string;
  listName:string;
}
