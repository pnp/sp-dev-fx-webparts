import * as React from 'react';
import pnp from "sp-pnp-js";
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
  searchableProps: Array<string>;
  messsage: string;
  isediting: boolean;
}
export default class PropertyBagDisplay extends React.Component<IPropertyBagDisplayProps, IPropertyBagDisplayState> {
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
    //search contentclass:STS_Site
    pnp.sp.search("contentclass:STS_Site").then(r=>{
      debugger;
    });
  }
  public render(): React.ReactElement<IPropertyBagDisplayProps> {
    return (
   <div/>
    );
  }
}
