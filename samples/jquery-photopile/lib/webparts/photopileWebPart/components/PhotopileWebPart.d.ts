/**
 * @file
 * Photopile Web Part React JSX component.
 *
 * Contains JSX code to render the web part with HTML templates.
 *
 * Author: Olivier Carpentier
 */
import * as React from 'react';
import { IPhotopileWebPartProps } from '../IPhotopileWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPListItem } from '../ISPList';
/**
 * @interface
 * Defines Photopile web part state.
 */
export interface IPhotopileState {
    results?: ISPListItem[];
    loaded: boolean;
}
/**
 * @class
 * Defines Photopile web part class.
 */
export default class PhotopileWebPart extends React.Component<IPhotopileWebPartProps, IPhotopileState> {
    private myPageContext;
    /**
     * @function
     * Photopile web part contructor.
     */
    constructor(props: IPhotopileWebPartProps, context: IWebPartContext);
    /**
     * @function
     * JSX Element render method
     */
    render(): JSX.Element;
    /**
     * @function
     * Function called when the component did mount
     */
    componentDidMount(): void;
    /**
     * @function
     * Function called when the web part properties has changed
     */
    componentWillReceiveProps(nextProps: IPhotopileWebPartProps): void;
    /**
     * @function
     * Function called when the component has been rendered (ie HTML code is ready)
     */
    componentDidUpdate(prevProps: IPhotopileWebPartProps, prevState: IPhotopileState): void;
}
