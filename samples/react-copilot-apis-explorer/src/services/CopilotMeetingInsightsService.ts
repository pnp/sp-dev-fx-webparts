import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import {
  ICopilotMeetingInsightsService,
  MeetingAiInsightsResponse,
} from "./ICopilotMeetingInsightsService";

// ============================================================================
// Copilot Meeting Insights Service
// Calls GET /v1.0/copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights
// to retrieve AI-generated notes, action items, and mention events.
//
// Key points for developers:
// - This is a v1.0 API (Generally Available)
// - Only works with delegated permissions (not application-only)
// - The user must have a Microsoft 365 Copilot license
// - Meeting transcription/recording must have been enabled during the meeting
// ============================================================================
export class CopilotMeetingInsightsService implements ICopilotMeetingInsightsService {
  private static _msGraphClient: MSGraphClientV3 | null = null;

  public static async init(
    msGraphClientFactory: MSGraphClientFactory,
  ): Promise<void> {
    CopilotMeetingInsightsService._msGraphClient =
      await msGraphClientFactory.getClient("3");
    console.log(
      "[CopilotMeetingInsightsService] Microsoft Graph client initialized successfully",
    );
  }

  /**
   * Retrieve AI-generated insights for a specific online meeting.
   * @param userId - The user ID or "me" for the current user
   * @param meetingId - The online meeting ID
   * @returns The meeting AI insights including notes, action items, and mentions
   */
  public static async GetMeetingInsights(
    userId: string,
    meetingId: string,
  ): Promise<MeetingAiInsightsResponse> {
    if (!CopilotMeetingInsightsService._msGraphClient) {
      throw new Error("Microsoft Graph client has not been initialized.");
    }

    if (!userId || !meetingId) {
      throw new Error("Both userId and meetingId are required.");
    }

    try {
      const normalizedUserId =
        typeof userId === "string" ? userId : String(userId ?? "");
      const normalizedMeetingId =
        typeof meetingId === "string" ? meetingId : String(meetingId ?? "");

      const encodedUserId = encodeURIComponent(normalizedUserId.trim());
      const encodedMeetingId = encodeURIComponent(normalizedMeetingId.trim());

      console.log(
        "[CopilotMeetingInsightsService] Fetching insights for meeting:",
        meetingId,
      );

      // GET /v1.0/copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights
      const response: MeetingAiInsightsResponse =
        await CopilotMeetingInsightsService._msGraphClient
          .api(
            `/copilot/users/${encodedUserId}/onlineMeetings/${encodedMeetingId}/aiInsights`,
          )
          .version("v1.0")
          .get();

      const firstInsight = response.value?.[0];
      if (!firstInsight) {
        console.log("[CopilotMeetingInsightsService] No insight items returned.");
        return response;
      }

      const hasDetailedContent =
        (firstInsight.meetingNotes?.length || 0) > 0 ||
        (firstInsight.actionItems?.length || 0) > 0 ||
        (firstInsight.viewpoint?.mentionEvents?.length || 0) > 0;

      if (hasDetailedContent || !firstInsight.id) {
        console.log(
          "[CopilotMeetingInsightsService] Insight list already contains detailed content.",
        );
        return response;
      }

      const encodedAiInsightId = encodeURIComponent(firstInsight.id);
      const detailedInsight = await CopilotMeetingInsightsService._msGraphClient
        .api(
          `/copilot/users/${encodedUserId}/onlineMeetings/${encodedMeetingId}/aiInsights/${encodedAiInsightId}`,
        )
        .version("v1.0")
        .get();

      const detailedResponse: MeetingAiInsightsResponse = {
        value: [detailedInsight],
      };

      console.log(
        "[CopilotMeetingInsightsService] Insights retrieved. Count:",
        detailedResponse.value?.length || 0,
      );
      return detailedResponse;
    } catch (error) {
      console.error(
        "[CopilotMeetingInsightsService] Error fetching meeting insights:",
        error,
      );
      throw new Error(
        `Failed to get meeting insights: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Instance method delegates to static method
  public async GetMeetingInsights(
    userId: string,
    meetingId: string,
  ): Promise<MeetingAiInsightsResponse> {
    return await CopilotMeetingInsightsService.GetMeetingInsights(
      userId,
      meetingId,
    );
  }
}
