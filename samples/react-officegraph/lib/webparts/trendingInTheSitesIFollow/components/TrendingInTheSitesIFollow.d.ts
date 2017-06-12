import * as React from 'react';
import { ITrendingInTheSitesIFollowWebPartProps } from '../ITrendingInTheSitesIFollowWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { ITrendingDocument } from '../../ITrendingDocument';
export interface ITrendingInTheSitesIFollowProps extends ITrendingInTheSitesIFollowWebPartProps {
    httpClient: SPHttpClient;
    siteUrl: string;
}
export interface ITrendingInTheSitesIFollowState {
    trendingDocuments: ITrendingDocument[];
    loading: boolean;
    error: string;
}
export default class TrendingInTheSitesIFollow extends React.Component<ITrendingInTheSitesIFollowProps, ITrendingInTheSitesIFollowState> {
    constructor(props: ITrendingInTheSitesIFollowProps, state: ITrendingInTheSitesIFollowState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ITrendingInTheSitesIFollowProps, prevState: ITrendingInTheSitesIFollowState, prevContext: any): void;
    render(): JSX.Element;
    private loadDocuments(siteUrl, numberOfDocuments);
    private getSitesIFollow(siteUrl);
    private getTrendingDocuments(sitesIFollow, siteUrl, numberOfDocuments);
}
