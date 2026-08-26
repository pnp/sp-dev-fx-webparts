export interface IHorizontalBarChartGroup {
  chartTitle: string;
  chartData: {
    legend: string;
    horizontalBarChartdata: { x: number; total: number };
    color: string;
  }[];
}
