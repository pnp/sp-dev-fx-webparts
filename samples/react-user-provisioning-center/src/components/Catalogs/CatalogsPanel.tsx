import * as React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Field,
  Input,
  Option,
  Subtitle2,
  Tab,
  TabList,
  Text,
  Textarea,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import {
  useApplicationCatalogAll,
  useLicenseCostsForManagement,
  useSiteCatalog,
  useTeamsCatalog
} from '../../hooks/useReferenceData';
import {
  QK_APPLICATION_CATALOG,
  QK_APPLICATION_CATALOG_ALL,
  QK_LICENSE_COSTS,
  QK_LICENSE_COSTS_ALL,
  QK_SITE_CATALOG,
  QK_TEAMS_CATALOG
} from '../../constants/queryKeys';
import {
  LIST_APPLICATION_CATALOG,
  LIST_LICENSE_COST_TABLE,
  LIST_SITE_CATALOG,
  LIST_TEAMS_CATALOG
} from '../../constants/listNames';
import type {
  IApplicationCatalogItem,
  ILicenseCostItem,
  ISiteCatalogItem,
  ITeamsCatalogItem
} from '../../models';
import { DataState } from '../Shared/DataState';
import { ConfirmDialog } from '../Shared/ConfirmDialog';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
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
    minWidth: '200px'
  },
  wideField: {
    minWidth: '320px',
    flexGrow: 1
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
    minWidth: 0
  },
  meta: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    wordBreak: 'break-word'
  },
  rowActions: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalXS,
    flexShrink: 0
  }
});

type CatalogTab = 'teams' | 'sites' | 'apps' | 'costs';

interface IPendingDelete {
  listTitle: string;
  itemId: number;
}

type QueryClientLike = ReturnType<typeof useQueryClient>;

async function invalidateFor(listTitle: string, queryClient: QueryClientLike): Promise<void> {
  if (listTitle === LIST_TEAMS_CATALOG) {
    await queryClient.invalidateQueries(QK_TEAMS_CATALOG);
  } else if (listTitle === LIST_SITE_CATALOG) {
    await queryClient.invalidateQueries(QK_SITE_CATALOG);
  } else if (listTitle === LIST_APPLICATION_CATALOG) {
    await queryClient.invalidateQueries(QK_APPLICATION_CATALOG);
    await queryClient.invalidateQueries(QK_APPLICATION_CATALOG_ALL);
  } else if (listTitle === LIST_LICENSE_COST_TABLE) {
    await queryClient.invalidateQueries(QK_LICENSE_COSTS);
    await queryClient.invalidateQueries(QK_LICENSE_COSTS_ALL);
  }
}

interface ISectionProps {
  onDelete: (target: IPendingDelete) => void;
}

// ---------------------------------------------------------------- Teams

const EMPTY_TEAM: Omit<ITeamsCatalogItem, 'itemId'> = {
  title: '',
  teamId: '',
  category: '',
  defaultRole: 'member'
};

