import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Button } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode } from "@fluentui/react/lib/DetailsList";
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";
import { SPPermission } from "@microsoft/sp-page-context";
import SelectedPermissionsPanel from "./SelectedPermissionsPanel";

export interface IPropertyFieldSelectedPermissionsHostProps {
  label: string;
  initialValue?: ISelectedPermission[]; // Updated type here
  onPropertyChange(propertyPath: string, oldValue: ISelectedPermission[], newValue: ISelectedPermission[]): void; // Updated type here
  SelectedPermissions: ISelectedPermission[];
}

export interface IPropertyFieldSelectedPermissionsHostState {
  openPanel?: boolean;
  SelectedPermissions: ISelectedPermission[];
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
      onRender: (item?: ISelectedPermission) => { // Updated type here
        return (
          <div>
            {item?.permission}
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
      onRender: (item?: ISelectedPermission) => { // Updated type here
        return (
          <div>
            {item?.freindlyName}
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
      onRender: (item?: ISelectedPermission) => { // Updated type here
        return (
          <Icon iconName={item?.iconName} style={{ color: item?.color }} />
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
    const perms: IPropertyPaneDropdownOption[] = [];
    for (const perm in SPPermission) {
      if (typeof SPPermission[perm as keyof typeof SPPermission] === "object") {
        perms.push({
          text: perm,
          key: perm
        });
      }
    }
    return perms;
  }

  private onOpenPanel(): void {
    this.setState({ openPanel: true });
  }

  private onClosePanel(): void {
    this.setState({ openPanel: false });
  }

  public render(): JSX.Element {
    return (
      <div style={{ marginBottom: '8px' }}>
        <Label>{this.props.label}</Label>
        <DetailsList
          items={this.state.SelectedPermissions}
          columns={this.panelColumns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
        />
        <Button onClick={() => this.onOpenPanel()}>
          Edit Permissions and Colors
        </Button>

        <SelectedPermissionsPanel
          isOpen={this.state.openPanel}
          onPropertyChange={(prop: string, oldval: ISelectedPermission[], newval: ISelectedPermission[]) => {
            const updatedPermissions = newval.map(newPerm => {
              const existingPermission = this.state.SelectedPermissions.find(permission => permission.permission === newPerm.permission);
              return existingPermission ? { ...existingPermission, ...newPerm } : newPerm;
            });
            this.setState({ SelectedPermissions: updatedPermissions });
            this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, updatedPermissions);
          }}
          closePanel={() => { this.onClosePanel(); }}
          SelectedPermissions={this.props.SelectedPermissions}
        />      </div>
    );
  }
}
