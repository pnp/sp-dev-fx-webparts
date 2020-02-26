import spservice from '../../../../services/spservices';
import { IPlannerPlan } from '../../../../services/IPlannerPlan';
import { ITask } from '../../../../services/ITask';
import { ITaskDetails } from '../../../../services/ITaskDetails';
import { IPlannerPlanExtended } from '../../../../services/IPlannerPlanExtended';
import { refreshOptions } from '../TaskCard/ERefreshOptions';
export interface IEditTaskProps{
  spservice: spservice;
  displayDialog:boolean;
  onDismiss: (refresh: refreshOptions) => void;
  task: ITask;
  taskDetails: ITaskDetails;
  plannerPlan: IPlannerPlanExtended;
}
