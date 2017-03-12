export interface ChartConfiguration {
  title: string;
  description: string;
  other: boolean;
  dataUrlDisabled: boolean;
  colsDisabled: boolean;
  listsDisabled: boolean;
  type: string;
  url: string;
  dataurl: string;
  list: string;
  col1: string;
  col2: string;
  act: string;
  unique: string;
  size: number;
  options: Object;
  columns: Array<any>;
  lists: Array<any>;
  theme: string;
  bgColors: Array<string>;
  hoverColors: Array<string>;
}

export interface IModernChartsWebPartProps {
  description: string;
  numCharts: number;
  chartConfig: Array<ChartConfiguration>;
  state: boolean;
  firstLoad: boolean;
  siteOptions: Array<any>;
  listOptions: Array<any>;
  url: string;
  other: boolean;
  maxResults: number;
}

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
  data: Array<number>;
  labels: Array<string>;
  config: ChartConfiguration;
  key: number;
}