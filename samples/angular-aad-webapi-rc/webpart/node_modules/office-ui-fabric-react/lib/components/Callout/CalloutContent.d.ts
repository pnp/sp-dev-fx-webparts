import * as React from 'react';
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { BaseComponent } from '../../common/BaseComponent';
import './Callout.scss';
export interface ICalloutState {
    positions?: any;
    slideDirectionalClassName?: string;
    calloutElementRect?: ClientRect;
}
export declare class CalloutContent extends BaseComponent<ICalloutProps, ICalloutState> {
    static defaultProps: {
        isBeakVisible: boolean;
        beakWidth: number;
        gapSpace: number;
        directionalHint: DirectionalHint;
    };
    private _didSetInitialFocus;
    private _hostElement;
    private _calloutElement;
    private _targetWindow;
    private _bounds;
    private _maxHeight;
    private _positionAttempts;
    private _target;
    constructor(props: ICalloutProps);
    componentDidUpdate(): void;
    componentWillMount(): void;
    componentWillUpdate(newProps: ICalloutProps): void;
    componentDidMount(): void;
    render(): JSX.Element;
    dismiss(ev?: Event | React.MouseEvent<HTMLElement>): void;
    protected _dismissOnLostFocus(ev: Event): void;
    protected _setInitialFocus(): void;
    protected _onComponentDidMount(): void;
    private _updatePosition();
    private _getBounds();
    private _getMaxHeight();
    private _setTargetWindowAndElement(target);
}
