import * as React from 'react';
import {
  Badge,
  Button,
  Link,
  MessageBar,
  MessageBarBody,
  ProgressBar,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  makeStyles,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { parseCsv } from '../../services/util/csv';
import { resolveTemplateFields } from '../../services/util/resolveTemplateFields';
import { newGuid } from '../../services/util/guid';
import { useServices } from '../../contexts/ServicesContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useActiveTemplates, useLicenseOptions, useVerifiedDomains } from '../../hooks/useReferenceData';
import { QK_JOBS } from '../../constants/queryKeys';
import type { IAccessGrants, ILicenseSelection, IOnboardingPayload, ITemplateListItem } from '../../models';
import { EMPTY_ACCESS_GRANTS } from '../../models';
import { formatString } from '../Shared/format';
import { useAppToast } from '../Shared/AppToaster';

const REQUIRED_COLUMNS: string[] = [
  'firstName',
  'lastName',
  'employeeId',
  'jobTitle',
  'department',
  'hireDate',
  'usageLocation',
  'domain'
];
const ALL_COLUMNS: string[] = [
  ...REQUIRED_COLUMNS,
  'licenses',
  'mobilePhone',
  'personalEmail',
  'template'
];
const ISO_DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;
const ISO_COUNTRY: RegExp = /^[A-Z]{2}$/;
const EMAIL_RE: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    maxWidth: '960px'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS
  },
  tableWrap: {
    overflowX: 'auto',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium
  },
  problems: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteRedForeground1
  },
  secondary: {
    color: tokens.colorNeutralForeground3
  },
  hiddenInput: {
    display: 'none'
  }
});

interface IBulkRow {
  index: number;
  data: Record<string, string>;
  errors: string[];
  upn?: string;
  mailNickname?: string;
  licenseSelections: ILicenseSelection[];
}

type BulkPhase = 'idle' | 'parsed' | 'validating' | 'validated' | 'submitting';

export interface IBulkImportProps {
  onSubmitted: () => void;
}

