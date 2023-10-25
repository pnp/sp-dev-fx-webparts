import { Stack } from "@fluentui/react";
import { Icon } from '@fluentui/react';
import * as React from "react";

export interface IAssistantResponseProps {
  message: string;
}

export default class AssistantResponse extends React.Component<
  IAssistantResponseProps,
  {}
> {
  public render(): React.ReactElement<IAssistantResponseProps> {
    return (
      <Stack horizontal tokens={{ childrenGap: 30, padding: 10 }}>
        <Stack.Item>
            <Icon iconName="Robot" styles={{ root: { fontSize: '22px' } }} />
        </Stack.Item>
        <Stack.Item
          grow
          styles={{ root: { display: "flex", justifyContent: "flex-start" } }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "5px",
              padding: "5px",
              backgroundColor: "white",
              fontFamily:
                '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
              fontSize: "14px",
              fontWeight: "400",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "85%",
              minWidth: "350px"
            }}
          >
            <p style={{ minWidth: '100px' }}>{this.props.message}</p>

            <div
              style={{
                content: '""',
                position: "absolute",
                left: "-10px",
                top: "10px", // changed right to left
                width: "0",
                height: "0",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderRight: "10px solid white", // changed borderLeft to borderRight
              }}
            />
          </div>
        </Stack.Item>
      </Stack>
    );
  }
}
