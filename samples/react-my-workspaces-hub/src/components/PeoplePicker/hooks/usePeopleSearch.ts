import * as React from 'react';
import type { ISPService, IPrincipalSearchOptions } from '../../../interfaces';
import type { IUserListItem } from '../../../interfaces/IUser';
import { SPService } from '../../../services/SPService';
import { GraphService, type TGraphGroupKind } from '../../../services/GraphService';
import { PeoplePickerCache } from '../../../utils/cache';
import { getErrorMessage } from '../../../utils/errorUtils';
import type { IPeoplePickerItem } from '../interfaces/PeoplePicker.types';
import type {
  IUsePeopleSearchOptions,
  IUsePeopleSearchResult
} from '../interfaces/usePeopleSearch.types';

/**
 * Orchestrates SharePoint + Graph searches for the People Picker.
 *
 * @remarks
 * - Debounces input by `searchDebounceInMs`.
 * - Caches each (source, scope, query, top, group) tuple.
 * - Honours the `sourceStrategy`:
 *   - `sharepoint-first` — SharePoint first; Graph runs only if SP yields nothing.
 *   - `sharepoint-only` / `graph-only` — single source.
 *   - `merge` — both run in parallel and results are de-duplicated.
 * - Map results so that the People Picker fields are populated, while the
 *   full Graph payload is preserved on `data` for unmapped properties.
 */
