// ============================================================================
// Copilot Meeting Insights API - Type Definitions
// API: GET /v1.0/copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights
// Retrieves AI-generated meeting notes, action items, and mention events.
// Required permissions: OnlineMeetingAiInsight.Read.All (delegated only)
//
// Important notes for developers:
// - The meeting must have had transcription or recording enabled
// - Insights may take up to 4 hours to become available after a meeting ends
// - Supports: private scheduled meetings, town halls, webinars, Meet Now
// - Does NOT support: channel meetings
// ============================================================================

export interface MeetingAiInsightsResponse {
  value: MeetingAiInsight[];
}

export interface MeetingAiInsight {
  id: string;
  callId?: string;
  contentCorrelationId?: string;
  createdDateTime?: string;
  endDateTime?: string;
  meetingNotes: MeetingNote[];
  actionItems: MeetingActionItem[];
  viewpoint?: MeetingViewpoint;
}

export interface MeetingNote {
  title: string;
  text: string;
  subpoints?: MeetingNoteSubpoint[];
}

export interface MeetingNoteSubpoint {
  title?: string;
  text: string;
}

export interface MeetingActionItem {
  title: string;
  text: string;
  ownerDisplayName: string;
}

export interface MeetingViewpoint {
  mentionEvents?: MeetingMentionEvent[];
}

export interface MeetingMentionEvent {
  eventDateTime?: string;
  transcriptUtterance?: string;
  speaker?: {
    user?: {
      id?: string;
      displayName?: string;
    };
  };
}

export interface ICopilotMeetingInsightsService {
  GetMeetingInsights(
    userId: string,
    meetingId: string,
  ): Promise<MeetingAiInsightsResponse>;
}
