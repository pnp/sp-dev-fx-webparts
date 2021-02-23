import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPPermission } from "@microsoft/sp-page-context";
import { getFileTypeIconProps, initializeFileTypeIcons } from '@uifabric/file-type-icons';
import { filter, find, findIndex } from "lodash";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { DetailsList, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";

import SPSecurityService from "../../SPSecurityService";
import { Helpers, SPList, SPListItem, SPSiteUser } from "../../SPSecurityService";
import SelectedPermissionsPanel from "../containers/SelectedPermissionsPanel";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import { ISpSecurityProps } from "./ISpSecurityProps";
import { ISpSecurityState } from "./ISpSecurityState";
import { Legend } from "./Legend";
import styles from "./SpSecurity.module.scss";

/* tslint:disable */
export default class SpSecurity extends React.Component<ISpSecurityProps, ISpSecurityState> {
  private svc: SPSecurityService = new SPSecurityService("ss");
  private userSelection = new Selection();
  private listSelection = new Selection();
  constructor(props: any) {
    super(props);
    this.state = {
      securityInfo: { siteUsers: [], siteGroups: [], roleDefinitions: [], lists: [], adGroups: [] },
      //permission: this.props.permission,
      selectedPermissions: this.props.selectedPermissions,
      showUserPanel: false,
      showListPanel: false,
      showEmail: this.props.showEmail,
      securityInfoLoaded: false,
      showPermissionsPanel: false,
      errors: []

    };

    this.expandCollapseList = this.expandCollapseList.bind(this);
    this.collapseList = this.collapseList.bind(this);
    this.collapseItem = this.collapseItem.bind(this);
    this.expandList = this.expandList.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderUserItem = this.renderUserItem.bind(this);
    this.getPermissionLevels = this.getPermissionLevels.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.parentIsExpanded = this.parentIsExpanded.bind(this);
    this.renderUserSelected = this.renderUserSelected.bind(this);
  }
  public componentDidMount(): void {

    initializeFileTypeIcons();
  }
  public componentDidUpdate(): void {
    // disable postback of buttons. see https://github.com/SharePoint/sp-dev-docs/issues/492

    if (Environment.type === EnvironmentType.ClassicSharePoint) {
      const buttons: NodeListOf<HTMLButtonElement> = this.props.domElement.getElementsByTagName('button');
      for (let i: number = 0; i < buttons.length; i++) {
        if (buttons[i]) {
          // Disable the button onclick postback
          buttons[i].onclick = function () {
            return false;
          };
        }
      }
    }
  }
  public componentWillReceiveProps(newProps: ISpSecurityProps) {

    this.setState((current) => ({
      ...current,
      selectedPermissions: newProps.selectedPermissions,
      showEmail: newProps.showEmail
    }));

  }

  public componentWillMount(): void {
    //debugger;
    this.svc.loadData(this.props.showHiddenLists, this.props.showCatalogs, this.props.aadHttpClient, false)
      .then((response) => {
        const state: ISpSecurityState = {
          securityInfo: response,
          // permission: this.props.permission,
          selectedPermissions: this.props.selectedPermissions ? this.props.selectedPermissions : [],
          showUserPanel: false,
          showListPanel: false,
          showPermissionsPanel: false,
          showEmail: this.props.showEmail,
          securityInfoLoaded: true,
          errors: []

        };
        // inlclude\exclude lists selected in property pane
        //debugger;
        state.securityInfo.lists = state.securityInfo.lists.filter((list) => {
          if (this.props.includeAdminSelectedLists) { // include the lists

            if (find(this.props.adminSelectedLists, (asl) => { return list.id === asl; })) {
              return true;
            } else {
              return false;
            }
          } else { // exclude the lists
            if (find(this.props.adminSelectedLists, (asl) => { return list.id === asl; })) {
              return false;
            }
            else {
              return true;
            }

          }
        });
        this.setState(state);
      }).catch((errors: Array<string>) => {
        this.setState((current) => ({ ...current, errors: errors, securityInfoLoaded: true }))
        //debugger;
      });
  }
  public expandList(item: any): any {
    if (item instanceof SPListItem && !item.serverRelativeUrl) { // its a listitem. nothing to do
      return;
    }
    if (item.isFetched) {
      item.isExpanded = true;
      this.setState(this.state);

    }
    else {

      // get the items in the list/folder;
      let level: number;
      let listTitle: string;
      if (item instanceof SPListItem) {
        level = item.level + 1;
        listTitle = item.listTitle;
      }
      else {
        level = 1;
        listTitle = item.title;
      }

      this.svc.loadFolderRoleAssigmentsDefinitionsMembers(listTitle, item.serverRelativeUrl, item.id, level, true).then((response) => {

        // add them to the list after the parent

        let position: number = findIndex(this.state.securityInfo.lists, (stateitem) => {
          return stateitem.id === item.id;
        });
        this.state.securityInfo.lists.splice(position + 1, 0, ...response);
        item.isExpanded = true;
        item.isFetched = true;
        this.setState(this.state);

      }).catch((error) => {
        let errors = this.state.errors;
        errors.push(`There was an error fetching site users -- ${error.message}`);
        this.setState((current) => ({ ...current, errors: errors }))
      });

    }
  }
  public collapseItem(itemId: string) {
    let children = filter(this.state.securityInfo.lists, (otheritem) => {
      return otheritem instanceof SPListItem && otheritem.parentId === itemId;
    });
    for (let childitem of children) {
      childitem.isExpanded = false;
      this.collapseItem(childitem.id);
    };

  }
  public collapseList(item: any): any {

    item.isExpanded = false;
    this.collapseItem(item.id);
    this.setState(this.state);

  }

  public expandCollapseList(item?: any, index?: number, column?: IColumn): any {
    if (item.itemCount === 0) {
      return;
    }
    if (item.isExpanded) {
      this.collapseList(item);
    }
    else {
      this.expandList(item);
    }

  }
  public parentIsExpanded(item: SPListItem): boolean {
    let parent = find(this.state.securityInfo.lists, (otheritem) => {
      return otheritem.id === item.parentId;
    });
    return parent.isExpanded;

  }

  public renderItemTitle(item?: any, index?: number, column?: IColumn): any {
    const extension = item.title.split('.').pop();
    debugger;
    const style = { marginLeft: item.level * 20 + 'px' }
    return (
      <div className={styles.itemTitle} style={style}>
        <Icon {...getFileTypeIconProps({ extension: extension, size: 16 })} />
        <span>&nbsp;{item.title}</span>
      </div>);
  }
  public renderListTitle(item?: any, index?: number, column?: IColumn): any {
    const iconName = item.itemCount > 0 ?
      'FabricFormLibrary' :
      'FabricFolder';
    return (
      <div className={styles.itemTitle} onClick={(e) => {
        this.expandCollapseList(item);
      }}>
        <Icon iconName={iconName} className={styles.themecolor} />
        <span >&nbsp;{item.title}</span>
      </div>);
  }

  public renderFolderTitle(item?: any, index?: number, column?: IColumn): any {
    const style = { marginLeft: item.level * 20 + 'px' }
    const iconName = item.itemCount > 0 ?
      'FabricFormLibrary' :
      'FabricFolder';

    return (
      <div className={styles.itemTitle} onClick={(e) => {
        this.expandCollapseList(item);
      }}>
        <Icon iconName={iconName} style={style} className={styles.themecolor} />
        <span >&nbsp;{item.title}</span>
      </div>);
  }

  public renderTitle(item?: any, index?: number, column?: IColumn): any {
    if (item instanceof SPList) {
      return this.renderListTitle(item, index, column);
    } else {
      if (item.type === "Folder") {
        return this.renderFolderTitle(item, index, column);
      } else {
        return this.renderItemTitle(item, index, column);
      }
    }

  }

  public renderUserItem(item: any, index: number, column: IColumn, effectivePermissions: ISelectedPermission[]): any {

    let user: SPSiteUser = find(this.state.securityInfo.siteUsers, (su) => {
      return su.upn.toString() === column.key;
    });
    // spin througg the selected permsiisopns and for the first hit, display that color. No Hit, then display empty

    for (let selectedPermission of effectivePermissions ? effectivePermissions : []) {
      if (Helpers.doesUserHavePermission(item, user, SPPermission[selectedPermission.permission],
        this.state.securityInfo.roleDefinitions, this.state.securityInfo.siteGroups, this.state.securityInfo.adGroups)) {
        return (
          <Icon iconName={selectedPermission.iconName} style={{ color: selectedPermission.color }} onClick={(e) => {
            this.expandCollapseList(item);
          }} />
        );
      }
    }
    // no hits
    return (
      <Icon iconName={item.iconName} onClick={(e) => {
        this.expandCollapseList(item);
      }} />
    );

  }
  public renderUserSelected(item?: SPSiteUser, index?: number, column?: IColumn): any {

    return (
      <Checkbox checked={item.isSelected} />
    )

  }
  public addUserColumns(columns: IColumn[], users: SPSiteUser[], effectivePermissions: ISelectedPermission[]): IColumn[] {
    for (let user of users) {
      if (user.isSelected) {
        if (
          ((user.principalType === 1 || user.principalType === -1) && this.props.showUsers)
          ||
          (user.principalType === 4 && this.props.showSecurityGroups)
        )
          if (!this.props.showOnlyUsersWithPermission || Helpers.doesUserHaveAnyPermission(this.state.securityInfo.lists, user, effectivePermissions.map((sp) => { return SPPermission[sp.permission] }), this.state.securityInfo.roleDefinitions, this.state.securityInfo.siteGroups, this.state.securityInfo.adGroups))
            columns.push({
              key: user.upn,
              name: this.state.showEmail ? user.upn : user.name,
              fieldName: "",
              minWidth: 20,
              maxWidth: 20,
              onRender: (item?: any, index?: number, column?: IColumn) => {
                //debugger;
                return this.renderUserItem(item, index, column, effectivePermissions);
              },
              headerClassName: styles.rotatedColumnHeader,

            });
      }
    }
    return columns;
  }
  public getPermissionLevels(): IContextualMenuItem[] {

    return this.props.getPermissionTypes().map(pt => {
      return {
        key: pt.text,
        name: pt.text,
        onClick: (event, item) => {

          this.setState((current) => ({ ...current, permission: item.name }));
        }

      }
    })
  }
  private setShowUserPanel(showPanel: boolean): () => void {
    return (): void => {
      this.setState((current) => ({ ...current, showUserPanel: showPanel }));

    };
  }
  private selectUser(userid: number, value: boolean) {
    find(this.state.securityInfo.siteUsers, (su) => {
      return (su.id === userid)
    }).isSelected = value;
    this.setState(this.state);


  }
  private setShowListPanel(showPanel: boolean): () => void {
    return (): void => {
      this.setState((current) => ({ ...current, showListPanel: showPanel }));

    };
  }
  private selectList(listid: string, value: boolean) {
    let list: SPList = find(this.state.securityInfo.lists, (su) => {
      return (su.id === listid)
    }) as SPList;
    list.isSelected = value;
    this.setState(this.state);


  }
  private checkUncheckPermission(perm: ISelectedPermission) {
    //debugger;
    var sps = this.state.selectedPermissions;
    const idx = findIndex(sps, (sp: ISelectedPermission) => { return sp.permission == perm.permission; });
    if (idx != -1) {
      sps[idx].isChecked = !sps[idx].isChecked
      this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
    }


  }
  public render(): React.ReactElement<ISpSecurityProps> {
    if (!this.state.securityInfoLoaded) {
      return (
        <div >
          <Spinner label={'Fetching security information, please wait...'} />
        </div>

      );
    }
    let userPanelCommands: IContextualMenuItem[] = [];
    userPanelCommands.push({
      icon: "BoxAdditionSolid",
      key: "Add All Users",
      name: "Add All Users",
      itemType: ContextualMenuItemType.Normal,
      onClick: (event, item) => {
        for (let item of this.state.securityInfo.siteUsers) {
          item.isSelected = true;
        }
        this.setState(this.state);
      }
    });
    userPanelCommands.push({
      icon: "BoxSubtractionSolid",
      key: "RemoveAllUsers",
      name: "Remove All Users",
      itemType: ContextualMenuItemType.Normal,
      onClick: (event, item) => {

        for (let item of this.state.securityInfo.siteUsers) {
          item.isSelected = false;
        }
        this.setState(this.state);
      }
    });
    let listPanelCommands: IContextualMenuItem[] = [];
    listPanelCommands.push({
      icon: "BoxAdditionSolid",
      key: "Add All Lists",
      name: "Add All Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: (event, item) => {

        for (let item of this.state.securityInfo.lists) {
          if (item instanceof SPList) {
            item.isSelected = true;
          }
        }
        this.setState(this.state);
      }
    });
    listPanelCommands.push({
      icon: "BoxSubtractionSolid",
      key: "Remove All Lists",
      name: "Remove All Lists",
      itemType: ContextualMenuItemType.Normal,
      onClick: (event, item) => {
        for (let item of this.state.securityInfo.lists) {
          if (item instanceof SPList) {
            item.isSelected = false;
          }
        }
        this.setState(this.state);
      }

    });
    let commands: IContextualMenuItem[] = [];
    if (this.props.letUserSelectPermission) {

      commands.push({
        icon: "AzureKeyVault",
        key: "SecurityLevel2",
        name: "Permission",
        itemType: ContextualMenuItemType.Normal,
        onClick: (event, item) => {
          this.setState((current) => ({ ...current, showPermissionsPanel: !current.showPermissionsPanel }));
        }
      }
      );
    }
    if (this.props.letUserSelectUsers) {
      commands.push({
        icon: "People",
        key: "Users",
        name: "Users",
        itemType: ContextualMenuItemType.Normal,
        onClick: (event, item) => {
          this.setState((current) => ({ ...current, showUserPanel: !current.showUserPanel }));
        }
      });
    }
    if (this.props.letUserSelectLists) {

      commands.push({
        icon: "PageListSolid",
        key: "Lists",
        name: "Lists",
        itemType: ContextualMenuItemType.Normal,
        onClick: (event, item) => {
          this.setState((current) => ({ ...current, showListPanel: !current.showListPanel }));
        }
      });
    }
    commands.push({

      key: "DisplayMode",
      title: "DisplayMode",
      name: this.state.showEmail ? "Show Email" : "Show Name",
      itemType: ContextualMenuItemType.Normal,
      subMenuProps: {
        items: [{
          key: "ShowName",
          name: "Show Name",
          onClick: (event, item) => {
            this.setState((current) => ({ ...current, showEmail: false }));
          }
        },
        {
          key: "ShowEmail",
          name: "Show Email",
          onClick: (event, item) => {
            this.setState((current) => ({ ...current, showEmail: true }));
          }
        }]
      }
    });
    let effectivePermissions = this.state.selectedPermissions.filter((sp) => { return sp.isChecked; })
    let columns: Array<IColumn> = [
      {
        key: "title", name: "Title", isResizable: true, fieldName: "title",
        minWidth: this.props.listTitleColumnWidth, maxWidth: this.props.listTitleColumnWidth,
        onRender: this.renderTitle, isRowHeader: true
      },
    ];
    let displayColumns: IColumn[] = this.addUserColumns(columns, this.state.securityInfo.siteUsers, effectivePermissions);


    let displayItems: (SPList | SPListItem)[] = filter(this.state.securityInfo.lists, (item) => {
      return (
        (item instanceof SPList && item.isSelected)
        ||
        ((item instanceof SPListItem) && (this.parentIsExpanded(item)))
      )
    })

    let errorMessages = [];
    for (let error of this.state.errors) {
      errorMessages.push(<li>{error}</li>)
    }

    return (
      <div >
        <ul>{errorMessages}</ul>
        <CommandBar
          items={commands}
        />
        <br />
        <Legend
          selectedPermissions={this.state.selectedPermissions}
          checkUncheckPermission={(e) => {
            //debugger;
            this.checkUncheckPermission(e);

          }
          }
        />
        <DetailsList
          items={displayItems}
          columns={displayColumns}
          selectionMode={SelectionMode.none}
          className={styles.SPFXSecurityGrid}

        />
        <SelectedPermissionsPanel
          isOpen={this.state.showPermissionsPanel}
          SelectedPermissions={this.props.selectedPermissions}
          onPropertyChange={(propertyName: string, oldValue: Array<ISelectedPermission>, newValue: Array<ISelectedPermission>) => {

            this.setState((current) => ({ ...current, selectedPermissions: newValue }));
          }}
          closePanel={() => {

            this.setState((current) => ({ ...current, showPermissionsPanel: false }));
          }}

        >

        </SelectedPermissionsPanel>
        <Panel
          isBlocking={false}
          isOpen={this.state.showUserPanel}
          onDismiss={this.setShowUserPanel(false)}
          type={PanelType.medium}
          headerText='Select Users'
          closeButtonAriaLabel='Close'>
          <CommandBar items={userPanelCommands} />
          <DetailsList
            selection={this.userSelection}
            selectionMode={SelectionMode.none}
            items={this.state.securityInfo.siteUsers}
            columns={[
              {
                key: "isSelected", name: "Select", fieldName: "isSelected", minWidth: 30, onRender: (item) => <Checkbox
                  checked={item.isSelected}
                  onChange={(element, value) => { this.selectUser(item.id, value); }}
                />
              },
              { key: "id", name: "Name", fieldName: "name", minWidth: 400 },
            ]}
          />

        </Panel>
        <Panel
          isBlocking={false}
          isOpen={this.state.showListPanel}
          onDismiss={this.setShowListPanel(false)}
          type={PanelType.medium}
          headerText='Select Lists'
          closeButtonAriaLabel='Close'>
          <CommandBar items={listPanelCommands} />

          <DetailsList

            selection={this.listSelection}
            selectionMode={SelectionMode.none}
            items={filter(this.state.securityInfo.lists, (l) => {
              return l instanceof SPList;
            })}
            columns={[
              {
                key: "isSelected", name: "Select", fieldName: "isSelected", minWidth: 30,
                onRender: (item) => <Checkbox
                  checked={item.isSelected}
                  onChange={(element, value) => { this.selectList(item.id, value); }}
                />
              },

              { key: "id", name: "Title", fieldName: "title", minWidth: 500 },
            ]}
          />

        </Panel>

      </div>
    )

  }
}
