import * as React from 'react';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  MessageBar,
  MessageBarBody,
  ProgressBar,
  Spinner,
  Text,
  Textarea,
  Toolbar,
  ToolbarButton,
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles
} from '@fluentui/react-components';
import {
  ArrowDownload16Regular,
  Dismiss24Regular,
  CheckmarkCircle24Regular,
  ErrorCircle24Regular,
  Clock24Regular,
  Warning24Regular
} from '@fluentui/react-icons';
import { motionTokens } from '@fluentui/react-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useAppRoles, useJobDetail } from '../../hooks/useReferenceData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { QK_AUDIT, QK_JOB_SUMMARIES } from '../../constants/queryKeys';
import { canStartJob, isTerminal } from '../../services/engine/jobStateMachine';
import { targetUserOf } from '../../services/engine/stepHelpers';
import { downloadCsv, toCsv } from '../../services/util/csv';
import { isOnboardingPayload } from '../../models';
import type { AuditResult, IJobStep, IProvisioningJob, StepStatus } from '../../models';
import type { ICredentialPresentation } from '../../services/engine/stepTypes';
import { CopyOnceDialog } from '../Shared/CopyOnceDialog';
import { ConfirmDialog } from '../Shared/ConfirmDialog';
import { useAppToast } from '../Shared/AppToaster';
import { formatString } from '../Shared/format';
import { JobStatusBadge, jobStatusLabel, jobTypeLabel, stepDisplayName } from '../Shared/StatusBadge';

const NARROW_QUERY = '(max-width: 640px)';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },
  metaCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalL
  },
  metaLabel: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  },
  metaValue: {
    fontWeight: tokens.fontWeightMedium,
    textAlign: 'right',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  metaJobId: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2
  },
  progressHero: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke2}`,
    transformOrigin: 'top center',
    animationName: { '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
    animationDuration: `${motionTokens.durationGentle}ms`,
    animationTimingFunction: motionTokens.curveEasyEase,
    animationFillMode: 'both',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms'
    }
  },
  progressHeroHeader: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS
  },
  progressHeroTitle: {
    ...typographyStyles.subtitle2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold
  },
  progressHeroStep: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold
  },
  progressHeroSubtext: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200
  },
  progressHeroStats: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalXL
  },
  progressStat: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalXS
  },
  progressStatIcon: {
    color: tokens.colorBrandForeground1
  },
  progressStatValue: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300
  },
  progressStatLabel: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  },
  progressBar: {
    height: '8px',
    borderRadius: tokens.borderRadiusCircular,
    transitionProperty: 'all',
    transitionDuration: `${motionTokens.durationGentle}ms`,
    transitionTimingFunction: motionTokens.curveEasyEase,
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms'
    }
  },
  doNotCloseBar: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`
  },
  doNotCloseText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium
  },
  doNotCloseIcon: {
    color: tokens.colorPaletteYellowForeground1,
    flexShrink: 0
  },
  quorumRow: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2
  },
  stepsSection: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS
  },
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    transitionProperty: 'background-color, transform',
    transitionDuration: `${motionTokens.durationFast}ms`,
    transitionTimingFunction: motionTokens.curveEasyEase,
    '&:hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms'
    }
  },
  stepItemRunning: {
    backgroundColor: tokens.colorBrandBackground2,
    animationName: { '0%, 100%': { backgroundColor: tokens.colorBrandBackground2 }, '50%': { backgroundColor: tokens.colorBrandBackgroundHover } },
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: 'none',
      backgroundColor: tokens.colorBrandBackground2
    }
  },
  stepIcon: {
    flexShrink: 0,
    marginTop: '2px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepIconCompleted: { color: tokens.colorPaletteGreenForeground1 },
  stepIconFailed: { color: tokens.colorPaletteRedForeground1 },
  stepIconSkipped: { color: tokens.colorNeutralForeground3 },
  stepIconPending: { color: tokens.colorNeutralForeground4 },
  stepIconRunning: {
    color: tokens.colorBrandForeground1,
    animationName: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
    animationDuration: '1500ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: 'none'
    }
  },
  stepBody: {
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS
  },
  stepName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1
  },
  stepNamePending: { color: tokens.colorNeutralForeground3 },
  stepDetail: { fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 },
  stepError: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteRedForeground1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS
  },
  stepErrorAction: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS
  },
  stepConnector: {
    width: '2px',
    marginLeft: '11px',
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
    backgroundColor: tokens.colorNeutralStroke2,
    flexShrink: 0
  },
  stepConnectorDone: { backgroundColor: tokens.colorPaletteGreenForeground1 },
  auditSection: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS
  },
  noteForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalS
  },
  rejectField: {
    marginTop: tokens.spacingVerticalM
  },
  auditRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    transitionProperty: 'background-color',
    transitionDuration: `${motionTokens.durationFast}ms`,
    '&:hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms'
    }
  },
  auditAction: { display: 'flex', flexDirection: 'column', rowGap: 0, minWidth: 0, flexGrow: 1 },
  auditMeta: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200 },
  statusAnnouncement: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    animationName: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
    animationDuration: `${motionTokens.durationGentle}ms`,
    animationTimingFunction: motionTokens.curveEasyEase,
    animationFillMode: 'both',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms'
    }
  },
  statusAnnouncementSuccess: { backgroundColor: tokens.colorPaletteGreenBackground1, border: `1px solid ${tokens.colorPaletteGreenBorder1}` },
  statusAnnouncementWarning: { backgroundColor: tokens.colorPaletteDarkOrangeBackground1, border: `1px solid ${tokens.colorPaletteDarkOrangeBorder1}` },
  statusAnnouncementError: { backgroundColor: tokens.colorPaletteRedBackground1, border: `1px solid ${tokens.colorPaletteRedBorder1}` },
  sectionTitle: { ...typographyStyles.subtitle2, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 },
  sectionHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: tokens.spacingHorizontalM }
});

