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
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TagPicker, ITag } from '@fluentui/react/lib/Pickers';
import SPSecurityService, { SPSecurityInfo } from '../../SPSecurityService';
import { Helpers, SPList, SPListItem, SPSiteUser, SPSiteGroup } from '../../SPSecurityService';
import SelectedPermissionsPanel from '../containers/SelectedPermissionsPanel';
import { ISelectedPermission } from '../ISpSecurityWebPartProps';
import { ISpSecurityProps } from './ISpSecurityProps';
import { ISpSecurityState } from './ISpSecurityState';
import { Legend } from './Legend';
import styles from './SpSecurity.module.scss';

const SpSecurity: React.FC<ISpSecurityProps> = (props) => {
  // Define state variables
  const [securityInfoLoaded, setSecurityInfoLoaded] = useState<boolean>(false);
  const [showPermissionsPanel, setShowPermissionsPanel] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(props.showEmail);
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showListPanel, setShowListPanel] = useState<boolean>(false);
  const [showUserPanel, setShowUserPanel] = useState<boolean>(false);
  const [selectedPermissions, setSelectedPermissions] = useState<ISelectedPermission[]>(props.selectedPermissions);
  const [siteUsers, setSiteUsers] = useState<SPSiteUser[]>([]);
  const [siteGroups, setSiteGroups] = useState<SPSiteGroup[]>([]);
  const [roleDefinitions, setRoleDefinitions] = useState<any[]>([]);
  const [lists, setLists] = useState<(SPList | SPListItem)[]>([]);
  const [adGroups, setAdGroups] = useState<any[]>([]);
  const [svc, setSvc] = useState<SPSecurityService>(() => 
    new SPSecurityService(null, props.spContext)
  );
  const [selectedSites, setSelectedSites] = useState<ITag[]>([]);

  // Create new service when siteUrl changes
  useEffect(() => {
    if (siteUrl.trim() !== '') {
      const newSvc = new SPSecurityService(siteUrl, props.spContext);
      setSvc(newSvc);
      setSecurityInfoLoaded(false);
    }
  }, [siteUrl, props.spContext]);

  // Create the service instance
  //
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
        setSiteUsers(response.siteUsers);
        setSiteGroups(response.siteGroups);
        setRoleDefinitions(response.roleDefinitions);
        setLists(filteredLists);
        setAdGroups(response.adGroups);
        setSelectedPermissions(props.selectedPermissions ?? []);
        setSecurityInfoLoaded(true);
      })
      .catch((errorList: string[]) => {
        setErrors(errorList);
        setSecurityInfoLoaded(true);
      });
  }, [svc]);

  useEffect(() => {
    if (props.selectedPermissions !== selectedPermissions) {
      setSelectedPermissions(props.selectedPermissions);
    }
    if (props.showEmail !== showEmail) {
      setShowEmail(props.showEmail);
    }
  }, [props.selectedPermissions, props.showEmail]);

  const expandList = (item: SPList | SPListItem): void => {
    if (item instanceof SPListItem && !item.serverRelativeUrl) return;

    if (item.isFetched) {
      item.isExpanded = true;
      setLists([...lists]);
    } else {
      const level = item instanceof SPListItem ? item.level + 1 : 1;
      const listTitle = item instanceof SPListItem ? item.listTitle : item.title;
      item.isFetching = true;
      const position = findIndex(lists, (stateItem) => stateItem.id === item.id);
      const updatedLists = [...lists];
      updatedLists.splice(position, 1, item);
      setLists(updatedLists);
      svc.loadFolderRoleAssignmentsDefinitionsMembers(listTitle, item.serverRelativeUrl, item.id, level)
        .then((response) => {
          const position = findIndex(lists, (stateItem) => stateItem.id === item.id);
          const updatedLists = [...lists];
          updatedLists.splice(position + 1, 0, ...response);
          item.isExpanded = true;
          item.isFetched = true;
          item.isFetching = false;
          setLists(updatedLists);
        })
        .catch((error: Error) => {
          const newErrors = [...errors, `There was an error fetching site users -- ${error.message}`];
          setErrors(newErrors);
        });
    }
  };

  const collapseItem = (itemId: string) => {
    const children = filter(lists, (otherItem) => otherItem instanceof SPListItem && otherItem.parentId === itemId);
    children.forEach((childItem) => {
      childItem.isExpanded = false;
      collapseItem(childItem.id);
    });
  };

  const collapseList = (item: SPList | SPListItem): void => {
    item.isExpanded = false;
    collapseItem(item.id);
    setLists([...lists]);
  };

  const expandCollapseList = (item: SPList | SPListItem, event: React.MouseEvent): void => {
    event.stopPropagation();
    if (item.itemCount === 0) return;

    if (item.isExpanded) {
      collapseList(item);
    } else {
      expandList(item);
    }
  };

  const renderTitle = (item: SPList | SPListItem): JSX.Element => {
    console.log(item.title);
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
      <div className={styles.itemTitle} onClick={(event) => expandCollapseList(item, event)}>
        <Icon iconName={iconName} className={styles.themecolor} />
        <span>&nbsp;{item.title}</span>
        {item.isFetching && <Spinner size={SpinnerSize.small} />}
      </div>
    );
  };

  const renderFolderTitle = (item: SPListItem): JSX.Element => {
    const style = { marginLeft: `${item.level * 20}px` };
    const iconName = item.itemCount > 0 ? 'FabricFormLibrary' : 'FabricFolder';
    return (
      <div className={styles.itemTitle} onClick={(event) => expandCollapseList(item, event)}>
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
              lists,
              user,
              siteUsers,
              effectivePermissions.map(sp => {
                const permissionKey = sp.permission as keyof typeof SPPermission;
                return SPPermission[permissionKey];
              }),
              roleDefinitions,
              siteGroups,
              adGroups
            )
          ) {
            columns.push({
              key: user.upn,
              name: showEmail ? user.upn : user.name,
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
        const updatedLists = lists.map((item) => {
          if (item instanceof SPList) {
            item.isSelected = true;
          }
          return item;
        });
        setLists(updatedLists);
      },
    },
    {
      icon: "BoxSubtractionSolid",
      key: "Remove All Lists",
      name: "Remove All Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        const updatedLists = lists.map((item) => {
          if (item instanceof SPList) {
            item.isSelected = false;
          }
          return item;
        });
        setLists(updatedLists);
      },
    },
  ];
  const userPanelCommands: IContextualMenuItem[] = [
    {
      icon: "BoxAdditionSolid",
      key: "Add All Users",
      name: "Add All Users",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        const updatedSiteUsers = siteUsers.map((item) => {
          item.isSelected = true;
          return item;
        });
        setSiteUsers(updatedSiteUsers);
      },
    },
    {
      icon: "BoxSubtractionSolid",
      key: "Remove All users",
      name: "Remove All users",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        const updatedSiteUsers = siteUsers.map((item) => {
          item.isSelected = false;
          return item;
        });
        setSiteUsers(updatedSiteUsers);
      },
    },
  ];

  const renderUserItem = (
    item: SPListItem,
    index: number,
    column: IColumn,
    effectivePermissions: ISelectedPermission[]
  ): JSX.Element => {
    const user = find(siteUsers, (su) => su.upn.toString() === column.key);

    const icons = effectivePermissions.map((selectedPermission) => {
      const permissionKey = selectedPermission.permission as keyof typeof SPPermission;

      if (user && Helpers.doesUserHavePermission(
        item,
        user,
        siteUsers,
        SPPermission[permissionKey],
        roleDefinitions,
        siteGroups,
        adGroups
      )) {
        return (
          <div key={selectedPermission.permission} style={{ display: 'block' }} onClick={(event) => expandCollapseList(item, event)}>
            <Icon
              iconName={selectedPermission.iconName}
              style={{ color: selectedPermission.color }}
            />
          </div>
        );
      }
      return null;
    });

    return (
      <div style={{ display: 'block' }} onClick={(event) => expandCollapseList(item, event)}>
        {icons}
        <div style={{ display: 'block' }}>
          <Icon iconName={item.iconName} />
        </div>
      </div>
    );
  };

  const onResolveSuggestions = async (filterText: string): Promise<ITag[]> => {
    if (!filterText || filterText.length < 3) return [];
    let sites = await svc.searchSites( filterText, 100);
    return sites;
    
  };

  if (!securityInfoLoaded) {
    return (
      <div>
        <Spinner label={'Fetching security information, please wait...'} />
      </div>
    );
  }

  // Define the commands for users, lists, permissions, and display mode
  const commands: IContextualMenuItem[] = [];
  const farItems: IContextualMenuItem[] = [];

  // User selection command
  if (props.letUserSelectUsers) {
    commands.push({
      icon: "People",
      key: "Users",
      name: "Users",
      itemType: ContextualMenuItemType.Normal,
      onClick: () => {
        setShowUserPanel(!showUserPanel);
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
        setShowListPanel(!showListPanel);
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
        setShowPermissionsPanel(!showPermissionsPanel);
      }
    });
  }

  // Display mode command
  commands.push({
    key: "DisplayMode",
    title: "DisplayMode",
    name: showEmail ? "Show Email" : "Show Name",
    itemType: ContextualMenuItemType.Normal,
    subMenuProps: {
      items: [{
        key: "ShowName",
        name: "Show Name",
        onClick: () => {
          setShowEmail(false);
        }
      },
      {
        key: "ShowEmail",
        name: "Show Email",
        onClick: () => {
          setShowEmail(true);
        }
      }]
    }
  });

  // Site URL command with textbox - moved to farItems for right side
  if (props.letUserSelectSites){
  farItems.push({
    key: "SiteUrl",
    name: "",
    itemType: ContextualMenuItemType.Normal,
    onRender: () => (
      <div style={{ padding: '8px 12px', minWidth: '300px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Sites:</span>
        <TagPicker
          selectedItems={selectedSites}
          onResolveSuggestions={onResolveSuggestions}
          onChange={(items) => {
            setSelectedSites(items || []);
            // Set the first selected site as the main siteUrl
            if (items && items.length > 0) {
              setSiteUrl(items[0].key as string);
            } else {
              setSiteUrl('');
            }
          }}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Select a SharePoint site',
            noResultsFoundText: 'No sites found'
          }}
          inputProps={{
            placeholder: 'Type to search for sites...'
          }}
          styles={{
            root: { minWidth: '200px' }
          }}
        />
      </div>
    )
  });
}

  const effectivePermissions = selectedPermissions.filter((sp) => sp.isChecked);
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

  const displayColumns: IColumn[] = addUserColumns(columns, siteUsers, effectivePermissions);
  const displayItems: (SPList | SPListItem)[] = filter(lists, (item) => {
    return (
      (item instanceof SPList && item.isSelected) ||
      ((item instanceof SPListItem) && item.parentId && find(lists, l => l.id === item.parentId)?.isExpanded)
    );
  });

  return (
    <>
      <CommandBar items={commands} farItems={farItems} />
      <br />
      <Legend
        selectedPermissions={selectedPermissions}
        checkUncheckPermission={(e) => {
          const sps = [...selectedPermissions];
          const idx = findIndex(sps, (sp) => sp.permission === e.permission);
          if (idx !== -1) {
            sps[idx].isChecked = !sps[idx].isChecked;
            setSelectedPermissions(sps);
          }
        }}
      />
      <DetailsList
        items={displayItems}
        columns={displayColumns}
        selectionMode={SelectionMode.none}
        className={styles.SPFXSecurityGrid}
         getKey={(item) =>{
           return item.id;
          }
        } // Add this for stable keys
      />
      <SelectedPermissionsPanel
        isOpen={showPermissionsPanel}
        SelectedPermissions={props.selectedPermissions}
        onPropertyChange={(propertyName, oldValue, newValue) => {
          setSelectedPermissions(newValue);
        }}
        closePanel={() => {
          setShowPermissionsPanel(false);
        }}
      />
      <Panel
        isBlocking={false}
        isOpen={showUserPanel}
        onDismiss={() => setShowUserPanel(false)}
        type={PanelType.medium}
        headerText="Select Users"
        closeButtonAriaLabel="Close"
      >
        <CommandBar items={userPanelCommands} />
        <DetailsList
          selection={userSelection}
          selectionMode={SelectionMode.none}
          items={siteUsers}
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
                    const user = find(siteUsers, (su) => su.id === item.id);
                    if (user) {
                      user.isSelected = value!;
                      setSiteUsers([...siteUsers]);
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
        isOpen={showListPanel}
        onDismiss={() => setShowListPanel(false)}
        type={PanelType.medium}
        headerText="Select Lists"
        closeButtonAriaLabel="Close"
      >
        <CommandBar items={listPanelCommands} />
        <DetailsList
          selection={listSelection}
          selectionMode={SelectionMode.none}
          items={filter(lists, (l) => l instanceof SPList)}
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
                    const list = find(lists, (l) => l.id === item.id);
                    if (list) {
                      list.isSelected = value!;
                      setLists([...lists]);
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
