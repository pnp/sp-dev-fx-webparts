import * as React from "react";
//import styles from "./SpSecurity.module.scss";
import { ISpSecurityProps } from "./ISpSecurityProps";
import { ISpSecurityState } from "./ISpSecurityState";

import SPSecurityService from "../../SPSecurityService";
import { SPListItem, SPList, SPSiteUser, Helpers } from "../../SPSecurityService";
import { SPPermission } from "@microsoft/sp-page-context";
import { indexOf, findIndex, find, filter, } from "lodash";
import { DetailsList, IColumn, SelectionMode, IDetailsRowProps, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

/* tslint:disable */
require('./spSecurity.css'); // loads the SpSecurity,css with unmodified names
export default class SpSecurity extends React.Component<ISpSecurityProps, ISpSecurityState> {
  private svc: SPSecurityService = new SPSecurityService("ss");
  private userSelection = new Selection();
  private listSelection = new Selection();

  constructor(props: any) {
    super(props);
    this.state = {
      securityInfo: { siteUsers: [], siteGroups: [], roleDefinitions: [], lists: [] },
      permission: this.props.permission,
      showUserPanel: false,
      showListPanel: false,
      showEmail: this.props.showEmail

    };
    this.getIcon = this.getIcon.bind(this);
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

  public componentWillMount(): void {

    this.svc.loadData(this.props.showHiddenLists, this.props.showCatalogs, this.props.graphHttpClient, false).then((response) => {
      const state: ISpSecurityState = {
        securityInfo: response,
        permission: this.props.permission,
        showUserPanel: false,
        showListPanel: false,
        showEmail: this.props.showEmail

      };

      // inlclude\exclude lists selected in property pane
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
    }).catch((err) => {
      debugger;
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

      }).catch((err) => {
        debugger;
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
  public getIcon(item?: any, index?: number, column?: IColumn): string {
    let classname: string = "";
    if (item.itemCount === 0) {
      return "FabricFolderFill";
    } else {
      return "FabricFolder";

    }

  }
  public renderTitle(item?: any, index?: number, column?: IColumn): any {
    let classname: string = "";
    if (item instanceof SPListItem) {
      classname = "ms-u-smOffset" + (item.level);
    }

    return (
      <div className={classname}>
        <div style={{ float: "left" }}>
          <Icon iconName={this.getIcon(item, index, column)} onClick={(e) => {

            this.expandCollapseList(item);
          }} />
        </div>
        <div>&nbsp;{item.title}</div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
  public renderUserItem(item?: any, index?: number, column?: IColumn): any {

    let user: SPSiteUser = find(this.state.securityInfo.siteUsers, (su) => {
      return su.id.toString() === column.key;
    });
    if (Helpers.doesUserHavePermission(item, user, SPPermission[this.state.permission],
      this.state.securityInfo.roleDefinitions, this.state.securityInfo.siteGroups)) {
      return (
        <Icon iconName="CircleFill" onClick={(e) => {
          this.expandCollapseList(item);
        }} />
      );
    } else {

      return (
        <Icon iconName="LocationCircle" onClick={(e) => {
          this.expandCollapseList(item);
        }} />
      );
    }
  }
  public renderUserSelected(item?: SPSiteUser, index?: number, column?: IColumn): any {

    return (
      <Checkbox checked={item.isSelected} />
    )

  }
  public addUserColumns(columns: IColumn[], users: SPSiteUser[]): IColumn[] {
    for (let user of users) {
      if (user.isSelected) {
        if (
          (user.principalType === 1 && this.props.showUsers)
          ||
          (user.principalType === 4 && this.props.showSecurityGroups)
        )
          columns.push({
            key: user.id.toString(),
            name: this.state.showEmail ? user.upn : user.name,
            fieldName: "",
            minWidth: 20,
            maxWidth: 20,
            onRender: this.renderUserItem,
            headerClassName: "rotatedColumnHeader",

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

  public render(): React.ReactElement<ISpSecurityProps> {
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
        title: "Permission",
        name: "Permission:",
        key:
          "permissionlabel"

      })
      commands.push({
        icon: "AzureKeyVault",
        key: "SecurityLevel",
        title: "Permission",
        label: "sss",
        name: this.state.permission ? this.state.permission : "Select Permission",
        itemType: ContextualMenuItemType.Normal,
        items: this.getPermissionLevels()
      });
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
      items: [{
        key: "ShowName",
        name: "Show Name",
        onClick: (event, item) => {
          debugger;
          this.setState((current) => ({ ...current, showEmail: false }));
        }

      },
      {
        key: "ShowEmail",
        name: "Show Email",
        onClick: (event, item) => {
          debugger;
          this.setState((current) => ({ ...current, showEmail: true }));
        }

      }]
    });

    let columns: Array<IColumn> = [
      { key: "title", name: "Title", isResizable: true, fieldName: "title", minWidth: this.props.listTitleColumnWidth, maxWidth: this.props.listTitleColumnWidth, onRender: this.renderTitle, isRowHeader: true },
    ];
    let displayColumns: IColumn[] = this.addUserColumns(columns, this.state.securityInfo.siteUsers);


    let displayItems: (SPList | SPListItem)[] = filter(this.state.securityInfo.lists, (item) => {
      const isAList = item instanceof SPList;
      const isAListItem = item instanceof SPListItem;
      return (

        (item instanceof SPList && item.isSelected)
        ||
        ((item instanceof SPListItem) && (this.parentIsExpanded(item)))
      )
    })
    return (
      <div >
        <CommandBar
          items={commands}
        />
        <DetailsList
          items={displayItems}
          columns={displayColumns}
          selectionMode={SelectionMode.none}
          className="SPFXSecurityGrid"

        />
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
            items={this.state.securityInfo.lists}
            columns={[
              {
                key: "isSelected", name: "Select", fieldName: "isSelected", minWidth: 30, onRender: (item) => <Checkbox
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
