import { FluentProvider, IdPrefixProvider } from "@fluentui/react-components";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as React from "react";
import { FluentUILightTheme, FluentUIDarkTheme } from "../../../../helpers/ThemeHelper";
//import RoosterJsEditor from "./RoosterJsEditor";
//import RoosterTest from "./RoosterTest";
import RoosterJsEditor from "./RoosterJsEditor";
export interface IContainerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  editorContent: string;
  onSave: (html: string) => void;
  displayMode: DisplayMode;
}

const Container: React.FC<IContainerProps> = (props) => {
  return (
    <div>
      <IdPrefixProvider value="roosterjs-editor">
        <FluentProvider theme={props.isDarkTheme ? FluentUIDarkTheme : FluentUILightTheme}>
          <RoosterJsEditor {...props} />
        </FluentProvider>
      </IdPrefixProvider>
    </div>
  );
};

export default Container;
