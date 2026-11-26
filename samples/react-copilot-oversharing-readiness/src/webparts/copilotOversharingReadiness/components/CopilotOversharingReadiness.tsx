import * as React from 'react';
import styles from './CopilotOversharingReadiness.module.scss';
import type { ICopilotOversharingReadinessProps } from './ICopilotOversharingReadinessProps';
import { getAttestations, getLiveSiteRisks, getLiveSitesViaSearch, recordAttestation, type ILiveSite, type ILiveSiteRisk } from '../services/liveService';
import { calculateRiskScore, getMockSites, riskLevel, riskReasons, siteRiskPriority, toCsv, type ISiteRisk } from '../services/siteRisk';
import { getOwnershipFlag, mergeRiskSettings, ownershipFlagLabel, validateRiskSettingsImport, type IRiskSettings } from '../services/riskSettings';
import { format, levelText, type IRiskStrings, type RiskLevelKey } from '../services/riskStrings';
import type { SPFI } from '@pnp/sp';
import type { GraphFI } from '@pnp/graph';
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  getTheme,
  Icon,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
  type IColumn,
  type IDropdownOption
} from '@fluentui/react';

interface IRow {
  key: string;
  title: string;
  url: string;
  owner: string;
  ownerFlag: string;
  score: number | '';
  level: RiskLevelKey | '';
  priority: number;
  reasons: string[];
  unknown: string[];
  attestation: string;
}

function riskPill(level: RiskLevelKey): { icon: string; color: string } {
  const theme = getTheme();
  if (level === 'High') return { icon: 'ErrorBadge', color: theme.palette.redDark };
  if (level === 'Medium') return { icon: 'Warning', color: theme.palette.yellowDark };
  if (level === 'Low' || level === 'Low*') return { icon: 'Completed', color: theme.palette.greenDark };
  return { icon: 'Info', color: theme.palette.neutralSecondary };
}

