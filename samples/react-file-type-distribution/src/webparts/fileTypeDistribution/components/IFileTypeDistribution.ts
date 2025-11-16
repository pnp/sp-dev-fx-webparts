import { ChartProps } from "@fluentui/react-charts";
import { IHorizontalBarChartGroup } from "../../../common/models/IHorizontalBarChartGroup";
import { ILibraryItem } from "../../../common/models/ILibraryItem";
import SPService from "../../../common/services/SPService";

export interface IFileTypeDistributionProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spService: SPService;
  chartType: "DonutChart" | "HorizontalBarChart";
}

export interface IFileTypeDistributionState {
  libraries: ILibraryItem[];
  selectedLib: string | undefined;
  horizontalBarChartData: IHorizontalBarChartGroup[];
  donutChartData: ChartProps | undefined;
  totalDocs: number;
  loading: boolean;
}
