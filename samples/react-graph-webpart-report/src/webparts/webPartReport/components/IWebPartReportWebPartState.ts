import { AggredatedWebParts, WebPart } from "../../types";

export interface IWebPartReportWebPartState {
  webPartList: WebPart[];
  chartWebPartList: AggredatedWebParts;
  loading: boolean;
  page: number;
}