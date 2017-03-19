import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { SelectionLayout } from './SelectionLayout';
import { ISelection, ISelectionLayout, SelectionMode } from './interfaces';
export interface ISelectionZoneProps extends React.Props<SelectionZone> {
    selection: ISelection;
    layout?: ISelectionLayout;
    selectionMode?: SelectionMode;
    isSelectedOnFocus?: boolean;
    onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
}
export declare class SelectionZone extends BaseComponent<ISelectionZoneProps, {}> {
    static defaultProps: {
        layout: SelectionLayout;
        isMultiSelectEnabled: boolean;
        isSelectedOnFocus: boolean;
        selectionMode: SelectionMode;
    };
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _isCtrlPressed;
    private _isShiftPressed;
    private _isMetaPressed;
    private _shouldIgnoreFocus;
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
     * react to the event. Note that focus events in IE <= 11 will occur asynchronously after .focus() has
     * been called on an element, so we need a flag to store the idea that we will bypass the "next"
     * focus event that occurs. This method does that.
     */
    ignoreNextFocus(): void;
    /**
     * When we focus an item, for single/multi select scenarios, we should try to select it immediately
     * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
     * specially.
     */
    private _onFocus(ev);
    private _onMouseDown(ev);
    private _onClick(ev);
    /**
     * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
     * we should execute the invoke handler.
     */
    private _onDoubleClick(ev);
    private _onKeyDown(ev);
    private _onToggleAllClick(ev);
    private _onToggleClick(ev, index);
    private _onInvokeClick(ev, index);
    private _onItemSurfaceClick(ev, index);
    private _onInvokeMouseDown(ev, index);
    private _tryClearOnEmptyClick(ev);
    private _clearAndSelectIndex(index);
    /**
     * We need to track the modifier key states so that when focus events occur, which do not contain
     * modifier states in the Event object, we know how to behave.
     */
    private _updateModifiers(ev);
    private _findItemRoot(target);
    private _getItemIndex(itemRoot);
    private _hasAttribute(element, attributeName);
    private _isInputElement(element);
    private _isNonHandledClick(element);
}
