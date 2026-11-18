export interface IAppSettings {
  requireApproval: boolean;
  requiredApprovals: number;
  bulkRowLimit: number;
  jobsRefreshSeconds: number;
  /**
   * Mailbox or distribution list notified when a job enters PendingApproval.
   * Empty disables the notification — approvers then rely on the dashboard.
   */
  approvalNotifyUpn: string;
}

export const DEFAULT_APP_SETTINGS: IAppSettings = {
  requireApproval: true,
  requiredApprovals: 1,
  bulkRowLimit: 100,
  jobsRefreshSeconds: 30,
  approvalNotifyUpn: ''
};
