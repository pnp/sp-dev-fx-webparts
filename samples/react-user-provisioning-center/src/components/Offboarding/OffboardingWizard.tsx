import * as React from 'react';
import {
  Button,
  Checkbox,
  Combobox,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Option,
  Persona,
  Radio,
  RadioGroup,
  Subtitle1,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useSettings } from '../../contexts/SettingsContext';
import { isOffboardDirty, useOffboard } from '../../contexts/OffboardContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { QK_JOBS } from '../../constants/queryKeys';
import type { IDirectoryUserHit } from '../../services/users/UserService';
import type { IOffboardingPayload } from '../../models';
import { formatString } from '../Shared/format';
import { useAppToast } from '../Shared/AppToaster';
import { ConfirmDialog } from '../Shared/ConfirmDialog';
import { AppErrorBoundary } from '../Shared/AppErrorBoundary';
import { WizardStepper } from '../Onboarding/WizardStepper';
import { StepShell } from '../Onboarding/StepShell';
import { WizardFooter } from '../Onboarding/WizardFooter';

const EMAIL_RE: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM
  },
  body: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalXXXL,
    alignItems: 'flex-start',
    '@container (max-width: 560px)': {
      flexDirection: 'column',
      rowGap: tokens.spacingVerticalL
    }
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
    width: '100%'
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  selectedUser: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium
  },
  secondary: {
    color: tokens.colorNeutralForeground3
  },
  narrow: {
    maxWidth: '320px'
  },
  dateField: {
    maxWidth: '240px'
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
  }
});

const TargetStep: React.FC = () => {
  const styles = useStyles();
  const services = useServices();
  const { state, dispatch } = useOffboard();
  const [query, setQuery] = React.useState<string>(state.draft.target?.displayName ?? '');
  const debounced: string = useDebouncedValue(query);
  const hits = useQuery(
    ['graph', 'offboardSearch', debounced],
    ({ signal }) => services.users.searchUsers(debounced, signal),
    { enabled: debounced.trim().length >= 2, keepPreviousData: true }
  );

  const target = state.draft.target;

  return (
    <div>
      <StepShell title={strings.OffboardStepTarget} description={strings.OffboardStepDescTarget}>
        <div className={styles.stack}>
          <Field label={strings.OffboardUserLabel} required className={styles.narrow}>
            <Combobox
              placeholder={strings.ManagerSearchPlaceholder}
              value={query}
              freeform
              onChange={(ev) => {
                setQuery(ev.target.value);
                dispatch({ type: 'setTarget', target: null });
              }}
              onOptionSelect={(_, data) => {
                const hit: IDirectoryUserHit | undefined = (hits.data ?? []).filter(
                  (h) => h.id === data.optionValue
                )[0];
                if (hit) {
                  setQuery(hit.displayName);
                  dispatch({
                    type: 'setTarget',
                    target: {
                      userId: hit.id,
                      displayName: hit.displayName,
                      userPrincipalName: hit.userPrincipalName
                    }
                  });
                }
              }}
            >
              {(hits.data ?? []).map((hit) => (
                <Option key={hit.id} value={hit.id} text={hit.displayName}>
                  <Persona
                    name={hit.displayName}
                    secondaryText={hit.jobTitle || hit.userPrincipalName}
                    avatar={{
                      color: 'colorful',
                      image: { src: services.photoUrl(hit.userPrincipalName) },
                      'aria-hidden': true
                    }}
                    size="medium"
                  />
                </Option>
              ))}
            </Combobox>
          </Field>
          {target ? (
            <div className={styles.selectedUser}>
              <Persona
                name={target.displayName}
                secondaryText={target.userPrincipalName}
                avatar={{
                  color: 'colorful',
                  image: { src: services.photoUrl(target.userPrincipalName) },
                  'aria-hidden': true
                }}
                size="large"
              />
            </div>
          ) : undefined}
        </div>
      </StepShell>
      <WizardFooter onNext={() => dispatch({ type: 'next' })} nextDisabled={!target} />
    </div>
  );
};

const AccessStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useOffboard();
  const options = state.draft.options;

  const forwardInvalid: boolean =
    options.mailboxAction === 'forward' &&
    !!options.forwardingAddress &&
    !EMAIL_RE.test(options.forwardingAddress);
  const oneDriveInvalid: boolean =
    !!options.oneDriveAccessUpn && !EMAIL_RE.test(options.oneDriveAccessUpn);
  const nextDisabled: boolean =
    forwardInvalid ||
    oneDriveInvalid ||
    (options.mailboxAction === 'forward' && !options.forwardingAddress);

  return (
    <div>
      <StepShell title={strings.OffboardStepAccess} description={strings.OffboardStepDescAccess}>
        <div className={styles.stack}>
          <MessageBar intent="info">
            <MessageBarBody>{strings.OffboardAlwaysBlock}</MessageBarBody>
          </MessageBar>
          <Checkbox
            label={strings.OffboardRemoveLicensesLabel}
            checked={options.removeLicenses}
            onChange={(_, data) =>
              dispatch({ type: 'setOptions', options: { removeLicenses: !!data.checked } })
            }
          />
          <Checkbox
            label={strings.OffboardRemoveGroupsLabel}
            checked={options.removeFromGroups}
            onChange={(_, data) =>
              dispatch({ type: 'setOptions', options: { removeFromGroups: !!data.checked } })
            }
          />
          <Field label={strings.OffboardMailboxLabel}>
            <RadioGroup
              value={options.mailboxAction}
              onChange={(_, data) =>
                dispatch({
                  type: 'setOptions',
                  options: { mailboxAction: data.value as typeof options.mailboxAction }
                })
              }
            >
              <Radio value="none" label={strings.OffboardMailboxNone} />
              <Radio value="convertShared" label={strings.OffboardMailboxShared} />
              <Radio value="forward" label={strings.OffboardMailboxForward} />
            </RadioGroup>
          </Field>
          {options.mailboxAction === 'forward' ? (
            <Field
              label={strings.OffboardForwardAddressLabel}
              required
              className={styles.narrow}
              validationMessage={forwardInvalid ? strings.ValidationInvalidEmail : undefined}
            >
              <Input
                type="email"
                value={options.forwardingAddress ?? ''}
                onChange={(_, data) =>
                  dispatch({
                    type: 'setOptions',
                    options: { forwardingAddress: data.value || undefined }
                  })
                }
              />
            </Field>
          ) : undefined}
          <Field
            label={strings.OffboardOneDriveLabel}
            className={styles.narrow}
            validationMessage={oneDriveInvalid ? strings.ValidationInvalidEmail : undefined}
          >
            <Input
              type="email"
              value={options.oneDriveAccessUpn ?? ''}
              onChange={(_, data) =>
                dispatch({
                  type: 'setOptions',
                  options: { oneDriveAccessUpn: data.value || undefined }
                })
              }
            />
          </Field>
        </div>
      </StepShell>
      <WizardFooter
        onBack={() => dispatch({ type: 'back' })}
        onNext={() => dispatch({ type: 'next' })}
        nextDisabled={nextDisabled}
      />
    </div>
  );
};

const TimingStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useOffboard();
  const draft = state.draft;
  const today: string = new Date().toISOString().slice(0, 10);
  const nextDisabled: boolean = draft.timingMode === 'scheduled' && !draft.scheduledDate;

  return (
    <div>
      <StepShell title={strings.OffboardStepTiming} description={strings.OffboardStepDescTiming}>
        <div className={styles.stack}>
          <RadioGroup
            value={draft.timingMode}
            onChange={(_, data) =>
              dispatch({
                type: 'setTiming',
                timingMode: data.value as typeof draft.timingMode
              })
            }
          >
            <Radio value="immediate" label={strings.OffboardTimingImmediate} />
            <Radio value="scheduled" label={strings.OffboardTimingScheduled} />
          </RadioGroup>
          {draft.timingMode === 'scheduled' ? (
            <Field label={strings.OffboardDateLabel} required className={styles.dateField}>
              <Input
                type="date"
                min={today}
                value={draft.scheduledDate}
                onChange={(_, data) =>
                  dispatch({ type: 'setTiming', timingMode: 'scheduled', scheduledDate: data.value })
                }
              />
            </Field>
          ) : undefined}
        </div>
      </StepShell>
      <WizardFooter
        onBack={() => dispatch({ type: 'back' })}
        onNext={() => dispatch({ type: 'next' })}
        nextDisabled={nextDisabled}
      />
    </div>
  );
};

