import * as React from "react";
import { Pivot, PivotItem, PivotLinkSize } from "@fluentui/react/lib/Pivot";
import styles from "./CopilotApiHub.module.scss";
import type { ICopilotApiHubProps } from "./ICopilotApiHubProps";
import CopilotChatTab from "./chat/CopilotChatTab";
import CopilotSearchTab from "./search/CopilotSearchTab";
import MeetingInsightsTab from "./meetingInsights/MeetingInsightsTab";
import UsageReportsTab from "./usageReports/UsageReportsTab";

export default class CopilotApiHub extends React.Component<ICopilotApiHubProps> {
  public render(): React.ReactElement<ICopilotApiHubProps> {
    const { hasTeamsContext, userDisplayName, userLoginName, userAadId } =
      this.props;

    return (
      <section
        className={`${styles.copilotApiHub} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            Microsoft 365 Copilot API Explorer
          </div>
          <div className={styles.headerSubtitle}>
            Hello, {userDisplayName} — explore Copilot APIs through the tabs
            below
          </div>
        </div>

        <Pivot
          aria-label="Copilot API Explorer"
          linkSize={PivotLinkSize.large}
          styles={{
            root: {
              borderBottom: "1px solid #edebe9",
            },
          }}
        >
          <PivotItem headerText="Chat" itemIcon="Chat">
            <div className={styles.tabContent}>
              <CopilotChatTab userDisplayName={userDisplayName} />
            </div>
          </PivotItem>

          <PivotItem headerText="Search" itemIcon="Search">
            <div className={styles.tabContent}>
              <CopilotSearchTab />
            </div>
          </PivotItem>

          <PivotItem headerText="Meeting Insights" itemIcon="People">
            <div className={styles.tabContent}>
              <MeetingInsightsTab
                userLoginName={userLoginName}
                userAadId={userAadId}
              />
            </div>
          </PivotItem>

          <PivotItem headerText="Usage Reports" itemIcon="ReportDocument">
            <div className={styles.tabContent}>
              <UsageReportsTab />
            </div>
          </PivotItem>
        </Pivot>
      </section>
    );
  }
}
