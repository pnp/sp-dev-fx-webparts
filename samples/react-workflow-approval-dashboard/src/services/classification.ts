import { DashboardState, WorkflowRequest } from '../webparts/workflowApprovalDashboard/models';

const completed = ['approved', 'completed', 'complete', 'granted', 'provisioned'];
const failed = ['failed', 'error', 'expired', 'timedout', 'timeout', 'rejected', 'denied', 'canceled', 'cancelled'];

export function classifyStatus(status: unknown, created: string, now: Date, overdueAfterDays: number, dueDate?: string): { state: DashboardState; overdue: boolean } {
  const value = String(status || '').trim().toLowerCase().replace(/[ _-]/g, '');
  const state: DashboardState = failed.some(item => value.includes(item)) ? 'failed' : completed.some(item => value.includes(item)) ? 'completed' : value ? 'pending' : 'unknown';
  const ageOverdue = new Date(created).getTime() + overdueAfterDays * 86400000 < now.getTime();
  const dueOverdue = !!dueDate && new Date(dueDate).getTime() < now.getTime();
  return { state, overdue: state === 'pending' && (ageOverdue || dueOverdue) };
}

export function stateLabel(request: WorkflowRequest): string {
  return request.overdue ? 'Pending · overdue' : request.state[0].toUpperCase() + request.state.slice(1);
}
