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

import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as md from "../../shared/MessageDisplay";
import MessageDisplay from "../../shared/MessageDisplay";
import {
  DetailsList, DetailsListLayoutMode, IColumn, IGroupedList, SelectionMode, CheckboxVisibility, IGroup
} from "office-ui-fabric-react/lib/DetailsList";
import {
  GroupedList
} from "office-ui-fabric-react/lib/GroupedList";
import {
  IViewport
} from "office-ui-fabric-react/lib/utilities/decorators/withViewport";

import {
  Panel, PanelType
} from "office-ui-fabric-react/lib/Panel";
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
export interface IPropertyBagDisplayState {
  selectedIndex: number;
  managedToCrawedMapping?: Array<ManagedToCrawledMappingEntry>;
  errorMessages: Array<md.Message>
  isediting?: boolean;
  sites: Array<any>;
  workingStorage?: DisplaySite;
  managedPropNames?: Array<string>;
  columns: Array<IColumn>;
  groups: Array<IGroup>;
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
    public forceCrawl?: boolean

  ) { }
}
export default class PropertyBagDisplay extends React.Component<IPropertyBagDisplayProps, IPropertyBagDisplayState> {
  public constructor(props) {
    super(props);
    this.state = { sites: [], selectedIndex: -1, groups: [], columns: [], errorMessages: [] };
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
        icon: "Edit",

      }];
  };
  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex !== -1);

  }
  private setupColumns(): Array<IColumn> {
    const columns: Array<IColumn> = [
      {
        fieldName: "SiteTemplate",
        key: "SiteTemplate",
        name: "SiteTemplate",
        minWidth: 20,
        maxWidth: 100,

      },

      {
        fieldName: "Title",
        key: "Title",
        name: "Title",
        minWidth: 20,
        maxWidth: 220,
        isSorted: false,
        isSortedDescending: false
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

          isSorted: false,
          isSortedDescending: false
        });
    }
    return columns;
  }
  /** react lifecycle */
  public componentWillMount() {
    this.state.columns = this.setupColumns();
    this.state.managedToCrawedMapping = [];
    this.state.managedPropNames = [];
    for (const prop of this.props.propertiesToDisplay.split('\n')) {
      const names: Array<string> = prop.split('|');// crawledpropety/managed property
      this.state.managedToCrawedMapping.push(new ManagedToCrawledMappingEntry(names[0], names[1]));
      this.state.managedPropNames.push(names[1]);
    }
    this.state.managedPropNames.unshift("Title");
    this.state.managedPropNames.unshift("Url");
    this.state.managedPropNames.unshift("SiteTemplate");
    this.state.managedPropNames.unshift("SiteTemplateId");
    let querytext = "contentclass:STS_Site ";
    if (this.props.siteTemplatesToInclude) {
      const siteTemplates = this.props.siteTemplatesToInclude.split('\n');
      if (siteTemplates.length > 0 && siteTemplates[0] !== "") {
        querytext += " AND (";
        for (const siteTemplate of siteTemplates) {
          const siteTemplateParts = siteTemplate.split("#");
          if (!siteTemplateParts[1]) {
            querytext += "SiteTemplate=" + siteTemplateParts[0];
          }
          else {
            querytext += "(SiteTemplate=" + siteTemplateParts[0] + " AND SiteTemplateId=" + siteTemplateParts[1] + ")";
          }
          if (siteTemplates.indexOf(siteTemplate) !== siteTemplates.length - 1)
          { querytext += " OR " }
        }
        querytext += " )";
      }
    }
    console.log("Using Query " + querytext);
    const q: SearchQuery = {
      Querytext: querytext,
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
      debugger;
      this.state.errorMessages.push(new md.Message("Items Recieved"));
      this.setState(this.state);
    }).catch(err => {
      debugger;
      this.state.errorMessages.push(new md.Message(err));
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
        console.log(propname + "was not searchable, now it is ");
        this.state.workingStorage.searchableProps.push(propname);
        return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.workingStorage.searchableProps);
      }
      else {
        console.log(propname + "was not searchable, still is not ");
        return Promise.resolve();
      }
    }
    else { // make prop not searchablke
      if (_.indexOf(this.state.workingStorage.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
        console.log(propname + "was searchable, now it is  not");
        _.remove(this.state.workingStorage.searchableProps, p => { return p === propname; });
        return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.workingStorage.searchableProps);
      }
      else {
        console.log(propname + "was searchable, still  it is");
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
        if (this.state.workingStorage.forceCrawl) {
          utils.forceCrawl(this.state.workingStorage.Url);
        }
        this.state.workingStorage = null;
        this.state.isediting = false;

        this.setState(this.state);
      }).catch((err) => {
        this.state.errorMessages = err;
        this.setState(this.state);
        console.log(err);
      });
  }
  public onCancel(e?: MouseEvent): void {
    this.state.isediting = false;
    this.state.workingStorage = null;
    this.setState(this.state);
  }
  public onForceCrawlChange(newValue: boolean) {
    this.state.workingStorage.forceCrawl = newValue;
    this.setState(this.state);
  }
  public onPropertyValueChanged(event: React.FormEvent<HTMLInputElement>) {
    const selectedProperty = event.currentTarget.attributes["data-crawledpropertyname"].value;
    let dp: DisplayProp = _.find(this.state.workingStorage.DisplayProps, p => { return p.crawledPropertyName === selectedProperty; });
    dp.value = event.currentTarget.value;
    this.setState(this.state);
  }
  public createSearcheableOnChangedHandler = (managedPropertyName) => (value) => {
    let dp: DisplayProp = _.find(this.state.workingStorage.DisplayProps, p => { return p.crawledPropertyName === managedPropertyName; });
    dp.searchable = value;
    this.setState(this.state);
  }
  public hideMessages(value) {
    // this.state.errorMessages = "";
    this.setState(this.state);
  }
  public onEditItemClicked(e?: MouseEvent): void {
    console.log("in onEditItemClicked");
    const selectedSite = this.state.sites[this.state.selectedIndex];
    const web = new Web(selectedSite.Url);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      const crawledProps: Array<string> = this.props.propertiesToDisplay.split("\n").map(item => {
        return item.split("|")[0];
      });
      this.state.workingStorage = _.clone(this.state.sites[this.state.selectedIndex]);
      this.state.workingStorage.searchableProps = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      this.state.workingStorage.DisplayProps = utils.SelectProperties(r.AllProperties, crawledProps, this.state.workingStorage.searchableProps);
      // now add in the managed Prop
      for (let dp of this.state.workingStorage.DisplayProps) {
        dp.managedPropertyName =
          _.find(this.state.managedToCrawedMapping, mtc => { return mtc.crawledPropertyName === dp.crawledPropertyName; }).managedPropertyName;
      }
      this.state.isediting = true;
      this.setState(this.state);
    });
    console.log("out onEditItemClicked");
  }
  private _onColumnClick(event: any, column: IColumn) {
    column = _.find(this.state.columns, c => c.fieldName === column.fieldName);// find the object in state
    // If we've sorted this column, flip it.
    if (column.isSorted) {
      column.isSortedDescending = !column.isSortedDescending;
    }
    else {
      column.isSorted = true;
      column.isSortedDescending = false
    }
    // Sort the items.
    this.state.sites = _.orderBy(this.state.sites, [(site, x, y, z) => {
      if (site[column.fieldName]) {
        return site[column.fieldName].toLowerCase();
      }
      else {
        return "";
      }
    }], [column.isSortedDescending ? "desc" : "asc"]);
    this.setState(this.state);
  }
  public renderMessages() {
    if (!this.state.errorMessages) {
      return (<div />);
    }
    else {
      return (
        <MessageBar
          messageBarType={MessageBarType.remove}
          isMultiline={true}
          onDismiss={this.hideMessages.bind(this)}>
          {this.state.errorMessages}
        </MessageBar>
      );
    }
  }
  public renderPopup() {

    if (!this.state.workingStorage) {
      return (<div />);
    }
    else {
      return (
        <Panel
          isOpen={this.state.isediting} type={PanelType.medium}
          onDismiss={this.stopediting.bind(this)}
        >

          {this.renderMessages.bind(this)()}
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
                      checked={dp.searchable}
                      onChanged={this.createSearcheableOnChangedHandler(dp.crawledPropertyName)}
                    />
                  </td>
                </tr>);
              })}
            </tbody>
          </table>
          <Toggle label="Force Crawl"
            checked={this.state.workingStorage.forceCrawl}
            onChanged={this.onForceCrawlChange.bind(this)}
          />
          <Button default={true} icon="Save" buttonType={ButtonType.hero} value="Save" onClick={this.onSave.bind(this)} >Save</Button>
          <Button icon="Cancel" buttonType={ButtonType.normal} value="Cancel" onClick={this.onCancel.bind(this)} >Cancel</Button>
          {/*Force Reindex:http://www.techmikael.com/2014/02/how-to-trigger-full-re-index-in.html*/}
          <Button icon="Cancel" buttonType={ButtonType.normal} value="Force Crawl" onClick={this.onCancel.bind(this)} >Force Crawl</Button>
        </Panel>
      );
    }
  }
  public removeMessage(messageId: string) {

    _.remove(this.state.errorMessages, {
      Id: messageId
    });
    this.setState(this.state);
  }
  public render(): React.ReactElement<IPropertyBagDisplayProps> {
    debugger;
    return (
      <div>
        <CommandBar items={this.CommandItems} />
        <MessageDisplay
          messages={this.state.errorMessages}
          hideMessage={this.removeMessage.bind(this)}
        />
        <DetailsList
          key="Url"
          onColumnHeaderClick={this._onColumnClick.bind(this)}
          items={this.state.sites}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={this.state.columns}
          selectionMode={SelectionMode.single}
          checkboxVisibility={CheckboxVisibility.hidden}
          onActiveItemChanged={this.onActiveItemChanged.bind(this)
          }
        >
        </DetailsList>
        {this.renderPopup.bind(this)()}
      </div>
    );
  }
}
