import { BaseComponent } from '../../common/BaseComponent';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { ITeachingBubbleState } from './TeachingBubble';
import { ImageFit } from '../../Image';
import './TeachingBubble.scss';
export declare class TeachingBubbleContent extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
    static defaultProps: {
        hasCondensedHeadline: boolean;
        imageProps: {
            imageFit: ImageFit;
            width: number;
            height: number;
        };
    };
    private _id;
    constructor(props: ITeachingBubbleProps);
    render(): JSX.Element;
}
