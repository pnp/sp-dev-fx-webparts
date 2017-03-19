import { BaseComponent } from '../../common/BaseComponent';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import './TeachingBubble.scss';
export interface ITeachingBubbleState {
    isTeachingBubbleVisible?: boolean;
}
export declare class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
    static defaultProps: {
        calloutProps: {
            beakWidth: number;
            gapSpace: number;
            setInitialFocus: boolean;
            doNotLayer: boolean;
            directionalHint: DirectionalHint;
        };
    };
    constructor(props: ITeachingBubbleProps);
    render(): JSX.Element;
}
