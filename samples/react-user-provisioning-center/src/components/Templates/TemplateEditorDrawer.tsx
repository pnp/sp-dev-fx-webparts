import * as React from 'react';
import {
  Button,
  Checkbox,
  Combobox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Option,
  SpinButton,
  Switch,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import {
  useApplicationCatalog,
  useLicenseOptions,
  useSiteCatalog,
  useTeamsCatalog
} from '../../hooks/useReferenceData';
import { QK_TEMPLATES, QK_TEMPLATES_ALL } from '../../constants/queryKeys';
import { USAGE_LOCATIONS } from '../../constants/usageLocations';
import type { IDepartmentTemplate, ITeamsCatalogItem, ITemplateListItem, ITemplateSite, ITemplateTeam } from '../../models';
import { AccessRoleList, type IAccessRoleOption } from '../Shared/AccessRoleList';
import { CatalogTagPicker, type ICatalogTagPickerItem } from '../Shared/CatalogTagPicker';
import { GroupTagPicker } from '../Shared/GroupTagPicker';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  },
  licenses: {
    display: 'flex',
    flexDirection: 'column'
  },
  narrow: {
    maxWidth: '200px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  }
});

const TEAM_ROLE_OPTIONS: IAccessRoleOption<'member' | 'owner'>[] = [
  { value: 'member', label: strings.AccessRoleMember },
  { value: 'owner', label: strings.AccessRoleOwner }
];

const SITE_ROLE_OPTIONS: IAccessRoleOption<'visitor' | 'member' | 'owner'>[] = [
  { value: 'visitor', label: strings.AccessRoleVisitor },
  { value: 'member', label: strings.AccessRoleMember },
  { value: 'owner', label: strings.AccessRoleOwner }
];

const EMPTY_TEMPLATE: IDepartmentTemplate = {
  department: '',
  licenses: [],
  securityGroups: [],
  m365Groups: [],
  teams: [],
  sharePointSites: [],
  applications: [],
  approverGroupId: null,
  expirationPolicyDays: null,
  usageLocationDefault: ''
};

export interface ITemplateEditorDrawerProps {
  open: boolean;
  item: ITemplateListItem | null;
  onClose: () => void;
}

