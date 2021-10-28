import {
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';


export interface IReactDatatableState {
  listItems: any[];
  columns: IColumn[];
  page: number;
  rowsPerPage?: number;
  searchText: string;
  contentType: string;
  sortingFields: string;
  pageOfItems: any[];
  sortDirection: 'asc' | 'desc';
}
