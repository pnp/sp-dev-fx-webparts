import * as React from 'react';
import { IPeoplePickerItemWithMenuProps } from './PeoplePickerItem.Props';
export interface IPeoplePickerItemState {
    contextualMenuVisible: boolean;
}
export declare class SelectedItemWithMenu extends React.Component<IPeoplePickerItemWithMenuProps, IPeoplePickerItemState> {
    refs: {
        [key: string]: any;
        ellipsisRef: HTMLElement;
    };
    constructor(props: IPeoplePickerItemWithMenuProps);
    render(): JSX.Element;
    private onContextualMenu(ev?);
    private _onCloseContextualMenu(ev);
}
