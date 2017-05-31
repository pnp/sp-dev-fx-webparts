import * as React from 'react';
import { IWorkingWithWebPartProps } from '../IWorkingWithWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';
export interface IWorkingWithProps extends IWorkingWithWebPartProps {
    httpClient: SPHttpClient;
    siteUrl: string;
}
export interface IPerson {
    name: string;
    email: string;
    jobTitle: string;
    department: string;
    photoUrl: string;
    profileUrl: string;
}
export interface IWorkingWithState {
    loading: boolean;
    people: IPerson[];
    error: string;
}
export default class WorkingWith extends React.Component<IWorkingWithProps, IWorkingWithState> {
    constructor(props: IWorkingWithProps, state: IWorkingWithState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IWorkingWithProps, prevState: IWorkingWithState, prevContext: any): void;
    render(): JSX.Element;
    private navigateTo(url);
    private loadPeople(siteUrl, numberOfPeople);
}
