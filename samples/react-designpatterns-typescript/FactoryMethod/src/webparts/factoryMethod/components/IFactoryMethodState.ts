import { IListItem } from "./models/IListItem";
import { INewsListItem } from "./models/INewsListItem";
import { IDirectoryListItem } from "./models/IDirectoryListItem";
import { IAnnouncementListItem } from "./models/IAnnouncementListItem";
import {
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";

export interface IFactoryMethodState {
  hasError: boolean;
  status: string;
  columns: IColumn[];
  DetailsListItemState: IDetailsListItemState;
  DetailsNewsListItemState: IDetailsNewsListItemState;
  DetailsDirectoryListItemState : IDetailsDirectoryListItemState;
  DetailsAnnouncementsListItemState : IDetailsAnnouncementListItemState;
}

export interface IDetailsListItemState {
  items: IListItem[];
}

export interface IDetailsNewsListItemState {
  items: INewsListItem[];
}

export interface IDetailsDirectoryListItemState {
  items: IDirectoryListItem[];
}

export interface IDetailsAnnouncementListItemState {
  items: IAnnouncementListItem[];
}