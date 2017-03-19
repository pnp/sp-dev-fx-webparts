import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps, TooltipDelay } from './Tooltip.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import './Tooltip.scss';
export declare class Tooltip extends BaseComponent<ITooltipProps, any> {
    static defaultProps: {
        directionalHint: DirectionalHint;
        delay: TooltipDelay;
        calloutProps: {
            isBeakVisible: boolean;
            beakWidth: number;
            gapSpace: number;
            setInitialFocus: boolean;
            doNotLayer: boolean;
        };
    };
    render(): JSX.Element;
}
