import * as React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Dropdown,
  Field,
  MessageBar,
  MessageBarBody,
  Option,
  Spinner,
  Text,
  Textarea
} from '@fluentui/react-components';
import { DismissRegular, PersonAddRegular } from '@fluentui/react-icons';
import * as XLSX from 'xlsx';
import { PeoplePicker } from '../../../../common/components';

import { EMAIL_REGEX, ADD_USERS_DIALOG_STRINGS } from './constants';
import {
  extractColumnValues,
  parseCsvRows,
  parseWorksheetRows,
  principalToEmail,
  toUniqueEmails,
  validateEmails
} from './utils';
import type { IAddUsersDialogProps, IAddUsersDialogState } from './types';
import { getErrorMessage } from '../../../../common/utils/errorUtils';
import styles from './GroupUsersPanel.module.scss';

export const AddUsersDialog: React.FC<IAddUsersDialogProps> = ({
  open,
  group,
  spService,
  onClose,
  onAdded
}) => {
  const [state, setState] = React.useState<IAddUsersDialogState>({
    selectedPeople: [],
    importedEmails: [],
    invalidEmails: [],
    importRows: [],
    importColumnOptions: [],
    selectedImportColumnKey: '0',
    sendEmail: false,
    emailMessage: '',
    isSubmitting: false,
    feedback: ''
  });

  React.useEffect(() => {
    if (!open) return;
    setState({
      selectedPeople: [],
      importedEmails: [],
      invalidEmails: [],
      importRows: [],
      importColumnOptions: [],
      selectedImportColumnKey: '0',
      sendEmail: false,
      emailMessage: '',
      isSubmitting: false,
      feedback: ''
    });
  }, [open]);

  const pickerEmails = React.useMemo(
    () => state.selectedPeople.map(principalToEmail).filter(Boolean),
    [state.selectedPeople]
  );

  const candidateEmails = React.useMemo(
    () => toUniqueEmails([...pickerEmails, ...state.importedEmails]),
    [state.importedEmails, pickerEmails]
  );

  const validCandidateEmails = React.useMemo(
    () => candidateEmails.filter((email) => EMAIL_REGEX.test(email)),
    [candidateEmails]
  );

  const applyImportedColumn = React.useCallback((rows: string[][], columnIndex: number): void => {
    const importedValues = extractColumnValues(rows, columnIndex);
    const result = validateEmails(importedValues);
    setState(prev => ({ ...prev, importedEmails: result.validEmails, invalidEmails: result.invalidEmails }));
  }, []);

  const handleFileRead = React.useCallback(async (file: File): Promise<void> => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    let rows: string[][] = [];

    if (extension === 'csv') {
      rows = parseCsvRows(await file.text());
    } else {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];

      if (firstSheet) {
        rows = parseWorksheetRows(firstSheet);
      }
    }

    if (rows.length === 0) {
      setState(prev => ({
        ...prev,
        importRows: [],
        importColumnOptions: [],
        selectedImportColumnKey: '0',
        importedEmails: [],
        invalidEmails: []
      }));
      return;
    }

    const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
    const columnOptions = Array.from({ length: maxColumns }, (_, index) => {
      const headerCandidate = (rows[0]?.[index] ?? '').trim();
      const label = headerCandidate
        ? `Column ${index + 1} (${headerCandidate})`
        : `Column ${index + 1}`;

      return { key: index.toString(), label };
    });

    setState(prev => ({
      ...prev,
      importRows: rows,
      importColumnOptions: columnOptions,
      selectedImportColumnKey: '0',
      feedback: ''
    }));

    applyImportedColumn(rows, 0);
  }, [applyImportedColumn]);

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputElement = event.currentTarget;
      const file = inputElement.files?.[0];

      if (!file) return;

      handleFileRead(file)
        .then(() => { inputElement.value = ''; })
        .catch(() => { setState(prev => ({ ...prev, feedback: ADD_USERS_DIALOG_STRINGS.FAILED_PARSE_FILE })); });
    },
    [handleFileRead]
  );

  const handleAddUsers = React.useCallback(async (): Promise<void> => {
    if (validCandidateEmails.length === 0) return;

    setState(prev => ({ ...prev, isSubmitting: true, feedback: '' }));

    try {
      const subject = `Added to SharePoint group: ${group.Title}`;
      const defaultBody = `You have been added to the SharePoint group "${group.Title}".`;
      const body = state.emailMessage.trim()
        ? `${defaultBody}\n\n${state.emailMessage.trim()}`
        : defaultBody;

      const bulkResult = await spService.bulkAddUsersToGroup(
        group.Id,
        validCandidateEmails.map((email) => ({ email, displayName: email })),
        undefined,
        {
          sendEmail: state.sendEmail,
          emailSubject: subject,
          emailBody: body
        }
      );

      if (bulkResult.failed > 0 && bulkResult.added === 0) {
        setState(prev => ({ ...prev, feedback: bulkResult.errors.map((error) => `${error.email}: ${error.error}`).join(' | ') }));
        return;
      }

      onAdded();
      onClose();
    } catch (error) {
      setState(prev => ({ ...prev, feedback: getErrorMessage(error) }));
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [state.emailMessage, state.sendEmail, group.Id, group.Title, onAdded, onClose, spService, validCandidateEmails]);

  const handleAddUsersClick = React.useCallback((): void => {
    handleAddUsers().catch(() => { setState(prev => ({ ...prev, feedback: 'Failed to add users to the group.' })); });
  }, [handleAddUsers]);

  const selectedImportColumnLabel = React.useMemo(
    () => state.importColumnOptions.find((option) => option.key === state.selectedImportColumnKey)?.label ?? '',
    [state.importColumnOptions, state.selectedImportColumnKey]
  );

  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={onClose}
                disabled={state.isSubmitting}
              />
            }
          >
            Add Users to {group.Title}
          </DialogTitle>
          <DialogContent>
            {state.feedback && (
              <MessageBar intent="error" className={styles.section}>
                <MessageBarBody>{state.feedback}</MessageBarBody>
              </MessageBar>
            )}

            <div className={styles.section}>
              <PeoplePicker
                spService={spService}
                label="Select users"
                placeholder="Search users"
                mode="multiple"
                allowUsers
                allowGroups={true}
                selectedItems={state.selectedPeople}
                onSelectionChange={(items) => setState(prev => ({ ...prev, selectedPeople: items }))}
              />
            </div>

            <div className={styles.section}>
              <Field label="Import users from CSV or Excel (.csv, .xlsx, .xls)">
                <input
                  className={styles.fileInput}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
              </Field>

              {state.importColumnOptions.length > 0 && (
                <Field label="Select source column for user emails" className={styles.inlineField}>
                  <Dropdown
                    selectedOptions={[state.selectedImportColumnKey]}
                    value={selectedImportColumnLabel}
                    onOptionSelect={(_event, data) => {
                      const selectedKey = data.optionValue ?? '0';
                      const selectedColumnIndex = Number.parseInt(selectedKey, 10);
                      setState(prev => ({ ...prev, selectedImportColumnKey: selectedKey }));

                      if (!Number.isNaN(selectedColumnIndex)) {
                        applyImportedColumn(state.importRows, selectedColumnIndex);
                      }
                    }}
                  >
                    {state.importColumnOptions.map((option) => (
                      <Option key={option.key} value={option.key}>{option.label}</Option>
                    ))}
                  </Dropdown>
                </Field>
              )}

              {state.importedEmails.length > 0 && (
                <Text className={styles.fileMeta}>
                  {state.importedEmails.length} valid email(s) detected in {selectedImportColumnLabel || 'selected column'} and ready to add.
                </Text>
              )}

              {state.invalidEmails.length > 0 && (
                <Text className={styles.invalidList}>
                  {state.invalidEmails.length} row(s) ignored because email is invalid or missing.
                </Text>
              )}
            </div>

            <div className={styles.section}>
              <Checkbox
                id="add-users-send-email"
                checked={state.sendEmail}
                onChange={(_event, data) => setState(prev => ({ ...prev, sendEmail: Boolean(data.checked) }))}
                label="Send welcome email to added users"
              />

              {state.sendEmail && (
                <Field label="Email message" className={styles.inlineField}>
                  <Textarea
                    resize="vertical"
                    rows={4}
                    value={state.emailMessage}
                    onChange={(_event, data) => setState(prev => ({ ...prev, emailMessage: data.value }))}
                    placeholder="Optional additional message"
                  />
                </Field>
              )}
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              appearance="secondary"
              icon={<DismissRegular />}
              onClick={onClose}
              disabled={state.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              icon={state.isSubmitting ? <Spinner size="tiny" /> : <PersonAddRegular />}
              onClick={handleAddUsersClick}
              disabled={state.isSubmitting || validCandidateEmails.length === 0}
            >
              {state.isSubmitting ? 'Adding…' : `Add Users (${validCandidateEmails.length})`}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
