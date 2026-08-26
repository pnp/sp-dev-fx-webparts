import { EAppHostName } from "../../constants";
import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface ManageSchemaExtensionsStyles {
  title: string;
  description: string;
  toolbar: string;
  content: string;
  sharePointHost: string;
  otherHosts: string;
  fluentProvider: string;
}

export const useManageSchemaExtensionsStyles = (
  globalState: IAppGlobalState
): ManageSchemaExtensionsStyles => {
  const { appHostName } = globalState;
  return {
    title: css({
      fontSize: tokens.fontSizeHero800,
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground1,
      margin: 0,
      marginBottom: tokens.spacingVerticalS,
    }),
    description: css({
      fontSize: tokens.fontSizeBase300,
      color: tokens.colorNeutralForeground2,
      margin: 0,
    }),
    toolbar: css({
      marginBottom: tokens.spacingVerticalM,
    }),
    content: css({
      flex: 1,
      overflow: "hidden",
    }),
    sharePointHost: css({
      backgroundColor: "transparent",
    }),
    otherHosts: css({
      backgroundColor: tokens.colorNeutralBackground1,
      height: "calc(100vh - 64px)",
      padding: tokens.spacingVerticalL,
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    }),
    fluentProvider: css({
      backgroundColor:
        appHostName === EAppHostName.SharePoint
          ? "transparent"
          : tokens.colorNeutralBackground1,
      paddingLeft: tokens.spacingHorizontalXXL,
      paddingRight: tokens.spacingHorizontalXXL,
      height: "100%",
    }),
  };
};
