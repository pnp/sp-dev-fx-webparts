import * as React from 'react';
import { SiteReference } from '../models/SiteReference';
import { GraphDiscoveryService } from '../services/graph/GraphDiscoveryService';
import { Logger } from '../services/logging/Logger';
import { toMessage } from '../utilities/ErrorSerialization';
import { scopedStorageKey } from './usePageSelection';
import { UseNotificationsResult } from './useNotifications';

const RECENT_SITES_KEY = 'spfx-page-migration:recent-sites';
const MAX_RECENT_SITES = 5;

export type SiteSlot = 'source' | 'target';

const isSiteReference = (value: unknown): value is SiteReference => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<SiteReference>;
  return typeof candidate.id === 'string'
    && typeof candidate.displayName === 'string'
    && typeof candidate.webUrl === 'string';
};

const loadRecentSites = (storageKey: string): ReadonlyArray<SiteReference> => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isSiteReference).slice(0, MAX_RECENT_SITES) : [];
  } catch {
    return [];
  }
};

const saveRecentSites = (storageKey: string, sites: ReadonlyArray<SiteReference>): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(sites.slice(0, MAX_RECENT_SITES)));
    // eslint-disable-next-line no-empty
  } catch {
  }
};

export interface SiteSlotState {
  readonly options: ReadonlyArray<SiteReference>;
  readonly recentSites: ReadonlyArray<SiteReference>;
  readonly isSearching: boolean;
  readonly search: (query: string) => Promise<void>;
  readonly setOptions: React.Dispatch<React.SetStateAction<ReadonlyArray<SiteReference>>>;
  readonly addRecentSite: (site: SiteReference) => void;
}

export interface UseSiteSearchResult {
  readonly source: SiteSlotState;
  readonly target: SiteSlotState;
}

const useSiteSlot = (
  slot: SiteSlot,
  storageScope: string,
  graphDiscoveryService: GraphDiscoveryService,
  logger: Logger,
  notifications: UseNotificationsResult,
  isMountedRef: React.MutableRefObject<boolean>
): SiteSlotState => {
  const storageKey = React.useMemo(
    () => scopedStorageKey(`${RECENT_SITES_KEY}:${slot}`, storageScope),
    [slot, storageScope]
  );

  const [options, setOptions] = React.useState<ReadonlyArray<SiteReference>>([]);
  const [recentSites, setRecentSites] = React.useState<ReadonlyArray<SiteReference>>(() => loadRecentSites(storageKey));
  const [isSearching, setIsSearching] = React.useState(false);
  const requestRef = React.useRef(0);

  const search = React.useCallback(async (query: string) => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    setIsSearching(true);
    try {
      const results = await graphDiscoveryService.searchSites(query);
      if (isMountedRef.current && requestId === requestRef.current) {
        setOptions(results);
      }
    } catch (error) {
      if (isMountedRef.current && requestId === requestRef.current) {
        logger.error('Site search failed.', { query, error });
        notifications.pushNotification('error', toMessage(error, 'Site search failed.'));
        setOptions([]);
      }
    } finally {
      if (isMountedRef.current && requestId === requestRef.current) {
        setIsSearching(false);
      }
    }
  }, [graphDiscoveryService, logger, notifications, isMountedRef]);

  const addRecentSite = React.useCallback((site: SiteReference) => {
    setRecentSites((previous) => {
      const next = [site, ...previous.filter((entry) => entry.id !== site.id)].slice(0, MAX_RECENT_SITES);
      saveRecentSites(storageKey, next);
      return next;
    });
  }, [storageKey]);

  return { options, recentSites, isSearching, search, setOptions, addRecentSite };
};

export const useSiteSearch = (
  storageScope: string,
  graphDiscoveryService: GraphDiscoveryService,
  logger: Logger,
  notifications: UseNotificationsResult,
  isMountedRef: React.MutableRefObject<boolean>
): UseSiteSearchResult => ({
  source: useSiteSlot('source', storageScope, graphDiscoveryService, logger, notifications, isMountedRef),
  target: useSiteSlot('target', storageScope, graphDiscoveryService, logger, notifications, isMountedRef)
});
