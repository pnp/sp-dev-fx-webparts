import * as React from 'react';
import {
  Button,
  Caption1,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  OverlayDrawer,
  Radio,
  RadioGroup,
  Switch,
  Tooltip
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { ConflictMode } from '../../../models/OperationalTypes';
import { conflictModeDescription, conflictModeLabel } from './localization';
import { usePortalMountNode } from './portalMount';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface SettingsDrawerProps {
  readonly isOpen: boolean;
  readonly publishOnComplete: boolean;
  readonly conflictMode: ConflictMode;
  readonly disabled: boolean;
  readonly onPublishChange: (value: boolean) => void;
  readonly onConflictModeChange: (value: ConflictMode) => void;
  readonly onDismiss: () => void;
}

const conflictModes: ReadonlyArray<ConflictMode> = ['Rename', 'Replace', 'Skip', 'Fail'];

export const SettingsDrawer: React.FC<SettingsDrawerProps> = (props) => {
  const styles = useAppStyles();
  const mountNode = usePortalMountNode();

  return (
    <OverlayDrawer
      mountNode={mountNode}
      unmountOnClose
      open={props.isOpen}
      onOpenChange={(_, data) => {
        if (!data.open) {
          props.onDismiss();
        }
      }}
      position="end"
      size="small"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Tooltip content={strings.CloseLabel} relationship="label" withArrow>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                onClick={props.onDismiss}
                aria-label={strings.CloseLabel}
              />
            </Tooltip>
          }
        >
          {strings.SettingsPanelTitle}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={styles.drawerBody}>
          <Field hint={strings.SettingsPublishHint}>
            <Switch
              checked={props.publishOnComplete}
              disabled={props.disabled}
              label={strings.SettingsPublishLabel}
              onChange={(_, data) => props.onPublishChange(data.checked)}
            />
          </Field>

          <Field label={strings.SettingsConflictLabel} hint={strings.SettingsConflictHint}>
            <RadioGroup
              value={props.conflictMode}
              disabled={props.disabled}
              onChange={(_, data) => props.onConflictModeChange(data.value as ConflictMode)}
            >
              {conflictModes.map((mode) => (
                <Radio
                  key={mode}
                  value={mode}
                  label={{
                    children: (
                      <div className={styles.optionText}>
                        <span>{conflictModeLabel(mode)}</span>
                        <Caption1>{conflictModeDescription(mode)}</Caption1>
                      </div>
                    )
                  }}
                />
              ))}
            </RadioGroup>
          </Field>
        </div>
      </DrawerBody>
    </OverlayDrawer>
  );
};
