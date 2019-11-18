import { IPlannerPlan } from '../../../../services/IPlannerPlan';
import { ITask } from '../../../../services/ITask';
import spservices from '../../../../services/spservices';
import { IPlannerPlanExtended } from '../../../../services/IPlannerPlanExtended';
import { AssignMode} from './EAssignMode';
import { IMember } from '../../../../services/IGroupMembers';

export interface IAssignsProps {

  onDismiss: (assigns?:IMember[]) => void;
  target?: HTMLElement;
  task?: ITask;
  plannerPlan:IPlannerPlanExtended;
  spservice: spservices;
  AssignMode?:  AssignMode;
  assigns?: IMember[];
}
