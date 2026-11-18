import * as React from 'react';
import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { useAppRoles, usePreflight } from '../../hooks/useReferenceData';

const useStyles = makeStyles({
  list: {
    margin: 0,
    paddingLeft: tokens.spacingHorizontalXL
  }
});

export const PreflightBar: React.FC = () => {
  const styles = useStyles();
  const preflight = usePreflight();
  const roles = useAppRoles();

  const rolesBar =
    roles.data?.unconfigured === true ? (
      <MessageBar intent="warning" layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>{strings.RolesUnconfiguredTitle}</MessageBarTitle>
          {roles.data.bootstrapGranted ? strings.RolesUnconfiguredBody : strings.RolesUnconfiguredReadOnly}
        </MessageBarBody>
      </MessageBar>
    ) : undefined;

  if (preflight.isLoading) {
    return rolesBar ?? null;
  }
  if (preflight.error) {
    return (
      <>
        {rolesBar}
        <MessageBar intent="error" layout="multiline">
        <MessageBarBody>
          <MessageBarTitle>{strings.PreflightErrorTitle}</MessageBarTitle>
          {preflight.error instanceof Error ? preflight.error.message : ''}
          </MessageBarBody>
        </MessageBar>
      </>
    );
  }
  if (!preflight.data || preflight.data.missing.length === 0) {
    return rolesBar ?? null;
  }

  const schemaGaps = preflight.data.schemaGaps ?? [];
  const capabilityGaps = preflight.data.missing.filter((c) => c.capability !== 'schemaValid');

  return (
    <>
      {rolesBar}
      {schemaGaps.length > 0 ? (
        <MessageBar intent="error" layout="multiline">
          <MessageBarBody>
            <MessageBarTitle>{strings.SchemaGapTitle}</MessageBarTitle>
            {strings.SchemaGapIntro}
            <ul className={styles.list}>
              {schemaGaps.map((gap) => (
                <li key={gap.list}>
                  <strong>{gap.list}</strong>
                  {gap.missingList
                    ? ` — ${strings.SchemaGapMissingList}`
                    : gap.missingFields.length > 0
                      ? ` — ${strings.SchemaGapMissingColumns}: ${gap.missingFields.join(', ')}`
                      : ` — ${gap.error}`}
                </li>
              ))}
            </ul>
          </MessageBarBody>
        </MessageBar>
      ) : undefined}
      {capabilityGaps.length > 0 ? (
        <MessageBar intent="warning" layout="multiline">
          <MessageBarBody>
            <MessageBarTitle>{strings.PreflightMissingTitle}</MessageBarTitle>
            {strings.PreflightMissingIntro}
            <ul className={styles.list}>
              {capabilityGaps.map((check) => (
                <li key={check.capability}>
                  <strong>{check.label}</strong> — {check.detail}
                </li>
              ))}
            </ul>
          </MessageBarBody>
        </MessageBar>
      ) : undefined}
    </>
  );
};
