import * as React from 'react';
import { IMyRecentDocumentsWebPartProps } from '../IMyRecentDocumentsWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { ITrendingDocument } from '../../ITrendingDocument';
export interface IMyRecentDocumentsProps extends IMyRecentDocumentsWebPartProps {
    httpClient: SPHttpClient;
    siteUrl: string;
}
export interface IMyRecentDocumentsState {
    myDocuments: ITrendingDocument[];
    loading: boolean;
    error: string;
}
export default class MyRecentDocuments extends React.Component<IMyRecentDocumentsProps, IMyRecentDocumentsState> {
    constructor(props: IMyRecentDocumentsProps, state: IMyRecentDocumentsState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IMyRecentDocumentsProps, prevState: IMyRecentDocumentsState, prevContext: any): void;
    render(): JSX.Element;
    private loadMyDocuments(siteUrl, numberOfDocuments);
    private getActorsInfo(actorId, siteUrl);
}
