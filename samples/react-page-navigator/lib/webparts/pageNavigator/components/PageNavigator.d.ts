import * as React from 'react';
import { IPageNavigatorProps } from './IPageNavigatorProps';
import { IPageNavigatorState } from './IPageNavigatorState';
export default class PageNavigator extends React.Component<IPageNavigatorProps, IPageNavigatorState> {
    constructor(props: IPageNavigatorProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPageNavigatorProps): void;
    private onLinkClick;
    /**
     * Traverse up the DOM from the webpart stickyParentDistance times and then apply the relevant CSS to enable sticky mode to the right component
     * This does involve modifying HTML elements outside of the webpart, so could stop working in the future if Microsoft change their HTML\CSS etc.
     * At time of writing, stickyParentDistance = 1 works correctly for the component when configured on a vertical section as per the README.
     */
    private configureSticky;
    render(): React.ReactElement<IPageNavigatorProps>;
}
//# sourceMappingURL=PageNavigator.d.ts.map