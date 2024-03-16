import * as _ from "lodash";
import * as React from 'react';
import pnp, { SearchQuery, SearchResults } from "sp-pnp-js";
import { IPropertyBagGlobalNavProps } from './IPropertyBagGlobalNavProps';

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
import * as md from "../../shared/MessageDisplay";
import utils from "../../shared/utils";
export class PropertyBagGlobalNavState {
  public menuitems: Array<IContextualMenuItem>; // The menuItems to display
  public errorMessages: Array<md.Message>;// any error messages
}

export default class PropertyBagGlobalNav extends React.Component<IPropertyBagGlobalNavProps, PropertyBagGlobalNavState> {
  public constructor(props) {
    super(props);
    this.state = { menuitems: [], errorMessages: [] };
  }
  /**
   * Extracts the values from a searchResult and adds them to the list of menuItems
   * each managedProperty in managedProperties represents a level in the menu. The actial sites
   * are added below the last level.
   * @param {*} r -- a searchresult
   *
   * @memberOf PropertyBagGlobalNav
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addMenuItem(items: Array<IContextualMenuItem>, r: any): Array<IContextualMenuItem> {
    let currentItem: IContextualMenuItem;
    let currentSet: Array<IContextualMenuItem> = items;

    for (const managedProperty of this.props.managedProperties) {
      if (r[managedProperty]) {// if site does not have this property set
        const value = r[managedProperty].trim();
        currentItem = _.find(currentSet, i => { return i.key === value; });
        if (!currentItem) {
          const idx = currentSet.push({ key: value, name: value, subMenuProps: { items: [] } });
          currentItem = currentSet[idx - 1];
        }
        currentSet = currentItem.subMenuProps.items;
      }
    }
    if (currentItem) {  // should have it if  site does  have this property set
      currentItem.subMenuProps.items.push({
        key: r.Title,
        name: r.Title,
        href: r.SPSiteUrl
      });
    }
    return items;
  }
  /**
   * Gets the list of sites to be displayed in the Menu using the filters specified in
   * the PropertyPane
   *
   * @param {Array<string>} siteTemplatesToInclude  Site Templates to be included in the menu
   * @param {Array<string>} filters Additional metadata filters to be applid to the list of sites
   * @param {Array<string>} managedProperties -- the list of properties used to build the menu
   *
   * @memberOf PropertyBagGlobalNav
   */
  private getSites(siteTemplatesToInclude: Array<string>, filters: Array<string>, managedProperties: Array<string>): void {

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
      const menuitems = [];
      for (const r of results.PrimarySearchResults) {
        this.addMenuItem(menuitems, r);
      }
      debugger;
      this.setState((current) => ({ ...current, menuitems: menuitems }));



    }).catch(err => {
      debugger;

      const em = this.state.errorMessages;
      em.push(new md.Message(err));
      this.setState(current => ({ ...current, errorMessages: em }));
    });
  }

  public componentDidMount(): void {

    this.getSites(this.props.siteTemplatesToInclude, this.props.filters, this.props.managedProperties);
  }
  // public componentDidUpdate(nextProps: IPropertyBagGlobalNavProps, nextContext: any): void {

  //   this.getSites(nextProps.siteTemplatesToInclude, nextProps.filters, nextProps.managedProperties);
  // }
  public render(): React.ReactElement<IPropertyBagGlobalNavProps> {
    return (
      <CommandBar items={this.state.menuitems} />
    );
  }
}
