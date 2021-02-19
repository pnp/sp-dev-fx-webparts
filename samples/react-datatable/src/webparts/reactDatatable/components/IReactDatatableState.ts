import { ColDef } from "@material-ui/data-grid";

export interface IReactDatatableState {
  listItems: any[];
    columns: ColDef[];
    page: number;
    rowsPerPage: number;
    searchText: string;
    contentType: string;
    sortingFields: string;
    sortDirection: 'asc'|'desc';
}
