import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Caption1
} from '@fluentui/react-components';
import { CheckmarkCircleFilled, ErrorCircleFilled, InfoFilled } from '@fluentui/react-icons';
import { SitePermissionValidationResult } from '../../../models/OperationalTypes';
import { accessLevelLabel, validationCheckLabel } from './localization';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface ValidationSummaryProps {
  readonly validations: ReadonlyArray<SitePermissionValidationResult>;
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = React.memo((props) => {
  const styles = useAppStyles();

  if (props.validations.length === 0) {
    return null;
  }

  const hasAnyFailure = props.validations.some((result) => !result.isValid);

  return (
    <Accordion collapsible defaultOpenItems={hasAnyFailure ? ['validation'] : []}>
      <AccordionItem value="validation">
        <AccordionHeader expandIconPosition="end">
          {strings.ValidationSummaryTitle}
          {' '}
          <Badge
            appearance="tint"
            color={hasAnyFailure ? 'danger' : 'success'}
          >
            {hasAnyFailure ? strings.CheckFailed : strings.CheckPassed}
          </Badge>
        </AccordionHeader>
        <AccordionPanel>
          <div className={styles.statusStack}>
            {props.validations.map((result) => (
              <div key={`${result.accessLevel}-${result.siteUrl}`} className={styles.statusStack}>
                <Caption1>
                  <strong>{accessLevelLabel(result.accessLevel)}</strong> — {result.siteUrl}
                </Caption1>
                <ul className={styles.list}>
                  {[...result.checks]
                    .sort((left, right) => Number(left.passed) - Number(right.passed))
                    .map((check) => (
                      <li key={check.code} className={styles.listRow}>
                        {check.passed
                          ? <CheckmarkCircleFilled aria-hidden="true" />
                          : check.severity === 'advisory'
                            ? <InfoFilled aria-hidden="true" />
                            : <ErrorCircleFilled aria-hidden="true" />}
                        <Caption1>
                          {validationCheckLabel(check.code)}
                          {check.detail ? ` — ${check.detail}` : ''}
                          <span className={styles.visuallyHidden}>
                            {check.passed ? ` ${strings.CheckPassed}` : ` ${strings.CheckFailed}`}
                          </span>
                        </Caption1>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Caption1>{strings.ValidationAdvisoryNote}</Caption1>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

ValidationSummary.displayName = 'ValidationSummary';
