import { IAppliedCategories } from './IAppliedCategories';
import { IAssignments } from './IAssignments';
import { IUser } from './IUser';
import { IIdentitySet} from './IIdentitySet';

export interface ITask {
  '@odata.context': string;
  '@odata.etag': string;
  planId: string;
  bucketId: string;
  title: string;
  orderHint: string;
  assigneePriority: string;
  percentComplete: number;
  startDateTime: string;
  createdDateTime: string;
  dueDateTime: string;
  hasDescription: boolean;
  previewType: string;
  completedDateTime?: string;
  completedBy?: IIdentitySet;
  referenceCount: number;
  checklistItemCount: number;
  activeChecklistItemCount: number;
  conversationThreadId?: string;
  id: string;
  createdBy: IUser;
  appliedCategories: IAppliedCategories;
  assignments: IAssignments;
}





