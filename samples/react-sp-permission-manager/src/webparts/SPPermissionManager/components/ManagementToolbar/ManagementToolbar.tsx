import * as React from 'react';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger
} from '@fluentui/react-components';
import {
  ArrowExportUpRegular,
  ChevronDownRegular,
  DocumentCsvRegular,
  DocumentDataRegular,
  GroupRegular,
  KeyRegular,
  PeopleEditRegular,
  PeopleTeamDeleteRegular,
  PersonEditRegular,
  ShieldCheckmarkRegular,
  ShieldRegular
} from '@fluentui/react-icons';
import styles from './ManagementToolbar.module.scss';
import { RibbonButton } from './RibbonButton';
import { RibbonDivider } from './RibbonDivider';
import type { IManagementToolbarProps } from './types';
import { MANAGEMENT_TOOLBAR_STRINGS } from './constants';



export const ManagementToolbar: React.FC<IManagementToolbarProps> = ({
  onActionClick,
  disabledActionKeys,
  visibleActionKeys,
  isExportDisabled = false
}) => {
  const isOff = (key: string): boolean => Boolean(disabledActionKeys?.has(key));
  const isVisible = (key: string): boolean => visibleActionKeys?.has(key) ?? true;
  const showExportButton = isVisible('export-users-csv') || isVisible('export-users-excel');

  return (
    <div
      className={styles.ribbonBar}
      role="toolbar"
      aria-label={MANAGEMENT_TOOLBAR_STRINGS.ARIA_LABEL}
      title={MANAGEMENT_TOOLBAR_STRINGS.TITLE}
    >

      {/* ── Grant ── */}
      <div className={styles.ribbonGroup}>
        {isVisible('add-new-group') && (
          <RibbonButton
            icon={<GroupRegular />}
            label={MANAGEMENT_TOOLBAR_STRINGS.CREATE_GROUP}
            iconColor="#0078D4"
            disabled={isOff('add-new-group')}
            onClick={() => onActionClick?.('add-new-group')}
          />
        )}
        {isVisible('grant-permissions') && (
          <RibbonButton
            icon={<KeyRegular />}
            label={MANAGEMENT_TOOLBAR_STRINGS.GRANT_PERMISSIONS}
            iconColor="#107C10"
            disabled={isOff('grant-permissions')}
            onClick={() => onActionClick?.('grant-permissions')}
          />
        )}
        <RibbonButton
          icon={<PeopleEditRegular />}
          label={MANAGEMENT_TOOLBAR_STRINGS.MANAGE_GROUP_USERS}
          iconColor="#038387"
          disabled={isOff('manage-group-users')}
          onClick={() => onActionClick?.('manage-group-users')}
        />
        {isVisible('delete-group') && (
          <RibbonButton
            icon={<PeopleTeamDeleteRegular />}
            label={MANAGEMENT_TOOLBAR_STRINGS.DELETE_GROUP}
            iconColor="#D13438"
            disabled={isOff('delete-group')}
            onClick={() => onActionClick?.('delete-group')}
          />
        )}
        {showExportButton && (
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <RibbonButton
                icon={<ArrowExportUpRegular />}
                label={<>{MANAGEMENT_TOOLBAR_STRINGS.EXPORT_USERS}&nbsp;<ChevronDownRegular className={styles.chevron} /></>}
                disabled={isExportDisabled}
                iconColor="#605E5C"
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {isVisible('export-users-csv') && (
                  <MenuItem icon={<DocumentCsvRegular />} disabled={isExportDisabled} onClick={() => onActionClick?.('export-users-csv')}>
                    {MANAGEMENT_TOOLBAR_STRINGS.CSV}
                  </MenuItem>
                )}
                {isVisible('export-users-excel') && (
                  <MenuItem icon={<DocumentDataRegular />} disabled={isExportDisabled} onClick={() => onActionClick?.('export-users-excel')}>
                    {MANAGEMENT_TOOLBAR_STRINGS.EXCEL}
                  </MenuItem>
                )}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
      </div>

      <RibbonDivider />

      {/* ── Modify ── */}
      <div className={styles.ribbonGroup}>
        <RibbonButton
          icon={<PersonEditRegular />}
          label={MANAGEMENT_TOOLBAR_STRINGS.EDIT_USER_PERMISSIONS}
          iconColor="#0078D4"
          disabled={isOff('edit-user-permissions')}
          onClick={() => onActionClick?.('edit-user-permissions')}
        />
      </div>

      <RibbonDivider />

      {/* ── Check ── */}
      <div className={styles.ribbonGroup}>
        <RibbonButton
          icon={<ShieldCheckmarkRegular />}
          label={MANAGEMENT_TOOLBAR_STRINGS.CHECK_PERMISSIONS}
          iconColor="#5C2D91"
          disabled={isOff('check-permissions')}
          onClick={() => onActionClick?.('check-permissions')}
        />
      </div>

      <RibbonDivider />

      {/* ── Manage ── */}
      <div className={styles.ribbonGroup}>
        {isVisible('permission-levels') && (
          <RibbonButton
            icon={<ShieldRegular />}
            label={MANAGEMENT_TOOLBAR_STRINGS.PERMISSION_LEVELS}
            iconColor="#3B3A98"
            disabled={isOff('permission-levels')}
            onClick={() => onActionClick?.('permission-levels')}
          />
        )}
      </div>

    </div>
  );
};
