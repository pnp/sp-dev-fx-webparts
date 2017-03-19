import { BaseComponent } from '../../common/BaseComponent';
import { ICheckbox, ICheckboxProps } from './Checkbox.Props';
import './Checkbox.scss';
export interface ICheckboxState {
    /** Is true when the control has focus. */
    isFocused?: boolean;
    /** Is true when Uncontrolled control is checked. */
    isChecked?: boolean;
}
export declare class Checkbox extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
    static defaultProps: ICheckboxProps;
    private _id;
    private _checkBox;
    constructor(props: ICheckboxProps);
    render(): JSX.Element;
    readonly checked: boolean;
    focus(): void;
    private _onFocus(ev);
    private _onBlur(ev);
    private _onChange(ev);
}
