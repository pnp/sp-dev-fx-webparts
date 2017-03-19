import * as React from 'react';
import { ISelection, SelectionMode } from '../../../../utilities/selection/index';
import './Selection.Example.scss';
export interface ISelectionBasicExampleState {
    items?: any[];
    selection?: ISelection;
    selectionMode?: SelectionMode;
    canSelect?: string;
}
export interface ISelectionItemExampleProps {
    item?: any;
    itemIndex?: number;
    selection?: ISelection;
    selectionMode?: SelectionMode;
}
/**
 * The SelectionBasicExample controls the selection state of all items
 */
export declare class SelectionBasicExample extends React.Component<any, ISelectionBasicExampleState> {
    private _hasMounted;
    constructor();
    componentDidMount(): void;
    render(): JSX.Element;
    private _onSelectionChanged();
    private _onToggleSelectAll();
    private _onSelectionModeChanged(ev, menuItem);
    private _onCanSelectChanged(ev, menuItem);
    private _canSelectItem(item);
    private _getCommandItems();
}
/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
export declare class SelectionItemExample extends React.Component<ISelectionItemExampleProps, {}> {
    render(): JSX.Element;
}
