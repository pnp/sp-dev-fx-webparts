export interface IModernChartsProps {
  description: string;
  title: string;
  state: boolean;
  config: Object;
  context: any;
  data: Object;
  charts: Array<MChart>;
}
export interface MChart {
  size: number;
  data: Object;
  config: Object;
  key: number;
}