import { IListItem } from "./ManageApps/IListItem";

export interface IPersonalAppsState {
  showPanel: boolean;
  apps : IListItem[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}
