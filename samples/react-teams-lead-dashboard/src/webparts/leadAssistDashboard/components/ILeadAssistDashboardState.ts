import { ISaleListItem } from "../../../services/ISaleListItem";
import { IValueListItem } from "../../../services/IValueListItem";

export interface ILeadAssistDashboardState {
  activityCallItems: IValueListItem[];
  activityEmailItems: IValueListItem[];
  activityTextItems: IValueListItem[];
  progressItems: IValueListItem[];
  recentlyDoneSalesContractItems: ISaleListItem[];
  isLoading: boolean;
  listsAreEmpty: boolean;
  siteUrl: string;
}