import * as React from 'react';
import './FocusTrapZone.Box.Example.scss';
export interface IBoxNoClickExampleExampleState {
    isToggled: boolean;
}
export default class BoxNoClickExample extends React.Component<React.HTMLProps<HTMLDivElement>, IBoxNoClickExampleExampleState> {
    refs: {
        [key: string]: React.ReactInstance;
        toggle: HTMLElement;
    };
    constructor(props: any);
    render(): JSX.Element;
    private _internalContents();
    private _onButtonClickHandler();
    private _onExitButtonClickHandler();
    private _onFocusTrapZoneToggleChanged(isToggled);
}
