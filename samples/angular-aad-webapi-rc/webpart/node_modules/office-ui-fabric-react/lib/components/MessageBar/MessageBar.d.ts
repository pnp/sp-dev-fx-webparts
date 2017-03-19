import * as React from 'react';
import './MessageBar.scss';
import { IMessageBarProps } from './MessageBar.Props';
export interface IMessageBarState {
    labelId?: string;
}
export declare class MessageBar extends React.Component<IMessageBarProps, IMessageBarState> {
    static defaultProps: IMessageBarProps;
    private ICON_MAP;
    constructor(props: IMessageBarProps);
    render(): JSX.Element;
    private _getActionsDiv();
    private _getClassName();
    private _getDismissDiv();
    private _getIconSpan();
    private _getInnerTextClassName();
    private _renderMultiLine();
    private _renderSingleLine();
}
