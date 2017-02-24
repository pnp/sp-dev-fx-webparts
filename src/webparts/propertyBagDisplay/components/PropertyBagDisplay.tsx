import * as React from "react";
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import * as _ from "lodash";
import utils from "../../shared/utils";
import DisplayProp from "../../shared/DisplayProp";
import { SearchQuery, SearchResults, SearchResult } from "sp-pnp-js";
import { css } from "office-ui-fabric-react";
import styles from "./PropertyBagDisplay.module.scss";
import { IPropertyBagDisplayProps } from "./IPropertyBagDisplayProps";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import {
  DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, CheckboxVisibility,
} from "office-ui-fabric-react/lib/DetailsList";
import {
  Panel, PanelType
} from "office-ui-fabric-react/lib/Panel";
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
export interface IPropertyBagDisplayState {
  selectedIndex: number;
  managedToCrawedMapping?: Array<ManagedToCrawledMappingEntry>;
  messsage?: string;
  isediting?: boolean;
  sites: Array<any>;
  workingStorage?: DisplaySite;
  managedPropNames?: Array<string>;

}

export class ManagedToCrawledMappingEntry {
  constructor(
    public crawledPropertyName: string,
    public managedPropertyName: string,
  ) { }
}
export class DisplaySite {
  constructor(
    public Title: string,
    public Url: string,
    public SiteTemplate: string,
    public SarchableProps?: Array<String>,
    public DisplayProps?: Array<DisplayProp>,
    public searchableProps?: Array<string>,

  ) { }
}
export default class PropertyBagDisplay extends React.Component<IPropertyBagDisplayProps, IPropertyBagDisplayState> {
  public constructor() {
    super();
    this.state = { sites: [], selectedIndex: -1 };
    this.onSearchableValueChanged = this.onSearchableValueChanged.bind(this);

  }
  /**Accessors */
  get CommandItems(): Array<IContextualMenuItem> {

    return [
      {
        key: "Edit",
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
  /** react lifecycle */
  public componentWillMount() {
    // <<<<<<< HEAD
    this.state.managedToCrawedMapping = [];
    this.state.managedPropNames = [];
    for (const prop of this.props.propertiesToDisplay.split('\n')) {
      const names: Array<string> = prop.split('|');// crawledpropety/managed property
      this.state.managedToCrawedMapping.push(new ManagedToCrawledMappingEntry(names[0], names[1]));
      this.state.managedPropNames.push(names[1]);
      // =======
      // this.state.ManagedToCrawedDictionary={};
      // this.state.displayPropNames=[];
      //     for (const prop of this.props.propertiesToDisplay.split('\n')) {
      //       const names: Array<string> = prop.split('|');// crawledpropety/managed property
      //       this.state.ManagedToCrawedDictionary[names[0]] = names[1];
      //       this.state.displayPropNames.push(names[1]);// managed prop
      // >>>>>>> e1592d02fdb563b1187f15fcce238f8d3a5b7375
    }
    this.state.managedPropNames.unshift("Title");
    this.state.managedPropNames.unshift("Url");
    this.state.managedPropNames.unshift("SiteTemplate");
    this.state.managedPropNames.unshift("SiteTemplateId");
    const q: SearchQuery = {
      Querytext: "contentclass:STS_Site",
      SelectProperties: this.state.managedPropNames,
      RowLimit: 999,
      TrimDuplicates: false

    };
    pnp.sp.search(q).then((results: SearchResults) => {

      for (const r of results.PrimarySearchResults) {
        let obj: any = {};
        for (const dp of this.state.managedPropNames) {
          obj[dp] = r[dp];
        }
        obj.SiteTemplate = obj.SiteTemplate + "#" + obj.SiteTemplateId;
        this.state.sites.push(obj);
      }
      this.setState(this.state);
    });
  }
  public stopediting() {
    this.state.isediting = false;
    this.setState(this.state);
  }
  public onActiveItemChanged(item?: any, index?: number) {

    this.state.selectedIndex = index;
    this.setState(this.state);
  }
  public changeSearchable(siteUrl: string, propname: string, newValue: boolean): Promise<any> {
    if (newValue) {//make prop searchable
      if (_.indexOf(this.state.workingStorage.searchableProps, propname) === -1) {// wasa not searchable, mpw it is
        this.state.workingStorage.searchableProps.push(propname);
        return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.workingStorage.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
    else { // make prop not searchablke
      if (_.indexOf(this.state.workingStorage.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
        _.remove(this.state.workingStorage.searchableProps, p => { return p === propname; });
        return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.workingStorage.searchableProps);
      }
      else {
        return Promise.resolve();
      }
    }
  }
  public onSave(e?: MouseEvent): void {
    let promises: Array<Promise<any>> = [];
    for (const prop of this.state.workingStorage.DisplayProps) {
      let proomise = utils.setSPProperty(prop.crawledPropertyName, prop.value, this.state.workingStorage.Url)
        .then(value => {
          this.changeSearchable(this.state.workingStorage.Url, prop.crawledPropertyName, prop.searchable);
        });
      promises.push(proomise);
    }
    Promise.all(promises)
      .then((results: Array<any>) => {
        this.state.workingStorage = null;
        this.state.isediting = false;
        this.setState(this.state);
      }).catch((err) => {
        console.log(err);
      });

  }
  public onCancel(e?: MouseEvent): void {
    this.state.isediting = false;
    this.state.workingStorage = null;
    this.setState(this.state);
  }
  public onSearchableValueChanged(event: React.FormEvent<HTMLInputElement>) {
    debugger;
    //this.state.workingStorage.searchable = newValue;
    this.setState(this.state);
  }
  public onPropertyValueChanged(event: React.FormEvent<HTMLInputElement>) {

    const selectedProperty = event.currentTarget.attributes["data-crawledpropertyname"].value;
    let dp: DisplayProp = _.find(this.state.workingStorage.DisplayProps, p => { return p.crawledPropertyName === selectedProperty; });
    dp.value = event.currentTarget.value;
    this.setState(this.state);
  }
  public onEditItemClicked(e?: MouseEvent): void {

    const selectedSite = this.state.sites[this.state.selectedIndex];

    const web = new Web(selectedSite.Url);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      {/*<<<<<<< HEAD
      const crawledProps = this.state.managedToCrawedMapping.map(p => { return p.crawledPropertyName; });
      this.state.workingStorage = _.clone(this.state.sites[this.state.selectedIndex]);
      this.state.workingStorage.searchableProps = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      this.state.workingStorage.DisplayProps = utils.SelectProperties(r.AllProperties, crawledProps, this.state.workingStorage.searchableProps);
=======*/}
      const searchableProps = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      const crawledProps: Array<string> = this.props.propertiesToDisplay.split("\n").map(item => {
        return item.split("|")[0];
      });
      this.state.workingStorage = _.clone(this.state.sites[this.state.selectedIndex]);
      this.state.workingStorage.DisplayProps = utils.SelectProperties(r.AllProperties, crawledProps, searchableProps);
      {/*>>>>>>> e1592d02fdb563b1187f15fcce238f8d3a5b7375*/ }
      // now add in the managed Prop
      for (let dp of this.state.workingStorage.DisplayProps) {
        dp.managedPropertyName =
          _.find(this.state.managedToCrawedMapping, mtc => { return mtc.crawledPropertyName === dp.crawledPropertyName; }).managedPropertyName;
      }
      this.state.isediting = true;
      this.setState(this.state);
    });

  }
  public createOnChangedHandler = (name) => {
    debugger; 
    return (value) => {
      debugger;
      alert(name);
  
    }
  }
  public renderPopup() {
    const createOnChangedHandler = (name) => (value) => {
      debugger;
      /* do something with name and value here, i.e. */
    }
    if (!this.state.workingStorage) {
      return (<div />);
    }
    else {
      return (
        <Panel
          isOpen={this.state.isediting} type={PanelType.medium}
          onDismiss={this.stopediting.bind(this)}
        >
          <div> <Label >Site Title</Label> {this.state.workingStorage.Title}</div>
          <span> <Label label="" >Site Url</Label> {this.state.workingStorage.Url}</span>

          <table>
            <thead>
              <tr>
                <td>Managed Property Name</td>
                <td>Value in Search Index</td>
                <td>Crawled Property Name</td>
                <td>Web Property Value</td>
                <td>Searchable</td>
              </tr>
            </thead>

            <tbody>
              {this.state.workingStorage.DisplayProps.map((dp, i) => {
                return (<tr>
                  <td>{dp.managedPropertyName}</td>
                  <td>{this.state.workingStorage[dp.managedPropertyName]}</td>
                  <td>{dp.crawledPropertyName}</td>
                  <td>
                    <TextField
                      data-crawledPropertyName={dp.crawledPropertyName}
                      value={dp.value}
                      onBlur={this.onPropertyValueChanged.bind(this)}
                    />
                  </td>
                  <td>
                    <Toggle label=""
                      data-crawledPropertyName={dp.crawledPropertyName}
                      checked={dp.searchable}
                 
                      onChange={(val: React.FormEvent<HTMLInputElement>) => this.onSearchableValueChanged(val)} 
                    />
                  </td>
                  <td>
                    <Toggle label="Test"


                      disabled={false}
                      onChange={this.onSearchableValueChanged} />
                  </td>
                </tr>);
              })}
            </tbody>
          </table>
          <Button default={true} icon="Save" buttonType={ButtonType.hero} value="Save" onClick={this.onSave.bind(this)} >Save</Button>
          <Button icon="Cancel" buttonType={ButtonType.normal} value="Cancel" onClick={this.onCancel.bind(this)} >Cancel</Button>
          <Button icon="Cancel" buttonType={ButtonType.normal} value="Force Crawl" onClick={this.onCancel.bind(this)} >Force Crawl</Button>


        </Panel>
      );
    }

  }
  public render(): React.ReactElement<IPropertyBagDisplayProps> {

    const columns: Array<IColumn> = [
      {
        fieldName: "SiteTemplate",
        key: "SiteTemplate",
        name: "SiteTemplate",
        minWidth: 20,
        maxWidth: 220,
      },

      {
        fieldName: "Title",
        key: "Title",
        name: "Title",
        minWidth: 20,
        maxWidth: 220,
      },
      {
        fieldName: "Url",
        key: "Url",
        name: "Url",
        minWidth: 20,
        maxWidth: 220,
      },

    ];
    const displayProps: Array<string> = this.props.propertiesToDisplay.split("\n").map(item => {
      return item.split("|")[1];
    });
    for (const dp of displayProps) {
      columns.push(
        {
          fieldName: dp,
          key: dp,
          name: dp,
          minWidth: 20,
          maxWidth: 220,

        });
    }

    return (
      <div>
        <CommandBar items={this.CommandItems} />
        <DetailsList
          items={this.state.sites}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={columns}
          selectionMode={SelectionMode.single}
          checkboxVisibility={CheckboxVisibility.hidden}
          onActiveItemChanged={this.onActiveItemChanged.bind(this)}
        >
        </DetailsList>
        {this.renderPopup.bind(this)()}

      </div>
    );
  }
}
