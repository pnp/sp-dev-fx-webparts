import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

export interface IPropertyFieldRepeatingDataProps {
  /**
 * An UNIQUE key indicates the identity of this control
 */
  key: string;
  chartType: string;
  data: {}[];
  onDataChanged: (any) => void;
}

export interface IPropertyFieldRepeatingDataState {
  data: {}[];
}

export interface IPropertyFieldRepeatingDataHostProps {
  chartType: string;
  data: {}[];
  onDataChanged: (any) => void;
}

export interface IPropertyFieldRepeatingDataPropsInternal extends IPropertyPaneCustomFieldProps {
  chartType: string;
  data: {}[];
  onDataChanged: (any) => void;
}

export interface INumberChartData {
  id: string;
  name: string;
  value: number;
}

export interface IBubbleChartData {
  id: string;
  name: string;
  x: number;
  y: number;
  r: number;
}

export interface IScatterChartData {
  id: string;
  name: string;
  x: number;
  y: number;
}
