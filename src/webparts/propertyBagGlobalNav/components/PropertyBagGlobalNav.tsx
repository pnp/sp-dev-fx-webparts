import * as React from 'react';
import { IPropertyBagGlobalNavProps } from './IPropertyBagGlobalNavProps';
import pnp from "sp-pnp-js";
import { SortDirection } from "sp-pnp-js";
import * as _ from "lodash";
import { SearchQuery, SearchResults } from "sp-pnp-js";
import { css } from "office-ui-fabric-react";

import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Link } from "office-ui-fabric-react/lib/Link";
import { List } from "office-ui-fabric-react/lib/List";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as md from "../../shared/MessageDisplay";
import utils from "../../shared/utils";
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
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
export class PropertyBagGlobalNavState {
  public menuitems: Array<IContextualMenuItem>;
  public errorMessages: Array<md.Message>;
}

export default class PropertyBagGlobalNav extends React.Component<IPropertyBagGlobalNavProps, PropertyBagGlobalNavState> {
  public constructor(props) {
    super(props);
    this.state = { menuitems: [], errorMessages: [] };
  }
  public addMenuItem(r: any): void {
    let currentItem: IContextualMenuItem;
    let currentSet: Array<IContextualMenuItem> = this.state.menuitems;
    debugger;
    for (const managedProperty of this.props.managedProperties) {
      const value = r[managedProperty].trim();
      currentItem = _.find(currentSet, i => { return i.key === value; });
      if (!currentItem) {
        const idx = currentSet.push({ key: value, name: value, items: [] });
        currentItem = currentSet[idx - 1];
      }
      currentSet = currentItem.items;
    }
    currentItem.items.push({
      key: r['Title'],
      name: r['Title'],
      url: r['SPSiteUrl']
    });
  }
  public getSites(siteTemplatesToInclude: Array<string>, filters: Array<string>, managedProperties: Array<string>) {

    let querytext = "contentclass:STS_Site ";
    if (siteTemplatesToInclude) {
      querytext = utils.addSiteTemplatesToSearchQuery(siteTemplatesToInclude, querytext);
    }
    if (filters) {
      querytext = utils.addFiltersToSearchQuery(filters, querytext);
    }
    const selectProperties: Array<string> = ["Title", "SPSiteUrl"];


    for (const managedProperty of managedProperties) {
      selectProperties.push(managedProperty);
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
      this.state.menuitems = [];
      for (const r of results.PrimarySearchResults) {
        this.addMenuItem(r);
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

    this.getSites(this.props.siteTemplatesToInclude, this.props.filters, this.props.managedProperties);
  }
  public componentWillReceiveProps(nextProps: IPropertyBagGlobalNavProps, nextContext: any) {

    this.getSites(nextProps.siteTemplatesToInclude, nextProps.filters, nextProps.managedProperties);
  }
  public render(): React.ReactElement<IPropertyBagGlobalNavProps> {
    return (
      <CommandBar items={this.state.menuitems} />
    );
  }
}
