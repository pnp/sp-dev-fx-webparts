
export interface IMySitesState {
  sites: any[];
  isLoading: boolean;
  errorMessage: string;
  hasError:boolean;
  title:string;
  currentPage:number;
  totalPages:number;
  searchValue:string;
  currentFilter?:number;
}
