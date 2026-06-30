import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import { Body1, Link, tokens } from "@fluentui/react-components";
import {
  DataUsageSettings20Regular,
  DatabasePlugConnected20Regular,
} from "@fluentui/react-icons";

import { EAppHostName } from "../../constants";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { css } from "@emotion/css";
import { useAtomValue } from "jotai";

export interface IInformationPanelProps {}

export const InformationPanel: React.FunctionComponent<
  IInformationPanelProps
> = (props: React.PropsWithChildren<IInformationPanelProps>) => {
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { appHostName } = appGlobalState;
  const styles = css({
    backgroundColor:
      appHostName === EAppHostName.Teams
        ? tokens.colorNeutralBackground3
        : tokens.colorNeutralBackground3,
    borderRadius: "8px",
  });

  const iconStyles = css({
    color: tokens.colorBrandForeground1,
    marginTop: "2px",
    flexShrink: 0,
    width: "32px",
    height: "32px",
  });

  return (
    <>
      <Stack
        gap="m"
        padding={"40px"}
        marginTop={"xl"}
        marginBottom={"xl"}
        className={styles}
      >
        <Stack direction="horizontal" gap="l">
          <DatabasePlugConnected20Regular className={iconStyles} />
          <Body1>{strings.SchemaExtensionsInfoDescription}</Body1>
        </Stack>
        <Stack direction="horizontal" gap="l">
          <DataUsageSettings20Regular className={iconStyles} />
          <Body1>
            {strings.SchemaExtensionsUseCaseDescription}{" "}
            <Link
              href="https://learn.microsoft.com/en-us/graph/api/resources/schemaextension?view=graph-rest-1.0"
              target="_blank"
              rel="noopener"
              inline
            >
              {strings.LearnMoreLink}
            </Link>
          </Body1>
        </Stack>
      </Stack>
    </>
  );
};
