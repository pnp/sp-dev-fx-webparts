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
  displayProps: Array<DisplayProp>; // The list of properties displayed in the webpart
  workingStorage?: DisplayProp; // a working copy of the property currently being edited
  selectedIndex: number; // the index of the currently selected propety
  searchableProps: Array<string>; // an array of all the searchable properties in the site
  messsage: string; // an error message
  isediting: boolean; // whether the webart is in enit mode
}
export default class PropertyBagEditor extends React.Component<IPropertyBagEditorProps, IPropertyBagEditorState> {
  public refs: {
    [key: string]: React.ReactInstance;
    list: DetailsList
  };
  public constructor(props: IPropertyBagEditorProps) {
    super(props);
    this.state = { searchableProps: [], displayProps: [], selectedIndex: -1, messsage: "", isediting: false };
  }
  /**Accessors */
  /**
   *  Get's the commands to be displayed in the CommandBar. There is only one command (Edit).
   *  If no item is selected the command is disabled
   * 
   * @readonly
   * @type {Array<IContextualMenuItem>}
   * @memberOf PropertyBagEditor
   */

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

  /**
   *  Determines if an item is selected.
   * 
   * @readonly
   * @type {boolean}
   * @memberOf PropertyBagEditor
   */
  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex != -1);
  }

  /** react lifecycle */
  public componentWillMount() {

    const web = new Web(this.props.siteUrl);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      const sp = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      const dp = utils.SelectProperties(r.AllProperties, this.props.propertiesToEdit, sp);
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
  /**
   *  Gets fired when the user changes the 'Searchable' value in the ui.
   *  Saves the value in workingStorage
   * 
   * @param {boolean} newValue 
   * 
   * @memberOf PropertyBagEditor
   */
  public onSearchableValueChanged(newValue: boolean) {
    this.state.workingStorage.searchable = newValue;
    this.setState(this.state);
  }
  /**
   * Gets fired when the user changes the proprty value in the ui
   * Saves the value in workingStorage
   * 
   * @param {any} event 
   * 
   * @memberOf PropertyBagEditor
   */
  public onPropertyValueChanged(event) {
    this.state.workingStorage.value = event.target.value;
    this.setState(this.state);
  }

  /**
   * Copies the selected item into workingStorage and sets the webpart into edit mode.
   * 
   * @param {MouseEvent} [e] 
   * 
   * @memberOf PropertyBagEditor
   */
  public onEditItemClicked(e?: MouseEvent): void {
    this.state.isediting = true;
    this.state.workingStorage = _.clone(this.state.displayProps[this.state.selectedIndex]);
    this.setState(this.state);
  }
  /**
   * Saves the item in workingStorage back to sharepoint, then clears workingStorage and stops editing.
   * 
   * @param {MouseEvent} [e] 
   * 
   * @memberOf PropertyBagEditor
   */
  public onSave(e?: MouseEvent): void {
    utils.setSPProperty(this.state.workingStorage.crawledPropertyName, this.state.workingStorage.value, this.props.siteUrl)
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
  /**
   * Clears workingStorage and stops editing
   * 
   * @param {MouseEvent} [e] 
   * 
   * @memberOf PropertyBagEditor
   */
  public onCancel(e?: MouseEvent): void {
    this.state.isediting = false;
    this.state.workingStorage = null;
    this.setState(this.state);
  }


  /**
   * Makes a propety Searchable or non-Searchable in the sharepoint site
   * 
   * @param {string} propname The property to be made Searchable or non-Searchable 
   * @param {boolean} newValue Whether to make it Searchable or non-Searchable 
   * @returns {Promise<any>} 
   * 
   * @memberOf PropertyBagEditor
   */
  public changeSearchable(propname: string, newValue: boolean): Promise<any> {
    if (newValue) {//make prop searchable
      if (_.indexOf(this.state.searchableProps, propname) === -1) {// wasa not searchable, mpw it is
        this.state.searchableProps.push(propname);
        return utils.saveSearchablePropertiesToSharePoint(this.props.siteUrl, this.state.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
    else { // make prop not searchablke
      if (_.indexOf(this.state.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
        _.remove(this.state.searchableProps, p => { return p === propname; });
        return utils.saveSearchablePropertiesToSharePoint(this.props.siteUrl, this.state.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
  }
  private RenderBoolean(item?: any, index?: number, column?: IColumn): any {
    if (item[column.fieldName]) {
      return (<div>Yes</div>);
    } else {
      return (<div>No</div>);
    }
  }
  /**
   * Renders the webpart
   * 
   * @returns {React.ReactElement<IPropertyBagEditorProps>} 
   * 
   * @memberOf PropertyBagEditor
   */
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    const columns: Array<IColumn> = [
      { isResizable: true, key: "name", name: "Propert Name", fieldName: "crawledPropertyName", minWidth: 150 },
      { isResizable: true, key: "value", name: "Propert Value", fieldName: "value", minWidth: 150 },
      { key: "searchable", name: "searchable", fieldName: "searchable", minWidth: 150, onRender: this.RenderBoolean },
    ];

    return (
      <div>
        <CommandBar items={this.CommandItems} />
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
