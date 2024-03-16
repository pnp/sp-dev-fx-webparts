/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as _ from "lodash";
import * as React from "react";
import pnp, { SearchQuery, SearchResults, Web } from "sp-pnp-js";
import DisplayProp from "../../shared/DisplayProp";
import utils from "../../shared/utils";
//import styles from "./PropertyBagDisplay.module.scss";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
  CheckboxVisibility,
  DetailsList, DetailsListLayoutMode, IColumn,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import MessageDisplay, * as md from "../../shared/MessageDisplay";
import { IPropertyBagDisplayProps } from "./IPropertyBagDisplayProps";

import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
import {
  Panel, PanelType
} from "office-ui-fabric-react/lib/Panel";
export interface IPropertyBagDisplayState {
  selectedIndex: number; // the currently selected site
  managedToCrawedMapping?: Array<ManagedToCrawledMappingEntry>;// Determines which Crawled properties are mapped to which Managed Properties
  errorMessages: Array<md.Message>; // a list of error massages displayed on the page
  isediting?: boolean; //Determines if the edit panel is displayed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sites: Array<any>; // the list of sites displayed in the component
  workingStorage?: DisplaySite;// A working copy of the site being edited
  managedPropNames?: Array<string>; // the list of managed properties to be displayed
  columns: Array<IColumn>; // the columns to show in the display

}

