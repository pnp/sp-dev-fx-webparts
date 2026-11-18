import * as React from 'react';
import {
  Button,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useWizard } from '../../../contexts/WizardContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useSettings } from '../../../contexts/SettingsContext';
import { validatePayload } from '../../../validators/payloadValidator';
import { QK_JOBS } from '../../../constants/queryKeys';
import { USAGE_LOCATIONS } from '../../../constants/usageLocations';
import type { IOnboardingPayload } from '../../../models';
import { formatString } from '../../Shared/format';
import { useAppToast } from '../../Shared/AppToaster';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const useStyles = makeStyles({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalXS,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2
  },
  rows: {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 200px) 1fr',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalS,
    '@container (max-width: 560px)': {
      gridTemplateColumns: '1fr'
    }
  },
  rowLabel: {
    color: tokens.colorNeutralForeground3
  },
  errorList: {
    margin: 0,
    paddingLeft: tokens.spacingHorizontalXL
  }
});

interface IReviewSection {
  title: string;
  step: number;
  rows: [string, string][];
}

export interface IReviewStepProps {
  onSubmitted: () => void;
}

export const ReviewStep: React.FC<IReviewStepProps> = ({ onSubmitted }) => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const services = useServices();
  const { requireApproval } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const draft = state.draft;
  const payload: IOnboardingPayload | undefined = draft.identity
    ? {
        schemaVersion: 1,
        kind: 'onboard',
        personal: draft.personal,
        employment: draft.employment,
        identity: draft.identity,
        accountSettings: draft.accountSettings,
        licenses: draft.licenses,
        access: draft.access,
        expirationReviewDays: draft.expirationReviewDays,
        cloneSourceUserId: draft.cloneSourceUserId,
        cloneSourceDisplayName: draft.cloneSourceDisplayName,
        approverGroupId: draft.approverGroupId
      }
    : undefined;
  const jobType: 'Onboard' | 'Clone' = draft.cloneSourceUserId ? 'Clone' : 'Onboard';
  const validationErrors: string[] = payload
    ? validatePayload(payload)
    : [strings.IdentityNeedsNames];

  const sections: IReviewSection[] = [
    {
      title: strings.WizardStepPersonal,
      step: 0,
      rows: [
        [strings.DisplayNameLabel, draft.personal.displayName],
        [strings.EmployeeIdLabel, draft.personal.employeeId],
        [strings.PhotoLabel, draft.personal.photoDataUrl ? strings.ReviewPhotoAttached : strings.ReviewPhotoNone],
        ...(draft.cloneSourceDisplayName
          ? ([[strings.CloneFromLabel, draft.cloneSourceDisplayName]] as [string, string][])
          : [])
      ]
    },
    {
      title: strings.WizardStepEmployment,
      step: 1,
      rows: [
        [strings.JobTitleLabel, draft.employment.jobTitle],
        [strings.DepartmentLabel, draft.employment.department],
        [
          strings.CountryLabel,
          USAGE_LOCATIONS.filter((l) => l.code === draft.employment.country)[0]?.name ??
            strings.ReviewNoCountry
        ],
        [strings.ManagerLabel, draft.employment.managerDisplayName ?? strings.ReviewNoManager],
        [strings.HireDateLabel, draft.employment.hireDate]
      ]
    },
    {
      title: strings.WizardStepIdentity,
      step: 2,
      rows: [[strings.UpnLabel, draft.identity?.userPrincipalName ?? '']]
    },
    {
      title: strings.WizardStepAccount,
      step: 3,
      rows: [
        [strings.UsageLocationLabel, draft.accountSettings.usageLocation],
        [
          strings.CredentialModeLabel,
          draft.accountSettings.credentialMode === 'tap'
            ? strings.CredentialModeTap
            : strings.CredentialModePassword
        ]
      ]
    },
    {
      title: strings.WizardStepLicenses,
      step: 4,
      rows: [
        [
          strings.WizardStepLicenses,
          draft.licenses.length > 0
            ? draft.licenses.map((l) => l.displayName ?? l.skuPartNumber).join(', ')
            : strings.ReviewNoLicenses
        ]
      ]
    },
    {
      title: strings.WizardStepAccess,
      step: 5,
      rows: [
        [strings.AccessSecurityGroupsLabel, String(draft.access.securityGroups.length)],
        [strings.AccessM365GroupsLabel, String(draft.access.m365Groups.length)],
        [strings.AccessTeamsLabel, String(draft.access.teams.length)],
        [strings.AccessSitesLabel, String(draft.access.sharePointSites.length)],
        [strings.AccessApplicationsLabel, String(draft.access.applications.length)],
        [
          strings.AccessExpirationLabel,
          draft.expirationReviewDays ? String(draft.expirationReviewDays) : strings.AccessExpirationNone
        ],
        [strings.ApproverGroupIdLabel, draft.approverGroupId || strings.ReviewApproverGroupDefault]
      ]
    }
  ];

  const submit = async (): Promise<void> => {
    if (!payload || validationErrors.length > 0) {
      return;
    }
    setSubmitting(true);
    setError(undefined);
    try {
      await services.engine.createJob({
        jobType,
        payload,
        steps: services.engine.buildInitialSteps(jobType),
        scheduledFor: null,
        initialStatus: requireApproval ? 'PendingApproval' : 'Approved'
      });
      await queryClient.invalidateQueries(QK_JOBS);
      dispatch({ type: 'reset' });
      toast(requireApproval ? strings.SubmitSuccess : strings.SubmitSuccessNoApproval);
      onSubmitted();
    } catch {
      setError(strings.SubmitFailure);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <StepShell
        title={strings.WizardStepReview}
        description={
          requireApproval ? strings.WizardStepDescReview : strings.WizardStepDescReviewNoApproval
        }
        wide
      >
        <div className={styles.stack}>
          <Text>{requireApproval ? strings.ReviewIntro : strings.ReviewIntroNoApproval}</Text>
          {sections.map((section) => (
            <div key={section.title}>
              <div className={styles.sectionHeader}>
                <Text weight="semibold">{section.title}</Text>
                <Button
                  appearance="subtle"
                  size="small"
                  aria-label={formatString(strings.ReviewEditSectionAria, section.title)}
                  onClick={() => dispatch({ type: 'goto', step: section.step })}
                >
                  {strings.ReviewEditLabel}
                </Button>
              </div>
              <div className={styles.rows}>
                {section.rows.map(([label, value]) => (
                  <React.Fragment key={label}>
                    <Text size={200} className={styles.rowLabel}>
                      {label}
                    </Text>
                    <Text>{value}</Text>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {validationErrors.length > 0 ? (
            <MessageBar intent="warning" layout="multiline">
              <MessageBarBody>
                <MessageBarTitle>{strings.ReviewValidationTitle}</MessageBarTitle>
                <ul className={styles.errorList}>
                  {validationErrors.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </MessageBarBody>
            </MessageBar>
          ) : undefined}
          {error ? (
            <MessageBar intent="error">
              <MessageBarBody>{error}</MessageBarBody>
            </MessageBar>
          ) : undefined}
        </div>
      </StepShell>
      <WizardFooter
        onBack={() => dispatch({ type: 'back' })}
        onNext={() => {
          void submit();
        }}
        nextDisabled={validationErrors.length > 0}
        nextLoading={submitting}
        nextLabel={requireApproval ? strings.SubmitLabel : strings.SubmitNoApprovalLabel}
      />
    </div>
  );
};
