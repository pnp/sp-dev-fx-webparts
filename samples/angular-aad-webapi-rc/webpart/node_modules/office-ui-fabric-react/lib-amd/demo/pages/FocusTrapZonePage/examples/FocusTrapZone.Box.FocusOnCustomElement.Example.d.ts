import * as React from 'react';
import './FocusTrapZone.Box.Example.scss';
export interface IBoxExampleExampleState {
    isChecked: boolean;
}
export default class BoxExample extends React.Component<React.HTMLProps<HTMLDivElement>, IBoxExampleExampleState> {
    refs: {
        [key: string]: React.ReactInstance;
        toggle: HTMLElement;
    };
    constructor(props: any);
    render(): JSX.Element;
    private _internalContents();
    private _onButtonClickHandler();
    private _onExitButtonClickHandler();
    private _onFocusTrapZoneToggleChanged(isChecked);
}
