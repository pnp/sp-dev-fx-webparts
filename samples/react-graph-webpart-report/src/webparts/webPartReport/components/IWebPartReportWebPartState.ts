import { AggredatedWebParts, WebPart } from "../../types";

export interface IWebPartReportWebPartState {
  webPartList: WebPart[];
  aggregatedWebPartList: AggredatedWebParts;
  loading: boolean;
  page: number;
}