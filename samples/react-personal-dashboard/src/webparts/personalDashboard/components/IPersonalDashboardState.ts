import { IListItem } from "../models/IListItem";

export interface IPersonalDashboardState {
    selectedWidgets: IListItem[];
    widgets: IListItem[];
}