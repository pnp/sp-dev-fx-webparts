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
import { newGuid } from '../../services/util/guid';
import { useServices } from '../../contexts/ServicesContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useLicenseOptions } from '../../hooks/useReferenceData';
import { QK_JOBS } from '../../constants/queryKeys';
import type { ILicenseSelection, ITransferPayload } from '../../models';
import { formatString } from '../Shared/format';
import { useAppToast } from '../Shared/AppToaster';

const REQUIRED_COLUMNS: string[] = ['userPrincipalName'];
const ALL_COLUMNS: string[] = [
  ...REQUIRED_COLUMNS,
  'jobTitle',
  'department',
  'officeLocation',
  'managerUpn',
  'addLicenses',
  'removeLicenses'
];
const EMAIL_RE: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    maxWidth: '1100px'
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

interface IBulkTransferRow {
  index: number;
  data: Record<string, string>;
  errors: string[];
  userId?: string;
  displayName?: string;
  resolvedUpn?: string;
  managerId?: string;
  managerDisplayName?: string;
  addSkuIds?: ILicenseSelection[];
  removeSkuIds?: string[];
}

type BulkPhase = 'idle' | 'parsed' | 'validating' | 'validated' | 'submitting';

export interface IBulkTransferProps {
  onSubmitted: () => void;
}

