import * as React from 'react';
export interface IDelayedRenderProps extends React.Props<any> {
    /**
     * Number of milliseconds to delay rendering children.
     * @default 0
     */
    delay?: number;
}
export interface IDelayedRenderState {
    /**
     * Whether the component is rendered or not.
     */
    isRendered: boolean;
}
/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @example
 * <DelayedRender delay={ 3000 }>
 *  <div className='foo-List-loadingSpinner'>
 *    <p>I am loading</p>
 *    <Spinner />
 *  </div>
 * </DelayedRender>
 */
export declare class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
    static defaultProps: {
        delay: number;
    };
    private _timeoutId;
    constructor(props: IDelayedRenderProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
}
