import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

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
  Add20Regular,
  CheckmarkCircle20Regular,
  Edit20Regular,
  Link20Regular,
  Prohibited20Regular,
  Shield20Regular,
} from "@fluentui/react-icons";

import { StackV2 as Stack } from "@spteck/react-controls";
import { css } from "@emotion/css";

export interface IInformationEditPanelProps {}

export const InformationEditPanel: React.FunctionComponent<
  IInformationEditPanelProps
> = (props: React.PropsWithChildren<IInformationEditPanelProps>) => {
  const styles = css({
    backgroundColor: tokens.colorNeutralBackground3,
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
                <Edit20Regular
                  style={{ color: tokens.colorBrandForeground1 }}
                />
              }
              expandIconPosition="end"
              size="large"
            >
              {strings.SchemaExtensionUpdateGuidelinesTitle}
            </AccordionHeader>
            <AccordionPanel>
              <Stack gap="m">
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <Add20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.AdditiveUpdatesGuideline}</strong>{" "}
                    {strings.AdditiveUpdatesDetails}
                  </Body1>
                </Stack>
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <Shield20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.StatusRequirementGuideline}</strong>{" "}
                    {strings.StatusRequirementDetails}
                  </Body1>
                </Stack>
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <Prohibited20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.RestrictionsGuideline}</strong>{" "}
                    {strings.RestrictionsDetails}
                  </Body1>
                </Stack>
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <CheckmarkCircle20Regular className={iconStyle} />
                  <Body1>
                    <strong>{strings.AllowedChangesGuideline}</strong>{" "}
                    {strings.AllowedChangesDetails}
                  </Body1>
                </Stack>
                <Stack direction="horizontal" gap="m" alignItems="start">
                  <Link20Regular className={iconStyle} />
                  <Link
                    href="https://learn.microsoft.com/en-us/graph/api/resources/extensionschemaproperty?view=graph-rest-1.0#supported-property-data-types"
                    target="_blank"
                    rel="noopener"
                  >
                    {strings.SupportedDataTypesLink}
                  </Link>
                </Stack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </>
  );
};
