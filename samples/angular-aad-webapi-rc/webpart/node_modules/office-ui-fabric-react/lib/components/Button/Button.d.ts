import { IButtonProps, IButton } from './Button.Props';
import { BaseComponent } from '../../common/BaseComponent';
import './Button.scss';
export interface IButtonState {
    labelId?: string;
    descriptionId?: string;
    ariaDescriptionId?: string;
}
export declare class Button extends BaseComponent<IButtonProps, IButtonState> implements IButton {
    static defaultProps: IButtonProps;
    private _buttonElement;
    constructor(props: IButtonProps);
    render(): JSX.Element;
    focus(): void;
}
