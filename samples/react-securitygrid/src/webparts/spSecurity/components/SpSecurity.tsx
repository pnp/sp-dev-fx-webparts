import * as React from 'react';
import { useState, useEffect } from 'react';
import { SPPermission } from '@microsoft/sp-page-context';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@uifabric/file-type-icons';
import { filter, find, findIndex } from 'lodash';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { DetailsList, IColumn, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Icon } from '@fluentui/react/lib/Icon';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Spinner } from '@fluentui/react/lib/Spinner';
import SPSecurityService from '../../SPSecurityService';
import { Helpers, SPList, SPListItem, SPSiteUser } from '../../SPSecurityService';
import SelectedPermissionsPanel from '../containers/SelectedPermissionsPanel';
import { ISelectedPermission } from '../ISpSecurityWebPartProps';
import { ISpSecurityProps } from './ISpSecurityProps';
import { ISpSecurityState } from './ISpSecurityState';
import { Legend } from './Legend';
import styles from './SpSecurity.module.scss';

const SpSecurity: React.FC<ISpSecurityProps> = (props) => {
  const [state, setState] = useState<ISpSecurityState>({
    securityInfo: { siteUsers: [], siteGroups: [], roleDefinitions: [], lists: [], adGroups: [] },
    selectedPermissions: props.selectedPermissions,
    showUserPanel: false,
    showListPanel: false,
    showEmail: props.showEmail,
    securityInfoLoaded: false,
    showPermissionsPanel: false,
    errors: [],
  });

  const svc = new SPSecurityService('ss');
  const userSelection = new Selection();
  const listSelection = new Selection();

  useEffect(() => {
    initializeFileTypeIcons();
    svc.loadData(props.showHiddenLists, props.showCatalogs, props.aadHttpClient)
      .then((response) => {
        const filteredLists = response.lists.filter((list) =>
          props.includeAdminSelectedLists
            ? !!find(props.adminSelectedLists, (asl) => list.id === asl)
            : !find(props.adminSelectedLists, (asl) => list.id === asl)
        );
        setState((prevState) => ({
          ...prevState,
          securityInfo: { ...response, lists: filteredLists },
          selectedPermissions: props.selectedPermissions ?? [],
          showEmail: props.showEmail,
          securityInfoLoaded: true,
        }));
      })
      .catch((errors: string[]) => {
        setState((prevState) => ({ ...prevState, errors, securityInfoLoaded: true }));
      });
  }, [props]);

  useEffect(() => {
    if (props.selectedPermissions !== state.selectedPermissions || props.showEmail !== state.showEmail) {
      setState((prevState) => ({
        ...prevState,
        selectedPermissions: props.selectedPermissions,
        showEmail: props.showEmail,
      }));
    }
  }, [props.selectedPermissions, props.showEmail]);

  const expandList = (item: SPList | SPListItem): void => {
    if (item instanceof SPListItem && !item.serverRelativeUrl) return;

    if (item.isFetched) {
      item.isExpanded = true;
      setState({ ...state });
    } else {
      const level = item instanceof SPListItem ? item.level + 1 : 1;
      const listTitle = item instanceof SPListItem ? item.listTitle : item.title;

      svc.loadFolderRoleAssignmentsDefinitionsMembers(listTitle, item.serverRelativeUrl, item.id, level)
        .then((response) => {
          const position = findIndex(state.securityInfo.lists, (stateItem) => stateItem.id === item.id);
          const updatedLists = [...state.securityInfo.lists];
          updatedLists.splice(position + 1, 0, ...response);
          item.isExpanded = true;
          item.isFetched = true;
          setState((prevState) => ({ ...prevState, securityInfo: { ...prevState.securityInfo, lists: updatedLists } }));
        })
        .catch((error: Error) => {
          const errors = [...state.errors, `There was an error fetching site users -- ${error.message}`];
          setState((prevState) => ({ ...prevState, errors }));
        });
    }
  };

  const collapseItem = (itemId: string) => {
    const children = filter(state.securityInfo.lists, (otherItem) => otherItem instanceof SPListItem && otherItem.parentId === itemId);
    children.forEach((childItem) => {
      childItem.isExpanded = false;
      collapseItem(childItem.id);
    });
  };

  const collapseList = (item: SPList | SPListItem): void => {
    item.isExpanded = false;
    collapseItem(item.id);
    setState({ ...state });
  };

  const expandCollapseList = (item: SPList | SPListItem): void => {
    if (item.itemCount === 0) return;

    if (item.isExpanded) {
      collapseList(item);
    } else {
      expandList(item);
    }
  };

  const renderTitle = (item: SPList | SPListItem): JSX.Element => {
    if (item instanceof SPList) {
      return renderListTitle(item);
    } else if (item.type === 'Folder') {
      return renderFolderTitle(item);
    } else {
      return renderItemTitle(item);
    }
  };

  const renderListTitle = (item: SPList): JSX.Element => {
    const iconName = item.itemCount > 0 ? 'FabricFormLibrary' : 'FabricFolder';
    return (
      <div className={styles.itemTitle} onClick={() => expandCollapseList(item)}>
        <Icon iconName={iconName} className={styles.themecolor} />
        <span>&nbsp;{item.title}</span>
      </div>
    );
  };

  const renderFolderTitle = (item: SPListItem): JSX.Element => {
    const style = { marginLeft: `${item.level * 20}px` };
    const iconName = item.itemCount > 0 ? 'FabricFormLibrary' : 'FabricFolder';
    return (
      <div className={styles.itemTitle} onClick={() => expandCollapseList(item)}>
        <Icon iconName={iconName} style={style} className={styles.themecolor} />
        <span>&nbsp;{item.title}</span>
      </div>
    );
  };

  const renderItemTitle = (item: SPListItem): JSX.Element => {
    const extension = item.title.split('.').pop();
    const style = { marginLeft: `${item.level * 20}px` };
    return (
      <div className={styles.itemTitle} style={style}>
        <Icon {...getFileTypeIconProps({ extension, size: 16 })} />
        <span>&nbsp;{item.title}</span>
      </div>
    );
  };

  const addUserColumns = (
    columns: IColumn[], 
    users: SPSiteUser[], 
    effectivePermissions: ISelectedPermission[]
  ): IColumn[] => {
    for (const user of users) {
      if (user.isSelected) {
        if (
          ((user.principalType === 1 || user.principalType === -1) && props.showUsers) ||
          (user.principalType === 4 && props.showSecurityGroups)
        ) {
          if (
            !props.showOnlyUsersWithPermission ||
            Helpers.doesUserHaveAnyPermission(
              state.securityInfo.lists,
              user,
              effectivePermissions.map(sp => {
                const permissionKey = sp.permission as keyof typeof SPPermission;
                return SPPermission[permissionKey];
              }),
              state.securityInfo.roleDefinitions,
              state.securityInfo.siteGroups,
              state.securityInfo.adGroups
            )
          ) {
            columns.push({
              key: user.upn,
              name: state.showEmail ? user.upn : user.name,
              fieldName: "",
              minWidth: 20,
              maxWidth: 20,
              onRender: (item: SPListItem, index?: number, column?: IColumn) =>
                renderUserItem(item, index!, column!, effectivePermissions),
              headerClassName: styles.rotatedColumnHeader,
            });
          }
        }
      }
    }
    return columns;
  };

  const listPanelCommands: IContextualMenuItem[] = [
    {
      icon: "BoxAdditionSolid",
      key: "Add All Lists",
      name: "Add All Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        const updatedLists = state.securityInfo.lists.map((item) => {
          if (item instanceof SPList) {
            item.isSelected = true;
          }
          return item;
        });
        setState((prevState) => ({
          ...prevState,
          securityInfo: {
            ...prevState.securityInfo,
            lists: updatedLists,
          },
        }));
      },
    },
    {
      icon: "BoxSubtractionSolid",
      key: "Remove All Lists",
      name: "Remove All Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        const updatedLists = state.securityInfo.lists.map((item) => {
          if (item instanceof SPList) {
            item.isSelected = false;
          }
          return item;
        });
        setState((prevState) => ({
          ...prevState,
          securityInfo: {
            ...prevState.securityInfo,
            lists: updatedLists,
          },
        }));
      },
    },
  ];

  const renderUserItem = (
    item: SPListItem,
    index: number,
    column: IColumn,
    effectivePermissions: ISelectedPermission[]
  ): JSX.Element => {
    const user = find(state.securityInfo.siteUsers, (su) => su.upn.toString() === column.key);

    for (const selectedPermission of effectivePermissions) {
      const permissionKey = selectedPermission.permission as keyof typeof SPPermission;

      if (user && Helpers.doesUserHavePermission(
        item,
        user,
        SPPermission[permissionKey],
        state.securityInfo.roleDefinitions,
        state.securityInfo.siteGroups,
        state.securityInfo.adGroups
      )) {
        return (
          <Icon
            iconName={selectedPermission.iconName}
            style={{ color: selectedPermission.color }}
            onClick={() => expandCollapseList(item)}
          />
        );
      }
    }

    return (
      <Icon iconName={item.iconName} onClick={() => expandCollapseList(item)} />
    );
  };

  if (!state.securityInfoLoaded) {
    return (
      <div>
        <Spinner label={'Fetching security information, please wait...'} />
      </div>
    );
  }

  // Define the commands for users, lists, permissions, and display mode
  const commands: IContextualMenuItem[] = [];

  // User selection command
  if (props.letUserSelectUsers) {
    commands.push({
      icon: "People",
      key: "Users",
      name: "Users",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        setState((current) => ({ ...current, showUserPanel: !current.showUserPanel }));
      }
    });
  }

  // List selection command
  if (props.letUserSelectLists) {
    commands.push({
      icon: "PageListSolid",
      key: "Lists",
      name: "Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        setState((current) => ({ ...current, showListPanel: !current.showListPanel }));
      }
    });
  }

  // Permission selection command
  if (props.letUserSelectPermission) {
    commands.push({
      icon: "AzureKeyVault",
      key: "SecurityLevel2",
      name: "Permission",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        setState((current) => ({ ...current, showPermissionsPanel: !current.showPermissionsPanel }));
      }
    });
  }

  // Display mode command
  commands.push({
    key: "DisplayMode",
    title: "DisplayMode",
    name: state.showEmail ? "Show Email" : "Show Name",
    itemType: ContextualMenuItemType.Normal,
    subMenuProps: {
      items: [{
        key: "ShowName",
        name: "Show Name",
        onClick: () => {
          setState((current) => ({ ...current, showEmail: false }));
        }
      },
      {
        key: "ShowEmail",
        name: "Show Email",
        onClick: () => {
          setState((current) => ({ ...current, showEmail: true }));
        }
      }]
    }
  });

  const effectivePermissions = state.selectedPermissions.filter((sp) => sp.isChecked);
  const columns: IColumn[] = [
    {
      key: "title",
      name: "Title",
      isResizable: true,
      fieldName: "title",
      minWidth: props.listTitleColumnWidth,
      maxWidth: props.listTitleColumnWidth,
      onRender: renderTitle,
      isRowHeader: true
    }
  ];

  const displayColumns: IColumn[] = addUserColumns(columns, state.securityInfo.siteUsers, effectivePermissions);
  const displayItems: (SPList | SPListItem)[] = filter(state.securityInfo.lists, (item) => {
    return (
      (item instanceof SPList && item.isSelected) ||
      ((item instanceof SPListItem) && item.parentId && find(state.securityInfo.lists, l => l.id === item.parentId)?.isExpanded)
    );
  });

  return (
    <>
      <CommandBar items={commands} />
      <br />
      <Legend
        selectedPermissions={state.selectedPermissions}
        checkUncheckPermission={(e) => {
          const sps = [...state.selectedPermissions];
          const idx = findIndex(sps, (sp) => sp.permission === e.permission);
          if (idx !== -1) {
            sps[idx].isChecked = !sps[idx].isChecked;
            setState((prevState) => ({ ...prevState, selectedPermissions: sps }));
          }
        }}
      />
      <DetailsList
        items={displayItems}
        columns={displayColumns}
        selectionMode={SelectionMode.none}
        className={styles.SPFXSecurityGrid}
      />
      <SelectedPermissionsPanel
        isOpen={state.showPermissionsPanel}
        SelectedPermissions={props.selectedPermissions}
        onPropertyChange={(propertyName, oldValue, newValue) => {
          setState((prevState) => ({ ...prevState, selectedPermissions: newValue }));
        }}
        closePanel={() => {
          setState((prevState) => ({ ...prevState, showPermissionsPanel: false }));
        }}
      />
      <Panel
        isBlocking={false}
        isOpen={state.showUserPanel}
        onDismiss={() => setState((prevState) => ({ ...prevState, showUserPanel: false }))}
        type={PanelType.medium}
        headerText="Select Users"
        closeButtonAriaLabel="Close"
      >
        <CommandBar items={listPanelCommands} />
        <DetailsList
          selection={userSelection}
          selectionMode={SelectionMode.none}
          items={state.securityInfo.siteUsers}
          columns={[
            {
              key: "isSelected",
              name: "Select",
              fieldName: "isSelected",
              minWidth: 30,
              onRender: (item) => (
                <Checkbox
                  checked={item.isSelected}
                  onChange={(element, value) => {
                    const user = find(state.securityInfo.siteUsers, (su) => su.id === item.id);
                    if (user) {
                      user.isSelected = value!;
                      setState((prevState) => ({ ...prevState }));
                    }
                  }}
                />
              ),
            },
            { key: "id", name: "Name", fieldName: "name", minWidth: 400 }
          ]}
        />
      </Panel>
      <Panel
        isBlocking={false}
        isOpen={state.showListPanel}
        onDismiss={() => setState((prevState) => ({ ...prevState, showListPanel: false }))}
        type={PanelType.medium}
        headerText="Select Lists"
        closeButtonAriaLabel="Close"
      >
        <CommandBar items={listPanelCommands} />
        <DetailsList
          selection={listSelection}
          selectionMode={SelectionMode.none}
          items={filter(state.securityInfo.lists, (l) => l instanceof SPList)}
          columns={[
            {
              key: "isSelected",
              name: "Select",
              fieldName: "isSelected",
              minWidth: 30,
              onRender: (item) => (
                <Checkbox
                  checked={item.isSelected}
                  onChange={(element, value) => {
                    const list = find(state.securityInfo.lists, (l) => l.id === item.id);
                    if (list) {
                      list.isSelected = value!;
                      setState((prevState) => ({ ...prevState }));
                    }
                  }}
                />
              ),
            },
            { key: "id", name: "Title", fieldName: "title", minWidth: 500 }
          ]}
        />
      </Panel>
    </>
  );
};

export default SpSecurity;