export const usePeopleSearch = (options: IUsePeopleSearchOptions): IUsePeopleSearchResult => {
  const {
    context,
    spHttpClient,
    msGraphClientFactory,
    spService: providedSpService,
    searchScope,
    sourceStrategy,
    maxSuggestions,
    searchDebounceInMs,
    restrictToSharePointSiteGroups,
    searchInSharePointGroupId,
    searchInAadGroupObjectId,
    includeM365Groups,
    includeSecurityGroups,
    ensureUser,
    ensureUserFor,
    cache: cacheOptions
  } = options;

  const spService = React.useMemo<ISPService>(
    () => providedSpService ?? new SPService(context, { spHttpClient }),
    [context, providedSpService, spHttpClient]
  );

  const graphService = React.useMemo(() => {
    const factory = msGraphClientFactory ?? context.msGraphClientFactory;
    return factory ? new GraphService(factory) : undefined;
  }, [context, msGraphClientFactory]);

  const cache = React.useMemo(() => new PeoplePickerCache(cacheOptions), [cacheOptions]);

  const [query, setQuery] = React.useState<string>('');

  /** Consolidated search state — single object avoids multiple re-renders in React 17's
   *  non-batched async contexts (setTimeout, Promise callbacks). */
  const [searchState, setSearchState] = React.useState<{
    results: IPeoplePickerItem[];
    isLoading: boolean;
    error: string | undefined;
    isCacheHit: boolean;
  }>({
    results: [],
    isLoading: false,
    error: undefined,
    isCacheHit: false
  });

  const buildCacheKey = React.useCallback(
    (q: string): string =>
      [
        sourceStrategy,
        searchScope,
        restrictToSharePointSiteGroups ? 'spOnly' : 'allGroups',
        searchInSharePointGroupId ?? '-',
        searchInAadGroupObjectId ?? '-',
        includeM365Groups ? 'm365' : '!m365',
        includeSecurityGroups ? 'sec' : '!sec',
        maxSuggestions,
        q.toLowerCase()
      ].join('|'),
    [
      sourceStrategy,
      searchScope,
      restrictToSharePointSiteGroups,
      searchInSharePointGroupId,
      searchInAadGroupObjectId,
      includeM365Groups,
      includeSecurityGroups,
      maxSuggestions
    ]
  );

  const includeUsers = searchScope !== 'groups';
  const includeGroups = searchScope !== 'users';

  const runSharePointSearch = React.useCallback(
    async (q: string): Promise<IPeoplePickerItem[]> => {
      if (sourceStrategy === 'graph-only') return [];

      // When restricted to a specific SP site group, fetch its members and filter
      // client-side. This avoids modifying SPService.
      if (searchInSharePointGroupId && includeUsers) {
        try {
          const members: IUserListItem[] = await spService.getUsersInGroup(searchInSharePointGroupId);
          const lowered = q.toLowerCase();
          const filtered = members
            .filter((member) =>
              member.displayName.toLowerCase().includes(lowered) ||
              (member.email ?? '').toLowerCase().includes(lowered) ||
              (member.userPrincipalName ?? '').toLowerCase().includes(lowered)
            )
            .slice(0, maxSuggestions)
            .map<IPeoplePickerItem>((member) => {
              // AAD Groups start with c:0 (e.g. c:0t.c|tenant|...) 
              // Users start with i:0 (e.g. i:0#.f|membership|...)
              const isGroup = member.loginName?.startsWith('c:0');
              const principalType = isGroup ? 'Group' : 'User';

              return {
                key: `${principalType.toLowerCase()}:${member.id}`,
                id: member.id,
                displayName: member.displayName,
                secondaryText: member.email || member.userPrincipalName || member.loginName,
                principalType,
                loginName: member.loginName,
                email: member.email || undefined,
                source: 'sharepoint',
                isEnsured: true,
                spUserId: member.id,
                data: { ...member }
              };
            });

          return filtered;
        } catch (err) {
          throw new Error(`SharePoint group member lookup failed: ${getErrorMessage(err)}`);
        }
      }

      const searchOptions: IPrincipalSearchOptions = {
        includeUsers,
        includeGroups,
        includeSpGroupsOnly: restrictToSharePointSiteGroups,
        top: maxSuggestions
      };

      const principals = await spService.searchPrincipals(q, searchOptions);

      return principals.map<IPeoplePickerItem>((principal) => ({
        ...principal,
        source: 'sharepoint',
        isEnsured: typeof principal.id === 'number' && principal.id > 0,
        spUserId: typeof principal.id === 'number' && principal.id > 0 ? principal.id : undefined
      }));
    },
    [
      sourceStrategy,
      searchInSharePointGroupId,
      includeUsers,
      includeGroups,
      maxSuggestions,
      restrictToSharePointSiteGroups,
      spService
    ]
  );

  const runGraphSearch = React.useCallback(
    async (q: string): Promise<IPeoplePickerItem[]> => {
      if (sourceStrategy === 'sharepoint-only' || !graphService) return [];

      const items: IPeoplePickerItem[] = [];

      if (includeUsers) {
        const userResults = await graphService.searchUsers(q, {
          top: maxSuggestions,
          groupObjectId: searchInAadGroupObjectId
        });

        userResults.forEach((entry) => {
          items.push({
            key: `user:${entry.id}`,
            id: entry.id,
            displayName: entry.displayName,
            secondaryText: entry.secondaryText ?? entry.email ?? entry.userPrincipalName ?? '',
            principalType: 'User',
            loginName: entry.loginName ?? '',
            email: entry.email,
            source: 'graph',
            isEnsured: false,
            data: entry.data
          });
        });
      }

      if (includeGroups) {
        const kinds: TGraphGroupKind[] = [];
        if (includeM365Groups) kinds.push('m365');
        if (includeSecurityGroups) kinds.push('security');

        if (kinds.length > 0) {
          const groupResults = await graphService.searchGroups(q, { top: maxSuggestions, kinds });

          groupResults.forEach((entry) => {
            items.push({
              key: `group:${entry.id}`,
              id: entry.id,
              displayName: entry.displayName,
              secondaryText: entry.secondaryText ?? entry.email ?? '',
              principalType: 'Group',
              loginName: entry.email ?? entry.id,
              email: entry.email,
              source: 'graph',
              isEnsured: false,
              data: entry.data
            });
          });
        }
      }

      return items.slice(0, maxSuggestions);
    },
    [
      sourceStrategy,
      graphService,
      includeUsers,
      includeGroups,
      maxSuggestions,
      includeM365Groups,
      includeSecurityGroups,
      searchInAadGroupObjectId
    ]
  );

  const dedupe = React.useCallback((items: IPeoplePickerItem[]): IPeoplePickerItem[] => {
    const seen = new Map<string, IPeoplePickerItem>();

    items.forEach((item) => {
      // Extract UPN from claim-formatted loginName (e.g. "i:0#.f|membership|user@tenant.com")
      // to enable reliable cross-source deduplication (SP claims vs. Graph UPN).
      const claimMatch = /\|membership\|(.+)$/i.exec(item.loginName ?? '');
      const upn = claimMatch?.[1]?.toLowerCase();
      const email = item.email?.toLowerCase();

      // Prefer UPN (most reliable cross-source identifier), then email,
      // then fall back to principalType:id (source-specific, won't dedup cross-source).
      const dedupeKey = upn ?? email ?? `${item.principalType}:${item.id}`.toLowerCase();

      if (!seen.has(dedupeKey)) {
        seen.set(dedupeKey, item);
      }
    });

    return [...seen.values()];
  }, []);

  const performSearch = React.useCallback(
    async (q: string): Promise<{ items: IPeoplePickerItem[]; isCacheHit: boolean }> => {
      const trimmed = q.trim();
      if (!trimmed) {
        return { items: [], isCacheHit: false };
      }

      const cacheKey = buildCacheKey(trimmed);
      const cached = cache.get<IPeoplePickerItem[]>(cacheKey);
      if (cached) {
        return { items: cached, isCacheHit: true };
      }

      let items: IPeoplePickerItem[] = [];

      if (sourceStrategy === 'merge') {
        const [spItems, graphItems] = await Promise.all([
          runSharePointSearch(trimmed).catch(() => []),
          runGraphSearch(trimmed).catch(() => [])
        ]);
        items = dedupe([...spItems, ...graphItems]);
      } else if (sourceStrategy === 'graph-only') {
        items = await runGraphSearch(trimmed);
      } else if (sourceStrategy === 'sharepoint-only') {
        items = await runSharePointSearch(trimmed);
      } else {
        // sharepoint-first
        items = await runSharePointSearch(trimmed);
        if (items.length === 0) {
          items = await runGraphSearch(trimmed);
        }
      }

      const trimmedItems = items.slice(0, maxSuggestions);
      cache.set(cacheKey, trimmedItems);
      return { items: trimmedItems, isCacheHit: false };
    },
    [buildCacheKey, cache, dedupe, maxSuggestions, runGraphSearch, runSharePointSearch, sourceStrategy]
  );

  // Debounced effect-driven search bound to the picker input.
  React.useEffect(() => {
    let cancelled = false;
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchState({ results: [], isLoading: false, error: undefined, isCacheHit: false });
      return () => {
        cancelled = true;
      };
    }

    const timeoutId = globalThis.setTimeout(async () => {
      setSearchState((prev) => ({ ...prev, isLoading: true, error: undefined }));

      try {
        const { items, isCacheHit: fromCache } = await performSearch(trimmed);
        if (!cancelled) {
          setSearchState({ results: items, isLoading: false, error: undefined, isCacheHit: fromCache });
        }
      } catch (err) {
        if (!cancelled) {
          setSearchState({ results: [], isLoading: false, error: getErrorMessage(err), isCacheHit: false });
        }
      }
    }, searchDebounceInMs);

    return () => {
      cancelled = true;
      globalThis.clearTimeout(timeoutId);
    };
  }, [query, performSearch, searchDebounceInMs]);

  const search = React.useCallback(
    async (q: string): Promise<IPeoplePickerItem[]> => {
      const { items } = await performSearch(q);
      return items;
    },
    [performSearch]
  );

  const ensureSelection = React.useCallback(
    async (items: IPeoplePickerItem[]): Promise<IPeoplePickerItem[]> => {
      if (!ensureUser) return items;

      const ensureErrors: string[] = [];

      const result = await Promise.all(
        items.map(async (item) => {
          if (item.isEnsured) return item;
          if (!ensureUserFor.includes(item.principalType)) return item;

          const candidate = item.email ?? item.loginName;
          if (!candidate) return item;

          try {
            const ensured = await spService.ensureUser(candidate);

            return {
              ...item,
              key: `${item.principalType.toLowerCase()}:${ensured.id}`,
              id: ensured.id,
              spUserId: ensured.id,
              loginName: ensured.loginName,
              email: ensured.email ?? item.email,
              displayName: ensured.title || item.displayName,
              isEnsured: true
            } satisfies IPeoplePickerItem;
          } catch (err) {
            ensureErrors.push(
              `Failed to ensure "${item.displayName}": ${getErrorMessage(err)}`
            );
            return item;
          }
        })
      );

      if (ensureErrors.length > 0) {
        setSearchState((prev) => ({ ...prev, error: ensureErrors.join('; ') }));
      }

      return result;
    },
    [ensureUser, ensureUserFor, spService]
  );

  const clearCache = React.useCallback(() => {
    cache.clear();
  }, [cache]);

  return {
    query,
    setQuery,
    results: searchState.results,
    isLoading: searchState.isLoading,
    error: searchState.error,
    isCacheHit: searchState.isCacheHit,
    search,
    ensureSelection,
    clearCache
  };
};

