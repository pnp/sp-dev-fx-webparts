import * as React from 'react';
import './ContextualMenuExample.scss';
export interface IContextualMenuMultiselectExampleState {
    selection?: {
        [key: string]: boolean;
    };
    isContextMenuVisible?: boolean;
}
export declare class ContextualMenuCheckmarksExample extends React.Component<any, IContextualMenuMultiselectExampleState> {
    constructor();
    render(): JSX.Element;
    private _onToggleSelect(ev?, item?);
    private _onClick(event);
    private _onDismiss();
}
