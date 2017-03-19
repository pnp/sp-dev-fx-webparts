import * as React from 'react';
import { IToggleProps } from './Toggle.Props';
import './Toggle.scss';
export interface IToggleState {
    isChecked: boolean;
}
export declare class Toggle extends React.Component<IToggleProps, IToggleState> {
    static initialProps: {
        label: string;
        onText: string;
        offText: string;
    };
    private _id;
    private _toggleButton;
    constructor(props: IToggleProps);
    /**
     * Gets the current checked state of the toggle.
     */
    readonly checked: boolean;
    componentWillReceiveProps(newProps: IToggleProps): void;
    render(): JSX.Element;
    focus(): void;
    private _onClick();
}
