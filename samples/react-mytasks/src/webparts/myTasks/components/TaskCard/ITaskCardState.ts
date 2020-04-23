import { IPlannerPlan } from './../../../../services/IPlannerPlan';
import { ITaskDetails } from './../../../../services/ITaskDetails';
import { IFacepilePersona } from 'office-ui-fabric-react';
import { ITask } from './../../../../services/ITask';
export interface ITaskCardState {
  isloading: boolean;
  task: ITask;
  plannerInfo: IPlannerPlan;
  taskDetails: ITaskDetails;
  assignments: IFacepilePersona[];
  hasError: boolean;
  errorMessage: string;
  isloadingAssigments: boolean;
  showEditDialog: boolean;
}
