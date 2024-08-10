import { IColumn } from "@fluentui/react";
import { ServiceHealthIssue } from "@microsoft/microsoft-graph-types";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IServiceHealthOverviewItem {
  Service: string;
  Status: string;
  InProgressItems?: ServiceHealthIssue[];
}
export interface IServiceHealthOverviewProps {
  apiBaseUrl: string;
  audience: string;
  context: WebPartContext;
}

export interface IServiceHealthHeaderProps {
  title: string;
}

export interface IServiceHealthOverviewState {
  columns: IColumn[];
  items: IServiceHealthOverviewItem[];
  showIssueListPanel: boolean;
  showIssueDetailPanel: boolean;
  selectedItem: IServiceHealthOverviewItem;
  selectedIssue: ServiceHealthIssue;
  showBackButton: boolean;
  spinner: boolean;
}

export interface IIssueDetailProps {
  details: ServiceHealthIssue;
}

export interface IIssueListProps {
  selectedItem: IServiceHealthOverviewItem;
  onClick: (item: ServiceHealthIssue) => void;
}
export interface IListItemProps {
  column: IColumn;
  item: IServiceHealthOverviewItem;
  index: number;
  onLinkClick: (item: IServiceHealthOverviewItem) => void;
}
