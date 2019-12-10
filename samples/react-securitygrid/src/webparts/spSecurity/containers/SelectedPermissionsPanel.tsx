
import { findIndex, filter, first } from "underscore";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode, Selection } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SPPermission } from "@microsoft/sp-page-context";
import ColorIconSelectorDialog from "./ColorIconSelectorDialog"
import { disableBodyScroll } from "@uifabric/utilities";

export interface ISelectedPemissionPanelProps {
  isOpen: boolean;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  closePanel(): void;

  SelectedPermissions: Array<ISelectedPermission>;
}
export interface ISelectedPemissionPanelState {

  SelectedPermissions: Array<ISelectedPermission>;
  CurrentlySelectedPermission?: ISelectedPermission;
  isColorIconSelecorDialogOpen: boolean;
}
export default class SelectedPermissionsPanel extends React.Component<ISelectedPemissionPanelProps, ISelectedPemissionPanelState> {
  private selection: Selection;
  columns: IColumn[] = [
    {
      key: 'permission',
      name: 'Permission',
      fieldName: 'permission',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: (item?: any, index?: number, column?: IColumn) => {

        return (
          <Dropdown
            options={this.getPermissionTypes()}
            defaultSelectedKey={item.permission}
            onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
              var sps = this.state.SelectedPermissions;
              item.permission = option.text;
              this.setState((current) => ({ ...current, SelectedPermissions: [...this.state.SelectedPermissions] }));

            }}>
          </Dropdown>
        );
      }
    },
    {
      key: 'freindlyName',
      name: 'Name in Legend',
      fieldName: 'freindlyName',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true
    
    },
    {
      key: 'color',
      name: 'Display',
      fieldName: 'color',
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      onRender: (item?: ISelectedPermission, index?: number, column?: IColumn) => {
        debugger;
        //var clr: string = item.color ? item.color : null;
        return (
          <div>
            <Icon iconName={item.iconName} style={{ color: item.color }} />

            <Button onClick={(e) => {
              this.setState((current) => ({
                ...current,
                isColorIconSelecorDialogOpen: true,
                CurrentlySelectedPermission: item
              }));
            }}>Edit Display</Button>
          </div>
        );


      }

    },
    {
      key: 'commands',
      name: '',
      fieldName: 'color',
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: (item?: any, index?: number, column?: IColumn) => {
        return (
          <div>
            <IconButton
              iconProps={{ iconName: 'Up', }}
              style={{ display: index === 0 ? "none" : "normal" }}
              onClick={(e) => {
                debugger;
                this.moveColumnUp(item);
              }}>
            </IconButton>

            <IconButton
              iconProps={{ iconName: 'Down', }}
              style={{ display: index === this.state.SelectedPermissions.length - 1 ? "none" : "normal" }}
              onClick={(e) => {
                debugger;
                this.moveColumnDown(item);
              }}>
            </IconButton>

            <IconButton
              iconProps={{ iconName: 'Delete', }}
              onClick={(e) => {
                debugger;
                this.removeColumn(item);
              }}>
            </IconButton>
          </div>
        );
      }

    },

  ];
  constructor(props: ISelectedPemissionPanelProps) {
    super(props);
    debugger;
    this.selection = new Selection({
      onSelectionChanged: () => console.log("onSelectionChanged...")
    });
    this.state = {
      SelectedPermissions: this.props.SelectedPermissions,
      isColorIconSelecorDialogOpen: false,

    };
  }
  public getPermissionTypes(): IDropdownOption[] {
    let perms = new Array<IDropdownOption>();
    for (const perm in SPPermission) {
      if (typeof (SPPermission[perm]) === "object") {
        perms.push({
          text: perm,
          key: perm,
          disabled: findIndex(this.state.SelectedPermissions, (sp: ISelectedPermission) => { return sp.permission == perm }) !== -1
        });
      }
    }
    return perms;
  }

  private addColumn(): void {
    debugger;
    let unusedPermission = first(filter(this.getPermissionTypes(), (pt) => { return !pt.disabled }));
    if (unusedPermission) {

      const col: ISelectedPermission = {
        "permission": unusedPermission.text,
        "freindlyName": unusedPermission.text,
        color: "FFFFFF",
        iconName: "Blocked"
      };
      var sp = this.state.SelectedPermissions;
      sp.push(col);
      this.setState((current) => ({ ...current, SelectedPermissions: [...sp] }));
    }
  }
  private removeColumn(column: ISelectedPermission): void {
    var sps = filter(this.state.SelectedPermissions, (o: ISelectedPermission) => { return o.permission !== column.permission; });
    this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
  }
  private removeAllColumns(): void {
    this.setState((current) => ({ ...current, SelectedPermissions: [] }));
  }
  private moveColumnUp(column: ISelectedPermission): void {

    var sps: ISelectedPermission[] = this.state.SelectedPermissions;
    const index = findIndex(sps, (sp: ISelectedPermission) => { debugger; return sp.permission == column.permission });
    if (index != -1) {
      sps[index] = sps.splice(index - 1, 1, sps[index])[0];
      this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
    }
  }
  private moveColumnDown(column: ISelectedPermission): void {

    var sps: ISelectedPermission[] = this.state.SelectedPermissions;
    const index = findIndex(sps, (sp: ISelectedPermission) => { debugger; return sp.permission == column.permission });
    if (index != -1) {
      sps[index] = sps.splice(index + 1, 1, sps[index])[0];
      this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
    }
  }
  private saveChanges(): void {
    if (this.props.onPropertyChange) {
      debugger;
      this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, this.state.SelectedPermissions);
      this.onClosePanel();
    }
  }
  private onOpenPanel(element?: any): void {
    this.setState((current) => ({ ...current, openPanel: true }));
  }
  private onClosePanel(element?: any): void {
    this.props.closePanel();
  }
  public render(): JSX.Element {

    //Renders content
    return (

      <Panel
        isOpen={this.props.isOpen} hasCloseButton={true}
        onDismiss={() => this.onClosePanel()}
        isLightDismiss={true} type={PanelType.largeFixed}
        headerText="Select Permissions" >
        <Label>The grid will display the color of the first match, so list permissions from most restricted to least restricted (i.e. manageLists, then deleteListItems, then viewListItems)</Label>
        <CommandBar items={[{
          key: "AddColumns",
          name: "Add a Permission",
          icon: "Add",
          onClick: () => {
            this.addColumn();
          }

        },
        {
          key: "ClearAllColums",
          name: "Remove All Permissions",
          canCheck: true,
          icon: "Delete",
          onClick: () => {
            this.removeAllColumns();
          }

        },
        {
          key: "save",
          name: "Save",
          canCheck: true,
          icon: "Save",
          onClick: () => {

            this.saveChanges();
          }

        }

        ]} />
        {this.state.isColorIconSelecorDialogOpen &&
          <ColorIconSelectorDialog
            isOpen={this.state.isColorIconSelecorDialogOpen}

            title={`Edit Icon and color for ${this.state.CurrentlySelectedPermission.permission}`}
            subText={`Edit Icon and color for ${this.state.CurrentlySelectedPermission.permission}`}
            selectedColor={this.state.CurrentlySelectedPermission.color}
            selectedIcon={this.state.CurrentlySelectedPermission.iconName}
            freindlyName={this.state.CurrentlySelectedPermission.freindlyName}
            closePanel={() => {
              debugger;
              this.setState((current) => ({ ...current, isColorIconSelecorDialogOpen: false }));
            }}
            onPropertyChange={(field, oldvalue, newValue) => {
              debugger;
              switch (field) {
                case "selectedColor":
                  var sps = this.state.SelectedPermissions;
                  const idx = findIndex(sps, (sp: ISelectedPermission) => { debugger; return sp.permission == this.state.CurrentlySelectedPermission.permission; });
                  sps[idx].color = newValue;
                  this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
                  break;
                case "selectedIcon":
                  var sps = this.state.SelectedPermissions;
                  const idx2 = findIndex(sps, (sp: ISelectedPermission) => { debugger; return sp.permission == this.state.CurrentlySelectedPermission.permission; });
                  sps[idx2].iconName = newValue;
                  this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
                  break;
                case "freindlyName":
                  var sps = this.state.SelectedPermissions;
                  const idx3 = findIndex(sps, (sp: ISelectedPermission) => { debugger; return sp.permission == this.state.CurrentlySelectedPermission.permission; });
                  sps[idx3].freindlyName = newValue;
                  this.setState((current) => ({ ...current, SelectedPermissions: [...sps] }));
                  break;
                default:
              }
            }}
          />
        }
        <DetailsList
          items={this.state.SelectedPermissions}
          columns={this.columns}
          selectionMode={SelectionMode.single}
          layoutMode={DetailsListLayoutMode.justified}
          selection={this.selection}
        />
      </Panel>

    );
  }
}


