import * as React from 'react';
import {
  Button,
  Caption1,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip
} from '@fluentui/react-components';
import {
  ArrowClockwiseRegular,
  ArrowDownloadRegular,
  ArrowSyncRegular,
  BeakerRegular,
  CheckmarkCircleRegular,
  CloudArrowUpRegular,
  ColumnTripleRegular,
  DismissCircleRegular,
  DocumentArrowDownRegular,
  SettingsRegular
} from '@fluentui/react-icons';
import { ColumnKey } from '../../../hooks/usePageSelection';
import { formatString } from '../../../utilities/formatString';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface MigrationToolbarProps {
  readonly canLoadPages: boolean;
  readonly isBusy: boolean;
  readonly isRunning: boolean;
  readonly hasPages: boolean;
  readonly hasReport: boolean;
  readonly selectionCount: number;
  readonly visiblePageCount: number;
  readonly visibleColumns: ReadonlySet<ColumnKey>;
  readonly onLoadPages: () => void;
  readonly onRefresh: () => void;
  readonly onValidate: () => void;
  readonly onDryRun: () => void;
  readonly onMigrate: () => void;
  readonly onCancel: () => void;
  readonly onExport: (format: 'json' | 'csv') => void;
  readonly onSelectAll: () => void;
  readonly onClearSelection: () => void;
  readonly onToggleColumn: (key: ColumnKey) => void;
  readonly onOpenSettings: () => void;
  readonly failedCount: number;
  readonly onSelectFailed: () => void;
  readonly outstandingCount: number;
  readonly showSelectOutstanding: boolean;
  readonly onSelectOutstanding: () => void;
}

const columnOptions: ReadonlyArray<{ readonly key: ColumnKey; readonly label: string }> = [
  { key: 'name', label: strings.ColumnPageName },
  { key: 'authorName', label: strings.ColumnAuthor },
  { key: 'createdDateTime', label: strings.ColumnCreated },
  { key: 'lastModifiedDateTime', label: strings.ColumnModified },
  { key: 'layout', label: strings.ColumnLayout },
  { key: 'promotionState', label: strings.ColumnPromotion },
  { key: 'warningCount', label: strings.ColumnWarnings },
  { key: 'lastMigratedAt', label: strings.ColumnLastMigrated }
];

export const MigrationToolbar: React.FC<MigrationToolbarProps> = React.memo((props) => {
  const styles = useAppStyles();
  const hasSelection = props.selectionCount > 0;

  return (
    <div className={styles.statusStack}>
      <div className={styles.toolbarRow}>
        <Toolbar aria-label={strings.InventorySectionTitle} size="small">
          <ToolbarButton
            appearance="primary"
            icon={<CloudArrowUpRegular />}
            disabled={props.isBusy || !hasSelection}
            onClick={props.onMigrate}
          >
            {strings.CommandMigrate}
          </ToolbarButton>
          <ToolbarButton
            icon={<CheckmarkCircleRegular />}
            disabled={props.isBusy || !hasSelection}
            onClick={props.onValidate}
          >
            {strings.CommandValidate}
          </ToolbarButton>

          <Tooltip content={strings.CommandDryRunTooltip} relationship="description" withArrow>
            <ToolbarButton
              icon={<BeakerRegular />}
              disabled={props.isBusy || !hasSelection}
              onClick={props.onDryRun}
            >
              {strings.CommandDryRun}
            </ToolbarButton>
          </Tooltip>

          {props.isRunning ? (
            <ToolbarButton icon={<DismissCircleRegular />} onClick={props.onCancel}>
              {strings.CommandCancelRun}
            </ToolbarButton>
          ) : null}

          <ToolbarDivider />

          <ToolbarButton
            icon={<DocumentArrowDownRegular />}
            disabled={props.isBusy || !props.canLoadPages}
            onClick={props.hasPages ? props.onRefresh : props.onLoadPages}
          >
            {props.hasPages ? strings.CommandRefresh : strings.CommandLoadPages}
          </ToolbarButton>

          {props.showSelectOutstanding ? (
            <Tooltip content={strings.CommandSelectOutstandingTooltip} relationship="description" withArrow>
              <ToolbarButton
                icon={<ArrowSyncRegular />}
                disabled={props.isBusy}
                onClick={props.onSelectOutstanding}
              >
                {formatString(strings.CommandSelectOutstanding, props.outstandingCount)}
              </ToolbarButton>
            </Tooltip>
          ) : null}

          {props.failedCount > 0 ? (
            <ToolbarButton
              icon={<ArrowClockwiseRegular />}
              disabled={props.isBusy}
              onClick={props.onSelectFailed}
            >
              {formatString(strings.CommandSelectFailed, props.failedCount)}
            </ToolbarButton>
          ) : null}

          <Menu
            inline
            checkedValues={{ columns: [...props.visibleColumns] }}
            onCheckedValueChange={(_, data) => {
              const next = new Set(data.checkedItems as ColumnKey[]);
              const changed = columnOptions
                .map((option) => option.key)
                .find((key) => next.has(key) !== props.visibleColumns.has(key));
              if (changed) {
                props.onToggleColumn(changed);
              }
            }}
          >
            <MenuTrigger disableButtonEnhancement>
              <MenuButton icon={<ColumnTripleRegular />} size="small" appearance="subtle">
                {strings.CommandColumns}
              </MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList aria-label={strings.ColumnsMenuLabel}>
                {columnOptions.map((option) => (
                  <MenuItemCheckbox key={option.key} name="columns" value={option.key}>
                    {option.label}
                  </MenuItemCheckbox>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>

          <Menu inline>
            <MenuTrigger disableButtonEnhancement>
              <MenuButton
                icon={<ArrowDownloadRegular />}
                size="small"
                appearance="subtle"
                disabled={!props.hasReport}
              >
                {strings.CommandExport}
              </MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={() => props.onExport('json')}>{strings.CommandExportJson}</MenuItem>
                <MenuItem onClick={() => props.onExport('csv')}>{strings.CommandExportCsv}</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </Toolbar>

        <Tooltip content={strings.SettingsButton} relationship="label" withArrow>
          <Button
            appearance="subtle"
            size="small"
            icon={<SettingsRegular />}
            onClick={props.onOpenSettings}
            aria-label={strings.SettingsButton}
          />
        </Tooltip>
      </div>

      {hasSelection ? (
        <div className={styles.selectionStrip} role="status" aria-live="polite">
          <Caption1>{formatString(strings.SelectionSummary, props.selectionCount, props.visiblePageCount)}</Caption1>
          <Button appearance="transparent" size="small" onClick={props.onSelectAll}>
            {strings.CommandSelectAll}
          </Button>
          <Button appearance="transparent" size="small" onClick={props.onClearSelection}>
            {strings.CommandClearSelection}
          </Button>
        </div>
      ) : null}
    </div>
  );
});

MigrationToolbar.displayName = 'MigrationToolbar';
