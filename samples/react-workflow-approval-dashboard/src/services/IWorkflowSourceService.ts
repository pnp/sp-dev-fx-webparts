import { DashboardConfig, WorkflowRequest } from '../webparts/workflowApprovalDashboard/models';
import { DashboardError } from './errors';

export interface WorkflowLoadResult {
  requests: WorkflowRequest[];
  errors: Array<{ sourceLabel: string; error: DashboardError }>;
}

export interface IWorkflowSourceService {
  load(config: DashboardConfig): Promise<WorkflowLoadResult>;
}
