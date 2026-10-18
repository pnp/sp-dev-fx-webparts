import { useState, useEffect, useMemo, useCallback } from 'react';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { SearchService } from '../../../../common/services';
import { ISiteInfo } from '../../../../common/types';

export interface IUseMySitesResult {
  sites: ISiteInfo[];
  isLoading: boolean;
  error?: string;
  reload: () => void;
}

/**
 * Loads the current user's sites via {@link SearchService}, exposing loading
 * and error state plus a cache-bypassing `reload`.
 */
export function useMySites(sp: SPFI | undefined, graph: GraphFI | undefined): IUseMySitesResult {
  const service = useMemo(() => new SearchService({ sp, graph }), [sp, graph]);
  const [sites, setSites] = useState<ISiteInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reloadToken, setReloadToken] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(undefined);

    service
      .getUserSites({ bypassCache: reloadToken > 0 })
      .then((result) => {
        if (!cancelled) {
          setSites(result);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [service, reloadToken]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  return { sites, isLoading, error, reload };
}
