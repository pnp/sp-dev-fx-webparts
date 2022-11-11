import {
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";

const ErrorMessage = (): JSX.Element => {
  return (
    <MessageBar messageBarType={MessageBarType.error}>
      Failed on getting or parsing data. Please check again your data in the
      SharePoint List.
    </MessageBar>
  );
};

export { ErrorMessage };
