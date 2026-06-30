import * as React from "react";
import styles from "./MeetingInsightsTab.module.scss";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { CopilotMeetingInsightsService } from "../../../../services/CopilotMeetingInsightsService";
import type { MeetingAiInsight } from "../../../../services/ICopilotMeetingInsightsService";
import PrerequisitesPanel from "../PrerequisitesPanel";

interface IMeetingInsightsTabProps {
  userLoginName: string;
  userAadId?: string;
}

interface IMeetingInsightsTabState {
  meetingId: string;
  insights: MeetingAiInsight | null;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export default class MeetingInsightsTab extends React.Component<
  IMeetingInsightsTabProps,
  IMeetingInsightsTabState
> {
  constructor(props: IMeetingInsightsTabProps) {
    super(props);
    this.state = {
      meetingId: "",
      insights: null,
      isLoading: false,
      error: null,
      hasSearched: false,
    };
  }

  private handleGetInsights = async (): Promise<void> => {
    const { meetingId } = this.state;
    const { userLoginName, userAadId } = this.props;
    const candidateUserId =
      typeof userAadId === "string"
        ? userAadId
        : userAadId
          ? String(userAadId)
          : userLoginName;
    const graphUserId =
      candidateUserId && candidateUserId !== "[object Object]"
        ? candidateUserId
        : userLoginName;

    if (!meetingId.trim()) return;

    this.setState({ isLoading: true, error: null });

    try {
      const response = await CopilotMeetingInsightsService.GetMeetingInsights(
        graphUserId,
        meetingId.trim(),
      );

      const firstInsight =
        response.value && response.value.length > 0 ? response.value[0] : null;

      this.setState({
        insights: firstInsight,
        isLoading: false,
        hasSearched: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.setState({
        error: errorMessage,
        isLoading: false,
        hasSearched: true,
      });
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleGetInsights().catch(console.error);
    }
  };

  public render(): React.ReactElement<IMeetingInsightsTabProps> {
    const { meetingId, insights, isLoading, error, hasSearched } = this.state;

    return (
      <div className={styles.meetingContainer}>
        {/* API Info Bar */}
        <div className={styles.apiBar}>
          <div className={styles.apiBarLeft}>
            <strong>Meeting Insights API</strong>
            <code style={{ fontSize: "12px" }}>
              GET /v1.0/copilot/users/.../aiInsights
            </code>
            <span className={styles.badge}>GA (v1.0)</span>
          </div>
          <PrerequisitesPanel
            apiName="Meeting Insights API"
            apiStatus="GA (v1.0)"
            endpoint="GET /v1.0/copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights"
            description="Retrieve AI-generated meeting notes, action items, and mention events from Teams meetings that had transcription or recording enabled."
            prerequisites={[
              {
                category: "Required Permissions",
                items: ["OnlineMeetingAiInsight.Read.All (delegated)"],
              },
              {
                category: "Licensing",
                items: ["Microsoft 365 Copilot license required for users"],
              },
              {
                category: "Meeting Requirements",
                items: [
                  "Transcription or recording must be enabled during the meeting",
                  "Insights may take up to 4 hours after meeting ends",
                  "Supports: private scheduled meetings, town halls, webinars, Meet Now",
                  "Does NOT support: channel meetings",
                ],
              },
              {
                category: "Limitations",
                items: [
                  "Delegated permissions only (no application-only access)",
                  "User must be a participant of the meeting",
                ],
              },
            ]}
          />
        </div>

        {/* Meeting ID Input */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 1 }}>
            <TextField
              label="Online Meeting ID"
              value={meetingId}
              onChange={(_, val) => this.setState({ meetingId: val || "" })}
              onKeyPress={this.handleKeyPress}
              placeholder="Enter the online meeting ID..."
              disabled={isLoading}
              description="Find the meeting ID from Teams meeting details or via Graph API (GET /me/onlineMeetings)"
            />
          </div>
          <PrimaryButton
            text={isLoading ? "Loading..." : "Get Insights"}
            iconProps={{ iconName: "People" }}
            onClick={this.handleGetInsights}
            disabled={!meetingId.trim() || isLoading}
            styles={{
              root: {
                backgroundColor: "#107c10",
                borderColor: "#107c10",
                height: 32,
              },
              rootHovered: { backgroundColor: "#0b6a0b" },
              rootPressed: { backgroundColor: "#085808" },
            }}
          />
        </div>

        {isLoading && (
          <Spinner
            size={SpinnerSize.medium}
            label="Fetching meeting insights..."
            styles={{ root: { margin: "40px 0" } }}
          />
        )}

        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => this.setState({ error: null })}
            styles={{ root: { marginBottom: "12px" } }}
          >
            {error}
          </MessageBar>
        )}

        {hasSearched && !isLoading && !error && !insights && (
          <MessageBar
            messageBarType={MessageBarType.warning}
            styles={{ root: { marginBottom: "12px" } }}
          >
            No insights found for this meeting. Ensure the meeting had
            transcription enabled and has concluded.
          </MessageBar>
        )}

        {insights && (
          <div>
            {/* Insight Metadata */}
            {(insights.callId ||
              insights.createdDateTime ||
              insights.endDateTime) && (
              <div
                className={styles.sectionCard}
                style={{
                  background: "#f8fbf8",
                  borderLeft: "4px solid #107c10",
                  marginBottom: "12px",
                }}
              >
                <div className={styles.sectionTitle}>Insight Details</div>
                {insights.callId && (
                  <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                    <strong>Call ID:</strong> {insights.callId}
                  </div>
                )}
                {insights.createdDateTime && (
                  <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                    <strong>Created:</strong>{" "}
                    {new Date(insights.createdDateTime).toLocaleString()}
                  </div>
                )}
                {insights.endDateTime && (
                  <div style={{ fontSize: "12px" }}>
                    <strong>Meeting Ended:</strong>{" "}
                    {new Date(insights.endDateTime).toLocaleString()}
                  </div>
                )}
              </div>
            )}

            {/* Meeting Notes */}
            {insights.meetingNotes && insights.meetingNotes.length > 0 && (
              <div className={styles.sectionCard}>
                <div className={styles.sectionTitle}>Meeting Notes</div>
                {insights.meetingNotes.map((note, index) => (
                  <div key={index} className={styles.noteItem}>
                    {note.title && (
                      <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                        {note.title}
                      </div>
                    )}
                    <div style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {note.text}
                    </div>
                    {note.subpoints &&
                      note.subpoints.map((sub, subIndex) => (
                        <div key={subIndex} className={styles.subpoint}>
                          &bull; {sub.text}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}

            {/* Action Items */}
            {insights.actionItems && insights.actionItems.length > 0 && (
              <div className={styles.sectionCard}>
                <div className={styles.sectionTitle}>Action Items</div>
                {insights.actionItems.map((item, index) => (
                  <div key={index} className={styles.actionItem}>
                    {item.title && (
                      <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                        {item.title}
                      </div>
                    )}
                    <div style={{ fontSize: "13px" }}>{item.text}</div>
                    {item.ownerDisplayName && (
                      <div className={styles.actionOwner}>
                        Assigned to: {item.ownerDisplayName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Mentions */}
            {insights.viewpoint?.mentionEvents &&
              insights.viewpoint.mentionEvents.length > 0 && (
                <div className={styles.sectionCard}>
                  <div className={styles.sectionTitle}>Mentions</div>
                  {insights.viewpoint.mentionEvents.map((event, index) => (
                    <div key={index} className={styles.mentionItem}>
                      <div>
                        {event.speaker?.user?.displayName && (
                          <strong>{event.speaker.user.displayName}: </strong>
                        )}
                        {event.transcriptUtterance || "No transcript available"}
                      </div>
                      {event.eventDateTime && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#999",
                            flexShrink: 0,
                            marginLeft: "12px",
                          }}
                        >
                          {new Date(event.eventDateTime).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {/* Debug */}
            <details style={{ marginTop: "16px" }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#107c10",
                }}
              >
                Debug: Raw API Response
              </summary>
              <pre
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  padding: "15px",
                  borderRadius: "6px",
                  overflow: "auto",
                  maxHeight: "300px",
                  fontSize: "12px",
                  fontFamily: "'Consolas', monospace",
                  marginTop: "8px",
                }}
              >
                {JSON.stringify(insights, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    );
  }
}