export const TemplateEditorDrawer: React.FC<ITemplateEditorDrawerProps> = ({
  open,
  item,
  onClose
}) => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const licenses = useLicenseOptions();
  const teamsCatalog = useTeamsCatalog();
  const siteCatalog = useSiteCatalog();
  const applicationCatalog = useApplicationCatalog();

  const [title, setTitle] = React.useState<string>('');
  const [department, setDepartment] = React.useState<string>('');
  const [usageLocation, setUsageLocation] = React.useState<string>('');
  const [selectedSkus, setSelectedSkus] = React.useState<Set<string>>(new Set());
  const [securityGroupIds, setSecurityGroupIds] = React.useState<string[]>([]);
  const [m365GroupIds, setM365GroupIds] = React.useState<string[]>([]);
  const [teamGrants, setTeamGrants] = React.useState<ITemplateTeam[]>([]);
  const [siteGrants, setSiteGrants] = React.useState<ITemplateSite[]>([]);
  const [applicationIds, setApplicationIds] = React.useState<string[]>([]);
  const [approverGroupId, setApproverGroupId] = React.useState<string>('');
  const [expirationDays, setExpirationDays] = React.useState<number>(0);
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    setTitle(item?.title ?? '');
    setDepartment(item?.template.department ?? '');
    setUsageLocation(item?.template.usageLocationDefault ?? '');
    setSelectedSkus(new Set((item?.template.licenses ?? []).map((l) => l.skuPartNumber)));
    setSecurityGroupIds(item?.template.securityGroups ?? []);
    setM365GroupIds(item?.template.m365Groups ?? []);
    setTeamGrants(item?.template.teams ?? []);
    setSiteGrants(item?.template.sharePointSites ?? []);
    setApplicationIds(item?.template.applications ?? []);
    setApproverGroupId(item?.template.approverGroupId ?? '');
    setExpirationDays(item?.template.expirationPolicyDays ?? 0);
    setIsActive(item?.isActive ?? true);
    setError(undefined);
  }, [open, item]);

  const selectedLocation = USAGE_LOCATIONS.filter((l) => l.code === usageLocation)[0];

  const teamItems: ICatalogTagPickerItem[] = (teamsCatalog.data ?? []).map((t) => ({
    id: t.teamId,
    title: t.title,
    description: t.category || undefined
  }));
  const siteItems: ICatalogTagPickerItem[] = (siteCatalog.data ?? []).map((s) => ({
    id: s.siteUrl,
    title: s.title,
    description: s.siteUrl
  }));
  const applicationItems: ICatalogTagPickerItem[] = (applicationCatalog.data ?? []).map((a) => ({
    id: String(a.itemId),
    title: a.title,
    description: a.instructions || undefined
  }));
  const titleOf = (items: ICatalogTagPickerItem[], id: string): string =>
    items.filter((i) => i.id === id)[0]?.title ?? id;

  const save = async (): Promise<void> => {
    if (!title.trim()) {
      return;
    }
    setSaving(true);
    setError(undefined);
    const template: IDepartmentTemplate = {
      ...(item?.template ?? EMPTY_TEMPLATE),
      department: department.trim(),
      usageLocationDefault: usageLocation,
      licenses: Array.from(selectedSkus).map((skuPartNumber) => ({
        skuPartNumber,
        required: false
      })),
      securityGroups: securityGroupIds,
      m365Groups: m365GroupIds,
      teams: teamGrants,
      sharePointSites: siteGrants,
      applications: applicationIds,
      approverGroupId: approverGroupId.trim() || null,
      expirationPolicyDays: expirationDays > 0 ? expirationDays : null
    };
    try {
      if (item) {
        await services.engine.updateTemplate(item.itemId, title.trim(), template, item.version);
        if (item.isActive !== isActive) {
          await services.engine.setTemplateActive(item.itemId, isActive);
        }
      } else {
        await services.engine.createTemplate(title.trim(), template);
      }
      await Promise.all([
        queryClient.invalidateQueries(QK_TEMPLATES),
        queryClient.invalidateQueries(QK_TEMPLATES_ALL)
      ]);
      toast(strings.TemplateSavedToast);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : strings.ErrorGenericTitle);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      size="medium"
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label={strings.CloseLabel}
              icon={<Dismiss24Regular />}
              onClick={onClose}
            />
          }
        >
          {item ? strings.TemplateEditTitle : strings.NewTemplateLabel}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody className={styles.body}>
        <Field label={strings.TemplateNameLabel} required>
          <Input value={title} onChange={(_, data) => setTitle(data.value)} />
        </Field>
        <Field label={strings.DepartmentLabel}>
          <Input value={department} onChange={(_, data) => setDepartment(data.value)} />
        </Field>
        <Field label={strings.UsageLocationLabel}>
          <Combobox
            value={selectedLocation ? `${selectedLocation.name} (${selectedLocation.code})` : ''}
            onOptionSelect={(_, data) => setUsageLocation(data.optionValue ?? '')}
          >
            {USAGE_LOCATIONS.map((location) => (
              <Option key={location.code} value={location.code} text={location.name}>
                {location.name} ({location.code})
              </Option>
            ))}
          </Combobox>
        </Field>
        <Field label={strings.WizardStepLicenses}>
          <div className={styles.licenses}>
            {(licenses.data ?? []).map((option) => (
              <Checkbox
                key={option.skuId}
                label={option.displayName}
                checked={selectedSkus.has(option.skuPartNumber)}
                onChange={(_, data) => {
                  const next: Set<string> = new Set(selectedSkus);
                  if (data.checked) {
                    next.add(option.skuPartNumber);
                  } else {
                    next.delete(option.skuPartNumber);
                  }
                  setSelectedSkus(next);
                }}
              />
            ))}
          </div>
        </Field>
        <GroupTagPicker
          label={strings.AccessSecurityGroupsLabel}
          hint={strings.AccessSecurityGroupsHint}
          kind="security"
          selectedIds={securityGroupIds}
          onChange={setSecurityGroupIds}
        />
        <GroupTagPicker
          label={strings.AccessM365GroupsLabel}
          hint={strings.AccessM365GroupsHint}
          kind="m365"
          selectedIds={m365GroupIds}
          onChange={setM365GroupIds}
        />
        <div className={styles.section}>
          <CatalogTagPicker
            label={strings.AccessTeamsLabel}
            hint={strings.AccessTeamsHint}
            items={teamItems}
            selectedIds={teamGrants.map((t) => t.teamId)}
            onChange={(ids) => {
              const catalogById: Map<string, ITeamsCatalogItem> = new Map(
                (teamsCatalog.data ?? []).map((t) => [t.teamId, t])
              );
              setTeamGrants(
                ids.map((id) => {
                  const existing = teamGrants.filter((t) => t.teamId === id)[0];
                  return existing ?? { teamId: id, role: catalogById.get(id)?.defaultRole ?? 'member' };
                })
              );
            }}
            emptyMessage={strings.AccessNoCatalogItems}
            noMatchesMessage={strings.AccessCatalogNoMatches}
          />
          <AccessRoleList
            items={teamGrants.map((t) => ({
              id: t.teamId,
              title: titleOf(teamItems, t.teamId),
              role: t.role
            }))}
            roleOptions={TEAM_ROLE_OPTIONS}
            onRoleChange={(teamId, role) =>
              setTeamGrants(teamGrants.map((t) => (t.teamId === teamId ? { ...t, role } : t)))
            }
          />
        </div>
        <div className={styles.section}>
          <CatalogTagPicker
            label={strings.AccessSitesLabel}
            hint={strings.AccessSitesHint}
            items={siteItems}
            selectedIds={siteGrants.map((s) => s.siteUrl)}
            onChange={(ids) =>
              setSiteGrants(
                ids.map((id) => siteGrants.filter((s) => s.siteUrl === id)[0] ?? { siteUrl: id, role: 'member' as const })
              )
            }
            emptyMessage={strings.AccessNoCatalogItems}
            noMatchesMessage={strings.AccessCatalogNoMatches}
          />
          <AccessRoleList
            items={siteGrants.map((s) => ({
              id: s.siteUrl,
              title: titleOf(siteItems, s.siteUrl),
              role: s.role
            }))}
            roleOptions={SITE_ROLE_OPTIONS}
            onRoleChange={(siteUrl, role) =>
              setSiteGrants(siteGrants.map((s) => (s.siteUrl === siteUrl ? { ...s, role } : s)))
            }
          />
        </div>
        <CatalogTagPicker
          label={strings.AccessApplicationsLabel}
          hint={strings.AccessApplicationsHint}
          items={applicationItems}
          selectedIds={applicationIds}
          onChange={setApplicationIds}
          emptyMessage={strings.AccessNoCatalogItems}
          noMatchesMessage={strings.AccessCatalogNoMatches}
        />
        <Field label={strings.ApproverGroupIdLabel} hint={strings.ApproverGroupIdHint}>
          <Input value={approverGroupId} onChange={(_, data) => setApproverGroupId(data.value)} />
        </Field>
        <Field
          label={strings.AccessExpirationLabel}
          hint={strings.AccessExpirationHint}
          className={styles.narrow}
        >
          <SpinButton
            value={expirationDays}
            min={0}
            max={3650}
            onChange={(_, data) => {
              const value = data.value ?? parseInt(data.displayValue ?? '0', 10);
              setExpirationDays(isNaN(value) ? 0 : Math.max(0, value));
            }}
          />
        </Field>
        {item ? (
          <Switch
            label={strings.TemplateActiveLabel}
            checked={isActive}
            onChange={(_, data) => setIsActive(data.checked)}
          />
        ) : undefined}
        {error ? (
          <MessageBar intent="error">
            <MessageBarBody>{error}</MessageBarBody>
          </MessageBar>
        ) : undefined}
      </DrawerBody>
      <DrawerFooter>
        <Button
          appearance="primary"
          disabled={!title.trim() || saving}
          onClick={() => {
            void save();
          }}
        >
          {strings.SaveLabel}
        </Button>
        <Button appearance="secondary" onClick={onClose}>
          {strings.CancelLabel}
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};
