import { ITreeData } from "./ITreeData";

export interface ITreeOrgChartState {
  treeData: ITreeData[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  livePersonaCard?: any;
}
