import * as React from 'react';
import {
  Button,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  SpinButton,
  Subtitle2,
  Switch,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useAppSettingsQuery } from '../../contexts/SettingsContext';
import { QK_SETTINGS } from '../../constants/queryKeys';
import { DEFAULT_APP_SETTINGS, type IAppSettings } from '../../models';
import { useAppToast } from '../Shared/AppToaster';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL,
    maxWidth: '600px'
  },
  hint: {
    color: tokens.colorNeutralForeground3
  },
  numberField: {
    maxWidth: '240px'
  },
  textField: {
    maxWidth: '420px'
  },
  actions: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2
  }
});

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (isNaN(value)) {
    return fallback;
  }
  return Math.min(Math.max(Math.round(value), min), max);
}

export const SettingsPanel: React.FC = () => {
  const styles = useStyles();
  const services = useServices();
  const queryClient = useQueryClient();
  const toast = useAppToast();
  const query = useAppSettingsQuery();

  const persisted: IAppSettings = React.useMemo(
    () => ({ ...DEFAULT_APP_SETTINGS, ...(query.data ?? {}) }),
    [query.data]
  );
  const [draft, setDraft] = React.useState<IAppSettings>(persisted);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [saveError, setSaveError] = React.useState<boolean>(false);

  const userEditing = React.useRef(false);

  React.useEffect(() => {
    if (!userEditing.current) {
      setDraft(persisted);
    }
  }, [persisted]);

  const dirty: boolean = JSON.stringify(draft) !== JSON.stringify(persisted);

  const updateDraft = React.useCallback((next: IAppSettings): void => {
    userEditing.current = true;
    setDraft(next);
  }, []);

  const save = async (): Promise<void> => {
    setSaving(true);
    setSaveError(false);
    try {
      await services.engine.saveAppSettings(draft);
      await queryClient.invalidateQueries(QK_SETTINGS);
      toast(strings.SettingsSavedToast);
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.root}>
      <Subtitle2 as="h3" block>
        {strings.SettingsTitle}
      </Subtitle2>
      <Text className={styles.hint}>{strings.SettingsIntro}</Text>

      {query.error ? (
        <MessageBar intent="error" layout="multiline">
          <MessageBarBody>{strings.SettingsLoadError}</MessageBarBody>
        </MessageBar>
      ) : undefined}

      <div>
        <Switch
          label={strings.SettingsRequireApprovalLabel}
          checked={draft.requireApproval}
          onChange={(_, data) => updateDraft({ ...draft, requireApproval: data.checked })}
        />
        <Text size={200} block className={styles.hint}>
          {strings.SettingsRequireApprovalHint}
        </Text>
      </div>

      <Field label={strings.SettingsRequiredApprovalsLabel} className={styles.numberField} hint={strings.SettingsRequiredApprovalsHint}>
        <SpinButton
          value={draft.requiredApprovals}
          min={1}
          max={10}
          disabled={!draft.requireApproval}
          onChange={(_, data) =>
            updateDraft({
              ...draft,
              requiredApprovals: clamp(data.value ?? parseInt(data.displayValue ?? '', 10), 1, 10, persisted.requiredApprovals)
            })
          }
        />
      </Field>

      <Field label={strings.SettingsBulkLimitLabel} className={styles.numberField}>
        <SpinButton
          value={draft.bulkRowLimit}
          min={1}
          max={500}
          onChange={(_, data) =>
            updateDraft({
              ...draft,
              bulkRowLimit: clamp(
                data.value ?? parseInt(data.displayValue ?? '', 10),
                1,
                500,
                persisted.bulkRowLimit
              )
            })
          }
        />
      </Field>

      <Field label={strings.SettingsRefreshLabel} className={styles.numberField}>
        <SpinButton
          value={draft.jobsRefreshSeconds}
          min={10}
          max={300}
          step={5}
          onChange={(_, data) =>
            updateDraft({
              ...draft,
              jobsRefreshSeconds: clamp(
                data.value ?? parseInt(data.displayValue ?? '', 10),
                10,
                300,
                persisted.jobsRefreshSeconds
              )
            })
          }
        />
      </Field>

      <Field
        label={strings.SettingsApprovalNotifyLabel}
        hint={strings.SettingsApprovalNotifyHint}
        className={styles.textField}
      >
        <Input
          type="email"
          value={draft.approvalNotifyUpn}
          placeholder="provisioning-approvers@contoso.com"
          onChange={(_, data) => updateDraft({ ...draft, approvalNotifyUpn: data.value })}
        />
      </Field>

      {saveError ? (
        <MessageBar intent="error">
          <MessageBarBody>{strings.SettingsSaveFailed}</MessageBarBody>
        </MessageBar>
      ) : undefined}

      <div className={styles.actions}>
        <Button
          appearance="primary"
          disabled={!dirty || saving || !!query.error}
          onClick={() => {
            void save();
          }}
        >
          {strings.SaveLabel}
        </Button>
        <Button appearance="secondary" disabled={!dirty || saving} onClick={() => setDraft(persisted)}>
          {strings.CancelLabel}
        </Button>
      </div>
    </div>
  );
};
