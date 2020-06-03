import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

export interface IPollAnalyticsInfo {
  Question: string;
  Labels: string[];
  PollResponse: any[];
  ChartType: ChartType;
}