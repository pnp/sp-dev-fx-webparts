import { Guid } from "@microsoft/sp-core-library";
import * as _ from "underscore";
import { ColumnDefinitionContainerNative } from "./ColumnDefinitionContainer";
import ColumnDefinition from "../model/ColumnDefinition";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as strings from "spfxReactGridStrings";
export interface IPropertyFieldColumnDefinitionsHostProps {
  label: string;
  initialValue?: Array<ColumnDefinition>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  columnDefinitions: Array<ColumnDefinition>;
}
export interface IPropertyFieldColumnDefinitionsHostState {
  openPanel?: boolean;
  columnDefinitions: Array<ColumnDefinition>;
}
export default class PropertyFieldColumnDefinitionsHost extends React.Component<IPropertyFieldColumnDefinitionsHostProps, IPropertyFieldColumnDefinitionsHostState> {

  constructor(props: IPropertyFieldColumnDefinitionsHostProps) {

    super(props);
    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.removeColumn = this.removeColumn.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.moveColumnDown = this.moveColumnDown.bind(this);
    this.moveColumnUp = this.moveColumnUp.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      columnDefinitions: this.props.columnDefinitions,
      openPanel: false
    };
  }
  private addColumn(): void {
    const id = Guid.newGuid();
    const col: ColumnDefinition = new ColumnDefinition(id.toString(), "", 80, true);
    this.state.columnDefinitions.push(col);
    this.setState(this.state);
  }
  private removeColumn(column): void {
    this.state.columnDefinitions = _.filter(this.state.columnDefinitions, (o) => { return o.guid !== column.guid; });
    this.setState(this.state);
  }
  private removeAllColumns(): void {
    this.state.columnDefinitions = [];
    this.setState(this.state);

  }
  private moveColumnUp(column: ColumnDefinition): void {

    const index = _.findIndex(this.state.columnDefinitions, (cd) => cd.guid === column.guid);
    this.state.columnDefinitions[index] = this.state.columnDefinitions.splice(index - 1, 1, this.state.columnDefinitions[index])[0];
    this.setState(this.state);
  }
  private moveColumnDown(column): void {

    const index = _.findIndex(this.state.columnDefinitions, (cd) => cd.guid === column.guid);
    this.state.columnDefinitions[index] = this.state.columnDefinitions.splice(index + 1, 1, this.state.columnDefinitions[index])[0];
    this.setState(this.state);

  }
  private saveChanges(): void {
    if (this.props.onPropertyChange) {
      this.props.onPropertyChange("ColumnDefinitions", this.props.initialValue, this.state.columnDefinitions);
      this.onClosePanel();
    }
  }
  private onOpenPanel(element?: any): void {

    this.state.openPanel = true;
    this.setState(this.state);
  }
  private onClosePanel(element?: any): void {
    this.state.openPanel = false;
    this.setState(this.state);
  }
  public render(): JSX.Element {

    //Renders content
    return (
      <div style={{ marginBottom: '8px' }}>
        <Label>{this.props.label}</Label>
        <Button onClick={this.onOpenPanel}>{strings.ColumnDefinitionsButtonSelect}</Button>
        {this.state.openPanel === true ?
          <Panel
            isOpen={this.state.openPanel} hasCloseButton={true} onDismiss={this.onClosePanel}
            isLightDismiss={true} type={PanelType.large}
            headerText={strings.ColumnDefinitionsTitle}>
            <ColumnDefinitionContainerNative
              columns={this.state.columnDefinitions}
              addColumn={this.addColumn}
              moveColumnDown={this.moveColumnDown}
              moveColumnUp={this.moveColumnUp}
              removeAllColumns={this.removeAllColumns}
              removeColumn={this.removeColumn}
              save={this.saveChanges}
              />

          </Panel>
          : ''}

      </div>
    );
  }
}



