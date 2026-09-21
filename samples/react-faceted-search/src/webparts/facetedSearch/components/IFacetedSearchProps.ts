import { SPHttpClient } from '@microsoft/sp-http';
import { ISelectedRefiner } from '../models/ISearchModels';

export interface IFacetedSearchProps {
  httpClient: SPHttpClient;
  siteUrl: string;
  title: string;
}

export interface IFacetedSearchWebPartProps {
  title: string;
}

export interface IFacetedSearchRequest {
  query: string;
  selectedRefiners: ISelectedRefiner[];
}
