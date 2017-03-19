import * as React from 'react';
/**
 * Interface for ChoiceGroupBasicExample state.
 */
export interface IChoiceGroupBasicExampleState {
    imageKey: string;
}
export declare class ChoiceGroupBasicExample extends React.Component<any, IChoiceGroupBasicExampleState> {
    constructor();
    render(): JSX.Element;
    private _onChanged();
    private _onImageChoiceGroupChange(option, evt?);
}
