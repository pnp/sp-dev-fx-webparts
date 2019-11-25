import { ITask } from "../../services/ITask";
import { IAppliedCategories } from "../../services/IAppliedCategories";
import { IPlannerPlanDetails } from "../../services/IPlannerPlanDetails";

export interface IEditCategoriesState {
  task: ITask;
  appliedCategories: JSX.Element[];
  hasError:boolean;
  errorMessage:string;
  category1Value: boolean;
  category2Value: boolean;
  category3Value: boolean;
  category4Value: boolean;
  category5Value: boolean;
  category6Value: boolean;
  plannerDetails: IPlannerPlanDetails;
}