const TeamsCatalogSection: React.FC<ISectionProps> = ({ onDelete }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useTeamsCatalog();

  const [draft, setDraft] = React.useState<Omit<ITeamsCatalogItem, 'itemId'>>(EMPTY_TEAM);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [saving, setSaving] = React.useState<boolean>(false);

  const reset = (): void => {
    setDraft(EMPTY_TEAM);
    setEditingId(undefined);
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    try {
      await services.data.saveTeamsCatalogItem({ ...draft, itemId: editingId });
      await invalidateFor(LIST_TEAMS_CATALOG, queryClient);
      toast(strings.CatalogSavedToast);
      reset();
    } catch {
      toast(strings.CatalogSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  const items: ITeamsCatalogItem[] = query.data ?? [];

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Field label={strings.CatalogFieldTitle} className={styles.field} required>
          <Input value={draft.title} onChange={(_, d) => setDraft({ ...draft, title: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldTeamId} className={styles.field} required>
          <Input value={draft.teamId} onChange={(_, d) => setDraft({ ...draft, teamId: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldCategory} className={styles.field}>
          <Input value={draft.category} onChange={(_, d) => setDraft({ ...draft, category: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldDefaultRole} className={styles.field}>
          <Dropdown
            value={draft.defaultRole}
            selectedOptions={[draft.defaultRole]}
            onOptionSelect={(_, d) => setDraft({ ...draft, defaultRole: d.optionValue === 'owner' ? 'owner' : 'member' })}
          >
            <Option value="member">member</Option>
            <Option value="owner">owner</Option>
          </Dropdown>
        </Field>
        <Button
          appearance="primary"
          disabled={saving || !draft.title.trim() || !draft.teamId.trim()}
          onClick={() => {
            void save();
          }}
        >
          {editingId === undefined ? strings.CatalogAddLabel : strings.CatalogSaveLabel}
        </Button>
        {editingId !== undefined ? <Button onClick={reset}>{strings.CatalogCancelLabel}</Button> : undefined}
      </div>

      <DataState
        isLoading={query.isLoading}
        error={query.error}
        isEmpty={items.length === 0}
        emptyTitle={strings.CatalogEmptyTitle}
        emptyBody={strings.CatalogEmptyBody}
        onRetry={() => {
          void query.refetch();
        }}
      >
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.itemId} className={styles.row}>
              <div className={styles.rowBody}>
                <Text weight="semibold">{item.title}</Text>
                <span className={styles.meta}>
                  {item.teamId}
                  {item.category ? ` · ${item.category}` : ''} · {item.defaultRole}
                </span>
              </div>
              <div className={styles.rowActions}>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => {
                    setDraft({
                      title: item.title,
                      teamId: item.teamId,
                      category: item.category,
                      defaultRole: item.defaultRole
                    });
                    setEditingId(item.itemId);
                  }}
                >
                  {strings.CatalogEditLabel}
                </Button>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => onDelete({ listTitle: LIST_TEAMS_CATALOG, itemId: item.itemId })}
                >
                  {strings.CatalogDeleteLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </div>
  );
};

// ---------------------------------------------------------------- Sites

const EMPTY_SITE = { title: '', siteUrl: '', category: '' };

const SiteCatalogSection: React.FC<ISectionProps> = ({ onDelete }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useSiteCatalog();

  const [draft, setDraft] = React.useState<typeof EMPTY_SITE>(EMPTY_SITE);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [saving, setSaving] = React.useState<boolean>(false);

  const reset = (): void => {
    setDraft(EMPTY_SITE);
    setEditingId(undefined);
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    try {
      await services.data.saveSiteCatalogItem({ ...draft, itemId: editingId });
      await invalidateFor(LIST_SITE_CATALOG, queryClient);
      toast(strings.CatalogSavedToast);
      reset();
    } catch {
      toast(strings.CatalogSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  const items: ISiteCatalogItem[] = query.data ?? [];

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Field label={strings.CatalogFieldTitle} className={styles.field} required>
          <Input value={draft.title} onChange={(_, d) => setDraft({ ...draft, title: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldSiteUrl} className={styles.wideField} required>
          <Input value={draft.siteUrl} onChange={(_, d) => setDraft({ ...draft, siteUrl: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldCategory} className={styles.field}>
          <Input value={draft.category} onChange={(_, d) => setDraft({ ...draft, category: d.value })} />
        </Field>
        <Button
          appearance="primary"
          disabled={saving || !draft.title.trim() || !draft.siteUrl.trim()}
          onClick={() => {
            void save();
          }}
        >
          {editingId === undefined ? strings.CatalogAddLabel : strings.CatalogSaveLabel}
        </Button>
        {editingId !== undefined ? <Button onClick={reset}>{strings.CatalogCancelLabel}</Button> : undefined}
      </div>

      <DataState
        isLoading={query.isLoading}
        error={query.error}
        isEmpty={items.length === 0}
        emptyTitle={strings.CatalogEmptyTitle}
        emptyBody={strings.CatalogEmptyBody}
        onRetry={() => {
          void query.refetch();
        }}
      >
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.itemId} className={styles.row}>
              <div className={styles.rowBody}>
                <Text weight="semibold">{item.title}</Text>
                <span className={styles.meta}>
                  {item.siteUrl}
                  {item.category ? ` · ${item.category}` : ''}
                  {item.businessOwner ? ` · ${item.businessOwner}` : ''}
                </span>
              </div>
              <div className={styles.rowActions}>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => {
                    setDraft({ title: item.title, siteUrl: item.siteUrl, category: item.category });
                    setEditingId(item.itemId);
                  }}
                >
                  {strings.CatalogEditLabel}
                </Button>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => onDelete({ listTitle: LIST_SITE_CATALOG, itemId: item.itemId })}
                >
                  {strings.CatalogDeleteLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </div>
  );
};

// ---------------------------------------------------------------- Applications

const EMPTY_APP = {
  title: '',
  provisioningType: 'Manual' as IApplicationCatalogItem['provisioningType'],
  targetGroupId: '',
  approvalRequired: false,
  instructions: '',
  isActive: true
};

const ApplicationCatalogSection: React.FC<ISectionProps> = ({ onDelete }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useApplicationCatalogAll();

  const [draft, setDraft] = React.useState<typeof EMPTY_APP>(EMPTY_APP);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [saving, setSaving] = React.useState<boolean>(false);

  const reset = (): void => {
    setDraft(EMPTY_APP);
    setEditingId(undefined);
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    try {
      await services.data.saveApplicationCatalogItem({ ...draft, itemId: editingId });
      await invalidateFor(LIST_APPLICATION_CATALOG, queryClient);
      toast(strings.CatalogSavedToast);
      reset();
    } catch {
      toast(strings.CatalogSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  const items: IApplicationCatalogItem[] = query.data ?? [];

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Field label={strings.CatalogFieldTitle} className={styles.field} required>
          <Input value={draft.title} onChange={(_, d) => setDraft({ ...draft, title: d.value })} />
        </Field>
        <Field label={strings.CatalogFieldProvisioningType} className={styles.field}>
          <Dropdown
            value={draft.provisioningType}
            selectedOptions={[draft.provisioningType]}
            onOptionSelect={(_, d) =>
              setDraft({ ...draft, provisioningType: d.optionValue === 'GroupBased' ? 'GroupBased' : 'Manual' })
            }
          >
            <Option value="Manual">Manual</Option>
            <Option value="GroupBased">GroupBased</Option>
          </Dropdown>
        </Field>
        <Field label={strings.CatalogFieldTargetGroupId} className={styles.field}>
          <Input
            value={draft.targetGroupId}
            disabled={draft.provisioningType !== 'GroupBased'}
            onChange={(_, d) => setDraft({ ...draft, targetGroupId: d.value })}
          />
        </Field>
        <Field label={strings.CatalogFieldInstructions} className={styles.wideField}>
          <Textarea
            value={draft.instructions}
            resize="vertical"
            rows={1}
            onChange={(_, d) => setDraft({ ...draft, instructions: d.value })}
          />
        </Field>
        <Checkbox
          label={strings.CatalogFieldApprovalRequired}
          checked={draft.approvalRequired}
          onChange={(_, d) => setDraft({ ...draft, approvalRequired: !!d.checked })}
        />
        <Checkbox
          label={strings.CatalogFieldIsActive}
          checked={draft.isActive}
          onChange={(_, d) => setDraft({ ...draft, isActive: !!d.checked })}
        />
        <Button
          appearance="primary"
          disabled={saving || !draft.title.trim()}
          onClick={() => {
            void save();
          }}
        >
          {editingId === undefined ? strings.CatalogAddLabel : strings.CatalogSaveLabel}
        </Button>
        {editingId !== undefined ? <Button onClick={reset}>{strings.CatalogCancelLabel}</Button> : undefined}
      </div>

      <DataState
        isLoading={query.isLoading}
        error={query.error}
        isEmpty={items.length === 0}
        emptyTitle={strings.CatalogEmptyTitle}
        emptyBody={strings.CatalogEmptyBody}
        onRetry={() => {
          void query.refetch();
        }}
      >
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.itemId} className={styles.row}>
              <div className={styles.rowBody}>
                <Text weight="semibold">{item.title}</Text>
                <span className={styles.meta}>
                  {item.provisioningType}
                  {item.targetGroupId ? ` · ${item.targetGroupId}` : ''}
                  {item.approvalRequired ? ` · ${strings.CatalogFieldApprovalRequired}` : ''}
                </span>
              </div>
              {!item.isActive ? (
                <Badge appearance="tint" color="subtle">
                  {strings.CatalogInactiveBadge}
                </Badge>
              ) : undefined}
              <div className={styles.rowActions}>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => {
                    setDraft({
                      title: item.title,
                      provisioningType: item.provisioningType,
                      targetGroupId: item.targetGroupId ?? '',
                      approvalRequired: item.approvalRequired,
                      instructions: item.instructions,
                      isActive: item.isActive
                    });
                    setEditingId(item.itemId);
                  }}
                >
                  {strings.CatalogEditLabel}
                </Button>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => onDelete({ listTitle: LIST_APPLICATION_CATALOG, itemId: item.itemId })}
                >
                  {strings.CatalogDeleteLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </div>
  );
};

// ---------------------------------------------------------------- License costs

const EMPTY_COST = { skuPartNumber: '', monthlyCost: 0, currency: '' };

const LicenseCostSection: React.FC<ISectionProps> = ({ onDelete }) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useLicenseCostsForManagement();

  const [draft, setDraft] = React.useState<typeof EMPTY_COST>(EMPTY_COST);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [saving, setSaving] = React.useState<boolean>(false);

  const reset = (): void => {
    setDraft(EMPTY_COST);
    setEditingId(undefined);
  };

  const save = async (): Promise<void> => {
    setSaving(true);
    try {
      await services.data.saveLicenseCostItem({ ...draft, itemId: editingId });
      await invalidateFor(LIST_LICENSE_COST_TABLE, queryClient);
      toast(strings.CatalogSavedToast);
      reset();
    } catch {
      toast(strings.CatalogSaveFailed, 'error');
    } finally {
      setSaving(false);
    }
  };

  const items: ILicenseCostItem[] = query.data ?? [];

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Field label={strings.CatalogFieldSkuPartNumber} className={styles.field} required>
          <Input
            value={draft.skuPartNumber}
            placeholder="SPE_E5"
            onChange={(_, d) => setDraft({ ...draft, skuPartNumber: d.value })}
          />
        </Field>
        <Field label={strings.CatalogFieldMonthlyCost} className={styles.field}>
          <Input
            type="number"
            value={String(draft.monthlyCost)}
            onChange={(_, d) => setDraft({ ...draft, monthlyCost: Number(d.value) || 0 })}
          />
        </Field>
        <Field label={strings.CatalogFieldCurrency} className={styles.field}>
          <Input value={draft.currency} placeholder="SEK" onChange={(_, d) => setDraft({ ...draft, currency: d.value })} />
        </Field>
        <Button
          appearance="primary"
          disabled={saving || !draft.skuPartNumber.trim()}
          onClick={() => {
            void save();
          }}
        >
          {editingId === undefined ? strings.CatalogAddLabel : strings.CatalogSaveLabel}
        </Button>
        {editingId !== undefined ? <Button onClick={reset}>{strings.CatalogCancelLabel}</Button> : undefined}
      </div>

      <DataState
        isLoading={query.isLoading}
        error={query.error}
        isEmpty={items.length === 0}
        emptyTitle={strings.CatalogEmptyTitle}
        emptyBody={strings.CatalogEmptyBody}
        onRetry={() => {
          void query.refetch();
        }}
      >
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.itemId} className={styles.row}>
              <div className={styles.rowBody}>
                <Text weight="semibold">{item.skuPartNumber}</Text>
                <span className={styles.meta}>
                  {item.monthlyCost} {item.currency}
                </span>
              </div>
              <div className={styles.rowActions}>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => {
                    setDraft({
                      skuPartNumber: item.skuPartNumber,
                      monthlyCost: item.monthlyCost,
                      currency: item.currency
                    });
                    setEditingId(item.itemId);
                  }}
                >
                  {strings.CatalogEditLabel}
                </Button>
                <Button
                  size="small"
                  appearance="subtle"
                  onClick={() => onDelete({ listTitle: LIST_LICENSE_COST_TABLE, itemId: item.itemId })}
                >
                  {strings.CatalogDeleteLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </div>
  );
};

// ---------------------------------------------------------------- Shell
// Declared last so it sits below every section component it renders.

/**
 * In-app editor for the four reference lists the wizards read from. Before
 * this existed the only way to populate them was to open the SharePoint list
 * and hand-edit rows.
 */
export const CatalogsPanel: React.FC = () => {
  const styles = useStyles();
  const [tab, setTab] = React.useState<CatalogTab>('teams');
  const [pendingDelete, setPendingDelete] = React.useState<IPendingDelete | null>(null);
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();

  const confirmDelete = async (): Promise<void> => {
    if (!pendingDelete) {
      return;
    }
    const { listTitle, itemId } = pendingDelete;
    setPendingDelete(null);
    try {
      await services.data.deleteCatalogItem(listTitle, itemId);
      await invalidateFor(listTitle, queryClient);
      toast(strings.CatalogDeletedToast);
    } catch {
      toast(strings.CatalogDeleteFailed, 'error');
    }
  };

  return (
    <div className={styles.root}>
      <Subtitle2 as="h2" block>
        {strings.CatalogsTitle}
      </Subtitle2>
      <Text className={styles.hint}>{strings.CatalogsIntro}</Text>

      <TabList selectedValue={tab} onTabSelect={(_, data) => setTab(data.value as CatalogTab)}>
        <Tab value="teams">{strings.CatalogTeamsTitle}</Tab>
        <Tab value="sites">{strings.CatalogSitesTitle}</Tab>
        <Tab value="apps">{strings.CatalogAppsTitle}</Tab>
        <Tab value="costs">{strings.CatalogLicenseCostsTitle}</Tab>
      </TabList>

      {tab === 'teams' ? <TeamsCatalogSection onDelete={setPendingDelete} /> : undefined}
      {tab === 'sites' ? <SiteCatalogSection onDelete={setPendingDelete} /> : undefined}
      {tab === 'apps' ? <ApplicationCatalogSection onDelete={setPendingDelete} /> : undefined}
      {tab === 'costs' ? <LicenseCostSection onDelete={setPendingDelete} /> : undefined}

      <ConfirmDialog
        open={pendingDelete !== null}
        title={strings.CatalogDeleteConfirmTitle}
        message={strings.CatalogDeleteConfirmBody}
        confirmLabel={strings.CatalogDeleteLabel}
        cancelLabel={strings.CatalogCancelLabel}
        onConfirm={() => {
          void confirmDelete();
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};
