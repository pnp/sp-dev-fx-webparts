import { ICoronaInfo } from "../models/ICoronaInfo";
import { ICoronaInfoHistory } from "../models/ICoronaInfoHistory";

export interface ICoronaService {
  getCountryInfo(countryCode: string): Promise<ICoronaInfo>;
  getCountryHistory(countryCode: string): Promise<ICoronaInfoHistory>;
}
