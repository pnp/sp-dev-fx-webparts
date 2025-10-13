import * as React from "react";
import * as strings from 'ManageSchemaExtensionsWebPartStrings';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  Link,
  tokens,
} from "@fluentui/react-components";
import {
  BuildingFactory20Regular,
  Info20Regular,
  Warning20Regular,
} from "@fluentui/react-icons";

import { EAppHostName } from "../../constants";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { css } from "@emotion/css";
import { useAtomValue } from "jotai";

export interface IInformationCreatePanelProps {}

export const InformationCreatePanel: React.FunctionComponent<
  IInformationCreatePanelProps
> = (props: React.PropsWithChildren<IInformationCreatePanelProps>) => {
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { appHostName } = appGlobalState;
  const styles = css({
    backgroundColor:
      appHostName === EAppHostName.Teams
        ? tokens.colorNeutralBackground1
        : tokens.colorNeutralBackground3,
    borderRadius: "8px",
  });

  const iconStyle = css({
    marginRight: "8px",

    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    width: "28px",
    height: "28px",
  });

  return (
    <>
      <Stack gap="m" padding={"10px"} className={styles}>
        <Accordion collapsible>
          <AccordionItem value="guidelines">
            <AccordionHeader
              icon={
                <Info20Regular
                  style={{ color: tokens.colorBrandForeground1 }}
                />
              }
              expandIconPosition="end"
              size="large"
            >
              {strings.SchemaExtensionCreateGuidelinesTitle}
            </AccordionHeader>
            <AccordionPanel>
              <Stack gap="m">
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <BuildingFactory20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.StatusGuideline}</strong> {strings.StatusGuidelineDetails}
                  </Body1>
                </Stack>
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <Warning20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.LimitationsGuideline}</strong> {strings.LimitationsGuidelineDetails}{" "}
                    <Link
                      href="https://learn.microsoft.com/en-us/graph/api/resources/schemaextension?view=graph-rest-1.0"
                      target="_blank"
                    >
                      {strings.ReviewDocumentationLink}
                    </Link>{" "}
                    for more details.
                  </Body1>
                </Stack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

       
      </Stack>
    </>
  );
};
