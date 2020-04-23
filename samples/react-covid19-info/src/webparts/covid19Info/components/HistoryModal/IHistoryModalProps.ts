import { ICoronaInfoHistory } from "../../../../models/ICoronaInfoHistory";

export interface IHistoryModalProps {
  countryCode: string;
  confirmedColor: string;
  deathColor: string;
  recoveredColor: string;
  _loadHistoryData(): Promise<ICoronaInfoHistory>;
}
