import * as React from 'react';
import {
  Badge,
  Button,
  Caption1,
  Subtitle2,
  Switch,
  Text,
  ToolbarButton,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { ArrowClockwise16Regular, ArrowDownload16Regular, CheckmarkRegular } from '@fluentui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useTasks } from '../../hooks/useReferenceData';
import { QK_TASKS } from '../../constants/queryKeys';
import type { IServiceDeskTask, TaskType } from '../../models';
import { downloadCsv, toCsv } from '../../services/util/csv';
import { DataState } from '../Shared/DataState';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    maxWidth: '960px'
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column'
  },

  task: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2
  },
  taskBody: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
    flexGrow: 1,
    minWidth: 0
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXXS
  },
  meta: {
    color: tokens.colorNeutralForeground3
  },
  jobId: {
    fontFamily: tokens.fontFamilyMonospace
  },
  done: {
    opacity: 0.7
  },
  actions: {
    flexShrink: 0
  },
  listWrap: {
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM
  }
});

function taskTypeLabel(taskType: TaskType): string {
  switch (taskType) {
    case 'MailboxConvertShared':
      return strings.TaskTypeMailboxConvertShared;
    case 'MailboxDelegation':
      return strings.TaskTypeMailboxDelegation;
    case 'MailForwarding':
      return strings.TaskTypeMailForwarding;
    case 'HideFromGal':
      return strings.TaskTypeHideFromGal;
    case 'DistributionList':
      return strings.TaskTypeDistributionList;
    case 'LitigationHold':
      return strings.TaskTypeLitigationHold;
    case 'OneDriveHandling':
      return strings.TaskTypeOneDriveHandling;
    case 'AutoReply':
      return strings.TaskTypeAutoReply;
    case 'Hardware':
      return strings.TaskTypeHardware;
    case 'ThirdPartyApp':
      return strings.TaskTypeThirdPartyApp;
    case 'OnPremAdAccount':
      return strings.TaskTypeOnPremAdAccount;
    case 'GroupAssignment':
      return strings.TaskTypeGroupAssignment;
    case 'TeamAssignment':
      return strings.TaskTypeTeamAssignment;
    case 'SharePointAccess':
      return strings.TaskTypeSharePointAccess;
    case 'ApplicationAssignment':
      return strings.TaskTypeApplicationAssignment;
    case 'AccessReview':
      return strings.TaskTypeAccessReview;
    default:
      return strings.TaskTypeOther;
  }
}

export const TasksList: React.FC = () => {
  const styles = useStyles();
  const tasks = useTasks();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const [showCompleted, setShowCompleted] = React.useState<boolean>(false);
  const [completingId, setCompletingId] = React.useState<number | null>(null);

  const all: IServiceDeskTask[] = tasks.data?.items ?? [];
  const visible: IServiceDeskTask[] = showCompleted
    ? all
    : all.filter((t) => t.status === 'Open');

  const complete = async (itemId: number): Promise<void> => {
    setCompletingId(itemId);
    try {
      await services.engine.completeTask(itemId);
      toast(strings.TaskCompletedToast);
    } catch {
      toast(strings.JobActionFailed, 'error');
    } finally {
      setCompletingId(null);
      void queryClient.invalidateQueries(QK_TASKS);
    }
  };

  const exportCsv = (): void => {
    const csv: string = toCsv(
      [
        strings.TasksColumnTitle,
        strings.TasksColumnType,
        strings.JobColumnJob,
        strings.TasksColumnInstructions,
        strings.TasksColumnAssignedTo,
        strings.JobColumnStatus,
        strings.TaskCompletedByLabel
      ],
      visible.map((task) => [
        task.title,
        taskTypeLabel(task.taskType),
        task.jobId,
        task.instructions,
        task.assignedTo ?? '',
        task.status === 'Done' ? strings.TaskStatusDone : strings.TaskStatusOpen,
        task.completedBy ?? ''
      ])
    );
    downloadCsv(`upc-tasks-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <Subtitle2 as="h3" block>
          {strings.TasksTitle}
        </Subtitle2>
        <ToolbarButton
          icon={<ArrowClockwise16Regular />}
          onClick={() => {
            void tasks.refetch();
          }}
          aria-label={strings.RefreshLabel}
        >
          {strings.RefreshLabel}
        </ToolbarButton>
        <ToolbarButton
          icon={<ArrowDownload16Regular />}
          disabled={visible.length === 0}
          onClick={exportCsv}
          aria-label={strings.ExportCsvLabel}
        >
          {strings.ExportCsvLabel}
        </ToolbarButton>
      </div>
      <Switch
        label={strings.ShowCompletedLabel}
        checked={showCompleted}
        onChange={(_, data) => setShowCompleted(data.checked)}
      />
      <DataState
        isLoading={tasks.isLoading}
        error={tasks.error}
        isEmpty={!tasks.isLoading && visible.length === 0}
        emptyTitle={strings.TasksEmptyTitle}
        emptyBody={strings.TasksEmptyBody}
        onRetry={() => {
          void tasks.refetch();
        }}
      >
        <div className={styles.listWrap}>
          <div className={styles.list}>
            {visible.map((task) => (
              <div
                key={task.itemId}
                className={
                  task.status === 'Done' ? `${styles.task} ${styles.done}` : styles.task
                }
              >
                <div className={styles.taskBody}>
                  <div className={styles.taskHeader}>
                    <Text weight="semibold">{task.title}</Text>
                    <Badge appearance="outline" color="informative">
                      {taskTypeLabel(task.taskType)}
                    </Badge>
                    {task.status === 'Done' ? (
                      <Badge appearance="tint" color="success">
                        {strings.TaskStatusDone}
                      </Badge>
                    ) : (
                      <Badge appearance="tint" color="informative">
                        {strings.TaskStatusOpen}
                      </Badge>
                    )}
                  </div>
                  {task.instructions ? <Text size={200}>{task.instructions}</Text> : undefined}
                  <Caption1 className={styles.meta}>
                    {strings.JobColumnJob}:{' '}
                    <span className={styles.jobId}>{task.jobId.slice(0, 8)}</span>
                    {task.assignedTo ? ` · ${task.assignedTo}` : ''}
                    {task.status === 'Done' && task.completedBy
                      ? ` · ${strings.TaskCompletedByLabel}: ${task.completedBy}`
                      : ''}
                  </Caption1>
                </div>
                {task.status === 'Open' ? (
                  <div className={styles.actions}>
                    <Button
                      size="small"
                      icon={<CheckmarkRegular />}
                      disabled={completingId !== null && completingId !== task.itemId}
                      onClick={() => {
                        void complete(task.itemId);
                      }}
                    >
                      {strings.MarkDoneLabel}
                    </Button>
                  </div>
                ) : undefined}
              </div>
            ))}
          </div>
        </div>
      </DataState>
    </div>
  );
};
