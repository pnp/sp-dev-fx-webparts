import { BaseComponent } from '../../common/BaseComponent';
import { IPanelProps } from './Panel.Props';
import './Panel.scss';
export interface IPanelState {
    isOpen?: boolean;
    isAnimatingOpen?: boolean;
    isAnimatingClose?: boolean;
    id?: string;
}
export declare class Panel extends BaseComponent<IPanelProps, IPanelState> {
    static defaultProps: IPanelProps;
    constructor(props: IPanelProps);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: IPanelProps): void;
    render(): JSX.Element;
    dismiss(): void;
    private _onPanelClick();
    private _onPanelRef(ref);
    private _onAnimationEnd(ev);
}
