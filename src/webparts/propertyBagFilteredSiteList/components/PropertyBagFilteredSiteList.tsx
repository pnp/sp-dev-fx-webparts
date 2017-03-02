import * as React from "react";
import pnp from "sp-pnp-js";
import { SortDirection } from "sp-pnp-js";
import * as _ from "lodash";
import DisplayProp from "../../shared/DisplayProp";
import { SearchQuery, SearchResults } from "sp-pnp-js";
import { css } from "office-ui-fabric-react";
import styles from "./PropertyBagFilteredSiteList.module.scss";
import { IPropertyBagFilteredSiteListProps } from "./IPropertyBagFilteredSiteListProps";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Link } from "office-ui-fabric-react/lib/Link";
import { List } from "office-ui-fabric-react/lib/List";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as md from "../../shared/MessageDisplay";
import utils from "../../shared/utils";
import MessageDisplay from "../../shared/MessageDisplay";
import { CommandBar, ICommandBarProps } from "office-ui-fabric-react/lib/CommandBar";
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
export interface IPropertyBagFilteredSiteListState {
  errorMessages: Array<md.Message>;
  sites: Array<Site>;
  userFilters: Array<UserFilter>;// this is what the user CAN filter on
  appliedUserFilters: Array<AppliedUserFilter>;// this is what the user HAS filtered on
}
export class Site {
  public constructor(
    public title: string,
    public description: string,
    public url: string,

  ) { }
}

export class DisplaySite {
  constructor(
    public Title: string,
    public Url: string,
    public SiteTemplate: string,
    public errorMessages: Array<md.Message>,
    // public SarchableProps?: Array<String>,
    public DisplayProps?: Array<DisplayProp>,
    public searchableProps?: Array<string>,
    public forceCrawl?: boolean,


  ) { }
}
export class AppliedUserFilter {
  public constructor(
    public managedPropertyName: string,
    public value: string)
  { }
}
export class UserFilter {

  public values: Array<string>;
  public constructor(public managedPropertyName: string) {
    this.values = [];
  }
}
export default class PropertyBagFilteredSiteList extends React.Component<IPropertyBagFilteredSiteListProps, IPropertyBagFilteredSiteListState> {
  public constructor(props) {

    super(props);
    this.state = { sites: [], errorMessages: [], userFilters: [], appliedUserFilters: [] };
  }
  /** Utility Functions */
  public removeMessage(messageId: string) {
    _.remove(this.state.errorMessages, {
      Id: messageId
    });
    this.setState(this.state);
  }

  public setupUserFilters(userFilterNames: Array<string>) {
    this.state.userFilters = [];
    for (let userFilterName of userFilterNames) {
      this.state.userFilters.push(new UserFilter(userFilterName))
    }
  }

