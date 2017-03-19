import * as React from 'react';
export interface ICheckboxBasicExampleState {
    isChecked: boolean;
}
export declare class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
    constructor();
    render(): JSX.Element;
    private _onCheckboxChange(ev, isChecked);
}
