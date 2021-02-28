import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { TreeOrgChartType } from './TreeOrgChart';
export interface ITreeOrgChartProps {
  title: string;
  maxLevels: number;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  viewType: TreeOrgChartType;
  teamLeader?: string;
  updateTeamLeader: (loginname: string) => void;
  context: WebPartContext;
  filter: string;
  excludefilter: boolean;
  detailBehavoir: boolean;
}
