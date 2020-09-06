import { IFlowDetails } from './IFlowDetails';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface ICheckListFlowsState {
  flowItems: IFlowDetails[];
  columns: IColumn[];
  dataLoaded: boolean;
}