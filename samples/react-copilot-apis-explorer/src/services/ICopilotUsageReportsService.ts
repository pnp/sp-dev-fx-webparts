// ============================================================================
// Copilot Usage Reports API - Type Definitions
// API: GET /beta/reports/getMicrosoft365CopilotUsageUserDetail(period='{period}')
// Retrieves per-user Copilot usage data across Microsoft 365 apps.
// Required permissions: Reports.Read.All
//
// Important notes for developers:
// - This is a Beta API and may change
// - Requires admin-level permissions (Reports.Read.All)
// - Only returns data for users with a Microsoft 365 Copilot license
// - The caller must have one of these Azure AD roles:
//   Company Administrator, Exchange Admin, SharePoint Admin, Teams Admin,
//   Global Reader, Usage Summary Reports Reader, or Reports Reader
// ============================================================================

export type UsageReportPeriod = "D7" | "D30" | "D90" | "D180";

export interface CopilotUsageUserDetail {
  reportRefreshDate: string;
  userPrincipalName: string;
  displayName: string;
  lastActivityDate: string;
  microsoftTeamsCopilotLastActivityDate?: string;
  wordCopilotLastActivityDate?: string;
  excelCopilotLastActivityDate?: string;
  powerPointCopilotLastActivityDate?: string;
  outlookCopilotLastActivityDate?: string;
  oneNoteCopilotLastActivityDate?: string;
  loopCopilotLastActivityDate?: string;
  copilotChatLastActivityDate?: string;
}

export interface CopilotUsageReportResponse {
  value: CopilotUsageUserDetail[];
  "@odata.nextLink"?: string;
}

export interface ICopilotUsageReportsService {
  GetUsageUserDetail(
    period: UsageReportPeriod,
  ): Promise<CopilotUsageUserDetail[]>;
}
