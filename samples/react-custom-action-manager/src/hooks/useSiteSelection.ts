import { useState, useCallback, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SiteService, ISiteInfo, ISiteCollection } from '../services/SiteService';

export interface IUseSiteSelectionResult {
  sites: ISiteInfo[];
  selectedSite: ISiteInfo | null;
  currentSite: ISiteInfo | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  showRecentOnly: boolean;
  selectSite: (site: ISiteInfo | null) => void;
  searchSites: (query: string) => void;
  loadSites: (includeSubsites?: boolean) => Promise<void>;
  refreshSites: () => Promise<void>;
  toggleRecentOnly: () => void;
  clearError: () => void;
}

export function useSiteSelection(context: WebPartContext): IUseSiteSelectionResult {
  const [sites, setSites] = useState<ISiteInfo[]>([]);
  const [selectedSite, setSelectedSite] = useState<ISiteInfo | null>(null);
  const [currentSite, setCurrentSite] = useState<ISiteInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRecentOnly, setShowRecentOnly] = useState<boolean>(false);
  const [siteService] = useState<SiteService>(() => new SiteService(context));

  // Initialize current site and load sites on mount
  useEffect(() => {
    const initializeSites = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        // Get current site
        const current = await siteService.getCurrentSite();
        setCurrentSite(current);
        setSelectedSite(current); // Start with current site selected

        // Load all sites
        await loadSites(true);
      } catch (err) {
        console.error('Error initializing sites:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize sites');
      } finally {
        setLoading(false);
      }
    };

    initializeSites();
  }, [context]);

  const loadSites = useCallback(async (includeSubsites: boolean = true): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      let loadedSites: ISiteInfo[];

      if (showRecentOnly) {
        loadedSites = await siteService.getRecentlyAccessedSites(20);
      } else if (searchQuery.trim()) {
        loadedSites = await siteService.searchSites(searchQuery.trim(), 50);
      } else {
        // Try to get all accessible sites first (including Microsoft Graph), fallback to collection
        loadedSites = await siteService.getAllAccessibleSites(100);

        // If no sites found via Graph, try the site collection approach
        if (loadedSites.length === 0) {
          const collection: ISiteCollection = await siteService.getSitesInCollection(includeSubsites, 100);
          loadedSites = collection.sites;
        }
      }

      setSites(loadedSites);
    } catch (err) {
      console.error('Error loading sites:', err);
      setError(err instanceof Error ? err.message : 'Failed to load sites');
      setSites([]);
    } finally {
      setLoading(false);
    }
  }, [siteService, showRecentOnly, searchQuery]);

  const selectSite = useCallback((site: ISiteInfo | null): void => {
    setSelectedSite(site);
    setError(null);
  }, []);

  const searchSites = useCallback((query: string): void => {
    setSearchQuery(query);
    setShowRecentOnly(false);
  }, []);

  const refreshSites = useCallback(async (): Promise<void> => {
    siteService.clearCache();
    await loadSites(true);
  }, [siteService, loadSites]);

  const toggleRecentOnly = useCallback((): void => {
    setShowRecentOnly(prev => !prev);
    setSearchQuery('');
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Reload sites when search query or recent filter changes
  useEffect(() => {
    if (sites.length > 0) { // Only reload if we already have sites loaded
      loadSites(true);
    }
  }, [searchQuery, showRecentOnly]);

  return {
    sites,
    selectedSite,
    currentSite,
    loading,
    error,
    searchQuery,
    showRecentOnly,
    selectSite,
    searchSites,
    loadSites,
    refreshSites,
    toggleRecentOnly,
    clearError
  };
}