const AUDIT_RESULT_COLOR: Record<AuditResult, 'success' | 'danger' | 'informative'> = {
  Success: 'success',
  Failure: 'danger',
  Skipped: 'informative'
};

function auditResultLabel(result: AuditResult): string {
  switch (result) {
    case 'Success':
      return strings.AuditResultSuccess;
    case 'Failure':
      return strings.AuditResultFailure;
    default:
      return strings.AuditResultSkipped;
  }
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatElapsed(ms: number): string {
  const totalSeconds: number = Math.floor(ms / 1000);
  const hours: number = Math.floor(totalSeconds / 3600);
  const minutes: number = Math.floor((totalSeconds % 3600) / 60);
  const seconds: number = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${pad2(minutes)}:${pad2(seconds)}`;
  }
  return `${minutes}:${pad2(seconds)}`;
}

export interface IJobDetailDrawerProps {
  itemId: number;
  onClose: () => void;
}

interface IPendingCredential {
  credential: ICredentialPresentation;
  resolve: () => void;
}

function StepIcon({ status }: { status: StepStatus }): React.ReactElement {
  const styles = useStyles();
  switch (status) {
    case 'completed':
      return (
        <span className={mergeClasses(styles.stepIcon, styles.stepIconCompleted)}>
          <CheckmarkCircle24Regular />
        </span>
      );
    case 'failed':
      return (
        <span className={mergeClasses(styles.stepIcon, styles.stepIconFailed)}>
          <ErrorCircle24Regular />
        </span>
      );
    case 'skipped':
      return (
        <span className={mergeClasses(styles.stepIcon, styles.stepIconSkipped)}>
          <Warning24Regular />
        </span>
      );
    case 'running':
      return (
        <span className={mergeClasses(styles.stepIcon, styles.stepIconRunning)}>
          <Spinner size="tiny" />
        </span>
      );
    default:
      return (
        <span className={mergeClasses(styles.stepIcon, styles.stepIconPending)}>
          <Clock24Regular />
        </span>
      );
  }
}

export const JobDetailDrawer: React.FC<IJobDetailDrawerProps> = ({ itemId, onClose }) => {
  const styles = useStyles();
  const services = useServices();
  const roles = useAppRoles();
  const { requiredApprovals } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const isNarrow = useMediaQuery(NARROW_QUERY);

  const [running, setRunning] = React.useState<boolean>(false);
  const detail = useJobDetail(itemId, !running);
  const [liveJob, setLiveJob] = React.useState<IProvisioningJob | null>(null);
  const [hasRun, setHasRun] = React.useState<boolean>(false);
  const [confirmCancel, setConfirmCancel] = React.useState<boolean>(false);
  const [confirmRollback, setConfirmRollback] = React.useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = React.useState<boolean>(false);
  const [rejectReason, setRejectReason] = React.useState<string>('');
  const [noteText, setNoteText] = React.useState<string>('');
  const [savingNote, setSavingNote] = React.useState<boolean>(false);
  const [actionError, setActionError] = React.useState<string | undefined>(undefined);
  const [pendingCredential, setPendingCredential] = React.useState<IPendingCredential | null>(null);
  const [elapsedMs, setElapsedMs] = React.useState<number>(0);
  const abortRef = React.useRef<AbortController | undefined>(undefined);
  const runStartRef = React.useRef<number>(0);
  const titleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActionError(undefined);
    setHasRun(false);
    setElapsedMs(0);
  }, [itemId]);

  React.useEffect(() => {
    if (!running && detail.data) {
      setLiveJob(detail.data);
    }
  }, [detail.data, running]);

  React.useEffect(() => {
    if (liveJob && !confirmCancel && !confirmRollback && !pendingCredential) {
      titleRef.current?.focus();
    }
  }, [itemId, confirmCancel, confirmRollback, pendingCredential, liveJob === null]);

  React.useEffect(() => {
    if (!running) {
      return;
    }
    const timer: number = window.setInterval(() => {
      setElapsedMs(Date.now() - runStartRef.current);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const permissions = roles.data?.permissions;
  const can = (permission: Parameters<NonNullable<typeof permissions>['has']>[0]): boolean => permissions?.has(permission) ?? false;

  const canViewAudit: boolean = can('viewAudit');
  const jobId: string | undefined = liveJob?.jobId;
  const audit = useQuery([...QK_AUDIT, jobId ?? ''], () => services.data.getAuditEntries(jobId ?? ''), {
    enabled: !!jobId && canViewAudit
  });

  const approverGroupId: string | null = liveJob && isOnboardingPayload(liveJob.payload) ? liveJob.payload.approverGroupId ?? null : null;
  const approverMembership = useQuery(
    ['roles', 'isMemberOfGroup', approverGroupId ?? ''],
    ({ signal }) => services.roles.isMemberOfGroup(approverGroupId ?? '', signal),
    { enabled: !!approverGroupId, staleTime: 5 * 60 * 1000 }
  );

  const refreshJobs = React.useCallback((): void => {
    void queryClient.invalidateQueries(QK_JOB_SUMMARIES);
    if (canViewAudit) {
      void queryClient.invalidateQueries(QK_AUDIT);
    }
    void detail.refetch();
  }, [queryClient, canViewAudit, detail]);

  const credentialResolvers = React.useRef<Array<{ resolve: () => void }>>([]);
  const engineCallbacks = React.useRef({
    onJobUpdated: (updated: IProvisioningJob): void => {
      setLiveJob(updated);
    },
    presentCredentials: (credential: ICredentialPresentation): Promise<void> =>
      new Promise<void>((resolve) => {
        credentialResolvers.current.push({ resolve });
        setPendingCredential({ credential, resolve });
      })
  }).current;

  React.useEffect(
    () => () => {
      abortRef.current?.abort();
      for (const r of credentialResolvers.current) {
        r.resolve();
      }
      credentialResolvers.current = [];
    },
    []
  );

  const runAction = React.useCallback(
    async (action: () => Promise<unknown>): Promise<void> => {
      setActionError(undefined);
      setRunning(true);
      runStartRef.current = Date.now();
      setElapsedMs(0);
      try {
        await action();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : strings.JobActionFailed);
      } finally {
        setRunning(false);
        setHasRun(true);
        refreshJobs();
      }
    },
    [refreshJobs]
  );

  const run = (): void => {
    const controller: AbortController = new AbortController();
    abortRef.current = controller;
    void runAction(() => services.engine.runJob(itemId, engineCallbacks, controller.signal));
  };

  const retryStep = (stepId: string): void => {
    const controller: AbortController = new AbortController();
    abortRef.current = controller;
    void runAction(() => services.engine.retryStep(itemId, stepId, engineCallbacks, controller.signal));
  };

  const skipStep = (stepId: string): void => {
    const controller: AbortController = new AbortController();
    abortRef.current = controller;
    void runAction(() => services.engine.skipStep(itemId, stepId, engineCallbacks, controller.signal));
  };

  const approve = (): void => {
    void runAction(async () => {
      const outcome = await services.engine.approveJob(itemId);
      if (outcome.satisfied) {
        toast(strings.JobApprovedToast);
      } else {
        toast(formatString(strings.ApprovalProgressLabel, String(outcome.granted), String(outcome.required)));
      }
      await detail.refetch();
    });
  };

  const reject = (): void => {
    const reason: string = rejectReason.trim();
    if (!reason) {
      return;
    }
    setRejectOpen(false);
    void runAction(async () => {
      await services.engine.rejectJob(itemId, reason);
      setRejectReason('');
      toast(strings.RejectedToast, 'warning');
      await detail.refetch();
    });
  };

  const addNote = async (): Promise<void> => {
    const text: string = noteText.trim();
    if (!text) {
      return;
    }
    setSavingNote(true);
    try {
      await services.engine.addJobNote(itemId, text);
      setNoteText('');
      toast(strings.NoteSavedToast);
      await detail.refetch();
    } catch {
      toast(strings.NoteSaveFailed, 'error');
    } finally {
      setSavingNote(false);
    }
  };

  const duplicate = (): void => {
    void runAction(async () => {
      await services.engine.duplicateJob(itemId);
      void queryClient.invalidateQueries(QK_JOB_SUMMARIES);
      toast(strings.DuplicateJobToast);
    });
  };

  const cancel = (): void => {
    setConfirmCancel(false);
    void runAction(async () => {
      await services.engine.cancelJob(itemId);
      toast(strings.JobCancelledToast, 'info');
      await detail.refetch();
    });
  };

  const rollback = (): void => {
    setConfirmRollback(false);
    void runAction(async () => {
      const outcome = await services.engine.rollbackJob(itemId);
      toast(
        outcome.failed.length === 0 ? strings.RollbackSucceeded : strings.RollbackPartial,
        outcome.failed.length === 0 ? 'success' : 'warning'
      );
      await detail.refetch();
    });
  };

  const exportAuditCsv = (): void => {
    if (!liveJob) return;
    const csv: string = toCsv(
      [
        strings.AuditColumnTimestamp,
        strings.AuditColumnActor,
        strings.AuditColumnAction,
        strings.JobColumnTarget,
        strings.AuditColumnEndpoint,
        strings.AuditColumnResponseCode,
        strings.AuditColumnResult,
        strings.CorrelationIdLabel
      ],
      (audit.data ?? []).map((entry) => [
        entry.timestampUtc ? new Date(entry.timestampUtc).toLocaleString() : '',
        entry.actor,
        entry.action,
        entry.targetUser,
        entry.graphEndpoint,
        String(entry.responseCode),
        auditResultLabel(entry.result),
        entry.correlationId
      ])
    );
    downloadCsv(`upc-audit-${liveJob.jobId.slice(0, 8)}.csv`, csv);
  };

  const regenerateCredentials = (): void => {
    const controller: AbortController = new AbortController();
    abortRef.current = controller;
    void runAction(() => services.engine.regenerateCredentials(itemId, engineCallbacks, controller.signal));
  };

  if (detail.isLoading && !liveJob) {
    return (
      <Drawer type="overlay" position={isNarrow ? 'bottom' : 'end'} size="medium" open={true} onOpenChange={(_, data) => !data.open && onClose()}>
        <DrawerBody>
          <Spinner aria-label={strings.LoadingLabel} />
        </DrawerBody>
      </Drawer>
    );
  }
  if (detail.isError && !liveJob) {
    return (
      <Drawer type="overlay" position={isNarrow ? 'bottom' : 'end'} size="medium" open={true} onOpenChange={(_, data) => !data.open && onClose()}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={<Button appearance="subtle" aria-label={strings.CloseLabel} icon={<Dismiss24Regular />} onClick={onClose} />}
          >
            {strings.JobDetailTitle}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className={styles.body}>
          <MessageBar intent="error">
            <MessageBarBody>
              {detail.error instanceof Error ? detail.error.message : strings.JobLoadFailedMessage}
            </MessageBarBody>
          </MessageBar>
          <Button
            onClick={() => {
              void detail.refetch();
            }}
          >
            {strings.RetryLabel}
          </Button>
        </DrawerBody>
      </Drawer>
    );
  }
  if (!liveJob) {
    return null;
  }

  const isRestrictedNonMember: boolean = !!approverGroupId && approverMembership.data === false;
  const showApprove: boolean = liveJob.status === 'PendingApproval' && can('approveJobs') && !isRestrictedNonMember;
  const showReject: boolean = showApprove && !running;
  const showDuplicate: boolean = isTerminal(liveJob.status) && can('createJobs') && !running;
  const showRun: boolean = canStartJob(liveJob.status) && can('runJobs') && !running;
  const showCancel: boolean = !isTerminal(liveJob.status) && can('cancelJobs') && !running;
  const showRegenerate: boolean =
    (liveJob.status === 'Completed' || liveJob.status === 'PartiallyFailed') &&
    (liveJob.jobType === 'Onboard' || liveJob.jobType === 'Clone') &&
    isOnboardingPayload(liveJob.payload) &&
    liveJob.payload.identity.accountType === 'member' &&
    can('runJobs') &&
    !running;
  const showRollback: boolean =
    (liveJob.status === 'PartiallyFailed' || liveJob.status === 'Failed' || liveJob.status === 'Completed') &&
    liveJob.steps.some((s) => s.status === 'completed') &&
    can('rollbackJobs') &&
    !running;
  const failedSteps: IJobStep[] = liveJob.steps.filter((s) => s.status === 'failed');
  const runningStep: IJobStep | undefined = liveJob.steps.filter((s) => s.status === 'running')[0];

  const totalSteps: number = liveJob.steps.length;
  const doneSteps: number = liveJob.steps.filter((s) => s.status === 'completed' || s.status === 'skipped').length;
  const progressValue: number = totalSteps > 0 ? doneSteps / totalSteps : 0;
  const currentStepNumber: number = runningStep ? liveJob.steps.findIndex((s) => s.stepId === runningStep.stepId) + 1 : doneSteps;

  const finalStatus: IProvisioningJob['status'] = liveJob.status;
  const announcementTone: 'statusAnnouncementSuccess' | 'statusAnnouncementWarning' | 'statusAnnouncementError' =
    finalStatus === 'Completed'
      ? 'statusAnnouncementSuccess'
      : finalStatus === 'PartiallyFailed'
        ? 'statusAnnouncementWarning'
        : finalStatus === 'Failed' || finalStatus === 'Cancelled'
          ? 'statusAnnouncementError'
          : 'statusAnnouncementSuccess';

  const approvalsGranted: number = new Set((liveJob.approvals ?? []).map((a) => a.actorUpn.toLowerCase())).size;

  return (
    <Drawer
      type="overlay"
      position={isNarrow ? 'bottom' : 'end'}
      size={isNarrow ? 'full' : 'medium'}
      open={true}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          ref={titleRef}
          tabIndex={-1}
          action={<Button appearance="subtle" aria-label={strings.CloseLabel} icon={<Dismiss24Regular />} onClick={onClose} />}
        >
          {strings.JobDetailTitle}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody className={styles.body}>
        <div className={styles.metaCard}>
          <div className={styles.metaRow}>
            <Text className={styles.metaLabel}>{strings.JobColumnTarget}</Text>
            <Text className={styles.metaValue}>{targetUserOf(liveJob.payload) || liveJob.targetUpn}</Text>
          </div>
          <div className={styles.metaRow}>
            <Text className={styles.metaLabel}>{strings.JobColumnType}</Text>
            <Text className={styles.metaValue}>{jobTypeLabel(liveJob.jobType)}</Text>
          </div>
          <div className={styles.metaRow}>
            <Text className={styles.metaLabel}>{strings.JobColumnStatus}</Text>
            <JobStatusBadge status={liveJob.status} />
          </div>
          <div className={styles.metaRow}>
            <Text className={styles.metaLabel}>{strings.JobColumnRequestedBy}</Text>
            <Text className={styles.metaValue}>{liveJob.requestedBy ?? ''}</Text>
          </div>
          {liveJob.approvedBy ? (
            <div className={styles.metaRow}>
              <Text className={styles.metaLabel}>{strings.ApprovedByLabel}</Text>
              <Text className={styles.metaValue}>{liveJob.approvedBy}</Text>
            </div>
          ) : undefined}
          {liveJob.scheduledFor ? (
            <div className={styles.metaRow}>
              <Text className={styles.metaLabel}>{strings.ScheduledForLabel}</Text>
              <Text className={styles.metaValue}>{new Date(liveJob.scheduledFor).toLocaleDateString()}</Text>
            </div>
          ) : undefined}
          <div className={styles.metaRow}>
            <Text className={styles.metaLabel}>{strings.CorrelationIdLabel}</Text>
            <Text className={mergeClasses(styles.metaValue, styles.metaJobId)}>{liveJob.correlationId}</Text>
          </div>
        </div>

        {liveJob.status === 'PendingApproval' && requiredApprovals > 1 ? (
          <div className={styles.quorumRow}>
            <Text size={200}>{formatString(strings.ApprovalProgressLabel, String(approvalsGranted), String(requiredApprovals))}</Text>
          </div>
        ) : undefined}

        <Toolbar>
          {showApprove ? (
            <ToolbarButton appearance="primary" onClick={approve}>
              {strings.ApproveLabel}
            </ToolbarButton>
          ) : undefined}
          {showRun ? (
            <ToolbarButton appearance="primary" onClick={run}>
              {liveJob.status === 'Running' || liveJob.status === 'PartiallyFailed' ? strings.ResumeLabel : strings.RunLabel}
            </ToolbarButton>
          ) : undefined}
          {showReject ? <ToolbarButton onClick={() => setRejectOpen(true)}>{strings.RejectLabel}</ToolbarButton> : undefined}
          {showCancel ? <ToolbarButton onClick={() => setConfirmCancel(true)}>{strings.CancelJobLabel}</ToolbarButton> : undefined}
          {showRegenerate ? <ToolbarButton onClick={regenerateCredentials}>{strings.RegenerateCredentialsLabel}</ToolbarButton> : undefined}
          {showRollback ? <ToolbarButton onClick={() => setConfirmRollback(true)}>{strings.RollbackLabel}</ToolbarButton> : undefined}
          {showDuplicate ? <ToolbarButton onClick={duplicate}>{strings.DuplicateJobLabel}</ToolbarButton> : undefined}
        </Toolbar>

        {isRestrictedNonMember && liveJob.status === 'PendingApproval' ? (
          <MessageBar intent="warning">
            <MessageBarBody>{strings.ApprovalRestrictedNotMember}</MessageBarBody>
          </MessageBar>
        ) : undefined}

        {running ? (
          <div className={styles.progressHero} role="status" aria-live="polite">
            <div className={styles.progressHeroHeader}>
              <Spinner size="tiny" />
              <Text className={styles.progressHeroTitle}>{strings.JobRunningLabel}</Text>
            </div>
            <Text className={styles.progressHeroStep}>{runningStep ? stepDisplayName(runningStep.stepId) : strings.JobStepStarting}</Text>
            <Text className={styles.progressHeroSubtext}>{formatString(strings.JobProgressLabel, String(currentStepNumber), String(totalSteps))}</Text>
            <ProgressBar
              className={styles.progressBar}
              value={progressValue}
              shape="rounded"
              thickness="large"
              aria-label={formatString(strings.JobCompletedOf, String(doneSteps), String(totalSteps))}
            />
            <div className={styles.progressHeroStats}>
              <div className={styles.progressStat}>
                <CheckmarkCircle24Regular className={styles.progressStatIcon} />
                <span className={styles.progressStatValue}>{doneSteps}</span>
                <span className={styles.progressStatLabel}>
                  / {totalSteps} {strings.JobStepsTitle.toLowerCase()}
                </span>
              </div>
              <div className={styles.progressStat}>
                <Clock24Regular className={styles.progressStatIcon} />
                <span className={styles.progressStatValue}>{formatElapsed(elapsedMs)}</span>
                <span className={styles.progressStatLabel}>{strings.JobElapsedLabel}</span>
              </div>
            </div>
            <div className={styles.doNotCloseBar}>
              <Warning24Regular className={styles.doNotCloseIcon} />
              <Text className={styles.doNotCloseText}>{strings.JobDoNotClose}</Text>
            </div>
          </div>
        ) : hasRun ? (
          <div className={mergeClasses(styles.statusAnnouncement, styles[announcementTone])} role="status" aria-live="polite">
            {finalStatus === 'Completed' ? (
              <CheckmarkCircle24Regular className={styles.stepIconCompleted} />
            ) : finalStatus === 'Cancelled' ? (
              <Dismiss24Regular className={styles.stepIconPending} />
            ) : (
              <ErrorCircle24Regular className={styles.stepIconFailed} />
            )}
            <Text>{formatString(strings.JobStatusAnnouncement, jobStatusLabel(finalStatus))}</Text>
          </div>
        ) : undefined}

        {actionError ? (
          <MessageBar intent="error">
            <MessageBarBody>{actionError}</MessageBarBody>
          </MessageBar>
        ) : undefined}

        <div className={styles.stepsSection}>
          <Text className={styles.sectionTitle}>{strings.JobStepsTitle}</Text>
          <ol className={styles.stepList}>
            {liveJob.steps.map((step, index) => {
              const isRunningStep: boolean = step.status === 'running';
              const isDone: boolean = step.status === 'completed' || step.status === 'skipped';
              return (
                <li key={step.stepId}>
                  <div className={mergeClasses(styles.stepItem, isRunningStep && styles.stepItemRunning)}>
                    <StepIcon status={step.status} />
                    <div className={styles.stepBody}>
                      <Text className={mergeClasses(styles.stepName, step.status === 'pending' && styles.stepNamePending)}>
                        {stepDisplayName(step.stepId)}
                      </Text>
                      {step.lastError ? (
                        <div className={styles.stepError}>
                          <Text size={200}>
                            {step.lastError.graphCode}: {step.lastError.message}
                          </Text>
                          <Text size={200}>
                            {step.attempts}/{step.maxAttempts} {strings.JobAttemptsLabel}
                          </Text>
                        </div>
                      ) : undefined}
                      {step.status === 'completed' && step.completedUtc ? (
                        <Text className={styles.stepDetail}>{new Date(step.completedUtc).toLocaleTimeString()}</Text>
                      ) : undefined}
                      {step.status === 'running' && step.skippable && can('skipSteps') ? (
                        <div className={styles.stepErrorAction}>
                          <Button size="small" appearance="subtle" onClick={() => skipStep(step.stepId)}>
                            {strings.SkipStepLabel}
                          </Button>
                        </div>
                      ) : undefined}
                      {step.status === 'failed' && !running ? (
                        <div className={styles.stepErrorAction}>
                          {can('retrySteps') ? (
                            <Button size="small" appearance="primary" onClick={() => retryStep(step.stepId)}>
                              {strings.RetryStepLabel}
                            </Button>
                          ) : undefined}
                          {step.skippable && can('skipSteps') ? (
                            <Button size="small" appearance="subtle" onClick={() => skipStep(step.stepId)}>
                              {strings.SkipStepLabel}
                            </Button>
                          ) : undefined}
                        </div>
                      ) : undefined}
                    </div>
                  </div>
                  {index < liveJob.steps.length - 1 ? <div className={mergeClasses(styles.stepConnector, isDone && styles.stepConnectorDone)} /> : undefined}
                </li>
              );
            })}
          </ol>
        </div>

        {failedSteps.length > 0 && !running ? (
          <MessageBar intent="warning">
            <MessageBarBody>{failedSteps.map((s) => stepDisplayName(s.stepId)).join(', ')}</MessageBarBody>
          </MessageBar>
        ) : undefined}

        <div className={styles.auditSection}>
          <Text className={styles.sectionTitle}>{strings.NotesTitle}</Text>
          {(liveJob.notes ?? []).length === 0 ? (
            <Text className={styles.auditMeta}>{strings.NotesEmpty}</Text>
          ) : (
            <div>
              {(liveJob.notes ?? []).map((note, index) => (
                <div key={`${note.timestampUtc}-${index}`} className={styles.auditRow}>
                  <div className={styles.auditAction}>
                    <Text size={200} block>
                      {note.text}
                    </Text>
                    <span className={styles.auditMeta}>
                      {note.timestampUtc ? new Date(note.timestampUtc).toLocaleString() : ''}
                      {note.author ? ` · ${note.author}` : ''}
                    </span>
                  </div>
                  {note.kind === 'rejection' ? (
                    <Badge appearance="tint" color="danger">
                      {strings.NoteRejectionBadge}
                    </Badge>
                  ) : undefined}
                </div>
              ))}
            </div>
          )}
          <div className={styles.noteForm}>
            <Textarea
              value={noteText}
              placeholder={strings.NoteAddPlaceholder}
              resize="vertical"
              rows={2}
              onChange={(_, data) => setNoteText(data.value)}
            />
            <Button
              size="small"
              disabled={savingNote || !noteText.trim()}
              onClick={() => {
                void addNote();
              }}
            >
              {strings.NoteAddLabel}
            </Button>
          </div>
        </div>

        {canViewAudit ? (
          <div className={styles.auditSection}>
            <div className={styles.sectionHeaderRow}>
              <Text className={styles.sectionTitle}>{strings.AuditTitle}</Text>
              <Button appearance="subtle" size="small" icon={<ArrowDownload16Regular />} disabled={(audit.data ?? []).length === 0} onClick={exportAuditCsv}>
                {strings.ExportCsvLabel}
              </Button>
            </div>
            {audit.isLoading ? (
              <Spinner size="tiny" label={strings.LoadingLabel} />
            ) : (audit.data ?? []).length === 0 ? (
              <Text className={styles.auditMeta}>{strings.AuditEmpty}</Text>
            ) : (
              <div>
                {(audit.data ?? []).map((entry) => (
                  <div key={entry.entryId} className={styles.auditRow}>
                    <div className={styles.auditAction}>
                      <Text size={200} block>
                        {entry.action}
                      </Text>
                      <span className={styles.auditMeta}>
                        {entry.timestampUtc ? new Date(entry.timestampUtc).toLocaleString() : ''}
                        {entry.actor ? ` · ${entry.actor}` : ''}
                      </span>
                    </div>
                    <Badge appearance="tint" color={AUDIT_RESULT_COLOR[entry.result] ?? 'informative'}>
                      {auditResultLabel(entry.result)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : undefined}
      </DrawerBody>

      <CopyOnceDialog
        credential={pendingCredential?.credential ?? null}
        onConfirm={() => {
          pendingCredential?.resolve();
          if (pendingCredential) {
            credentialResolvers.current = credentialResolvers.current.filter((r) => r.resolve !== pendingCredential.resolve);
          }
          setPendingCredential(null);
        }}
      />
      <ConfirmDialog
        open={confirmRollback}
        title={strings.RollbackTitle}
        message={strings.RollbackBody}
        confirmLabel={strings.RollbackConfirm}
        cancelLabel={strings.KeepJobLabel}
        onConfirm={rollback}
        onCancel={() => setConfirmRollback(false)}
        confirmDisabled={running}
      />
      <ConfirmDialog
        open={confirmCancel}
        title={strings.CancelJobDialogTitle}
        message={strings.CancelJobDialogBody}
        confirmLabel={strings.CancelJobLabel}
        cancelLabel={strings.KeepJobLabel}
        onConfirm={cancel}
        onCancel={() => setConfirmCancel(false)}
        confirmDisabled={running}
      />
      <Dialog
        modalType="alert"
        open={rejectOpen}
        onOpenChange={(_, data) => {
          if (!data.open) {
            setRejectOpen(false);
          }
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{strings.RejectDialogTitle}</DialogTitle>
            <DialogContent>
              <Text block>{strings.RejectDialogBody}</Text>
              <Field label={strings.RejectReasonLabel} required className={styles.rejectField}>
                <Textarea
                  value={rejectReason}
                  resize="vertical"
                  rows={3}
                  onChange={(_, data) => setRejectReason(data.value)}
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setRejectOpen(false)}>
                {strings.KeepJobLabel}
              </Button>
              <Button appearance="primary" onClick={reject} disabled={running || !rejectReason.trim()}>
                {strings.RejectConfirmLabel}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </Drawer>
  );
};
