import * as React from "react";
import {
  Panel,
  PanelType,
} from "@fluentui/react/lib/Panel";
import { IconButton } from "@fluentui/react/lib/Button";

export interface IPrerequisite {
  category: string;
  items: string[];
}

interface IPrerequisitesPanelProps {
  apiName: string;
  apiStatus: "Beta" | "GA (v1.0)";
  endpoint: string;
  description: string;
  prerequisites: IPrerequisite[];
}

interface IPrerequisitesPanelState {
  isOpen: boolean;
}

export default class PrerequisitesPanel extends React.Component<
  IPrerequisitesPanelProps,
  IPrerequisitesPanelState
> {
  constructor(props: IPrerequisitesPanelProps) {
    super(props);
    this.state = { isOpen: false };
  }

  public render(): React.ReactElement<IPrerequisitesPanelProps> {
    const { apiName, apiStatus, endpoint, description, prerequisites } =
      this.props;
    const { isOpen } = this.state;

    const statusColor = apiStatus === "Beta" ? "#996515" : "#107c10";
    const statusBg = apiStatus === "Beta" ? "#fff3cd" : "#dff6dd";

    return (
      <>
        <IconButton
          iconProps={{ iconName: "Info" }}
          title="View prerequisites & API details"
          ariaLabel="View prerequisites"
          onClick={() => this.setState({ isOpen: true })}
          styles={{
            root: {
              color: "#0078d4",
              height: 28,
              width: 28,
            },
          }}
        />

        <Panel
          isOpen={isOpen}
          onDismiss={() => this.setState({ isOpen: false })}
          type={PanelType.medium}
          headerText={`${apiName} — Prerequisites`}
          closeButtonAriaLabel="Close"
        >
          <div style={{ padding: "8px 0" }}>
            {/* API Status Badge */}
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  backgroundColor: statusBg,
                  color: statusColor,
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {apiStatus}
              </span>
            </div>

            {/* Endpoint */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Endpoint
              </div>
              <code
                style={{
                  display: "block",
                  padding: "10px 12px",
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "'Consolas', 'Monaco', monospace",
                  wordBreak: "break-all",
                }}
              >
                {endpoint}
              </code>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Description
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                {description}
              </p>
            </div>

            {/* Prerequisites Sections */}
            {prerequisites.map((section, sIndex) => (
              <div key={sIndex} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#666",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {section.category}
                </div>
                <div
                  style={{
                    backgroundColor: "#faf9f8",
                    borderRadius: "4px",
                    border: "1px solid #edebe9",
                    overflow: "hidden",
                  }}
                >
                  {section.items.map((item, iIndex) => (
                    <div
                      key={iIndex}
                      style={{
                        padding: "8px 12px",
                        fontSize: "13px",
                        borderBottom:
                          iIndex < section.items.length - 1
                            ? "1px solid #edebe9"
                            : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "#107c10",
                          fontSize: "10px",
                          flexShrink: 0,
                        }}
                      >
                        &#9679;
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </>
    );
  }
}
