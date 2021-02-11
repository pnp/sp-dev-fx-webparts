import { IColumn } from 'office-ui-fabric-react';
import IResult from '../model/IResult';
import { SharePointType } from '../model/ISharePointFieldTypes';

export interface IListSearchState {
  isLoading: boolean;
  errorMsg: string;
  errorHeader: string;
  items: Array<IResult>;
  filterItems: Array<IResult>;
  generalFilter: string;
  columnFilters: IColumnFilter[];
  activePage: number;
  isModalHidden: boolean;
  isModalLoading: boolean;
  selectedItem: IResult;
  completeModalItemData: IResult;
  groupedItems: IGroupedItems[];
  columns: IColumn[];
}

export default interface IGroupedItems {
  GroupName: string;
  Items: IResult[];
}


export interface IColumnFilter {
  columnName: string;
  filterToApply: string;
  columnType: SharePointType;
}
