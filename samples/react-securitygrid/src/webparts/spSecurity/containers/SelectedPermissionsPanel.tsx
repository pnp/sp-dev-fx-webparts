import { findIndex, filter } from "lodash";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Button, IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Icon } from '@fluentui/react/lib/Icon';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode, Selection } from "@fluentui/react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { CommandBar } from "@fluentui/react/lib/CommandBar";
import { SPPermission } from "@microsoft/sp-page-context";
import ColorIconSelectorDialog from "./ColorIconSelectorDialog";

export interface ISelectedPemissionPanelProps {
  isOpen: boolean;
  onPropertyChange(propertyPath: string, oldValue: ISelectedPermission[], newValue: ISelectedPermission[]): void;
  closePanel: () => void;
  SelectedPermissions: ISelectedPermission[];
}

export interface ISelectedPemissionPanelState {
  SelectedPermissions: ISelectedPermission[];
  CurrentlySelectedPermission?: ISelectedPermission;
  isColorIconSelecorDialogOpen: boolean;
}

export default class SelectedPermissionsPanel extends React.Component<ISelectedPemissionPanelProps, ISelectedPemissionPanelState> {
  private selection: Selection;
  private columns: IColumn[] = [
    {
      key: 'permission',
      name: 'Permission',
      fieldName: 'permission',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: ISelectedPermission) => {
        return (
          <Dropdown
            options={this.getPermissionTypes()}
            defaultSelectedKey={item.permission}
            onChange={(event, option) => {
              const sps = [...this.state.SelectedPermissions];
              item.permission = option?.text ?? '';
              this.setState({ SelectedPermissions: [...sps] });
            }}
          />
        );
      }
    },
    {
      key: 'freindlyName',
      name: 'Name in Legend',
      fieldName: 'freindlyName',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: ISelectedPermission) => {
        return <div>{item.freindlyName}</div>;
      }
    },
    {
      key: 'color',
      name: 'Display',
      fieldName: 'color',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISelectedPermission) => {
        return (
          <div>
            <Icon iconName={item.iconName} style={{ color: item.color, paddingRight: '10px' }} />
            <Button
              onClick={() => {
                this.setState({
                  isColorIconSelecorDialogOpen: true,
                  CurrentlySelectedPermission: item
                });
              }}
            >
              Edit Permission
            </Button>
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
      onRender: (item: ISelectedPermission, index: number) => {
        return (
          <div>
            <IconButton
              iconProps={{ iconName: 'Up' }}
              disabled={index === 0}
              onClick={() => this.moveColumnUp(item)}
            />
            <IconButton
              iconProps={{ iconName: 'Down' }}
              disabled={index === this.state.SelectedPermissions.length - 1}
              onClick={() => this.moveColumnDown(item)}
            />
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => this.removeColumn(item)}
            />
          </div>
        );
      }
    }
  ];

  constructor(props: ISelectedPemissionPanelProps) {
    super(props);
    this.selection = new Selection();
    this.state = {
      SelectedPermissions: props.SelectedPermissions,
      isColorIconSelecorDialogOpen: false
    };
  }

  public getPermissionTypes(): IDropdownOption[] {
    const perms: IDropdownOption[] = [];
    for (const perm in SPPermission) {
      if (typeof SPPermission[perm as keyof typeof SPPermission] === "object") {
        perms.push({
          text: perm,
          key: perm,
          disabled: findIndex(this.state.SelectedPermissions, sp => sp.permission === perm) !== -1
        });
      }
    }
    return perms;
  }

  private removeColumn(column: ISelectedPermission): void {
    const sps = filter(this.state.SelectedPermissions, (o: ISelectedPermission) => o.permission !== column.permission);
    this.setState({ SelectedPermissions: sps });
  }

  private removeAllColumns(): void {
    this.setState({ SelectedPermissions: [] });
  }

  private moveColumnUp(column: ISelectedPermission): void {
    const sps = [...this.state.SelectedPermissions];
    const index = findIndex(sps, sp => sp.permission === column.permission);
    if (index > 0) {
      [sps[index - 1], sps[index]] = [sps[index], sps[index - 1]];
      this.setState({ SelectedPermissions: sps });
    }
  }

  private moveColumnDown(column: ISelectedPermission): void {
    const sps = [...this.state.SelectedPermissions];
    const index = findIndex(sps, sp => sp.permission === column.permission);
    if (index < sps.length - 1) {
      [sps[index], sps[index + 1]] = [sps[index + 1], sps[index]];
      this.setState({ SelectedPermissions: sps });
    }
  }

  private saveChanges(): void {
    this.props.onPropertyChange("SelectedPermissions", this.props.SelectedPermissions, this.state.SelectedPermissions);
    this.onClosePanel();
  }

  private onClosePanel(): void {
    this.props.closePanel();
  }

  public render(): JSX.Element {
    return (
      <Panel
        isOpen={this.props.isOpen}
        hasCloseButton={true}
        onDismiss={() => this.onClosePanel()}
        isLightDismiss={true}
        type={PanelType.largeFixed}
        headerText="Select Permissions"
      >
        <Label>The grid will display the color of the first match, so list permissions from most restricted to least restricted (i.e. manageLists, then deleteListItems, then viewListItems)</Label>
        <CommandBar
          items={[
            {
              key: "AddColumns",
              name: "Add a Permission",
              icon: "Add",
              onClick: () => {
                this.setState({
                  isColorIconSelecorDialogOpen: true,
                  CurrentlySelectedPermission: { color: '', freindlyName: '', iconName: '', permission: '' }
                });
              }
            },
            {
              key: "ClearAllColumns",
              name: "Remove All Permissions",
              icon: "Delete",
              onClick: () => this.removeAllColumns()
            },
            {
              key: "save",
              name: "Save",
              icon: "Save",
              onClick: () => this.saveChanges()
            }
          ]}
        />
        {this.state.isColorIconSelecorDialogOpen && (
          <ColorIconSelectorDialog
            isOpen={this.state.isColorIconSelecorDialogOpen}
            SelectedPermissions={this.state.SelectedPermissions}
            title={`Edit Icon and color for ${this.state.CurrentlySelectedPermission?.permission}`}
            subText={`Edit Icon and color for ${this.state.CurrentlySelectedPermission?.permission}`}
            currentPerm={this.state.CurrentlySelectedPermission}
            closePanel={() => this.setState({ isColorIconSelecorDialogOpen: false })}
            onPermissionChange={(perm: ISelectedPermission) => {
              const sps = [...this.state.SelectedPermissions];
              const idx = findIndex(sps, sp => sp.permission === perm.permission);
              if (idx === -1) {
                sps.push(perm);
              } else {
                sps[idx] = perm;
              }
              this.setState({ SelectedPermissions: sps });
            }}
          />
        )}
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
