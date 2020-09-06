

import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import {  IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";


import { SPPermission } from "@microsoft/sp-page-context";

import SelectedPermissionsPanel from "./SelectedPermissionsPanel";
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
  public panelColumns: IColumn[] = [
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
      key: 'freindlyName',
      name: 'Name in Legend',
      fieldName: 'freindlyName',
      minWidth: 90,
      maxWidth: 90,
      isResizable: true,
      onRender: (item?: any, index?: number, column?: IColumn) => {
        return (
          <div>
            {item.freindlyName}
          </div>
        );
      }
    },
    {
      key: 'color',
      name: 'Display',
      fieldName: 'color',
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: (item?: ISelectedPermission, index?: number, column?: IColumn) => {
        return (
          <Icon iconName={item.iconName} style={{ color: item.color }} />
        );
      }
    }
  ];
  constructor(props: IPropertyFieldSelectedPermissionsHostProps) {
    super(props);
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
  private onOpenPanel(element?: any): void {
    this.setState((current) => ({ ...current, openPanel: true }));
  }
  private onClosePanel(element?: any): void {
    //debugger;
    this.setState((current) => ({ ...current, openPanel: false }));
  }
  public render(): JSX.Element {
    //debugger;
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
          onPropertyChange={(prop, oldval, newval) => {
            this.setState((current) => ({ ...current, SelectedPermissions: [...newval] }));
            this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, newval);


          }}
          closePanel={() => { this.onClosePanel(); }}
          SelectedPermissions={this.props.SelectedPermissions}

        />
      </div>
    );
  }
}