export class ManagedToCrawledMappingEntry {
  constructor(
    public crawledPropertyName: string,
    public managedPropertyName: string,
  ) { }
}
export class DisplaySite {
  /**
   * Creates an instance of DisplaySite to be used in workingStorage when editing a site
   * @param {string} Title
   * @param {string} Url
   * @param {string} SiteTemplate
   * @param {Array<md.Message>} errorMessages
   * @param {Array<DisplayProp>} [DisplayProps]
   * @param {Array<string>} [searchableProps]
   * @param {boolean} [forceCrawl]
   *
   * @memberOf DisplaySite
   */
  constructor(
    public Title: string,
    public Url: string,
    public SiteTemplate: string,
    public errorMessages: Array<md.Message>,
    public DisplayProps?: Array<DisplayProp>,
    public searchableProps?: Array<string>,
    public forceCrawl?: boolean,


  ) { }
}
export default class PropertyBagDisplay extends React.Component<IPropertyBagDisplayProps, IPropertyBagDisplayState> {
  public constructor(props) {
    super(props);
    this.state = { sites: [], selectedIndex: -1, columns: [], errorMessages: [] };
  }
  /**Accessors */
  /**
   *  Get's the commands to be displayed in the CommandBar. There is only one command (Edit).
   *  If no item is selected the command is disabled
   *
   *
   * @readonly
   * @type {Array<IContextualMenuItem>}
   * @memberOf PropertyBagDisplay
   */
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
  }
  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex !== -1);
  }
  /** Utility Functions */
  /**
   * Renders the Panel used to edit a site's properties
   *
   * @returns
   *
   * @memberOf PropertyBagDisplay
   */
  private renderPopup(): JSX.Element {

    if (!this.state.workingStorage) {
      return (<div />);
    }
    else {
      return (
        <Panel
          isOpen={this.state.isediting} type={PanelType.medium}
          onDismiss={this.stopediting.bind(this)}
        >
          <MessageDisplay messages={this.state.workingStorage.errorMessages}
            hideMessage={this.removePanelMessage.bind(this)} />

          <div> <Label >Site Title</Label> {this.state.workingStorage.Title}</div>
          <span> <Label >Site Url</Label> {this.state.workingStorage.Url}</span>
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
                return (<tr key={dp.managedPropertyName}>
                  <td>{dp.managedPropertyName}</td>
                  <td>{this.state.workingStorage[dp.managedPropertyName]}</td>
                  <td>{dp.crawledPropertyName}</td>
                  <td>
                    <TextField
                      value={dp.value}
                      onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        debugger;
                        const ws = _.clone(this.state.workingStorage);
                        _.find(ws.DisplayProps, p => { return p.crawledPropertyName === dp.crawledPropertyName; }).value = newValue;
                        this.setState((current) => ({ ...current, workingStorage: ws }));
                      }}
                    />
                  </td>
                  <td>
                    <Toggle label=""
                      checked={dp.searchable}
                      onChange={this.createSearcheableOnChangedHandler(dp.crawledPropertyName)}
                    />
                  </td>
                </tr>);
              })}
            </tbody>
          </table>
          <Toggle label="Force Crawl"
            checked={this.state.workingStorage.forceCrawl}
            onChange={this.onForceCrawlChange.bind(this)}
          />
          <DefaultButton default={true} iconProps={{ iconName: "Save" }} value="Save" onClick={this.onSave.bind(this)} >Save</DefaultButton>
          <PrimaryButton iconProps={{ iconName: "Cancel" }} value="Cancel" onClick={this.onCancel.bind(this)} >Cancel</PrimaryButton>

        </Panel>
      );
    }
  }
  /**
   * Removes a message from the MessageDIsplay when the user click the 'x'
   *
   * @param {Array<md.Message>} messageList  The list to remove the message from (the 'main' window of the Panel)
   * @param {string} messageId The Id of the message to remove
   *
   * @memberOf PropertyBagDisplay
   */
  private removeMessage(messageList: Array<md.Message>, messageId: string): void {
    _.remove(messageList, {
      Id: messageId
    });
    this.setState((current) => ({ ...current, errorMessages: messageList }));
  }
  /**
   * Removes a massage from the main window
   *
   * @param {string} messageId
   *
   * @memberOf PropertyBagDisplay
   */
  private removeMainMessage(messageId: string): void {
    this.removeMessage(this.state.errorMessages, messageId);
  }
  /**
   * removes a message from the popup Panel
   *
   * @param {string} messageId
   *
   * @memberOf PropertyBagDisplay
   */
  private removePanelMessage(messageId: string): void {
    this.removeMessage(this.state.workingStorage.errorMessages, messageId);
  }
  /**
   * Makes the  specified property either searchable or non-searchable in sharepoint
   *
   * @param {string} siteUrl The site to se it on
   * @param {string} propname the managed property to set
   * @param {boolean} newValue Searchable or not
   * @returns {Promise<any>}
   *
   * @memberOf PropertyBagDisplay
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private changeSearchable(siteUrl: string, propname: string, newValue: boolean): Promise<any> {
    if (newValue) {//make prop searchable
      if (_.indexOf(this.state.workingStorage.searchableProps, propname) === -1) {// was not searchable, now it is
        console.log(propname + "was not searchable, now it is ");
        this.state.workingStorage.searchableProps.push(propname);
        return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.workingStorage.searchableProps);
      }
      else {
        console.log(propname + "was not searchable, still is not ");
        return Promise.resolve();
      }
    }
    else { // make prop not searchable
      if (_.indexOf(this.state.workingStorage.searchableProps, propname) !== -1) {// was not searchable, now it is
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
  /**
   * Switches component out of edit mode
   *
   *
   * @memberOf PropertyBagDisplay
   */
  private stopediting(): void {
    this.setState((current) => ({
      ...current,
      isediting: false,

    }));
  }
  /**
   * Called by the Details list to render a column as a URL rather than text
   *
   * @private
   * @param {*} [item]
   * @param {number} [index]
   * @param {IColumn} [column]
   * @returns {*}
   *
   * @memberOf PropertyBagDisplay
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderSiteUrl(item?: any, index?: number, column?: IColumn): JSX.Element {
    return (<a href={item[column.fieldName]}>{item[column.fieldName]} </a>);
  }


  /**
   * Sets the columns to be displayed in the list.
   * These are SiteTemplate, Title and Url, plus any properties specified in
   * the property pane
   *
   * @private
   * @returns {Array<IColumn>}
   *
   * @memberOf PropertyBagDisplay
   */
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
        onRender: this.renderSiteUrl
      },
    ];
    const displayProps: Array<string> = this.props.propertiesToDisplay.map(item => {
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
  /**
   * Called when the component loads.
   * Builds the query to search sharepoint for the list of sites to display and formats
   * the results to be displayed in the list
   *
   *
   * @memberOf PropertyBagDisplay
   */
  public componentDidMount(): void {
    const initState = {

      columns: this.setupColumns(),
      managedToCrawedMapping: [],
      managedPropNames: [],
      sites: [],
      errorMessages: []
    };
    for (const prop of this.props.propertiesToDisplay) {
      const names: Array<string> = prop.split('|');// crawled property/managed property
      initState.managedToCrawedMapping.push(new ManagedToCrawledMappingEntry(names[0], names[1]));
      initState.managedPropNames.push(names[1]);
    }
    initState.managedPropNames.unshift("Title");
    initState.managedPropNames.unshift("Url");
    initState.managedPropNames.unshift("SiteTemplate");
    initState.managedPropNames.unshift("SiteTemplateId");
    let querytext = "contentclass:STS_Site ";
    if (this.props.siteTemplatesToInclude) {
      if (this.props.siteTemplatesToInclude.length > 0) {
        querytext += " AND (";
        for (const siteTemplate of this.props.siteTemplatesToInclude) {
          const siteTemplateParts = siteTemplate.split("#");
          if (!siteTemplateParts[1]) {
            querytext += "SiteTemplate=" + siteTemplateParts[0];
          }
          else {
            querytext += "(SiteTemplate=" + siteTemplateParts[0] + " AND SiteTemplateId=" + siteTemplateParts[1] + ")";
          }
          if (this.props.siteTemplatesToInclude.indexOf(siteTemplate) !== this.props.siteTemplatesToInclude.length - 1) { querytext += " OR "; }
        }
        querytext += " )";
      }
    }
    console.log("Using Query " + querytext);
    const q: SearchQuery = {
      Querytext: querytext,
      SelectProperties: initState.managedPropNames,
      RowLimit: 999,
      TrimDuplicates: false
    };
    pnp.sp.search(q).then((results: SearchResults) => {
      for (const r of results.PrimarySearchResults) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {};
        for (const dp of initState.managedPropNames) {
          obj[dp] = r[dp];
        }
        obj.SiteTemplate = obj.SiteTemplate + "#" + obj.SiteTemplateId;
        initState.sites.push(obj);
      }
      debugger;
      this.setState({ ...initState });
    }).catch(err => {
      debugger;
      initState.errorMessages.push(new md.Message(err));
      this.setState({ ...initState });
    });
  }
  /** Event Handlers */
  /**
   * Changes the selected item
   *
   * @param {*} [item]
   * @param {number} [index]
   *
   * @memberOf PropertyBagDisplay
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onActiveItemChanged(item?: any, index?: number): void {
    this.setState((current) => ({ ...current, selectedIndex: index }));
  }

  /**
   * Saves the item in workingStorage back to SharePoint
   *
   * @param {MouseEvent} [e]
   *
   * @memberOf PropertyBagDisplay
   */
  private onSave(e?: MouseEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Array<Promise<any>> = [];
    for (const prop of this.state.workingStorage.DisplayProps) {
      const promise = utils.setSPProperty(prop.crawledPropertyName, prop.value, this.state.workingStorage.Url)
        .then(value => {
          return this.changeSearchable(this.state.workingStorage.Url, prop.crawledPropertyName, prop.searchable);
        });
      promises.push(promise);
    }
    Promise.all(promises)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((results: Array<any>) => {
        if (this.state.workingStorage.forceCrawl) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          utils.forceCrawl(this.state.workingStorage.Url);
        }
        debugger;
        this.setState((current) => ({ ...current, workingStorage: null, isediting: false }));

      }).catch((err) => {
        debugger;
        console.log(err);
        const temp = _.clone(this.state.workingStorage);
        temp.errorMessages.push(new md.Message(err));
        this.setState(current => ({ ...current, workingStorage: temp }))
      });
  }
  /**
   * Clears workingStorage and exits edit mode
   *
   * @param {MouseEvent} [e]
   *
   * @memberOf PropertyBagDisplay
   */
  private onCancel(e?: MouseEvent): void {
    this.setState((current) => ({ ...current, workingStorage: null, isediting: false }));
  }
  /**
   * Set the ForceCrawl Value in working storage which can be used to force a crawl of the site
   * after the item is saved
   *
   * @param {boolean} newValue
   *
   * @memberOf PropertyBagDisplay
   */

  private onForceCrawlChange(newValue: boolean): void {
    this.setState(current => ({ ...current, workingStorage: ({ ...current.workingStorage, forceCrawl: newValue }) }));
  }

  private createSearcheableOnChangedHandler = (managedPropertyName) => (value) => {
    const dp: DisplayProp = _.find(this.state.workingStorage.DisplayProps, p => { return p.crawledPropertyName === managedPropertyName; });
    dp.searchable = value;
    this.setState(this.state);
  }

  /**
   * Called when user wishes to edit an item.
   * The List displays the values from the search index.
   * This method gets the values from the actual PropertyBag so that they can be edited.
   *
   * @param {MouseEvent} [e]
   *
   * @memberOf PropertyBagDisplay
   */
  private onEditItemClicked(e?: MouseEvent): void {
    debugger;
    console.log("in onEditItemClicked");
    const selectedSite = this.state.sites[this.state.selectedIndex];
    const web = new Web(selectedSite.Url);
    // let context = this;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    web.select("Title", "AllProperties").expand("AllProperties").get().then((r) => {
      const crawledProps: Array<string> = this.props.propertiesToDisplay.map(item => {
        return item.split("|")[0];
      });
      const temp = _.clone(selectedSite);
      // eslint-disable-next-line dot-notation
      temp.searchableProps = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
      temp.DisplayProps = utils.SelectProperties(r.AllProperties, crawledProps, temp.searchableProps);
      temp.errorMessages = new Array<md.Message>();
      // now add in the managed Prop
      for (const dp of temp.DisplayProps) {
        dp.managedPropertyName =
          _.find(this.state.managedToCrawedMapping, mtc => { return mtc.crawledPropertyName === dp.crawledPropertyName; }).managedPropertyName;
      }
      this.setState((current) => ({
        ...current,
        workingStorage: temp, isediting: true

      }));
    });
    console.log("out onEditItemClicked");
  }
  /**
   * Sorts a column when the user clicks on the header
   *
   * @private
   * @param {*} event
   * @param {IColumn} column
   *
   * @memberOf PropertyBagDisplay
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  private _onColumnClick(event: any, column: IColumn) {
    column = _.find(this.state.columns, c => c.fieldName === column.fieldName);// find the object in state
    // If we've sorted this column, flip it.
    if (column.isSorted) {
      column.isSortedDescending = !column.isSortedDescending;
    }
    else {
      column.isSorted = true;
      column.isSortedDescending = false;
    }
    // Sort the items.
    const temp = _.orderBy(this.state.sites, (site) => {
      if (site[column.fieldName]) {
        return site[column.fieldName].toLowerCase();
      }
      else {
        return "";
      }
    }, [column.isSortedDescending ? "desc" : "asc"]);
    this.setState((current) => ({
      ...current,
      sites: temp

    }));
  }


  /**
   * Renders the component
   *
   * @returns {React.ReactElement<IPropertyBagDisplayProps>}
   *
   * @memberOf PropertyBagDisplay
   */
  public render(): React.ReactElement<IPropertyBagDisplayProps> {
    return (
      <div >
        <CommandBar items={this.CommandItems} />
        <MessageDisplay
          messages={this.state.errorMessages}
          hideMessage={this.removeMainMessage.bind(this)}
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
        />
        {this.renderPopup.bind(this)()}
      </div >
    );
  }
}
