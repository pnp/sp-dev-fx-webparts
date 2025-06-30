import * as React from "react";
import { Preferences } from "./Preferences";
import { RecoilRoot } from "recoil";
import { Divider, MantineProvider } from "@mantine/core";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContainerProps {
  title: string;
  extensionName: string;
  termsetGuid: string;
  enableCaching: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  loginName: string;
  context: WebPartContext;
}

export const Container: React.FC<IContainerProps> = (props) => {
  return (
    <MantineProvider
      theme={{ fontFamily: "Segoe UI" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RecoilRoot>
        <Divider my="xs" label="Preference" labelPosition="center" />
        <Preferences {...props} />
      </RecoilRoot>
    </MantineProvider>
  );
};
