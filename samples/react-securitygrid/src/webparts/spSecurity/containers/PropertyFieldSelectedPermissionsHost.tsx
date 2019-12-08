
import { findIndex, filter } from "underscore";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ColorPicker, IColorPickerProps } from "office-ui-fabric-react/lib/ColorPicker";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SPPermission } from "@microsoft/sp-page-context";
import { IColor } from "office-ui-fabric-react/lib/Color";
import SelectedPermissionsPanel from "./SelectedPermissionsPanel"
export interface IPropertyFieldSelectedPermissionsHostProps {
  label: string;
  initialValue?: Array<ISelectedPermission>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  SelectedPermissions: Array<ISelectedPermission>;
}
export interface IPropertyFieldSelectedPermissionsHostState {
  openPanel?: boolean;
  SelectedPermissions: Array<ISelectedPermission>;
}
export default class PropertyFieldSelectedPermissionsHost extends React.Component<IPropertyFieldSelectedPermissionsHostProps, IPropertyFieldSelectedPermissionsHostState> {
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
      onRender: (item?: any, index?: number, column?: IColumn) => {

        return (
          <ColorPicker
            color={item.color}
            onChange={(event: React.FormEvent<HTMLDivElement>, color: IColor) => {
              var sps = this.state.SelectedPermissions;
              item.color = color;
              this.setState((current) => ({ ...current, SelectedPermissions: [...this.state.SelectedPermissions] }));

            }}>
          </ColorPicker>
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
  constructor(props: IPropertyFieldSelectedPermissionsHostProps) {
    super(props);
    debugger;
    this.state = {
      SelectedPermissions: this.props.SelectedPermissions,
      openPanel: false
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
    debugger;
    if (this.props.onPropertyChange) {
      this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, this.state.SelectedPermissions);
      this.setState((current) => ({ ...current, SelectedPermissions: [...this.state.SelectedPermissions] }));
      this.onClosePanel();
    }
  }
  private onOpenPanel(element?: any): void {
    this.setState((current) => ({ ...current, openPanel: true }));
  }
  private onClosePanel(element?: any): void {
    debugger;
    this.setState((current) => ({ ...current, openPanel: false }));
  }
  public render(): JSX.Element {
    debugger;
    //This Details list Renders  the short list of permissions in the panel
    return (
      <div style={{ marginBottom: '8px' }}>
        <Label>{this.props.label}</Label>
        <DetailsList
          items={this.state.SelectedPermissions}
          columns={this.panelColumns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
        />
        <Button
          onClick={(e) => this.onOpenPanel()}>
          Edit Permissions and Colors
          </Button>

        <SelectedPermissionsPanel
          isOpen={this.state.openPanel}
          onPropertyChange={(prop,oldval,newval)=>{
            debugger;
            this.setState((current) => ({ ...current, SelectedPermissions: [...newval] }));
            this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, newval);
    

          }}
          closePanel={() => { this.onClosePanel() }}
          SelectedPermissions={this.props.SelectedPermissions}

        />
      </div>
    );
  }
}


