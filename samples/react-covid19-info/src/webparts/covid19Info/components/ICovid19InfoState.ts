import { ICoronaInfo } from "../../../models/ICoronaInfo";

export interface ICovid19InfoState {
  isLoading: boolean;
  coronaInfo: ICoronaInfo;
  globalError: string;
  showHistoryModal: boolean;
}
