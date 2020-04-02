import { ICoronaInfoHistory } from "../../../../models/ICoronaInfoHistory";

export interface IHistoryModalState {
  isLoading: boolean;
  historyData: ICoronaInfoHistory;
  globalError: string;
}
