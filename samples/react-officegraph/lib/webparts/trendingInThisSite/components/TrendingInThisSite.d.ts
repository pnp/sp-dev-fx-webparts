import * as React from 'react';
import { ITrendingInThisSiteWebPartProps } from '../ITrendingInThisSiteWebPartProps';
export interface ITrendingInThisSiteProps extends ITrendingInThisSiteWebPartProps {
    siteUrl: string;
}
export interface ITrendingInThisSiteState {
    trendingDocuments: ITrendingDocument[];
    loading: boolean;
    error: string;
}
export interface ITrendingDocument {
    id: string;
    title: string;
    url: string;
    previewImageUrl: string;
    lastModifiedByPhotoUrl: string;
    lastModifiedByName: string;
    lastModifiedTime: string;
    extension: string;
}
export default class TrendingInThisSite extends React.Component<ITrendingInThisSiteProps, ITrendingInThisSiteState> {
    constructor(props: ITrendingInThisSiteProps, state: ITrendingInThisSiteState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ITrendingInThisSiteProps, prevState: ITrendingInThisSiteState, prevContext: any): void;
    render(): JSX.Element;
    private getValueFromResults(key, results);
    private trim(s);
    private getPreviewImageUrl(result, siteUrl);
    private getUserPhotoUrl(userEmail, siteUrl);
    private request<T>(url, method?, headers?, data?);
    private getSiteMembers(siteUrl);
    private getActors(siteMembers, requestDigest, siteUrl);
    private getTrendingContent(siteUrl, actors, requestDigest);
    private loadTrendingContent(siteUrl, numberOfDocuments);
    private handleError(err);
    private getRequestDigest(siteUrl);
}
