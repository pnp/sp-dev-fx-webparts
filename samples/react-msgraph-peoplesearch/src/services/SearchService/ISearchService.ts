import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { PageCollection } from '../../models/PageCollection';

export interface ISearchService {
    selectParameter: string[];
    filterParameter: string;
    orderByParameter: string;
    searchParameter: string;
    pageSize: number;
    searchUsers(): Promise<PageCollection<MicrosoftGraph.User>>;
    fetchPage(pageLink: string): Promise<PageCollection<MicrosoftGraph.User>>;
}