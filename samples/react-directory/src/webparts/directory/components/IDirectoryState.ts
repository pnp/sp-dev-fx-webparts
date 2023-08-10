
export interface IDirectoryState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  indexSelectedKey: string;
  searchString: string;
  searchText: string;
}
