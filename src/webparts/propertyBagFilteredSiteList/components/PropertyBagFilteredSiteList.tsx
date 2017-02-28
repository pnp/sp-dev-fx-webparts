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
export default class PropertyBagFilteredSiteList extends React.Component<IPropertyBagFilteredSiteListProps, IPropertyBagFilteredSiteListState> {
  public constructor(props) {
    debugger;
    super(props);
    this.state = { sites: [], errorMessages: [] };
  }
  /** Utility Functions */
  public removeMessage(messageId: string) {
    _.remove(this.state.errorMessages, {
      Id: messageId
    });
    this.setState(this.state);
  }
  public getSites(siteTemplatesToInclude: string, filters: string, showQueryText: boolean) {
    debugger;
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
    const q: SearchQuery = {
      Querytext: querytext,
      SelectProperties: ["Title", "Description", "SPSiteUrl", "SPWebUrl"],
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
      for (const r of results.PrimarySearchResults) {
        this.state.sites.push(new Site(r.Title, r.Description, r.SPSiteUrl));
      }
      debugger;
      this.setState(this.state);
    }).catch(err => {
      debugger;
      this.state.errorMessages.push(new md.Message(err));
      this.setState(this.state);
    });
  }
  /** react lifecycle */
  public componentWillMount() {
    this.getSites(this.props.siteTemplatesToInclude, this.props.filters, this.props.showQueryText);
  }
  public componentWillReceiveProps(nextProps: IPropertyBagFilteredSiteListProps, nextContext: any) {
    debugger;
    this.getSites(nextProps.siteTemplatesToInclude, nextProps.filters, nextProps.showQueryText);
  }
  public conditionallyRenderDescription(site: Site) {
    if (this.props.showSiteDescriptions) {
      return (<Label>{site.description}</Label>);
    }
    else {
      return (<div />);
    }
  }
  public render(): React.ReactElement<IPropertyBagFilteredSiteListProps> {
    debugger;
    const listItems = this.state.sites.map((site) =>
      <li >
        <a href={site.url} target={this.props.linkTarget}>{site.title}</a>
        {this.conditionallyRenderDescription(site)}
      </li>
    );
    const sites = this.state.sites;
    return (
      <div >
        <Label>{this.props.description}</Label>
        <MessageDisplay
          messages={this.state.errorMessages}
          hideMessage={this.removeMessage.bind(this)}
        />
        <ul > {listItems}</ul>
        {/*<List items={sites} startIndex={0} 
          onRenderCell={(site, index) => {
            debugger;
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
