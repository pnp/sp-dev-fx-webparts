import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipHostProps } from './TooltipHost.Props';
import { TooltipDelay } from './Tooltip.Props';
export declare class TooltipHost extends BaseComponent<ITooltipHostProps, any> {
    static defaultProps: {
        delay: TooltipDelay;
    };
    private _tooltipHost;
    constructor(props: ITooltipHostProps);
    render(): JSX.Element;
    private _onTooltipMouseEnter(ev);
    private _onTooltipMouseLeave(ev);
}
