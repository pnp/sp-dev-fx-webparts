import * as React from 'react';
import {
  Badge,
  Button,
  Field,
  Input,
  Subtitle2,
  Text,
  Textarea,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useAllDelegations } from '../../hooks/useReferenceData';
import { QK_DELEGATIONS } from '../../constants/queryKeys';
import { isDelegationActive } from '../../models';
import type { IApprovalDelegation } from '../../models';
import { DataState } from '../Shared/DataState';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2
  },
  hint: {
    color: tokens.colorNeutralForeground3
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    alignItems: 'flex-end',
    padding: tokens.spacingVerticalM,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  field: {
    minWidth: '180px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  rowBody: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 0,
    minWidth: 0
  },
  meta: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  }
});

export interface IApprovalDelegationsPanelProps {
  canManageAll: boolean;
}

export const ApprovalDelegationsPanel: React.FC<IApprovalDelegationsPanelProps> = ({ canManageAll }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useAllDelegations();

  const [delegateUpn, setDelegateUpn] = React.useState<string>('');
  const [startUtc, setStartUtc] = React.useState<string>('');
  const [endUtc, setEndUtc] = React.useState<string>('');
  const [reason, setReason] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);

  const all: IApprovalDelegation[] = query.data ?? [];
  const visible: IApprovalDelegation[] = canManageAll
    ? all
    : all.filter((d) => d.delegatorUpn.toLowerCase() === services.operatorUpn.toLowerCase());

  const add = async (): Promise<void> => {
    if (!delegateUpn.trim()) {
      return;
    }
    setSaving(true);
    try {
      await services.engine.createDelegation({
        delegatorUpn: services.operatorUpn,
        delegateUpn: delegateUpn.trim(),
        startUtc: startUtc ? `${startUtc}T00:00:00Z` : null,
        endUtc: endUtc ? `${endUtc}T23:59:59Z` : null,
        reason: reason.trim(),
        isActive: true
      });
      await queryClient.invalidateQueries(QK_DELEGATIONS);
      toast(strings.DelegationSavedToast);
      setDelegateUpn('');
      setStartUtc('');
      setEndUtc('');
      setReason('');
    } catch {
      toast(strings.DelegationSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  const revoke = async (itemId: number): Promise<void> => {
    try {
      await services.engine.revokeDelegation(itemId);
      await queryClient.invalidateQueries(QK_DELEGATIONS);
      toast(strings.DelegationRevokedToast);
    } catch {
      toast(strings.DelegationSaveFailed, 'error');
    }
  };

  return (
    <div className={styles.root}>
      <Subtitle2 as="h3" block>
        {strings.DelegationsTitle}
      </Subtitle2>

      <div className={styles.form}>
        <Field label={strings.DelegationDelegateLabel} className={styles.field}>
          <Input value={delegateUpn} onChange={(_, data) => setDelegateUpn(data.value)} placeholder="name@contoso.com" />
        </Field>
        <Field label={strings.DelegationStartLabel} className={styles.field}>
          <Input type="date" value={startUtc} onChange={(_, data) => setStartUtc(data.value)} />
        </Field>
        <Field label={strings.DelegationEndLabel} className={styles.field}>
          <Input type="date" value={endUtc} onChange={(_, data) => setEndUtc(data.value)} />
        </Field>
        <Field label={strings.DelegationReasonLabel} className={styles.field}>
          <Textarea value={reason} onChange={(_, data) => setReason(data.value)} resize="vertical" rows={1} />
        </Field>
        <Button
          appearance="primary"
          disabled={saving || !delegateUpn.trim()}
          onClick={() => {
            void add();
          }}
        >
          {strings.DelegationAddLabel}
        </Button>
      </div>

      <DataState
        isLoading={query.isLoading}
        error={query.error}
        isEmpty={visible.length === 0}
        emptyTitle={strings.DelegationsEmptyTitle}
        emptyBody={strings.DelegationsEmptyBody}
        onRetry={() => {
          void query.refetch();
        }}
      >
        <div className={styles.list}>
          {visible.map((d) => {
            const active: boolean = isDelegationActive(d);
            return (
              <div key={d.itemId} className={styles.row}>
                <div className={styles.rowBody}>
                  <Text weight="semibold">
                    {d.delegatorUpn} → {d.delegateUpn}
                  </Text>
                  <span className={styles.meta}>
                    {d.startUtc ? new Date(d.startUtc).toLocaleDateString() : ''}
                    {d.endUtc ? ` – ${new Date(d.endUtc).toLocaleDateString()}` : ''}
                    {d.reason ? ` · ${d.reason}` : ''}
                  </span>
                </div>
                <Badge appearance="tint" color={d.isActive && active ? 'success' : 'subtle'}>
                  {d.isActive && active ? strings.DelegationActiveLabel : strings.DelegationInactiveLabel}
                </Badge>
                {d.isActive ? (
                  <Button
                    size="small"
                    appearance="subtle"
                    onClick={() => {
                      void revoke(d.itemId);
                    }}
                  >
                    {strings.DelegationRevokeLabel}
                  </Button>
                ) : undefined}
              </div>
            );
          })}
        </div>
      </DataState>
    </div>
  );
};
