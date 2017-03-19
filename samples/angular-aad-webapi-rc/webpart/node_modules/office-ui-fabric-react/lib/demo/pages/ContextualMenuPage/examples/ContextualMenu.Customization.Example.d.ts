import * as React from 'react';
import './ContextualMenuExample.scss';
export interface IContextualMenuMultiselectExampleState {
    selection?: {
        [key: string]: boolean;
    };
    isContextMenuVisible?: boolean;
}
export declare class ContextualMenuCustomizationExample extends React.Component<any, IContextualMenuMultiselectExampleState> {
    constructor();
    render(): JSX.Element;
    private _renderCharmMenuItem(item);
    private _renderCategoriesList(item);
    private _onClick(event);
    private _onDismiss(event);
}