  public extractUserFilterValues(r) {
    for (let userFilter of this.state.userFilters) {
      const value = r[userFilter.managedPropertyName].trim();
      if (_.find(userFilter.values, v => { return v === value; })) {
        // already there
      }
      else {
        userFilter.values.push(value)
      }
    }

  }
  public getSites(siteTemplatesToInclude: string, filters: string, showQueryText: boolean, userFilters: string, showSiteDescriptions: boolean) {

    let userFilterNameArray = [];
    if (userFilters) {
      for (let userFilter of userFilters.split('\n')) {
        if (userFilter.trim() != "") {
          userFilterNameArray.push(userFilter);
        }
      }
    }
    let querytext = "contentclass:STS_Site ";
    if (siteTemplatesToInclude) {
      querytext = utils.addSiteTemplatesToSearchQuery(siteTemplatesToInclude, querytext);
    }
    if (filters) {
      querytext = utils.addFiltersToSearchQuery(filters, querytext);
    }
    if (showQueryText) {
      this.state.errorMessages.push(new md.Message("Using Query " + querytext));
    }
    let selectProperties: Array<string> = ["Title", "SPSiteUrl"];

    if (showSiteDescriptions) {
      selectProperties.push("Description");
    }
    for (let userFilter of userFilterNameArray) {
      selectProperties.push(userFilter);
    }

    const q: SearchQuery = {
      Querytext: querytext,
      SelectProperties: selectProperties,
      RowLimit: 999,
      TrimDuplicates: false,
      // SortList:
      // [
      //   {
      //     Property: 'Title',
      //     Direction: SortDirection.Ascending
      //   }
      // ]

    };
    pnp.sp.search(q).then((results: SearchResults) => {
      this.state.sites = [];
      this.setupUserFilters(userFilterNameArray);
      for (const r of results.PrimarySearchResults) {
        this.state.sites.push(new Site(r.Title, r.Description, r.SPSiteUrl));
        this.extractUserFilterValues(r);
      }

      this.setState(this.state);
    }).catch(err => {
      debugger;
      this.state.errorMessages.push(new md.Message(err));
      this.setState(this.state);
    });
  }
  /** react lifecycle */
  public componentWillMount() {
    this.getSites(this.props.siteTemplatesToInclude, this.props.filters, this.props.showQueryText, this.props.userFilters, this.props.showSiteDescriptions);
  }
  public componentWillReceiveProps(nextProps: IPropertyBagFilteredSiteListProps, nextContext: any) {

    this.getSites(nextProps.siteTemplatesToInclude, nextProps.filters, nextProps.showQueryText, nextProps.userFilters, nextProps.showSiteDescriptions);
  }
  public conditionallyRenderDescription(site: Site) {
    if (this.props.showSiteDescriptions) {
      return (<Label>{site.description}</Label>);
    }
    else {
      return (<div />);
    }
  }
  private SetupFilters(): Array<IContextualMenuItem> {
    const items = new Array<IContextualMenuItem>();
    for (let uf of this.state.userFilters) {
      let item: IContextualMenuItem = {
        key: uf.managedPropertyName,
        name: uf.managedPropertyName,
        title: uf.managedPropertyName,
      };
      item.items = [];
      for (const value of uf.values) {
        item.items.push({
          key: value,
          data: {
            managedPropertyName: uf.managedPropertyName,
            value: value
          },
          checked: this.AppliedFilterExists(uf.managedPropertyName, value),
          name: value,
          title: value,
          onClick: this.filterOnMetadata.bind(this)
        });
      }
      items.push(item);
    }
    return items;
  }
  public AppliedFilterExists(managedPropertyName: string, value: string): boolean {
 
    const selectedFilter = _.find(this.state.appliedUserFilters, af => {
    return (af.managedPropertyName === managedPropertyName && af.value === value);
    });
    if (selectedFilter) { return true; } else { return false; }
  }

  public ToggleAppliedUserFilter(item: IContextualMenuItem) {
    if (this.AppliedFilterExists(item.data.managedPropertyName, item.data.value)) {
      this.state.appliedUserFilters = this.state.appliedUserFilters.filter(af => {
         return (af.managedPropertyName !== item.data.managedPropertyName || af.value !== item.data.value);
        });
    }
    else {
      this.state.appliedUserFilters.push(new AppliedUserFilter(item.data.managedPropertyName, item.data.value));
    }

  }
  public filterOnMetadata(ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) {

    this.ToggleAppliedUserFilter(item);
    this.setState(this.state);
  }


  public render(): React.ReactElement<IPropertyBagFilteredSiteListProps> {


    const listItems = this.state.sites.map((site) =>
      <li >
        <a href={site.url} target={this.props.linkTarget}>{site.title}</a>
        {this.conditionallyRenderDescription(site)}
      </li>
    );
    let commandItems: Array<IContextualMenuItem> = this.SetupFilters();
debugger;
    const sites = this.state.sites;
    return (
      <div >
        <Label>{this.props.description}</Label>
        <CommandBar items={commandItems} />
        <MessageDisplay
          messages={this.state.errorMessages}
          hideMessage={this.removeMessage.bind(this)}
        />
        <ul > {listItems}</ul>
        {/*<List items={sites} startIndex={0} 
          onRenderCell={(site, index) => {
        
            return (
              <div >
                <Link href={site.url}>{site.title}</Link>
                <Label>{site.description}</Label>
              </div>
            );
          }}
        >
        </List>*/}

      </div >
    );
  }
}
