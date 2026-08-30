export type DashboardState = 'pending' | 'failed' | 'completed' | 'unknown';

export interface ApprovalStage {
  name: string;
  status: string;
  approver?: string;
}

export interface WorkflowRequest {
  id: string;
  title: string;
  status: string;
  state: DashboardState;
  created: string;
  modified?: string;
  requester?: string;
  approvers: string[];
  stages: ApprovalStage[];
  dueDate?: string;
  overdue: boolean;
  sourceLabel: string;
}

export interface WorkflowSourceConfig {
  id: string;
  label: string;
  endpoint: string;
  enabled: boolean;
}

export interface DashboardConfig {
  configVersion: number;
  limits: {
    maxSources: number;
    pageSize: number;
    maxPagesPerSource: number;
    maxItemsPerSource: number;
  };
  reviewSettings: {
    overdueAfterDays: number;
  };
  sources: WorkflowSourceConfig[];
}
