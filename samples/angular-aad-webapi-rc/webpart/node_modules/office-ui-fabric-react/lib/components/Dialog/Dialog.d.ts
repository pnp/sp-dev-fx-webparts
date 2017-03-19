import { IDialogProps } from './Dialog.Props';
import { BaseComponent } from '../../common/BaseComponent';
import './Dialog.scss';
export interface IDialogState {
    isOpen?: boolean;
    isAnimatingOpen?: boolean;
    isAnimatingClose?: boolean;
    id?: string;
}
export declare class Dialog extends BaseComponent<IDialogProps, IDialogState> {
    static defaultProps: IDialogProps;
    constructor(props: IDialogProps);
    componentWillReceiveProps(newProps: IDialogProps): void;
    render(): JSX.Element;
    private _groupChildren();
    private _onDialogRef(ref);
    private _onAnimationEnd(ev);
}
