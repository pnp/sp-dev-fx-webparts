import * as React from "react";
import { css } from "office-ui-fabric-react"; import { IPropertyBagEditorProps } from "./IPropertyBagEditorProps";
import { Web } from "sp-pnp-js";
import * as _ from "lodash";
import utils from "../../shared/utils";
require("sp-init");
require("microsoft-ajax");
require("sp-runtime");
require("sharepoint");
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import {
  DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, CheckboxVisibility,
} from "office-ui-fabric-react/lib/DetailsList";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import DisplayProp from "../../shared/DisplayProp";

export interface IPropertyBagEditorState {
  displayProps: Array<DisplayProp>;
  workingStorage?: DisplayProp;
  selectedIndex: number;
  searchableProps: Array<string>;
  messsage: string;
  isediting: boolean;
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
  /**Accessors */
  get CommandItems(): Array<IContextualMenuItem> {
    return [
      {
        key: "a",
        name: "Edit",
        disabled: !(this.ItemIsSelected),
        title: "Edit",
        onClick: this.onEditItemClicked.bind(this),
        icon: "Edit"
      }];
  };

  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex != -1);
  }
  /** Talk to Sharepoint */
  private setSPProperty(name: string, value: string, siteUrl: string) {
    return new Promise((resolve, reject) => {
      var webProps;
      var clientContext = new SP.ClientContext(siteUrl);
      var web = clientContext.get_web();
      webProps = web.get_allProperties();
      webProps.set_item(name, value);
      web.update();
      webProps = web.get_allProperties();
      clientContext.load(web);
      clientContext.load(webProps);
      clientContext.executeQueryAsync((s, a) => { resolve(); }, (s, a) => { reject(); });

    });
  }
  // //http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html
  // public EncodePropertyKey(propKey) {
  //   var bytes = [];
  //   for (var i = 0; i < propKey.length; ++i) {
  //     bytes.push(propKey.charCodeAt(i));
  //     bytes.push(0);
  //   }
  //   var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
  //   return b64encoded;
  // }
  // public DecodePropertyKey(propKey) {
  //   debugger;
  //   const encoded = window.atob(propKey);
  //   var decoded = "";
  //   for (let x = 0; x < encoded.length; x = x + 2) {
  //     decoded = decoded + encoded.substr(x, 1);
  //   }
  //   return decoded;
  // }
  // public saveSearchablePropertiesToSharePoint(propnames: Array<string>): Promise<any> {
  //   let encodedPropNames: Array<string> = [];
  //   for (const propname of propnames) {
  //     encodedPropNames.push(this.EncodePropertyKey(propname));
  //   }
  //   return this.setSPProperty("vti_indexedpropertykeys", encodedPropNames.join("|") + "|", this.props.siteUrl);//need the pipe at the end too?
  // }
  /** react lifecycle */
  public componentWillMount() {

    const web = new Web(this.props.siteUrl);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
       const sp = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      const dp = utils.SelectProperties(r.AllProperties, this.props.propertiesToEdit.split("\n"), sp);
      this.state.searchableProps = sp;
      this.state.displayProps = dp;
      this.setState(this.state);
    });
  }

  /** event hadlers */
  public stopediting() {
    this.state.isediting = false;
    this.setState(this.state);
  }
  public onActiveItemChanged(item?: any, index?: number) {

    this.state.selectedIndex = index;
    this.setState(this.state);
  }
  public onSearchableValueChanged(newValue: boolean) {
    this.state.workingStorage.searchable = newValue;
    this.setState(this.state);
  }
  public onEditItemClicked(e?: MouseEvent): void {
    this.state.isediting = true;
    this.state.workingStorage = _.clone(this.state.displayProps[this.state.selectedIndex]);
    this.setState(this.state);
  }
  public onSave(e?: MouseEvent): void {
    this.setSPProperty(this.state.workingStorage.crawledPropertyName, this.state.workingStorage.value, this.props.siteUrl)
      .then(value => {
        this.changeSearchable(this.state.workingStorage.crawledPropertyName, this.state.workingStorage.searchable)
          .then(s => {
            this.state.displayProps[this.state.selectedIndex] = this.state.workingStorage;
            this.state.workingStorage = null;
            this.state.isediting = false;
            this.setState(this.state);
          });
      });
  }
  public onCancel(e?: MouseEvent): void {
    this.state.isediting = false;
    this.state.workingStorage = null;
    this.setState(this.state);
  }
  public onPropertyValueChanged(event) {
     this.state.workingStorage.value = event.target.value;
    this.setState(this.state);
  }

   public changeSearchable(propname: string, newValue: boolean): Promise<any> {
    if (newValue) {//make prop searchable
      if (_.indexOf(this.state.searchableProps, propname) === -1) {// wasa not searchable, mpw it is
        this.state.searchableProps.push(propname);
        return utils.saveSearchablePropertiesToSharePoint(this.props.siteUrl,this.state.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
    else { // make prop not searchablke
      if (_.indexOf(this.state.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
        _.remove(this.state.searchableProps, p => { return p === propname; });
        return utils.saveSearchablePropertiesToSharePoint(this.props.siteUrl,this.state.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
  }
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    const columns: Array<IColumn> = [
      { isResizable: true, key: "name", name: "Propert Name", fieldName: "crawledPropertyName", minWidth: 150 },
      { isResizable: true, key: "value", name: "Propert Value", fieldName: "value", minWidth: 150 },
      { key: "searchable", name: "searchable", fieldName: "searchable", minWidth: 150 },
    ];

    return (
      <div>
        <CommandBar items={this.CommandItems} />
        <MessageBar></MessageBar>
        <DetailsList layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={columns}
          selectionMode={SelectionMode.single}
          checkboxVisibility={CheckboxVisibility.hidden}
          items={this.state.displayProps}
          onActiveItemChanged={this.onActiveItemChanged.bind(this)}
        >
        </DetailsList>
        <Dialog
          isOpen={this.state.isediting} type={DialogType.close}
          onDismiss={this.stopediting.bind(this)}
          title={(this.state.workingStorage) ? this.state.workingStorage.crawledPropertyName : ""}        >

          <span> <Label>Site Url</Label> {this.props.siteUrl}</span>

          <TextField
            value={(this.state.workingStorage) ? this.state.workingStorage.value : ""}
            onBlur={this.onPropertyValueChanged.bind(this)}
          />



          <Toggle label="Searchable"
            checked={(this.state.workingStorage) ? this.state.workingStorage.searchable : undefined}
            onChanged={this.onSearchableValueChanged.bind(this)}
          />


          <Button default={true} icon="Save" buttonType={ButtonType.icon} value="Save" onClick={this.onSave.bind(this)} >Save</Button>
          <Button icon="Cancel" buttonType={ButtonType.icon} value="Cancel" onClick={this.onCancel.bind(this)} >Cancel</Button>


        </Dialog>
      </div>
    );
  }
}
