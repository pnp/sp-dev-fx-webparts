import { ITask } from "../../services/ITask";
import spservice from './../../services/spservices';
import { IPlannerPlanExtended } from "../../services/IPlannerPlanExtended";
export interface IEditCategoriesProps {
  spservice: spservice;
  onDismiss?: (refresh:boolean) => void;
  task: ITask;
  plannerPlan: IPlannerPlanExtended;
}