const ReviewOffboardStep: React.FC<{ onSubmitted: () => void }> = ({ onSubmitted }) => {
  const styles = useStyles();
  const services = useServices();
  const { requireApproval } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const { state, dispatch } = useOffboard();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const draft = state.draft;
  const target = draft.target;

  const mailboxLabel: string =
    draft.options.mailboxAction === 'convertShared'
      ? strings.OffboardMailboxShared
      : draft.options.mailboxAction === 'forward'
        ? `${strings.OffboardMailboxForward} → ${draft.options.forwardingAddress ?? ''}`
        : strings.OffboardMailboxNone;

  const sections: { title: string; step: number; rows: [string, string][] }[] = [
    {
      title: strings.OffboardStepTarget,
      step: 0,
      rows: [
        [strings.DisplayNameLabel, target?.displayName ?? ''],
        [strings.UpnLabel, target?.userPrincipalName ?? '']
      ]
    },
    {
      title: strings.OffboardStepAccess,
      step: 1,
      rows: [
        [strings.OffboardRemoveLicensesLabel, draft.options.removeLicenses ? strings.YesLabel : strings.NoLabel],
        [strings.OffboardRemoveGroupsLabel, draft.options.removeFromGroups ? strings.YesLabel : strings.NoLabel],
        [strings.OffboardMailboxLabel, mailboxLabel],
        [strings.OffboardOneDriveLabel, draft.options.oneDriveAccessUpn ?? strings.NoLabel]
      ]
    },
    {
      title: strings.OffboardStepTiming,
      step: 2,
      rows: [
        [
          strings.OffboardStepTiming,
          draft.timingMode === 'scheduled'
            ? `${strings.OffboardTimingScheduled}: ${draft.scheduledDate}`
            : strings.OffboardTimingImmediate
        ]
      ]
    }
  ];

  const submit = async (): Promise<void> => {
    if (!target) {
      return;
    }
    setSubmitting(true);
    setError(undefined);
    const upn: string = target.userPrincipalName;

    const extMarker: number = upn.indexOf('#EXT#');
    const cleanUpn: string = extMarker > 0 ? upn.slice(0, extMarker) : upn;
    const at: number = cleanUpn.lastIndexOf('@');
    const payload: IOffboardingPayload = {
      schemaVersion: 1,
      kind: 'offboard',
      identity: {
        userPrincipalName: upn,
        mailNickname: at > 0 ? cleanUpn.slice(0, at) : cleanUpn,
        domain: at > 0 ? cleanUpn.slice(at + 1) : '',
        accountType: 'member'
      },
      target,
      options: draft.options
    };
    try {
      await services.engine.createJob({
        jobType: 'Offboard',
        payload,
        steps: services.engine.buildInitialSteps('Offboard'),
        scheduledFor:
          draft.timingMode === 'scheduled' && draft.scheduledDate
            ? `${draft.scheduledDate}T00:00:00Z`
            : null,
        initialStatus: requireApproval ? 'PendingApproval' : 'Approved'
      });
      await queryClient.invalidateQueries(QK_JOBS);
      dispatch({ type: 'reset' });
      toast(
        requireApproval ? strings.OffboardSubmitSuccess : strings.OffboardSubmitSuccessNoApproval
      );
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
          requireApproval
            ? strings.OffboardStepDescReview
            : strings.OffboardStepDescReviewNoApproval
        }
        wide
      >
        <div className={styles.stack}>
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
                    <Text size={200} className={styles.secondary}>
                      {label}
                    </Text>
                    <Text>{value}</Text>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
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
        nextDisabled={!target}
        nextLoading={submitting}
        nextLabel={requireApproval ? strings.SubmitLabel : strings.SubmitNoApprovalLabel}
      />
    </div>
  );
};

export interface IOffboardingWizardProps {
  onSubmitted: () => void;
}

const STEP_LABELS: string[] = [
  strings.OffboardStepTarget,
  strings.OffboardStepAccess,
  strings.OffboardStepTiming,
  strings.WizardStepReview
];

export const OffboardingWizard: React.FC<IOffboardingWizardProps> = ({ onSubmitted }) => {
  const styles = useStyles();
  const { state, dispatch } = useOffboard();
  const services = useServices();
  const [confirmDiscard, setConfirmDiscard] = React.useState<boolean>(false);

  const onStepClick = React.useCallback(
    (step: number) => dispatch({ type: 'goto', step }),
    [dispatch]
  );
  const onStepRenderError = React.useCallback(
    (error: Error, info: React.ErrorInfo) =>
      services.telemetry.trackError(error, {
        componentStack: info.componentStack,
        scope: 'render',
        wizardStep: state.step
      }),
    [services, state.step]
  );

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Subtitle1 as="h3" block>
          {strings.OffboardTitle}
        </Subtitle1>
        {isOffboardDirty(state) ? (
          <Button appearance="subtle" size="small" onClick={() => setConfirmDiscard(true)}>
            {strings.StartOverLabel}
          </Button>
        ) : undefined}
      </div>
      <div className={styles.body}>
        <WizardStepper labels={STEP_LABELS} current={state.step} onStepClick={onStepClick} />
        <div className={styles.content}>
          {}
          <AppErrorBoundary key={state.step} onError={onStepRenderError}>
            {state.step === 0 ? <TargetStep /> : undefined}
            {state.step === 1 ? <AccessStep /> : undefined}
            {state.step === 2 ? <TimingStep /> : undefined}
            {state.step === 3 ? <ReviewOffboardStep onSubmitted={onSubmitted} /> : undefined}
          </AppErrorBoundary>
        </div>
      </div>
      <ConfirmDialog
        open={confirmDiscard}
        title={strings.DiscardDraftTitle}
        message={strings.DiscardDraftBody}
        confirmLabel={strings.DiscardDraftConfirm}
        cancelLabel={strings.KeepEditingLabel}
        onConfirm={() => {
          dispatch({ type: 'reset' });
          setConfirmDiscard(false);
        }}
        onCancel={() => setConfirmDiscard(false)}
      />
    </div>
  );
};
