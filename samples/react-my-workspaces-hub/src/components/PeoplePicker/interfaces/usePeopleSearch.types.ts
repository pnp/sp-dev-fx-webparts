import type { MSGraphClientFactory, SPHttpClient } from '@microsoft/sp-http';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type { ISPService } from '../../../interfaces/ISPService';
import type { TPrincipalType } from '../../../interfaces/IPrincipal';
import type { IPeoplePickerCacheOptions } from '../../../utils/cache';
import type {
  IPeoplePickerItem,
  TPeoplePickerSearchScope,
  TPeoplePickerSourceStrategy
} from './PeoplePicker.types';

/** Configuration consumed by `usePeopleSearch`. */
export interface IUsePeopleSearchOptions {
  context: WebPartContext;
  spHttpClient?: SPHttpClient;
  msGraphClientFactory?: MSGraphClientFactory;
  spService?: ISPService;
  searchScope: TPeoplePickerSearchScope;
  sourceStrategy: TPeoplePickerSourceStrategy;
  maxSuggestions: number;
  searchDebounceInMs: number;
  restrictToSharePointSiteGroups?: boolean;
  searchInSharePointGroupId?: number;
  searchInAadGroupObjectId?: string;
  includeM365Groups: boolean;
  includeSecurityGroups: boolean;
  ensureUser: boolean;
  ensureUserFor: TPrincipalType[];
  cache?: IPeoplePickerCacheOptions;
}

/** Public surface returned by `usePeopleSearch`. */
export interface IUsePeopleSearchResult {
  query: string;
  setQuery: (next: string) => void;
  results: IPeoplePickerItem[];
  isLoading: boolean;
  error: string | undefined;
  /** Whether the most recent result set was served from cache. */
  isCacheHit: boolean;
  /** Programmatic search bypassing the debounced UI input. */
  search: (query: string) => Promise<IPeoplePickerItem[]>;
  /** Ensures the supplied items where applicable, returning hydrated copies. */
  ensureSelection: (items: IPeoplePickerItem[]) => Promise<IPeoplePickerItem[]>;
  clearCache: () => void;
}
