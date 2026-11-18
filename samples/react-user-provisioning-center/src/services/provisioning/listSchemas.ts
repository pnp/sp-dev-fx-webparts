import {
  LIST_APPLICATION_CATALOG,
  LIST_APPROVAL_DELEGATIONS,
  LIST_AUDIT_LOG,
  LIST_DEPARTMENT_TEMPLATES,
  LIST_LICENSE_COST_TABLE,
  LIST_PROVISIONING_JOBS,
  LIST_ROLES,
  LIST_SITE_CATALOG,
  LIST_SETTINGS,
  LIST_TASKS,
  LIST_TEAMS_CATALOG
} from '../../constants/listNames';

export type UpcFieldType =
  | 'Text'
  | 'Note'
  | 'Boolean'
  | 'Number'
  | 'Currency'
  | 'DateTime'
  | 'User'
  | 'Choice';

export interface IUpcFieldDefinition {
  name: string;
  displayName: string;
  type: UpcFieldType;
  required?: boolean;
  choices?: string[];
  indexed?: boolean;
}

export interface IUpcListDefinition {
  title: string;
  fields: IUpcFieldDefinition[];
  auditSecurity?: boolean;
  indexedBuiltInFields?: string[];
}

export const UPC_LIST_DEFINITIONS: IUpcListDefinition[] = [
  {
    title: LIST_DEPARTMENT_TEMPLATES,
    fields: [
      { name: 'TemplateJson', displayName: 'Template JSON', type: 'Note' },
      { name: 'IsActive', displayName: 'Is Active', type: 'Boolean', indexed: true },
      { name: 'Version', displayName: 'Version', type: 'Number' }
    ]
  },
  {
    title: LIST_PROVISIONING_JOBS,
    indexedBuiltInFields: ['Modified'],
    fields: [
      {
        name: 'JobType',
        displayName: 'Job Type',
        type: 'Choice',
        required: true,
        indexed: true,
        choices: ['Onboard', 'Offboard', 'Transfer', 'Clone', 'Bulk']
      },
      {
        name: 'Status',
        displayName: 'Status',
        type: 'Choice',
        required: true,
        indexed: true,
        choices: [
          'PendingApproval',
          'Approved',
          'Scheduled',
          'Running',
          'PartiallyFailed',
          'Failed',
          'Completed',
          'Cancelled',
          'Rejected'
        ]
      },
      { name: 'PayloadJson', displayName: 'Payload JSON', type: 'Note' },
      { name: 'StepsJson', displayName: 'Steps JSON', type: 'Note' },
      // Indexed so views and flows can filter on it without hitting the
      // list view threshold.
      { name: 'ScheduledFor', displayName: 'Scheduled For', type: 'DateTime', indexed: true },
      { name: 'RequestedBy', displayName: 'Requested By', type: 'User' },
      { name: 'ApprovedBy', displayName: 'Approved By', type: 'User' },
      { name: 'CorrelationId', displayName: 'Correlation Id', type: 'Text' },
      { name: 'BatchId', displayName: 'Batch Id', type: 'Text', indexed: true },
      { name: 'TargetUpn', displayName: 'Target UPN', type: 'Text', indexed: true },
      { name: 'TargetUserId', displayName: 'Target User Id', type: 'Text' },
      { name: 'RunningInstanceId', displayName: 'Running Instance Id', type: 'Text' },
      { name: 'RunningSince', displayName: 'Running Since', type: 'DateTime' },
      { name: 'ApprovalsJson', displayName: 'Approvals JSON', type: 'Note' },
      { name: 'NotesJson', displayName: 'Notes JSON', type: 'Note' }
    ]
  },
  {
    title: LIST_AUDIT_LOG,
    auditSecurity: true,
    fields: [
      { name: 'JobId', displayName: 'Job Id', type: 'Text', indexed: true },
      { name: 'Actor', displayName: 'Actor', type: 'Text' },
      { name: 'Action', displayName: 'Action', type: 'Text' },
      { name: 'TargetUser', displayName: 'Target User', type: 'Text' },
      { name: 'GraphEndpoint', displayName: 'Graph Endpoint', type: 'Text' },
      { name: 'RequestSummary', displayName: 'Request Summary', type: 'Note' },
      { name: 'ResponseCode', displayName: 'Response Code', type: 'Number' },
      { name: 'DurationMs', displayName: 'Duration (ms)', type: 'Number' },
      { name: 'Result', displayName: 'Result', type: 'Choice', choices: ['Success', 'Failure', 'Skipped'] },
      { name: 'CorrelationId', displayName: 'Correlation Id', type: 'Text' },
      { name: 'TimestampUtc', displayName: 'Timestamp (UTC)', type: 'DateTime' }
    ]
  },
  {
    title: LIST_APPLICATION_CATALOG,
    fields: [
      { name: 'Owner', displayName: 'Owner', type: 'User' },
      { name: 'ProvisioningType', displayName: 'Provisioning Type', type: 'Choice', choices: ['Manual', 'GroupBased'] },
      { name: 'TargetGroupId', displayName: 'Target Group Id', type: 'Text' },
      { name: 'ApprovalRequired', displayName: 'Approval Required', type: 'Boolean' },
      { name: 'Instructions', displayName: 'Instructions', type: 'Note' },
      { name: 'IsActive', displayName: 'Is Active', type: 'Boolean', indexed: true }
    ]
  },
  {
    title: LIST_ROLES,
    fields: [
      { name: 'MemberGroupId', displayName: 'Member Group Id (Entra)', type: 'Text', required: true },
      { name: 'PermissionsJson', displayName: 'Permissions JSON', type: 'Note' }
    ]
  },
  {
    title: LIST_TEAMS_CATALOG,
    fields: [
      { name: 'TeamId', displayName: 'Team Id', type: 'Text', required: true },
      { name: 'Category', displayName: 'Category', type: 'Text' },
      { name: 'DefaultRole', displayName: 'Default Role', type: 'Choice', choices: ['member', 'owner'] }
    ]
  },
  {
    title: LIST_SITE_CATALOG,
    fields: [
      { name: 'SiteUrl', displayName: 'Site Url', type: 'Text', required: true },
      { name: 'BusinessOwner', displayName: 'Business Owner', type: 'User' },
      { name: 'Category', displayName: 'Category', type: 'Text' }
    ]
  },
  {
    title: LIST_LICENSE_COST_TABLE,
    fields: [
      { name: 'MonthlyCost', displayName: 'Monthly Cost', type: 'Currency' },
      { name: 'Currency', displayName: 'Currency', type: 'Text' }
    ]
  },
  {
    title: LIST_TASKS,
    indexedBuiltInFields: ['Created'],
    fields: [
      { name: 'JobId', displayName: 'Job Id', type: 'Text', indexed: true },
      {
        name: 'TaskType',
        displayName: 'Task Type',
        type: 'Choice',
        choices: [
          'MailboxConvertShared',
          'MailboxDelegation',
          'MailForwarding',
          'HideFromGal',
          'DistributionList',
          'LitigationHold',
          'OneDriveHandling',
          'AutoReply',
          'Hardware',
          'ThirdPartyApp',
          'OnPremAdAccount',
          'GroupAssignment',
          'TeamAssignment',
          'SharePointAccess',
          'ApplicationAssignment',
          'AccessReview',
          'Other'
        ]
      },
      { name: 'Instructions', displayName: 'Instructions', type: 'Note' },
      { name: 'AssignedTo', displayName: 'Assigned To', type: 'User' },
      { name: 'Status', displayName: 'Status', type: 'Choice', indexed: true, choices: ['Open', 'Done'] },
      { name: 'CompletedBy', displayName: 'Completed By', type: 'Text' },
      { name: 'CompletedUtc', displayName: 'Completed (UTC)', type: 'DateTime' }
    ]
  },
  {
    title: LIST_SETTINGS,
    indexedBuiltInFields: ['Title'],
    fields: [{ name: 'SettingsJson', displayName: 'Settings JSON', type: 'Note' }]
  },
  {
    title: LIST_APPROVAL_DELEGATIONS,
    indexedBuiltInFields: ['Title'],
    fields: [
      { name: 'DelegateUpn', displayName: 'Delegate UPN', type: 'Text', required: true, indexed: true },
      { name: 'StartUtc', displayName: 'Start (UTC)', type: 'DateTime' },
      { name: 'EndUtc', displayName: 'End (UTC)', type: 'DateTime' },
      { name: 'Reason', displayName: 'Reason', type: 'Text' },
      { name: 'IsActive', displayName: 'Is Active', type: 'Boolean', indexed: true }
    ]
  }
];