/** Splits a semicolon-separated cell into trimmed, non-empty tokens. */
function splitList(value: string): string[] {
  return value
    .split(';')
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

export const BulkTransfer: React.FC<IBulkTransferProps> = ({ onSubmitted }) => {
  const styles = useStyles();
  const services = useServices();
  const { requireApproval, bulkRowLimit } = useSettings();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const licenseOptions = useLicenseOptions();

  const [phase, setPhase] = React.useState<BulkPhase>('idle');
  const [fileName, setFileName] = React.useState<string>('');
  const [rows, setRows] = React.useState<IBulkTransferRow[]>([]);
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
      '\nanna.svensson@contoso.com,Senior Engineer,Engineering,Stockholm,new.manager@contoso.com,SPE_E5,SPE_E3';
    const blob: Blob = new Blob([example], { type: 'text/csv;charset=utf-8' });
    const url: string = URL.createObjectURL(blob);
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = url;
    anchor.download = 'user-transfer-template.csv';
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
        return { index: i + 1, data, errors: [] };
      })
    );
    setPhase('parsed');
  };

  const localErrors = (row: IBulkTransferRow, seenUpns: Set<string>): string[] => {
    const errors: string[] = [];
    const d = row.data;
    if (!d.userPrincipalName) {
      errors.push(`userPrincipalName: ${strings.ValidationRequired}`);
    } else if (seenUpns.has(d.userPrincipalName.toLowerCase())) {
      errors.push(strings.BulkErrDuplicateUpn);
    } else {
      seenUpns.add(d.userPrincipalName.toLowerCase());
    }
    if (d.managerUpn && !EMAIL_RE.test(d.managerUpn)) {
      errors.push(`managerUpn: ${strings.ValidationInvalidEmail}`);
    }
    // A transfer that changes nothing would create a job with no work to do.
    const hasChange: boolean =
      !!d.jobTitle || !!d.department || !!d.officeLocation || !!d.managerUpn || !!d.addLicenses || !!d.removeLicenses;
    if (!hasChange) {
      errors.push(strings.BulkTransferNoChanges);
    }
    return errors;
  };

  const validate = async (): Promise<void> => {
    setPhase('validating');
    setProgress(0);
    const seenUpns: Set<string> = new Set();
    const next: IBulkTransferRow[] = rows.map((r) => ({ ...r, errors: [], userId: undefined }));
    const options = licenseOptions.data ?? [];
    const byPartNumber: Map<string, { skuId: string; skuPartNumber: string; displayName: string }> = new Map(
      options.map((o) => [
        o.skuPartNumber.toUpperCase(),
        { skuId: o.skuId, skuPartNumber: o.skuPartNumber, displayName: o.displayName }
      ])
    );

    const CONCURRENCY: number = 5;
    let done: number = 0;
    const queue: IBulkTransferRow[] = [...next];

    const worker = async (): Promise<void> => {
      for (;;) {
        const row: IBulkTransferRow | undefined = queue.shift();
        if (!row) {
          return;
        }
        row.errors = localErrors(row, seenUpns);
        if (row.errors.length === 0) {
          try {
            const hit = await services.users.getUserByUpn(row.data.userPrincipalName);
            if (!hit) {
              row.errors.push(strings.BulkErrUserNotFound);
            } else {
              row.userId = hit.id;
              row.displayName = hit.displayName;
              row.resolvedUpn = hit.userPrincipalName;
            }
          } catch {
            row.errors.push(strings.ErrorGenericTitle);
          }
        }
        if (row.errors.length === 0 && row.data.managerUpn) {
          try {
            const manager = await services.users.getUserByUpn(row.data.managerUpn);
            if (!manager) {
              row.errors.push(strings.BulkErrManagerNotFound);
            } else {
              row.managerId = manager.id;
              row.managerDisplayName = manager.displayName;
            }
          } catch {
            row.errors.push(strings.ErrorGenericTitle);
          }
        }
        if (row.errors.length === 0) {
          // License cells are SKU part numbers (SPE_E5); the payload needs ids.
          const add: ILicenseSelection[] = [];
          for (const part of splitList(row.data.addLicenses)) {
            const sku = byPartNumber.get(part.toUpperCase());
            if (!sku) {
              row.errors.push(formatString(strings.BulkErrUnknownSku, part));
            } else {
              add.push({ skuId: sku.skuId, skuPartNumber: sku.skuPartNumber, displayName: sku.displayName });
            }
          }
          const remove: string[] = [];
          for (const part of splitList(row.data.removeLicenses)) {
            const sku = byPartNumber.get(part.toUpperCase());
            if (!sku) {
              row.errors.push(formatString(strings.BulkErrUnknownSku, part));
            } else {
              remove.push(sku.skuId);
            }
          }
          row.addSkuIds = add;
          row.removeSkuIds = remove;
        }
        setProgress(++done);
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setRows(next);
    setPhase('validated');
  };

  const readyRows: IBulkTransferRow[] = rows.filter((r) => r.errors.length === 0 && !!r.userId);

  const submit = async (): Promise<void> => {
    setPhase('submitting');
    let created: number = 0;
    let failed: number = 0;
    const batchId: string = newGuid();
    try {
      for (const row of readyRows) {
        const d = row.data;
        const payload: ITransferPayload = {
          schemaVersion: 1,
          kind: 'transfer',
          target: {
            userId: row.userId as string,
            displayName: row.displayName as string,
            userPrincipalName: row.resolvedUpn as string
          },
          changes: {
            jobTitle: d.jobTitle || undefined,
            department: d.department || undefined,
            officeLocation: d.officeLocation || undefined,
            managerId: row.managerId,
            managerDisplayName: row.managerDisplayName,
            addLicenses: row.addSkuIds ?? [],
            removeLicenseSkuIds: row.removeSkuIds ?? []
          }
        };
        try {
          await services.engine.createJob({
            jobType: 'Transfer',
            payload,
            steps: services.engine.buildInitialSteps('Transfer'),
            scheduledFor: null,
            batchId,
            initialStatus: requireApproval ? 'PendingApproval' : 'Approved'
          });
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
        setFileError(`${formatString(strings.BulkSubmittedToast, String(created))} — ${failed} failed.`);
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
        {strings.BulkTransferTitle}
      </Subtitle2>
      <Text>{strings.BulkTransferIntro}</Text>
      <Link onClick={downloadTemplate}>{strings.BulkTransferTemplateLabel}</Link>
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
            disabled={busy || rows.length === 0 || licenseOptions.isLoading}
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
            {formatString(strings.BulkReadySummary, String(readyRows.length), String(rows.length))}
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
          <Table size="small" aria-label={strings.BulkTransferTitle}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>{strings.BulkColumnRow}</TableHeaderCell>
                <TableHeaderCell>{strings.JobColumnStatus}</TableHeaderCell>
                <TableHeaderCell>{strings.UpnLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.JobTitleLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.DepartmentLabel}</TableHeaderCell>
                <TableHeaderCell>{strings.ManagerLabel}</TableHeaderCell>
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
                    ) : row.errors.length === 0 && row.userId ? (
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
                  <TableCell>{row.data.userPrincipalName}</TableCell>
                  <TableCell>{row.data.jobTitle}</TableCell>
                  <TableCell>{row.data.department}</TableCell>
                  <TableCell>{row.managerDisplayName ?? row.data.managerUpn}</TableCell>
                  <TableCell>
                    {row.errors.length > 0 ? <span className={styles.problems}>{row.errors.join('; ')}</span> : ''}
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