export const BulkImport: React.FC<IBulkImportProps> = ({ onSubmitted }) => {
  const styles = useStyles();
  const services = useServices();
  const { requireApproval, bulkRowLimit } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const licenses = useLicenseOptions();
  const domains = useVerifiedDomains();
  const templates = useActiveTemplates();

  const [phase, setPhase] = React.useState<BulkPhase>('idle');
  const [fileName, setFileName] = React.useState<string>('');
  const [rows, setRows] = React.useState<IBulkRow[]>([]);
  const [fileError, setFileError] = React.useState<string | undefined>(undefined);
  const [progress, setProgress] = React.useState<number>(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = (): void => {
    setPhase('idle');
    setFileName('');
    setRows([]);
    setFileError(undefined);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = (): void => {
    const example: string =
      ALL_COLUMNS.join(',') +
      '\nAnna,Svensson,E12345,Consultant,Consulting,2026-08-01,SE,contoso.com,ENTERPRISEPACK,,anna@example.com,';
    const blob: Blob = new Blob([example], { type: 'text/csv;charset=utf-8' });
    const url: string = URL.createObjectURL(blob);
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = url;
    anchor.download = 'user-import-template.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const onFileChosen = async (file: File): Promise<void> => {
    setFileError(undefined);
    setRows([]);
    setFileName(file.name);
    const text: string = await file.text();
    const parsed: string[][] = parseCsv(text);
    if (parsed.length < 2) {
      setFileError(strings.BulkNoDataRows);
      setPhase('idle');
      return;
    }
    const header: string[] = parsed[0].map((h) => h.trim());
    const missing: string[] = REQUIRED_COLUMNS.filter((c) => header.indexOf(c) === -1);
    if (missing.length > 0) {
      setFileError(formatString(strings.BulkMissingColumns, missing.join(', ')));
      setPhase('idle');
      return;
    }
    const dataRows: string[][] = parsed.slice(1);
    if (dataRows.length > bulkRowLimit) {
      setFileError(formatString(strings.BulkTooManyRows, String(bulkRowLimit)));
      setPhase('idle');
      return;
    }
    const columnIndex: Map<string, number> = new Map(header.map((h, i) => [h, i]));
    setRows(
      dataRows.map((cells, i) => {
        const data: Record<string, string> = {};
        for (const column of ALL_COLUMNS) {
          const idx: number | undefined = columnIndex.get(column);
          data[column] = idx === undefined ? '' : (cells[idx] ?? '').trim();
        }
        return { index: i + 1, data, errors: [], licenseSelections: [] };
      })
    );
    setPhase('parsed');
  };

  const localErrors = (
    row: IBulkRow,
    seenEmployeeIds: Set<string>,
    domainIds: Set<string>,
    skuByPartNumber: Map<string, string>,
    skuDisplayName: Map<string, string>,
    templateTitles: Set<string>
  ): { errors: string[]; selections: ILicenseSelection[] } => {
    const errors: string[] = [];
    const d = row.data;
    for (const column of REQUIRED_COLUMNS) {
      if (!d[column]) {
        errors.push(`${column}: ${strings.ValidationRequired}`);
      }
    }
    if (d.hireDate && !ISO_DATE.test(d.hireDate)) {
      errors.push(`hireDate: ${strings.ValidationInvalidDate}`);
    }
    if (d.usageLocation && !ISO_COUNTRY.test(d.usageLocation)) {
      errors.push(`usageLocation: ${strings.ValidationInvalidCountry}`);
    }
    if (d.employeeId && d.employeeId.length > 16) {
      errors.push(`employeeId: ${strings.ValidationTooLong}`);
    }
    if (d.employeeId) {
      if (seenEmployeeIds.has(d.employeeId)) {
        errors.push(strings.BulkErrDuplicateInFile);
      }
      seenEmployeeIds.add(d.employeeId);
    }
    if (d.domain && !domainIds.has(d.domain.toLowerCase())) {
      errors.push(strings.BulkErrUnknownDomain);
    }
    if (d.personalEmail && !EMAIL_RE.test(d.personalEmail)) {
      errors.push(`personalEmail: ${strings.ValidationInvalidEmail}`);
    }
    if (d.template && !templateTitles.has(d.template)) {
      errors.push(formatString(strings.BulkErrUnknownTemplate, d.template));
    }
    const selections: ILicenseSelection[] = [];
    if (d.licenses) {
      for (const part of d.licenses.split(';').map((p) => p.trim()).filter((p) => !!p)) {
        const skuId: string | undefined = skuByPartNumber.get(part);
        if (!skuId) {
          errors.push(formatString(strings.BulkErrUnknownLicense, part));
        } else {
          selections.push({ skuId, skuPartNumber: part, displayName: skuDisplayName.get(part) });
        }
      }
    }
    return { errors, selections };
  };

  const validate = async (): Promise<void> => {
    setPhase('validating');
    setProgress(0);
    const domainIds: Set<string> = new Set((domains.data ?? []).map((d) => d.id.toLowerCase()));
    const skuByPartNumber: Map<string, string> = new Map(
      (licenses.data ?? []).map((o) => [o.skuPartNumber, o.skuId])
    );
    const skuDisplayName: Map<string, string> = new Map(
      (licenses.data ?? []).map((o) => [o.skuPartNumber, o.displayName])
    );
    const templateTitles: Set<string> = new Set((templates.data ?? []).map((t) => t.title));
    const seenEmployeeIds: Set<string> = new Set();
    const seenUpns: Set<string> = new Set();
    const next: IBulkRow[] = rows.map((r) => ({ ...r, errors: [], upn: undefined }));

    const CONCURRENCY: number = 5;
    let done: number = 0;

    const queue: Array<{ row: IBulkRow }> = next.map((row) => ({ row }));

    const worker = async (): Promise<void> => {
      while (queue.length > 0) {
        const entry: { row: IBulkRow } | undefined = queue.shift();
        if (!entry) {
          return;
        }
        const row: IBulkRow = entry.row;
        const local = localErrors(
          row,
          seenEmployeeIds,
          domainIds,
          skuByPartNumber,
          skuDisplayName,
          templateTitles
        );
        row.errors = local.errors;
        row.licenseSelections = local.selections;
        if (row.errors.length === 0) {
          try {
            const taken: boolean = await services.users.isEmployeeIdTaken(row.data.employeeId);
            if (taken) {
              row.errors.push(strings.EmployeeIdDuplicate);
            } else {
              const naming = await services.naming.resolve(
                row.data.firstName,
                row.data.lastName,
                row.data.domain
              );
              if (!naming.chosen) {
                row.errors.push(strings.BulkErrNoUpn);
              } else {
                const upn: string = `${naming.chosen}@${row.data.domain}`;

                if (seenUpns.has(upn.toLowerCase())) {
                  row.errors.push(strings.BulkErrDuplicateUpn);
                } else {
                  seenUpns.add(upn.toLowerCase());
                  row.upn = upn;
                  row.mailNickname = naming.chosen;
                }
              }
            }
          } catch {
            row.errors.push(strings.ErrorGenericTitle);
          }
        }
        setProgress(++done);
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setRows(next);
    setPhase('validated');
  };

  const readyRows: IBulkRow[] = rows.filter((r) => r.errors.length === 0 && !!r.upn);

  const submit = async (): Promise<void> => {
    setPhase('submitting');
    let created: number = 0;
    let failed: number = 0;
    const batchId: string = newGuid();

    const submittedRowIndices: Set<number> = new Set();
    const templateByTitle: Map<string, ITemplateListItem> = new Map(
      (templates.data ?? []).map((t) => [t.title, t])
    );
    try {
      for (let i = 0; i < readyRows.length; i++) {
        if (submittedRowIndices.has(i)) {
          continue;
        }
        const row = readyRows[i];
        const d = row.data;

        const matchedTemplate: ITemplateListItem | undefined = d.template
          ? templateByTitle.get(d.template)
          : undefined;
        const resolvedTemplate = matchedTemplate
          ? resolveTemplateFields(matchedTemplate.template, licenses.data ?? [])
          : undefined;
        const access: IAccessGrants = resolvedTemplate?.access ?? EMPTY_ACCESS_GRANTS;
        const expirationReviewDays: number | null = resolvedTemplate?.expirationReviewDays ?? null;
        const payload: IOnboardingPayload = {
          schemaVersion: 1,
          kind: 'onboard',
          personal: {
            firstName: d.firstName,
            lastName: d.lastName,
            displayName: `${d.firstName} ${d.lastName}`,
            employeeId: d.employeeId,
            mobilePhone: d.mobilePhone || undefined,
            personalEmail: d.personalEmail || undefined
          },
          employment: {
            jobTitle: d.jobTitle,
            department: d.department,
            employeeType: 'Employee',
            hireDate: d.hireDate
          },
          identity: {
            userPrincipalName: row.upn as string,
            mailNickname: row.mailNickname as string,
            domain: d.domain,
            accountType: 'member'
          },
          accountSettings: {
            usageLocation: d.usageLocation,
            accountEnabled: true,
            credentialMode: 'tap',
            forceChangePassword: true
          },
          licenses: row.licenseSelections,
          access,
          expirationReviewDays,
          approverGroupId: matchedTemplate?.template.approverGroupId ?? null
        };
        try {
          await services.engine.createJob({
            jobType: 'Onboard',
            payload,
            steps: services.engine.buildInitialSteps('Onboard'),
            scheduledFor: null,
            batchId,
            initialStatus: requireApproval ? 'PendingApproval' : 'Approved'
          });
          submittedRowIndices.add(i);
          created++;
        } catch {
          failed++;

        }
      }
      await queryClient.invalidateQueries(QK_JOBS);
      if (failed === 0) {
        toast(formatString(strings.BulkSubmittedToast, String(created)));
        reset();
        onSubmitted();
      } else {

        setFileError(
          `${formatString(strings.BulkSubmittedToast, String(created))} — ${failed} failed.`
        );
        setPhase('validated');
      }
    } catch {
      setFileError(strings.SubmitFailure);
      setPhase('validated');
    }
  };

  const busy: boolean = phase === 'validating' || phase === 'submitting';

  return (
    <div className={styles.root}>
      <Subtitle2 as="h3" block>
        {strings.BulkTitle}
      </Subtitle2>
      <Text>{requireApproval ? strings.BulkIntro : strings.BulkIntroNoApproval}</Text>
      <Link onClick={downloadTemplate}>{strings.BulkDownloadTemplate}</Link>
      <div className={styles.actions}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className={styles.hiddenInput}
          onChange={(ev) => {
            const file: File | undefined = ev.target.files?.[0];
            if (file) {
              void onFileChosen(file);
            }
          }}
        />
        <Button appearance="secondary" disabled={busy} onClick={() => fileInputRef.current?.click()}>
          {strings.BulkChooseFile}
        </Button>
        {fileName ? <Text className={styles.secondary}>{fileName}</Text> : undefined}
        {phase === 'parsed' || phase === 'validated' ? (
          <Button
            appearance="primary"
            disabled={busy || rows.length === 0}
            onClick={() => {
              void validate();
            }}
          >
            {strings.BulkValidateLabel}
          </Button>
        ) : undefined}
        {phase === 'validated' && readyRows.length > 0 ? (
          <Button
            appearance="primary"
            onClick={() => {
              void submit();
            }}
          >
            {formatString(strings.BulkSubmitLabel, String(readyRows.length))}
          </Button>
        ) : undefined}
        {rows.length > 0 && !busy ? (
          <Button appearance="subtle" onClick={reset}>
            {strings.StartOverLabel}
          </Button>
        ) : undefined}
      </div>
      {phase === 'validating' ? (
        <div role="status" aria-live="polite">
          <Text size={200} block>
            {formatString(strings.BulkValidatingLabel, String(progress), String(rows.length))}
          </Text>
          <ProgressBar value={rows.length === 0 ? 0 : progress / rows.length} />
        </div>
      ) : undefined}
      {phase === 'validated' ? (
        <MessageBar intent={readyRows.length === rows.length ? 'success' : 'warning'}>
          <MessageBarBody>
            {formatString(
              strings.BulkReadySummary,
              String(readyRows.length),
              String(rows.length)
            )}
          </MessageBarBody>
        </MessageBar>
      ) : undefined}
      {fileError ? (
        <MessageBar intent="error">
          <MessageBarBody>{fileError}</MessageBarBody>
        </MessageBar>
      ) : undefined}
      {rows.length > 0 ? (
        <div className={styles.tableWrap}>
          <Table size="small" aria-label={strings.BulkTitle}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>{strings.BulkColumnRow}</TableHeaderCell>
                <TableHeaderCell>{strings.JobColumnStatus}</TableHeaderCell>
                <TableHeaderCell>{strings.DisplayNameLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.EmployeeIdLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.DepartmentLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.UpnLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.BulkColumnProblems}</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.index}>
                  <TableCell>{row.index}</TableCell>
                  <TableCell>
                    {phase === 'parsed' ? (
                      <Badge appearance="tint" color="subtle">
                        {strings.StepStatusPending}
                      </Badge>
                    ) : row.errors.length === 0 && row.upn ? (
                      <Badge appearance="tint" color="success">
                        {strings.BulkRowReady}
                      </Badge>
                    ) : row.errors.length > 0 ? (
                      <Badge appearance="tint" color="danger">
                        {strings.BulkRowError}
                      </Badge>
                    ) : (
                      <Badge appearance="tint" color="subtle">
                        {strings.StepStatusPending}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.data.firstName} {row.data.lastName}
                  </TableCell>
                  <TableCell>{row.data.employeeId}</TableCell>
                  <TableCell>{row.data.department}</TableCell>
                  <TableCell>{row.upn ?? ''}</TableCell>
                  <TableCell>
                    {row.errors.length > 0 ? (
                      <span className={styles.problems}>{row.errors.join('; ')}</span>
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : undefined}
    </div>
  );
};
