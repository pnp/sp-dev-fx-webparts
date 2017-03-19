import * as React from 'react';
import './ComponentPage.scss';
export interface IComponentPageProps {
    title: string;
    componentName: string;
    exampleCards: JSX.Element;
    propertiesTables?: JSX.Element;
    bestPractices?: JSX.Element;
    dos?: JSX.Element;
    donts?: JSX.Element;
    overview: JSX.Element;
    related?: JSX.Element;
    route: string;
    isHeaderVisible?: boolean;
    className?: string;
}
export declare class ComponentPage extends React.Component<IComponentPageProps, {}> {
    static defaultProps: {
        isHeaderVisible: boolean;
    };
    constructor(props: IComponentPageProps);
    render(): JSX.Element;
    private _pageHeader();
    private _navigationLinks();
    private _getRelatedComponents();
    private _getPropertiesTable();
    private _getDosAndDonts();
}
