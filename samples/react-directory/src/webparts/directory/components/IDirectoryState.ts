import { IProfileProperties } from "./../../../SPServices/IProfileProperties";
import { PeoplePickerEntity, SearchResult, SearchResults } from "@pnp/pnpjs";
export interface IDirectoryState {
  users: any;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  indexSelectedKey: string;
  searchString: string;
}
