import { IListItem } from "./IListItem";

export interface IManageAppsProps {
  showPanel: boolean;
  onDismiss: (list: IListItem[], changed:boolean) => void;
  Apps: IListItem[];
}
