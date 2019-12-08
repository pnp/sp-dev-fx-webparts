
import { findIndex, filter } from "underscore";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode, Selection } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ColorPicker, IColorPickerProps } from "office-ui-fabric-react/lib/ColorPicker";
import { SwatchColorPicker, ISwatchColorPickerProps } from "office-ui-fabric-react/lib/SwatchColorPicker";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SPPermission } from "@microsoft/sp-page-context";
import { IColor } from "office-ui-fabric-react/lib/Color";
import ColorIconSelectorDialog from "./ColorIconSelectorDialog"

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
      minWidth: 100,
      maxWidth: 200,
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
      key: 'color',
      name: 'Colour',
      fieldName: 'color',
      minWidth: 300,
      maxWidth: 300,
      isResizable: true,
      onRender: (item?: ISelectedPermission, index?: number, column?: IColumn) => {
        debugger;
        var clr: string = item.color ? item.color.str : null;



        return (
          <div>
            <Icon iconName='CircleFill' style={{ color: clr }} />

            <Button onClick={(e) => {
              this.setState((current) => ({
                ...current,
                isColorIconSelecorDialogOpen: true,
                CurrentlySelectedPermission: item
              }));
            }}>Edit Dispaly</Button>
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
              onClick={(e) => {
                debugger;
                this.moveColumnUp(item);
              }}>
            </IconButton>

            <IconButton
              iconProps={{ iconName: 'Down', }}
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
  panelColumns: IColumn[] = [
    {
      key: 'permission',
      name: 'Permission',
      fieldName: 'permission',
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      onRender: (item?: any, index?: number, column?: IColumn) => {

        return (
          <div>
            {item.permission}
          </div>
        );
      }
    },
    {
      key: 'color',
      name: 'Colour',
      fieldName: 'color',
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: (item?: any, index?: number, column?: IColumn) => {
        if (item.color) {
          return (
            <Icon iconName='CircleFill' style={{ color: item.color.str }} />
          );
        }
        else {
          return (<Icon iconName='CircleFill' />
          );
        }
      }

    }
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
    let perms = new Array();
    for (const perm in SPPermission) {
      if (typeof (SPPermission[perm]) === "object") {
        perms.push({
          text: perm,
          key: perm
        });
      }
    }
    return perms;
  }
  private addColumn(): void {
    debugger;
    const col: ISelectedPermission = { "permission": null, "color": null };
    var sp = this.state.SelectedPermissions;
    sp.push(col);
    this.setState((current) => ({ ...current, SelectedPermissions: [...sp] }));
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
            selectedIcon="CircleFill"
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

                case "selecteIcon":
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


