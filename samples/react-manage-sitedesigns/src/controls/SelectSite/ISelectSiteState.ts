
import {IViewSite } from './IViewSite';

export interface ISelectSiteState {
  isLoading: boolean;
  showError: boolean;
  errorMessage: string;
  selectedItems: IViewSite[];
  items: IViewSite[];
  hasError:boolean;
  showList:boolean;
}



