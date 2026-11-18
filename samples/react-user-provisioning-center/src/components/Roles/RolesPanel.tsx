import * as React from 'react';
import {
  Button,
  Checkbox,
  Field,
  Input,
  Subtitle2,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useAppRoles, useRoleDefinitionsForManagement } from '../../hooks/useReferenceData';
import { QK_APP_ROLES, QK_ROLES } from '../../constants/queryKeys';
import type { AppPermission, IRoleManagementItem } from '../../models';
import { DataState } from '../Shared/DataState';
import { useAppToast } from '../Shared/AppToaster';
import { ApprovalDelegationsPanel } from './ApprovalDelegationsPanel';

const ALL_PERMISSIONS: readonly AppPermission[] = [
  'createJobs',
  'approveJobs',
  'runJobs',
  'retrySteps',
  'skipSteps',
  'cancelJobs',
  'rollbackJobs',
  'manageTemplates',
  'viewAudit',
  'manageTasks',
  'manageSettings',
  'manageDelegations'
];

function permissionLabel(permission: AppPermission): string {
  switch (permission) {
    case 'createJobs':
      return strings.PermissionCreateJobs;
    case 'approveJobs':
      return strings.PermissionApproveJobs;
    case 'runJobs':
      return strings.PermissionRunJobs;
    case 'retrySteps':
      return strings.PermissionRetrySteps;
    case 'skipSteps':
      return strings.PermissionSkipSteps;
    case 'rollbackJobs':
      return strings.PermissionRollbackJobs;
    case 'cancelJobs':
      return strings.PermissionCancelJobs;
    case 'manageTemplates':
      return strings.PermissionManageTemplates;
    case 'viewAudit':
      return strings.PermissionViewAudit;
    case 'manageTasks':
      return strings.PermissionManageTasks;
    case 'manageSettings':
      return strings.PermissionManageSettings;
    case 'manageDelegations':
      return strings.PermissionManageDelegations;
    default:
      return permission;
  }
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },
  hint: {
    color: tokens.colorNeutralForeground3
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'baseline',
    columnGap: tokens.spacingHorizontalM
  },
  groupField: {
    maxWidth: '460px'
  },
  permissions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXS
  },
  cardActions: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS
  }
});

interface IRoleCardProps {
  item: IRoleManagementItem;
  onSaved: () => void;
}

const RoleCard: React.FC<IRoleCardProps> = ({ item, onSaved }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();

  const [memberGroupId, setMemberGroupId] = React.useState<string>(item.memberGroupId);
  const [permissions, setPermissions] = React.useState<Set<AppPermission>>(new Set(item.permissions));
  const [saving, setSaving] = React.useState<boolean>(false);

  const dirty: boolean =
    memberGroupId !== item.memberGroupId ||
    permissions.size !== item.permissions.length ||
    item.permissions.some((p) => !permissions.has(p));

  const reset = (): void => {
    setMemberGroupId(item.memberGroupId);
    setPermissions(new Set(item.permissions));
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    try {
      await services.engine.updateRoleDefinition(item.itemId, memberGroupId.trim(), Array.from(permissions));
      await queryClient.invalidateQueries(QK_ROLES);
      await queryClient.invalidateQueries(QK_APP_ROLES);
      toast(strings.RolesSavedToast);
      onSaved();
    } catch {
      toast(strings.RolesSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Text weight="semibold">{item.role}</Text>
      </div>
      <Field label={strings.RolesGroupIdLabel} hint={strings.RolesGroupIdHint} className={styles.groupField}>
        <Input value={memberGroupId} onChange={(_, data) => setMemberGroupId(data.value)} />
      </Field>
      <Field label={strings.RolesPermissionsLabel}>
        <div className={styles.permissions}>
          {ALL_PERMISSIONS.map((permission) => (
            <Checkbox
              key={permission}
              label={permissionLabel(permission)}
              checked={permissions.has(permission)}
              onChange={(_, data) => {
                const next = new Set(permissions);
                if (data.checked) next.add(permission);
                else next.delete(permission);
                setPermissions(next);
              }}
            />
          ))}
        </div>
      </Field>
      <div className={styles.cardActions}>
        <Button
          appearance="primary"
          size="small"
          disabled={!dirty || saving}
          onClick={() => {
            void save();
          }}
        >
          {strings.SaveLabel}
        </Button>
        <Button appearance="secondary" size="small" disabled={!dirty || saving} onClick={reset}>
          {strings.CancelLabel}
        </Button>
      </div>
    </div>
  );
};

export const RolesPanel: React.FC = () => {
  const styles = useStyles();
  const query = useRoleDefinitionsForManagement();
  const roles = useAppRoles();
  const permissions = roles.data?.permissions;
  const canManageSettings: boolean = permissions?.has('manageSettings') ?? false;
  const canManageDelegations: boolean = permissions?.has('manageDelegations') ?? false;
  const canApprove: boolean = permissions?.has('approveJobs') ?? false;

  return (
    <div className={styles.root}>
      {canManageSettings ? (
        <>
          <Subtitle2 as="h3" block>
            {strings.RolesTitle}
          </Subtitle2>
          <Text className={styles.hint}>{strings.RolesIntro}</Text>
          <DataState
            isLoading={query.isLoading}
            error={query.error}
            isEmpty={(query.data ?? []).length === 0}
            emptyTitle={strings.RolesEmptyTitle}
            emptyBody={strings.RolesEmptyBody}
            onRetry={() => {
              void query.refetch();
            }}
          >
            <div className={styles.cards}>
              {(query.data ?? []).map((item) => (
                <RoleCard
                  key={item.itemId}
                  item={item}
                  onSaved={() => {
                    void query.refetch();
                  }}
                />
              ))}
            </div>
          </DataState>
        </>
      ) : undefined}
      {canManageDelegations || canApprove ? <ApprovalDelegationsPanel canManageAll={canManageDelegations} /> : undefined}
    </div>
  );
};
