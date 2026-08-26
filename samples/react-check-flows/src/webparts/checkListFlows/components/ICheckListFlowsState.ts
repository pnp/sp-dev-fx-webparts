import { IFlowDetails } from './IFlowDetails';
import { IColumn } from '@fluentui/react/lib/DetailsList';

export interface ICheckListFlowsState {
  flowItems: IFlowDetails[];
  columns: IColumn[];
  dataLoaded: boolean;
}