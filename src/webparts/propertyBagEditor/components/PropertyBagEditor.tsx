//http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html
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
import {
  IContextualMenuProps,
  IContextualMenuItem,
  DirectionalHint,
  ContextualMenu,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import {
  CommandBar
} from 'office-ui-fabric-react/lib/CommandBar';
import {
  DetailsList, DetailsRow, DetailsListLayoutMode, IColumn, SelectionMode, CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,

  DetailsListLayoutMode as LayoutMode,

  IGroup,
  Selection,

  buildColumns
} from "office-ui-fabric-react/lib/DetailsList";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IPropertyBagEditorState {
  displayProps: Array<{ name: string, value: string, searchable?: boolean }>;
  selectedIndex: number;
  searchableProps: Array<string>;
  messsage: string;
  isediting: boolean

}
export default class PropertyBagEditor extends React.Component<IPropertyBagEditorProps, IPropertyBagEditorState> {
  public refs: {
    [key: string]: React.ReactInstance;
    list: DetailsList
  };
  public constructor(props: IPropertyBagEditorProps) {
    super(props);
    this.state = { searchableProps: [], displayProps: [], selectedIndex: -1, messsage: "Hi", isediting: false };
  }
  /**Initilization */

  /**Accessors */
  get CommandItems(): Array<IContextualMenuItem> {
    debugger;
    return [
      {
        key: "a",
        name: "edit",
        disabled: !(this.ItemIsSelected),
        title: "Edit",
        onClick: this.onEditItemClicked.bind(this)
      }]
  };
  get SelectedIndex(): number {
    return this.state.selectedIndex;
  }
  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex != -1);
  }
  /** Talk to Sharepoint */
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

          resolve()
        },
        function (sender, args) {
          console.log("error");
          reject();
        });
    })
  }
  public saveSearchablePropertiesToSharePoint(propnames: Array<string>): Promise<any> {
    let encodedPropNames: Array<string> = [];
    for (const propname of propnames) {
      encodedPropNames.push(window.btoa(propname));
    }
    return this.setSPProperty("vti_indexedpropertykeys", encodedPropNames.join("|"));
  }
  /** react lifecycle */
  public componentWillMount() {

    const editableProps: Array<string> = this.props.propertiesToEdit.split("\n");

    for (const editableProp of editableProps) {
      this.state.displayProps.push({ name: editableProp, value: "" });
    }
    const web = new Web(this.props.siteUrl);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {

      const sp = r.AllProperties["vti_x005f_indexedpropertykeys"];
      this.saveSearchablePropsToLocalState(sp);
      this.copySPProprtiesToLocalState(r.AllProperties);
    });
  }

  /** event hadlers */
  public stopediting() {
    this.state.isediting = false;
    this.setState(this.state);
  }
  public onActiveItemChanged(item?: any, index?: number) {
    debugger;
    this.state.selectedIndex = index;
    this.setState(this.state);
  }
  public onSearchableValueChanged(newValue: boolean) {

    const propname = this.state.displayProps[this.state.selectedIndex].name;
    this.changeSearchable(propname, newValue).then(value => {

      this.state.displayProps[this.state.selectedIndex].searchable = newValue;
      this.setState(this.state);
    });


  }
  public onEditItemClicked(e?: MouseEvent): void {
    this.state.isediting = true;
    this.setState(this.state);
  }
  public onSPPropertyValueChanged(event) {

    const propname = this.state.displayProps[this.state.selectedIndex].name;
    const newValue = event.target.value;
    this.setSPProperty(propname, newValue).then(value => {

      this.state.displayProps[this.state.selectedIndex].value = newValue;
      this.setState(this.state);
    });
  }



  /**utils */
  private copySPProprtiesToLocalState(AllProperties: any) {
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
    debugger;
    this.setState(this.state);
  }
  public saveSearchablePropsToLocalState(sp: string) {

    const searchableprops: Array<string> = [];
    if (sp) {
      const encodedPropNames = sp.split("|");
      for (const encodedPropName of encodedPropNames) {
        searchableprops.push(window.atob(encodedPropName));
      }

      this.state.searchableProps = searchableprops;
      this.setState(this.state);
    }
  }



  public changeSearchable(propname: string, newValue: boolean): Promise<void> {


    if (newValue) {//make prop searchable
      if (_.indexOf(this.state.searchableProps, propname) === -1) {// wasa not searchable, mpw it is
        this.state.searchableProps.push(propname);
        return this.saveSearchablePropertiesToSharePoint(this.state.searchableProps);
      }
      else {
        debugger;// should not be here

      }
    }
    else { // make prop not searchablke
      if (_.indexOf(this.state.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
        _.remove(this.state.searchableProps, p => { return p === propname })
        return this.saveSearchablePropertiesToSharePoint(this.state.searchableProps);
      }
      else {
        debugger;// should not be here

      }
    }

  }

  public render(): React.ReactElement<IPropertyBagEditorProps> {
    const stuff = this.state.displayProps;
    const columns: Array<IColumn> = [
      { isResizable: true, key: "name", name: "Propert Name", fieldName: "name", minWidth: 150 },
      { isResizable: true, key: "value", name: "Propert Value", fieldName: "value", minWidth: 150 },
      { isResizable: true, key: "searchable", name: "searchable", fieldName: "searchable", minWidth: 150, },

    ];
    debugger;
    return (
      <div>
        <CommandBar items={this.CommandItems} />
        <MessageBar
          content={this.state.messsage} />
        <DetailsList layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={columns}
          selectionMode={SelectionMode.none}
          checkboxVisibility={CheckboxVisibility.hidden}
          items={this.state.displayProps}
          onActiveItemChanged={this.onActiveItemChanged.bind(this)}

        >
        </DetailsList>
        <Dialog
          isOpen={this.state.isediting} type={DialogType.close}
          onDismiss={this.stopediting.bind(this)}
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
              onBlur={this.onSPPropertyValueChanged.bind(this)}
            />
          </div>
          <div>
            <Label>searchable</Label>
            <Toggle label="Search"
              checked={(this.state.selectedIndex === -1) ? undefined : this.state.displayProps[this.state.selectedIndex].searchable}
              onChanged={this.onSearchableValueChanged.bind(this)}
            />
          </div>


        </Dialog>
      </div>
    );
  }
}
