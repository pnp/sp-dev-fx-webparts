import { Stack } from "@fluentui/react";
import { Person } from "@microsoft/mgt-react/dist/es6/spfx";
import { ViewType } from "@microsoft/mgt-spfx";
import * as React from "react";

export interface IUserQuestionProps {
  message: string;
}

export default class UserQuestion extends React.Component<
  IUserQuestionProps,
  {}
> {
  public render(): React.ReactElement<IUserQuestionProps> {
    return (
      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 30, padding: 5 }}>
        <Stack.Item
          styles={{ root: { display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end' } }}
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
                right: "-10px",
                top: "10px",
                width: "0",
                height: "0",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "10px solid white",
              }}
            />
          </div>
        </Stack.Item>
        <Stack.Item>
          <Person personQuery="me" view={ViewType.image} avatarSize="auto" />
        </Stack.Item>
      </Stack>
    );
  }
}
