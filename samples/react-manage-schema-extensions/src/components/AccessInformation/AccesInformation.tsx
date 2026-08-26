import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  Title3,
} from "@fluentui/react-components";
import {
  InfoRegular,
  LockClosed20Regular,
  ShieldPerson20Regular,
} from "@fluentui/react-icons";

import React from "react";
import { StackV2 as Stack } from "@spteck/react-controls";
import { useAccessInformationStyles } from "./useAccessInformationStyles";

export interface IAccessInformationProps {
  message?: string;
}

/**
 * AccessInformation component displays access restriction information for Users that do not have permissions
 * to manage Schema Extensions in the Microsoft 365 tenant AppCatalog.
 *
 * @returns {JSX.Element} The AccessInformation component.
 */
export const AccessInformation: React.FC<
  IAccessInformationProps
> = (): JSX.Element => {
  const styles = useAccessInformationStyles();
  return (
    <Card className={styles.card}>
      <CardHeader
        image={<ShieldPerson20Regular className={styles.shieldIcon} />}
        header={<Title3>{strings.AccessRestrictedTitle}</Title3>}
      />

      <Stack gap="l" padding="m">
        <Stack direction="horizontal" justifyContent="center">
          <LockClosed20Regular className={styles.lockIcon} />
        </Stack>
        <Stack gap="s">
          <Body1 className={styles.primaryMessage}>
            {strings.AccessRestrictedMessage}
          </Body1>
        </Stack>
        <Stack
          direction="horizontal"
          className={styles.infoSection}
          gap="xs"
          alignItems="start"
          justifyContent="center"
        >
          <InfoRegular className={styles.infoIcon} />
          <Caption1 className={styles.infoText}>
            {strings.AccessRestrictedDetails}
          </Caption1>
        </Stack>
      </Stack>
    </Card>
  );
};
