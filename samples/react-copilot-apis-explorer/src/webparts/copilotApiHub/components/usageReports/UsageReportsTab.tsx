import * as React from "react";
import styles from "./UsageReportsTab.module.scss";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { CopilotUsageReportsService } from "../../../../services/CopilotUsageReportsService";
import type {
  UsageReportPeriod,
  CopilotUsageUserDetail,
} from "../../../../services/ICopilotUsageReportsService";
import PrerequisitesPanel from "../PrerequisitesPanel";

interface IUsageReportsTabState {
  period: UsageReportPeriod;
  users: CopilotUsageUserDetail[];
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

const PERIOD_OPTIONS: IDropdownOption[] = [
  { key: "D7", text: "Last 7 days" },
  { key: "D30", text: "Last 30 days" },
  { key: "D90", text: "Last 90 days" },
  { key: "D180", text: "Last 180 days" },
];

export default class UsageReportsTab extends React.Component<
  {},
  IUsageReportsTabState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      period: "D30",
      users: [],
      isLoading: false,
      error: null,
      hasLoaded: false,
    };
  }

  private handleLoadReport = async (): Promise<void> => {
    const { period } = this.state;
    this.setState({ isLoading: true, error: null });

    try {
      const users =
        await CopilotUsageReportsService.GetUsageUserDetail(period);
      this.setState({ users: users || [], isLoading: false, hasLoaded: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.setState({ error: errorMessage, isLoading: false, hasLoaded: true });
    }
  };

  private formatDate(dateStr: string | undefined | null): React.ReactElement {
    if (!dateStr || dateStr === "0001-01-01") {
      return <span className={styles.inactiveDate}>-</span>;
    }
    return (
      <span className={styles.activeDate}>
        {new Date(dateStr).toLocaleDateString()}
      </span>
    );
  }

  public render(): React.ReactElement {
    const { period, users, isLoading, error, hasLoaded } = this.state;

    return (
      <div className={styles.reportsContainer}>
        {/* API Info Bar */}
        <div className={styles.apiBar}>
          <div className={styles.apiBarLeft}>
            <strong>Copilot Usage Reports API</strong>
            <code style={{ fontSize: "12px" }}>
              GET /beta/reports/...CopilotUsageUserDetail
            </code>
            <span className={styles.badge}>Beta</span>
          </div>
          <PrerequisitesPanel
            apiName="Copilot Usage Reports API"
            apiStatus="Beta"
            endpoint="GET /beta/reports/getMicrosoft365CopilotUsageUserDetail(period='{period}')"
            description="Retrieve per-user Copilot usage data across Microsoft 365 apps including Teams, Word, Excel, PowerPoint, Outlook, OneNote, Loop, and Copilot Chat."
            prerequisites={[
              {
                category: "Required Permissions",
                items: ["Reports.Read.All"],
              },
              {
                category: "Minimum Admin Role",
                items: [
                  "Reports Reader (recommended — least privilege)",
                ],
              },
              {
                category: "Other Supported Roles",
                items: [
                  "Global Administrator",
                  "Global Reader",
                  "Usage Summary Reports Reader",
                  "Exchange Administrator",
                  "SharePoint Administrator",
                  "Teams Service Administrator",
                ],
              },
              {
                category: "Licensing",
                items: [
                  "Only returns data for users with Microsoft 365 Copilot license",
                  "Unlicensed Copilot Chat usage is excluded",
                ],
              },
              {
                category: "Limitations",
                items: [
                  "Beta API — subject to change without notice",
                  "Not available in US Government or China clouds",
                  "Must send Accept: application/json header for JSON response",
                ],
              },
            ]}
          />
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "flex-end" }}>
          <Dropdown
            label="Report Period"
            selectedKey={period}
            options={PERIOD_OPTIONS}
            onChange={(_, option) => {
              if (option) this.setState({ period: option.key as UsageReportPeriod });
            }}
            disabled={isLoading}
            styles={{ root: { minWidth: 180 } }}
          />
          <PrimaryButton
            text={isLoading ? "Loading..." : "Load Report"}
            iconProps={{ iconName: "ReportDocument" }}
            onClick={this.handleLoadReport}
            disabled={isLoading}
            styles={{
              root: {
                backgroundColor: "#d83b01",
                borderColor: "#d83b01",
                height: 32,
              },
              rootHovered: { backgroundColor: "#c23000" },
              rootPressed: { backgroundColor: "#a62b00" },
            }}
          />
        </div>

        {isLoading && (
          <Spinner size={SpinnerSize.medium} label="Loading usage report..." styles={{ root: { margin: "40px 0" } }} />
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

        {hasLoaded && !isLoading && !error && (
          <div>
            <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
              Showing <strong>{users.length}</strong> user
              {users.length !== 1 ? "s" : ""} with Copilot license
              {users.length > 0 &&
                users[0].reportRefreshDate &&
                ` (report refreshed: ${users[0].reportRefreshDate})`}
            </div>

            {users.length === 0 ? (
              <MessageBar messageBarType={MessageBarType.warning}>
                No usage data found. Ensure you have admin permissions and
                there are licensed Copilot users in your tenant.
              </MessageBar>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.reportTable}>
                  <thead>
                    <tr>
                      <th>Display Name</th>
                      <th>Last Activity</th>
                      <th>Teams</th>
                      <th>Word</th>
                      <th>Excel</th>
                      <th>PowerPoint</th>
                      <th>Outlook</th>
                      <th>OneNote</th>
                      <th>Loop</th>
                      <th>Copilot Chat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: "13px" }}>
                            {user.displayName}
                          </div>
                          <div style={{ fontSize: "11px", color: "#999" }}>
                            {user.userPrincipalName}
                          </div>
                        </td>
                        <td>{this.formatDate(user.lastActivityDate)}</td>
                        <td>{this.formatDate(user.microsoftTeamsCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.wordCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.excelCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.powerPointCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.outlookCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.oneNoteCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.loopCopilotLastActivityDate)}</td>
                        <td>{this.formatDate(user.copilotChatLastActivityDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
