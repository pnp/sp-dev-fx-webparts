export type TaskType =
  | 'MailboxConvertShared'
  | 'MailboxDelegation'
  | 'MailForwarding'
  | 'HideFromGal'
  | 'DistributionList'
  | 'LitigationHold'
  | 'OneDriveHandling'
  | 'AutoReply'
  | 'Hardware'
  | 'ThirdPartyApp'
  | 'OnPremAdAccount'
  | 'GroupAssignment'
  | 'TeamAssignment'
  | 'SharePointAccess'
  | 'ApplicationAssignment'
  | 'AccessReview'
  | 'Other';

export type TaskStatus = 'Open' | 'Done';

export interface IServiceDeskTask {
  itemId: number;
  title: string;
  jobId: string;
  taskType: TaskType;
  instructions: string;
  assignedTo: string | null;
  status: TaskStatus;
  completedBy: string | null;
  completedUtc: string | null;
}
