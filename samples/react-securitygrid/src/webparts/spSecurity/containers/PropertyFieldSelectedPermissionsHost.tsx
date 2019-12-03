import { Guid } from "@microsoft/sp-core-library";
import * as _ from "underscore";
import { SelectedPermissionsContainerNative } from "./SelectedPermissionsContainer";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DetailsList, IColumn, DetailsListLayoutMode } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ColorPicker, IColorPickerProps } from "office-ui-fabric-react/lib/ColorPicker";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItemProps, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { SPPermission } from "@microsoft/sp-page-context";
import { Item } from "@pnp/sp";
import { IColor } from "office-ui-fabric-react";

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
        debugger;
        return (
          <Dropdown 
          options={this.getPermissionTypes()}
          defaultSelectedKey={item.permission} 
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number)=>{
            var cds= this.state.SelectedPermissions;
            item.permission=option.text;
            this.setState((current) => ({ ...current, SelectedPermissions:[...this.state.SelectedPermissions] }));
            debugger;

          }}>
            </Dropdown>
        );
      }
    },
    {
      key: 'color',
      name: 'Colour',
      fieldName: 'color',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item?: any, index?: number, column?: IColumn) => {
        debugger;
        return (
          <ColorPicker 
          color={item.color}
          onChange={(event: React.FormEvent<HTMLDivElement>, color:IColor)=>{
            var cds= this.state.SelectedPermissions;
            item.color=color;
            this.setState((current) => ({ ...current, SelectedPermissions:[...this.state.SelectedPermissions] }));
            debugger;

          }}>
            </ColorPicker>
        );
      }

    }
  ];
  constructor(props: IPropertyFieldSelectedPermissionsHostProps) {

    super(props);
    debugger;
    // this.onOpenPanel = this.onOpenPanel.bind(this);
    // this.onClosePanel = this.onClosePanel.bind(this);
    // this.removeColumn = this.removeColumn.bind(this);
    // this.addColumn = this.addColumn.bind(this);
    // this.moveColumnDown = this.moveColumnDown.bind(this);
    // this.moveColumnUp = this.moveColumnUp.bind(this);
    // this.saveChanges = this.saveChanges.bind(this);
    // this.setState((current) => ({
    //   ...current,
    //   SelectedPermissions: this.props.SelectedPermissions,
    //   openPanel: false
    // }));
    this.state={
      
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
    const col: ISelectedPermission = { "permission": "viewItems", "color": "01b402" };
    var cd = this.state.SelectedPermissions;
    cd.push(col);
    this.setState((current) => ({ ...current, SelectedPermissions:[...cd] }));
    // this.setState({
    //   SelectedPermissions:[...cd,col]
    // });

  }
  private removeColumn(column): void {

    var cd = _.filter(this.state.SelectedPermissions, (o) => { return o.guid !== column.guid; });
    this.setState((current) => ({ ...current, SelectedPermissions: cd }));
  }
  private removeAllColumns(): void {
    this.setState((current) => ({ ...current, SelectedPermissions: [] }));
  }
  private moveColumnUp(column: ISelectedPermission): void {
    var cds = this.state.SelectedPermissions;
    const index = _.findIndex(cds, (cd) => cd.guid === column.permission);
    cds[index] = cds.splice(index - 1, 1, cds[index])[0];
    this.setState(this.state);
    this.setState((current) => ({ ...current, SelectedPermissions: cds }));
  }
  private moveColumnDown(column): void {
    var cds = this.state.SelectedPermissions;
    const index = _.findIndex(cds, (cd) => cd.guid === column.guid);
    cds[index] = cds.splice(index + 1, 1, cds[index])[0];
    this.setState((current) => ({ ...current, SelectedPermissions: cds }));

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
    this.setState((current) => ({ ...current, openPanel: false }));
  }
  public render(): JSX.Element {

    //Renders content
    debugger;
    var stuff = [
      {
        "permission": "XX",
        "color": "sXX",
      }
    ];
    stuff = this.state.SelectedPermissions;
    return (
      <div style={{ marginBottom: '8px' }}>
               <Label>{this.props.label}</Label>
        <Button
          onClick={(e) => this.onOpenPanel()}>
          Advanced
          </Button>
        {this.state.openPanel === true ?
          <Panel
            isOpen={this.state.openPanel} hasCloseButton={true}
            onDismiss={() => this.onClosePanel()}
            isLightDismiss={true} type={PanelType.medium}
            headerText="Select Permissions">
            <CommandBar items={[{
              key: "AddColumns",
              name: "Add a Permission",
              icon: "Add",
              onClick: () => {
                debugger;
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
                debugger;
                this.saveChanges();
              }

            }

            ]} />
            <DetailsList
              items={this.state.SelectedPermissions}
              columns={this.columns}
              layoutMode={DetailsListLayoutMode.justified}
            />
          </Panel>
          : ''}

      </div>
    );
  }
}


