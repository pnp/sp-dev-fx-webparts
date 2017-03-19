import * as React from 'react';
import { IChoiceGroupProps } from './ChoiceGroup.Props';
import './ChoiceGroup.scss';
export interface IChoiceGroupState {
    keyChecked: string;
    /** Is true when the control has focus. */
    keyFocused?: string;
}
export declare class ChoiceGroup extends React.Component<IChoiceGroupProps, IChoiceGroupState> {
    static defaultProps: {
        options: any[];
    };
    private _id;
    private _descriptionId;
    private _inputElement;
    constructor(props: IChoiceGroupProps);
    componentWillReceiveProps(newProps: IChoiceGroupProps): void;
    render(): JSX.Element;
    focus(): void;
    private _onFocus(option, ev);
    private _onBlur(option, ev);
    private _renderField(option);
    private _onChange(option, evt);
    /**
     * If all the isChecked property of options are falsy values, return undefined;
     * Else return the key of the first option with the truthy isChecked property.
     */
    private _getKeyChecked(options);
}
