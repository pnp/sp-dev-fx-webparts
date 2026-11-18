import * as React from 'react';
import { Field, SpinButton, makeStyles, tokens } from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { useWizard } from '../../../contexts/WizardContext';
import {
  useApplicationCatalog,
  useSiteCatalog,
  useTeamsCatalog
} from '../../../hooks/useReferenceData';
import type { IAccessGrants, ITeamsCatalogItem, ITemplateSite, ITemplateTeam } from '../../../models';
import { AccessRoleList, type IAccessRoleOption } from '../../Shared/AccessRoleList';
import { CatalogTagPicker, type ICatalogTagPickerItem } from '../../Shared/CatalogTagPicker';
import { GroupTagPicker } from '../../Shared/GroupTagPicker';
import { StepShell } from '../StepShell';
import { WizardFooter } from '../WizardFooter';

const useStyles = makeStyles({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXL
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalS
  },
  pair: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
    '@container (max-width: 560px)': {
      gridTemplateColumns: '1fr'
    }
  },
  narrow: {
    maxWidth: '240px'
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

export const AccessStep: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useWizard();
  const teams = useTeamsCatalog();
  const sites = useSiteCatalog();
  const applications = useApplicationCatalog();

  const access: IAccessGrants = state.draft.access;

  const save = (next: IAccessGrants): void => {
    dispatch({ type: 'saveAccess', access: next });
  };

  const teamItems: ICatalogTagPickerItem[] = (teams.data ?? []).map((t) => ({
    id: t.teamId,
    title: t.title,
    description: t.category || undefined
  }));
  const siteItems: ICatalogTagPickerItem[] = (sites.data ?? []).map((s) => ({
    id: s.siteUrl,
    title: s.title,
    description: s.siteUrl
  }));
  const applicationItems: ICatalogTagPickerItem[] = (applications.data ?? []).map((a) => ({
    id: String(a.itemId),
    title: a.title,
    description: a.instructions || undefined
  }));
  const titleOf = (items: ICatalogTagPickerItem[], id: string): string =>
    items.filter((i) => i.id === id)[0]?.title ?? id;

  const onTeamsChange = (ids: string[]): void => {
    const catalogById: Map<string, ITeamsCatalogItem> = new Map(
      (teams.data ?? []).map((t) => [t.teamId, t])
    );
    const next: ITemplateTeam[] = ids.map((id) => {
      const existing = access.teams.filter((t) => t.teamId === id)[0];
      if (existing) {
        return existing;
      }
      return { teamId: id, role: catalogById.get(id)?.defaultRole ?? 'member' };
    });
    save({ ...access, teams: next });
  };

  const onSitesChange = (ids: string[]): void => {
    const next: ITemplateSite[] = ids.map((id) => {
      const existing = access.sharePointSites.filter((s) => s.siteUrl === id)[0];
      return existing ?? { siteUrl: id, role: 'member' as const };
    });
    save({ ...access, sharePointSites: next });
  };

  return (
    <div>
      <StepShell title={strings.WizardStepAccess} description={strings.WizardStepDescAccess} wide>
        <div className={styles.stack}>
          <div className={styles.pair}>
            <GroupTagPicker
              label={strings.AccessSecurityGroupsLabel}
              hint={strings.AccessSecurityGroupsHint}
              kind="security"
              selectedIds={access.securityGroups}
              onChange={(ids) => save({ ...access, securityGroups: ids })}
            />
            <GroupTagPicker
              label={strings.AccessM365GroupsLabel}
              hint={strings.AccessM365GroupsHint}
              kind="m365"
              selectedIds={access.m365Groups}
              onChange={(ids) => save({ ...access, m365Groups: ids })}
            />
          </div>

          <div className={styles.section}>
            <CatalogTagPicker
              label={strings.AccessTeamsLabel}
              hint={strings.AccessTeamsHint}
              items={teamItems}
              selectedIds={access.teams.map((t) => t.teamId)}
              onChange={onTeamsChange}
              emptyMessage={strings.AccessNoCatalogItems}
              noMatchesMessage={strings.AccessCatalogNoMatches}
            />
            <AccessRoleList
              items={access.teams.map((t) => ({ id: t.teamId, title: titleOf(teamItems, t.teamId), role: t.role }))}
              roleOptions={TEAM_ROLE_OPTIONS}
              onRoleChange={(teamId, role) =>
                save({ ...access, teams: access.teams.map((t) => (t.teamId === teamId ? { ...t, role } : t)) })
              }
            />
          </div>

          <div className={styles.section}>
            <CatalogTagPicker
              label={strings.AccessSitesLabel}
              hint={strings.AccessSitesHint}
              items={siteItems}
              selectedIds={access.sharePointSites.map((s) => s.siteUrl)}
              onChange={onSitesChange}
              emptyMessage={strings.AccessNoCatalogItems}
              noMatchesMessage={strings.AccessCatalogNoMatches}
            />
            <AccessRoleList
              items={access.sharePointSites.map((s) => ({
                id: s.siteUrl,
                title: titleOf(siteItems, s.siteUrl),
                role: s.role
              }))}
              roleOptions={SITE_ROLE_OPTIONS}
              onRoleChange={(siteUrl, role) =>
                save({
                  ...access,
                  sharePointSites: access.sharePointSites.map((s) => (s.siteUrl === siteUrl ? { ...s, role } : s))
                })
              }
            />
          </div>

          <CatalogTagPicker
            label={strings.AccessApplicationsLabel}
            hint={strings.AccessApplicationsHint}
            items={applicationItems}
            selectedIds={access.applications}
            onChange={(ids) => save({ ...access, applications: ids })}
            emptyMessage={strings.AccessNoCatalogItems}
            noMatchesMessage={strings.AccessCatalogNoMatches}
          />

          <Field
            label={strings.AccessExpirationLabel}
            hint={strings.AccessExpirationHint}
            className={styles.narrow}
          >
            <SpinButton
              value={state.draft.expirationReviewDays ?? 0}
              min={0}
              max={3650}
              onChange={(_, data) => {
                const value = data.value ?? parseInt(data.displayValue ?? '0', 10);
                dispatch({
                  type: 'saveAccess',
                  access,
                  expirationReviewDays: isNaN(value) || value <= 0 ? null : value
                });
              }}
            />
          </Field>
        </div>
      </StepShell>
      <WizardFooter onBack={() => dispatch({ type: 'back' })} onNext={() => dispatch({ type: 'next' })} />
    </div>
  );
};
