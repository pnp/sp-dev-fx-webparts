import * as React from 'react';
import pnp from "sp-pnp-js";
import { SearchQuery, SearchResults, SearchResult } from "sp-pnp-js";
import { css } from 'office-ui-fabric-react';
import styles from './PropertyBagDisplay.module.scss';
import { IPropertyBagDisplayProps } from './IPropertyBagDisplayProps';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, CheckboxVisibility,
} from "office-ui-fabric-react/lib/DetailsList";
import { IContextualMenuItem, } from 'office-ui-fabric-react/lib/ContextualMenu';
export interface IPropertyBagDisplayState {
  selectedIndex: number;

  messsage?: string;
  isediting?: boolean;
  sites: Array<any>;
}
export default class PropertyBagDisplay extends React.Component<IPropertyBagDisplayProps, IPropertyBagDisplayState> {
  public constructor() {
    super();
    this.state = { sites: [], selectedIndex: -1 };

  }
  /**Accessors */
  get CommandItems(): Array<IContextualMenuItem> {
    debugger;
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
  public onEditItemClicked(e?: MouseEvent): void {
    this.state.isediting = true;

    this.setState(this.state);
  }
  get ItemIsSelected(): boolean {
    if (!this.state) { return false; }
    return (this.state.selectedIndex != -1);
  }
  /** react lifecycle */
  public componentWillMount() {
    const displayProps: Array<string> = this.props.propertiesToDisplay.split("\n");
    displayProps.unshift("Title");
    displayProps.unshift("Url");
    displayProps.unshift("WebTemplate");
    displayProps.unshift("WebTemplateId");
    //search contentclass:STS_Site
    const q: SearchQuery = {
      Querytext: "contentclass:STS_Site",
      SelectProperties: displayProps,
      RowLimit: 999,
      TrimDuplicates:false

    };

    pnp.sp.search(q).then((results: SearchResults) => {
      debugger;
      for (const r of results.PrimarySearchResults) {
        let obj = {};


        for (const dp of displayProps) {
          obj[dp] = r[dp];
        }
        this.state.sites.push(obj);
      }

      this.setState(this.state);
    });
  }
  public render(): React.ReactElement<IPropertyBagDisplayProps> {
    debugger;
    return (
      <DetailsList items={this.state.sites}>
      </DetailsList>
    );
  }
}