const CopilotOversharingReadiness: React.FC<ICopilotOversharingReadinessProps> = (props) => {
  /* Imported settings override the property pane values for this view
   * only. They are never written back to the web part properties, so
   * Reset always returns to the pane values. */
  const [settingsOverride, setSettingsOverride] = React.useState<Partial<IRiskSettings> | undefined>(undefined);
  const [settingsStatus, setSettingsStatus] = React.useState<string>('');
  const importInputRef = React.useRef<HTMLInputElement>(null);
  const settings = settingsOverride ? mergeRiskSettings({ ...props.settings, ...settingsOverride }) : props.settings;
  const s = props.strings;
  const riskStrings: IRiskStrings = {
    levelHigh: s.LevelHigh, levelMedium: s.LevelMedium, levelLow: s.LevelLow, levelUnknown: s.LevelUnknown,
    reasonSharedEveryone: s.ReasonSharedEveryone, reasonSharedEveryoneExceptExternal: s.ReasonSharedEveryoneExceptExternal,
    reasonAnyoneLinks: s.ReasonAnyoneLinks, reasonSharingLinks: s.ReasonSharingLinks,
    reasonBrokenInheritance: s.ReasonBrokenInheritance, reasonInactiveDays: s.ReasonInactiveDays,
    reasonNoSensitivityLabel: s.ReasonNoSensitivityLabel, notScored: s.NotScored,
    unknownEveryone: s.UnknownEveryone, unknownEveryoneExceptExternal: s.UnknownEveryoneExceptExternal,
    unknownPermissionInheritance: s.UnknownPermissionInheritance, unknownLastActivity: s.UnknownLastActivity,
    unknownAnyoneLinks: s.UnknownAnyoneLinks, unknownSharingLinkCount: s.UnknownSharingLinkCount,
    unknownSensitivityLabel: s.UnknownSensitivityLabel,
    ownerlessFlag: s.OwnerlessFlag, singleOwnerFlag: s.SingleOwnerFlag,
    ownerNoActive: s.OwnerNoActive, unnamedSite: s.UnnamedSite, noRiskSignals: s.NoRiskSignals,
    csvSite: s.CsvSite, csvUrl: s.CsvUrl, csvOwner: s.CsvOwner, csvRiskScore: s.CsvRiskScore,
    csvRiskLevel: s.CsvRiskLevel, csvReasons: s.CsvReasons, csvUnknownSignals: s.CsvUnknownSignals,
    errorRiskReadFailed: s.ErrorRiskReadFailed, attestationListDescription: s.AttestationListDescription
  };
  const [filter, setFilter] = React.useState<string>('All');
  const [search, setSearch] = React.useState<string>('');
  const [attested, setAttested] = React.useState<Record<string, string>>({});
  const sites = React.useMemo(() => getMockSites(), []);

  const [liveSites, setLiveSites] = React.useState<ILiveSite[]>([]);
  const [liveLoading, setLiveLoading] = React.useState<boolean>(false);
  const [liveError, setLiveError] = React.useState<string>('');
  const [liveStatus, setLiveStatus] = React.useState<string>('');
  const [liveRisks, setLiveRisks] = React.useState<Record<string, ILiveSiteRisk>>({});
  const [liveRiskStatus, setLiveRiskStatus] = React.useState<string>('');

  const attestationOptions: IDropdownOption[] = [
    { key: '', text: s.AttestationNotReviewed },
    { key: 'confirmed', text: s.AttestationConfirmed },
    { key: 'fix', text: s.AttestationNeedsFix }
  ];

  const filterOptions: IDropdownOption[] = [
    { key: 'All', text: s.FilterAll },
    { key: 'High', text: s.LevelHigh },
    { key: 'Medium', text: s.LevelMedium },
    { key: 'Low', text: s.LevelLow },
    { key: 'Unknown', text: s.LevelUnknown }
  ];

  React.useEffect(() => {
    if (props.dataSource !== 'live' || !props.sp) {
      return;
    }
    setLiveLoading(true);
    getLiveSitesViaSearch(props.sp as SPFI, settings.maxSites, s.UnnamedSite)
      .then((found) => {
        setLiveSites(found);
        setLiveError('');
        return getAttestations(props.sp as SPFI).then((saved) => ({ found, saved }));
      })
      .then(({ found, saved }) => {
        setAttested(saved);
        setLiveStatus(format(s.LoadedAttestations, Object.keys(saved).length));
        setLiveRiskStatus(s.LoadingLiveRiskSignals);
        return getLiveSiteRisks(props.sp as SPFI, found, settings, riskStrings, props.graph as GraphFI);
      })
      .then((risks) => {
        setLiveRisks(risks);
        const failed = Object.keys(risks).filter((k) => risks[k].error !== '').length;
        setLiveRiskStatus(failed > 0
          ? format(s.LiveRiskLoadedPartial, Object.keys(risks).length - failed, Object.keys(risks).length, failed)
          : format(s.LiveRiskLoaded, Object.keys(risks).length));
      })
      .catch((e: unknown) => { setLiveError(e instanceof Error ? e.message : s.LiveDataRetrievalFailed); })
      .then(() => setLiveLoading(false))
      .catch(() => undefined);
  }, [props.dataSource, props.sp, settings]);

  const onLiveAttestation = (site: ILiveSite, status: string): void => {
    setAttested({ ...attested, [site.webUrl]: status });
    if (props.sp && status) {
      setLiveStatus(s.SavingAttestation);
      recordAttestation(props.sp as SPFI, site.displayName, site.webUrl, status, s.AttestationListDescription)
        .then(() => setLiveStatus(format(s.SavedAttestationFor, site.displayName)))
        .catch((e: unknown) => {
          setLiveStatus('');
          setLiveError(e instanceof Error ? format(s.AttestationSaveFailedWithError, e.message) : s.AttestationSaveFailed);
        });
    }
  };

  const mockRows: IRow[] = sites.map((site: ISiteRisk) => {
    const score = calculateRiskScore(site, settings);
    const level = riskLevel(score, settings);
    const flag = ownershipFlagLabel(getOwnershipFlag(site.ownerCount, settings.minimumOwners), riskStrings);
    return {
      key: site.siteUrl,
      title: site.siteTitle,
      url: site.siteUrl,
      owner: site.owner,
      ownerFlag: flag,
      score,
      level,
      priority: siteRiskPriority(site, settings, flag !== ''),
      reasons: riskReasons(site, settings, riskStrings),
      unknown: [],
      attestation: attested[site.siteUrl] || ''
    };
  });

  const liveRows: IRow[] = liveSites.map((site) => {
    const r = liveRisks[site.webUrl];
    if (!r) {
      return { key: site.webUrl, title: site.displayName, url: site.webUrl, owner: '', ownerFlag: '', score: '', level: '', priority: 3, reasons: [], unknown: [], attestation: attested[site.webUrl] || '' };
    }
    const level: RiskLevelKey = r.error !== '' ? (settings.unknownVerdict === 'lowWithWarning' ? 'Low*' : 'Unknown') : r.risk.level;
    return {
      key: site.webUrl,
      title: site.displayName,
      url: site.webUrl,
      owner: r.owner,
      ownerFlag: '',
      score: r.error !== '' ? '' : r.risk.score,
      level,
      priority: r.error !== '' ? (level === 'Unknown' ? 4 : 3) : r.risk.priority,
      reasons: r.risk.reasons,
      unknown: settings.showUnknownColumn ? r.risk.unknown : [],
      attestation: attested[site.webUrl] || ''
    };
  });

  const isLive = props.dataSource === 'live';
  const allRows = isLive ? liveRows : mockRows;

  const visibleRows = allRows
    .filter((row) => filter === 'All' || row.level === filter || (filter === 'Low' && row.level === 'Low*'))
    .filter((row) => row.title.toLowerCase().indexOf(search.toLowerCase()) >= 0)
    .sort((a, b) => {
      if (settings.sortBy === 'title') return a.title.localeCompare(b.title);
      if (settings.displayMode === 'numericScore' || settings.sortBy === 'score') {
        const sa = a.score === '' ? -1 : a.score;
        const sb = b.score === '' ? -1 : b.score;
        return sb - sa;
      }
      if (a.priority !== b.priority) return a.priority - b.priority;
      const sa = a.score === '' ? -1 : a.score;
      const sb = b.score === '' ? -1 : b.score;
      return sb - sa;
    });

  const exportCsv = (): void => {
    let csv: string;
    if (isLive) {
      const headerParts = [s.CsvSite, s.CsvUrl, s.CsvOwner, s.CsvRiskScore, s.CsvRiskLevel, s.CsvReasons];
      if (settings.csvIncludeUnknown) headerParts.push(s.CsvUnknownSignals);
      const header = settings.csvIncludeReasons ? headerParts.join(',') : headerParts.filter((h) => h !== s.CsvReasons).join(',');
      const rows = allRows.map((row) => {
        const values = [`"${row.title}"`, `"${row.url}"`, `"${row.owner}"`, `${row.score}`, `${row.level === '' ? '' : levelText(row.level, riskStrings)}`];
        if (settings.csvIncludeReasons) values.push(`"${row.reasons.join('; ')}"`);
        if (settings.csvIncludeUnknown) values.push(`"${row.unknown.join('; ')}"`);
        return values.join(',');
      });
      csv = [header, ...rows].join('\n');
    } else {
      csv = toCsv(sites, settings, riskStrings);
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = settings.csvFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportSettings = (): void => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'copilot-oversharing-readiness-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (file: File | undefined): void => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = validateRiskSettingsImport(JSON.parse(String(reader.result)));
        if (!parsed || Object.keys(parsed).length === 0) {
          setSettingsStatus(s.SettingsImportFailed);
          return;
        }
        setSettingsOverride(parsed);
        setSettingsStatus(s.SettingsImported);
      } catch {
        setSettingsStatus(s.SettingsImportFailed);
      }
    };
    reader.readAsText(file);
  };

  const resetSettings = (): void => {
    setSettingsOverride(undefined);
    setSettingsStatus(s.SettingsResetDone);
  };

  const columns: IColumn[] = [
    { key: 'site', name: s.ColumnSite, fieldName: 'title', minWidth: 180, isResizable: true, onRender: (row: IRow) => <Link href={row.url} target="_blank" rel="noreferrer">{row.title}</Link> },
    { key: 'owner', name: s.ColumnOwner, fieldName: 'owner', minWidth: 140, isResizable: true, onRender: (row: IRow) => <span>{row.owner}{row.ownerFlag !== '' ? ` (${row.ownerFlag})` : ''}</span> },
    {
      key: 'risk', name: s.ColumnRisk, fieldName: 'level', minWidth: 130, isResizable: true,
      onRender: (row: IRow) => {
        if (row.level === '') return <span />;
        const pill = riskPill(row.level);
        const theme = getTheme();
        return (
          <span style={{ backgroundColor: theme.palette.neutralLight, borderRadius: 12, padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon iconName={pill.icon} style={{ color: pill.color }} />
            <span>{row.score === '' ? levelText(row.level, riskStrings) : `${row.score} (${levelText(row.level, riskStrings)})`}</span>
          </span>
        );
      }
    },
    { key: 'reasons', name: s.ColumnReasons, fieldName: 'reasons', minWidth: 220, isResizable: true, onRender: (row: IRow) => <span>{row.reasons.join(', ') || s.NoRiskSignals}</span> },
    ...(settings.showUnknownColumn ? [{ key: 'unknown', name: s.ColumnUnknown, fieldName: 'unknown', minWidth: 160, isResizable: true, onRender: (row: IRow) => <span>{row.unknown.join(', ')}</span> } as IColumn] : []),
    {
      key: 'attestation', name: s.ColumnOwnerAttestation, fieldName: 'attestation', minWidth: 180, isResizable: true,
      onRender: (row: IRow) => (
        <Dropdown
          ariaLabel={format(s.AttestationFor, row.title)}
          options={attestationOptions}
          selectedKey={row.attestation}
          onChange={(_e, option) => {
            const status = option ? String(option.key) : '';
            if (isLive) {
              const site = liveSites.filter((s2) => s2.webUrl === row.url)[0];
              if (site) onLiveAttestation(site, status);
            } else {
              setAttested({ ...attested, [row.url]: status });
            }
          }}
        />
      )
    }
  ];

  return (
    <section className={styles.copilotOversharingReadiness}>
      <Stack tokens={{ childrenGap: 12 }}>
        <Text variant="xLarge">{s.WebPartTitle}</Text>
        <MessageBar messageBarType={MessageBarType.info}>
          {s.BannerSampleScore}
        </MessageBar>
        {isLive && (
          <MessageBar messageBarType={MessageBarType.warning}>
            {s.BannerLiveAccess}
          </MessageBar>
        )}
        {!isLive && (
          <Text variant="medium">
            {format(s.MockReviewFor, props.userDisplayName)}
          </Text>
        )}
        <Text variant="small">{props.environmentMessage}</Text>
        {isLive && liveLoading && <Spinner size={SpinnerSize.medium} label={s.LoadingSites} />}
        {isLive && liveError !== '' && <MessageBar messageBarType={MessageBarType.error}>{liveError}</MessageBar>}
        {isLive && liveStatus !== '' && <MessageBar messageBarType={MessageBarType.info}>{liveStatus}</MessageBar>}
        {isLive && liveRiskStatus !== '' && <MessageBar messageBarType={MessageBarType.info}>{liveRiskStatus}</MessageBar>}
        {isLive && props.hostWebUrl && <Text variant="small">{format(s.AttestationsStoredOn, props.hostWebUrl)}</Text>}
        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
          <Dropdown ariaLabel={s.RiskFilterLabel} options={filterOptions} selectedKey={filter} onChange={(_e, option) => setFilter(option ? String(option.key) : 'All')} />
          <SearchBox ariaLabel={s.SearchSiteLabel} placeholder={s.SearchSiteLabel} value={search} onChange={(_e, value) => setSearch(value || '')} />
          <PrimaryButton text={s.ExportCsvForAudit} onClick={exportCsv} />
          <DefaultButton text={s.ExportSettings} onClick={exportSettings} />
          <DefaultButton text={s.ImportSettings} onClick={() => importInputRef.current?.click()} />
          <DefaultButton text={s.ResetSettings} onClick={resetSettings} disabled={!settingsOverride} />
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={(e) => { importSettings(e.target.files ? e.target.files[0] : undefined); e.target.value = ''; }}
          />
          {visibleRows.length !== allRows.length && <DefaultButton text={s.ClearFilters} onClick={() => { setFilter('All'); setSearch(''); }} />}
        </Stack>
        {settingsStatus !== '' && <Text variant="small">{settingsStatus}</Text>}
        <Text variant="small">{format(s.ShowingSites, visibleRows.length, allRows.length)}</Text>
        {visibleRows.length === 0 && !liveLoading && (
          <MessageBar messageBarType={MessageBarType.info}>{s.NoSitesMatchFilter}</MessageBar>
        )}
        <DetailsList
          items={visibleRows}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          getKey={(row: IRow) => row.key}
        />
      </Stack>
    </section>
  );
};

export default CopilotOversharingReadiness;
