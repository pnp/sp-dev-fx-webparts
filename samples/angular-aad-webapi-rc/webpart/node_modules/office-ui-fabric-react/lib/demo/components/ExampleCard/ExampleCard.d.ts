import * as React from 'react';
import './ExampleCard.scss';
export interface IExampleCardProps {
    title: string;
    isOptIn?: boolean;
    code?: string;
    children?: any;
    isRightAligned?: boolean;
    dos?: JSX.Element;
    donts?: JSX.Element;
}
export interface IExampleCardState {
    isCodeVisible?: boolean;
}
export declare class ExampleCard extends React.Component<IExampleCardProps, IExampleCardState> {
    constructor(props: IExampleCardProps);
    render(): JSX.Element;
    private _getDosAndDonts();
    private _onToggleCodeClick();
}
