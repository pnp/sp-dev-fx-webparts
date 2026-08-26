import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import {
  ICopilotUsageReportsService,
  UsageReportPeriod,
  CopilotUsageUserDetail,
  CopilotUsageReportResponse,
} from "./ICopilotUsageReportsService";

// ============================================================================
// Copilot Usage Reports Service
// Calls GET /beta/reports/getMicrosoft365CopilotUsageUserDetail(period='{period}')
// to retrieve per-user Copilot usage data.
//
// Key points for developers:
// - This is a Beta API
// - Must send Accept: application/json header to get JSON (default is CSV)
// - Requires Reports.Read.All permission (admin-level)
// - Only licensed Copilot users are included in results
// ============================================================================
export class CopilotUsageReportsService
  implements ICopilotUsageReportsService
{
  private static _msGraphClient: MSGraphClientV3 | null = null;

  public static async init(
    msGraphClientFactory: MSGraphClientFactory,
  ): Promise<void> {
    CopilotUsageReportsService._msGraphClient =
      await msGraphClientFactory.getClient("3");
    console.log(
      "[CopilotUsageReportsService] Microsoft Graph client initialized successfully",
    );
  }

  /**
   * Retrieve per-user Copilot usage details for the specified time period.
   * @param period - The reporting period: D7, D30, D90, or D180
   * @returns Array of user usage detail records
   */
  public static async GetUsageUserDetail(
    period: UsageReportPeriod,
  ): Promise<CopilotUsageUserDetail[]> {
    if (!CopilotUsageReportsService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }

    try {
      console.log(
        "[CopilotUsageReportsService] Fetching usage report for period:",
        period,
      );

      // GET /beta/reports/getMicrosoft365CopilotUsageUserDetail(period='{period}')
      // The Accept header must be application/json to receive JSON instead of CSV
      const response: CopilotUsageReportResponse =
        await CopilotUsageReportsService._msGraphClient
          .api(
            `/reports/getMicrosoft365CopilotUsageUserDetail(period='${period}')`,
          )
          .version("beta")
          .header("Accept", "application/json")
          .get();

      const users = response.value || [];
      console.log(
        "[CopilotUsageReportsService] Report retrieved. User count:",
        users.length,
      );
      return users;
    } catch (error) {
      console.error(
        "[CopilotUsageReportsService] Error fetching usage report:",
        error,
      );
      throw new Error(
        `Failed to get usage report: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Instance method delegates to static method
  public async GetUsageUserDetail(
    period: UsageReportPeriod,
  ): Promise<CopilotUsageUserDetail[]> {
    return await CopilotUsageReportsService.GetUsageUserDetail(period);
  }
}
