import { IProgressIndicatorProps } from './ProgressIndicator.Props';
import { BaseComponent } from '../../common/BaseComponent';
import './ProgressIndicator.scss';
export declare class ProgressIndicator extends BaseComponent<IProgressIndicatorProps, {}> {
    static defaultProps: {
        label: string;
        description: string;
        percentComplete: number;
        width: number;
    };
    constructor(props: IProgressIndicatorProps);
    render(): JSX.Element;
}
