import { IListModel } from "../../../interfaces/models";

export interface IMyTimelineProps {
  description: string;
  list: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface IMyTimelineState {
  items: IListModel[];
  errors: string[];
}
