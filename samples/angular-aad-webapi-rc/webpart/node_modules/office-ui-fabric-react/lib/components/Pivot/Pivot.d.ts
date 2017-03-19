import * as React from 'react';
import { IPivotProps } from './Pivot.Props';
import { IPivotItemProps } from './PivotItem.Props';
import './Pivot.scss';
/**
 *  Usage:
 *
 *   <Pivot>
 *     <PivotItem linkText="Foo">
 *       <Label>Pivot #1</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bar">
 *       <Label>Pivot #2</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bas">
 *     <Label>Pivot #3</Label>
 *     </PivotItem>
 *   </Pivot>
 */
export interface IPivotState {
    links: IPivotItemProps[];
    selectedKey: string;
    id: string;
}
export declare class Pivot extends React.Component<IPivotProps, IPivotState> {
    private _keyToIndexMapping;
    constructor(props: IPivotProps);
    componentWillReceiveProps(nextProps: IPivotProps): void;
    render(): JSX.Element;
    /**
     * Renders the set of links to route between pivots
     */
    private _renderPivotLinks();
    /**
     * Renders a pivot link
     */
    private _renderLink(link);
    /**
     * Renders the current Pivot Item
     */
    private _renderPivotItem();
    /**
     * Gets the set of PivotLinks as arrary of IPivotItemProps
     * The set of Links is determined by child components of type PivotItem
     */
    private _getPivotLinks(props);
    /**
     * whether the key exists in the pivot items.
     */
    private _isKeyValid(itemKey);
    /**
     * Handles the onClick event on PivotLinks
     */
    private _onLinkClick(itemKey, ev);
    /**
     * Handle the onKeyPress eventon the PivotLinks
     */
    private _onKeyPress(itemKey, ev);
    /**
     * Updates the state with the new selected index
     */
    private _updateSelectedItem(itemKey, ev?);
}
