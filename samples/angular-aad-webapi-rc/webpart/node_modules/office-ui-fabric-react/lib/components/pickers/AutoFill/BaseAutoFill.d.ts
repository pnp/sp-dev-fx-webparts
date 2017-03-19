import { IBaseAutoFillProps, IBaseAutoFill } from './BaseAutoFill.Props';
import { BaseComponent } from '../../../common/BaseComponent';
export interface IBaseAutoFillState {
    value?: string;
}
export declare class BaseAutoFill extends BaseComponent<IBaseAutoFillProps, IBaseAutoFillState> implements IBaseAutoFill {
    private _inputElement;
    constructor(props: IBaseAutoFillProps);
    readonly cursorLocation: number;
    readonly isValueSelected: boolean;
    readonly value: string;
    readonly selectionStart: number;
    readonly selectionEnd: number;
    readonly inputElement: HTMLInputElement;
    componentDidUpdate(): void;
    render(): JSX.Element;
    focus(): void;
    clear(): void;
    private _onKeyDown(ev);
    private _handleBackspace(ev);
    private _onChange(ev);
    private _notifyInputChange(newValue);
    private _updateValue(newValue);
    private _doesTextStartWith(text, startWith);
}
