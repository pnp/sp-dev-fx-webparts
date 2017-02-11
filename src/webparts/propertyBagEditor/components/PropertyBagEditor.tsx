
import * as React from 'react';
import { css } from 'office-ui-fabric-react';
//import styles from './PropertyBagEditor.module.scss';
import { IPropertyBagEditorProps } from './IPropertyBagEditorProps';
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import * as _ from "lodash";
require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');
import { DetailsList, DetailsRow, DetailsListLayoutMode, IColumn, SelectionMode, CheckboxVisibility } from "office-ui-fabric-react/lib/DetailsList";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IPropertyBagEditorState {
  displayProps: Array<{ name: string, value: string, searchable?: boolean }>;
  selectedIndex: number;
  searchableProps: Array<String>
}
export default class PropertyBagEditor extends React.Component<IPropertyBagEditorProps, IPropertyBagEditorState> {

  public constructor(props: IPropertyBagEditorProps) {
    super(props);
    this.state = { searchableProps: [], displayProps: [], selectedIndex: -1 };
  }
  private setSPProperty(name: string, value: string) {
    const self = this;
    return new Promise((resolve, reject) => {
      var webProps
      var clientContext = new SP.ClientContext(this.props.siteUrl);
      var web = clientContext.get_web();
      webProps = web.get_allProperties();
      webProps.set_item(name, value);
      web.update();
      webProps = web.get_allProperties();
      clientContext.load(web);
      clientContext.load(webProps);
      clientContext.executeQueryAsync(
        function (sender, args) {
          debugger;
          resolve()
        },
        function (sender, args) {
          console.log("error");
          reject();
        });
    })
  }
  private mapPropsToDisplayProps(AllProperties: any) {
    for (const prop in AllProperties) {
      const displayProp = _.find(this.state.displayProps, p => { return p.name === prop; });
      if (displayProp) {
        displayProp.value = AllProperties[prop];
        const sp = _.find(this.state.searchableProps, sp => { return sp === prop })
        if (sp) {
          displayProp.searchable = true;
        }
        else {
          displayProp.searchable = false;
        }

      }
    }
    this.setState(this.state);
  }
  public savesearchableProps(sp: string) {
    var decodedData = window.atob(sp); // decode the string12
    this.state.searchableProps = decodedData.split("|");
    this.setState(this.state);

  }
  public componentWillMount() {
    debugger;
    const editableProps: Array<string> = this.props.propertiesToEdit.split("\n");

    for (const editableProp of editableProps) {
      this.state.displayProps.push({ name: editableProp, value: "" });
    }
    const web = new Web(this.props.siteUrl);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      debugger;
      const sp = r.AllProperties["vti_indexedpropertykey"];
      this.savesearchableProps(sp);
      this.mapPropsToDisplayProps(r.AllProperties);
    });
  }
  public onActiveItemChanged(item?: any, index?: number) {
    debugger;
    this.state.selectedIndex = index;
    this.setState(this.state);
  }
  public propertyChanged(event, domnode) {
    debugger;
    const propname = this.state.displayProps[this.state.selectedIndex].name;
    const newValue = event.target.value;
    this.setSPProperty(propname, newValue).then(value => {
      debugger;
      this.state.displayProps[this.state.selectedIndex].value = newValue;
      this.setState(this.state);
    });


  }
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    const stuff = this.state.displayProps;
    const columns: Array<IColumn> = [
      { isResizable: true, key: "name", name: "Propert Name", fieldName: "name", minWidth: 150 },
      { isResizable: true, key: "value", name: "Propert Value", fieldName: "value", minWidth: 150 },
      { isResizable: true, key: "searchable", name: "searchable", fieldName: "searchable", minWidth: 150 },
    ];
    return (
      <div>
        <DetailsList layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={columns}
          selectionMode={SelectionMode.none}
          checkboxVisibility={CheckboxVisibility.hidden}
          items={this.state.displayProps}
          onActiveItemChanged={this.onActiveItemChanged.bind(this)}
        >
        </DetailsList>
        <Panel
          isOpen={this.state.selectedIndex !== -1} hasCloseButton={true}
          isLightDismiss={true} type={PanelType.smallFixedFar}
        >
          <div>
            <span> <Label>Site Url</Label> {this.props.siteUrl}</span>
          </div>
          <div>
            <Label>Property Name</Label>
            {(this.state.selectedIndex === -1) ? "" : this.state.displayProps[this.state.selectedIndex].name}
          </div>
          <div>
            <Label>Property Value</Label>
            <TextField
              value={(this.state.selectedIndex === -1) ? "" : this.state.displayProps[this.state.selectedIndex].value}
              onBlur={this.propertyChanged.bind(this)}
            />
          </div>
             <div>
            <Label>searchable</Label>
            <Toggle label="Search" 
              checked={(this.state.selectedIndex === -1) ? undefined : this.state.displayProps[this.state.selectedIndex].searchable}
              onBlur={this.propertyChanged.bind(this)}
            />
          </div>


        </Panel>
      </div>
    );
  }
}
