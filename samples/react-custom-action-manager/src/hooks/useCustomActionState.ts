import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { ICustomAction, CustomActionScope } from '../models';
import { CustomActionService } from '../services';
import { ErrorHandler } from '../utils/ErrorHandler';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ICustomActionFilter {
  scope: CustomActionScope | 'All';
  searchTerm: string;
  location?: string;
  group?: string;
  componentId?: string;
  registrationType?: number;
  hasCommandUI?: boolean;
}

export interface IPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IUseCustomActionStateResult {
  // Data state
  customActions: ICustomAction[];
  filteredActions: ICustomAction[];

  // Loading and error state
  loading: boolean;
  error: string | null;

  // Filter and pagination
  filter: ICustomActionFilter;
  pagination: IPaginationInfo;
  selectedSiteUrls: string[];

  // Actions
  loadCustomActions: () => Promise<void>;
  setFilter: (filter: Partial<ICustomActionFilter>) => void;
  clearError: () => void;
  refreshData: () => Promise<void>;
  resetFilters: () => void;
  setSelectedSiteUrls: (urls: string[]) => void;
}

export function useCustomActionState(
  context: WebPartContext,
  defaultScope: CustomActionScope,
  pageSize: number = 25,
  targetSiteUrl?: string
): IUseCustomActionStateResult {
  const [customActions, setCustomActions] = useState<ICustomAction[]>([]);
  const [filteredActions, setFilteredActions] = useState<ICustomAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filterStorageKey = 'cam:filters';
  const siteStorageKey = 'cam:selectedSites';

  const defaultFilter = useMemo<ICustomActionFilter>(() => ({
    scope: defaultScope,
    searchTerm: '',
    location: undefined,
    group: undefined,
    componentId: undefined,
    registrationType: undefined,
    hasCommandUI: undefined
  }), [defaultScope]);

  const [filter, setFilterState] = useState<ICustomActionFilter>(() => {
    try {
      const stored = window.sessionStorage.getItem(filterStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ICustomActionFilter>;
        return {
          ...defaultFilter,
          ...parsed,
          scope: parsed.scope || defaultScope,
          searchTerm: parsed.searchTerm || ''
        };
      }
    } catch (error) {
      console.warn('Failed to parse stored filters:', error);
    }

    return defaultFilter;
  });
  const [pagination, setPagination] = useState<IPaginationInfo>({
    currentPage: 1,
    pageSize,
    totalItems: 0,
    totalPages: 0
  });

  const [selectedSiteUrls, setSelectedSiteUrlsState] = useState<string[]>(() => {
    try {
      const stored = window.sessionStorage.getItem(siteStorageKey);
      if (stored) {
        return JSON.parse(stored) as string[];
      }
    } catch (error) {
      console.warn('Failed to parse stored sites:', error);
    }
    if (targetSiteUrl) {
      return [targetSiteUrl];
    }
    return [];
  });

  const customActionServiceRef = useRef<CustomActionService>();
  if (!customActionServiceRef.current) {
    customActionServiceRef.current = new CustomActionService(context, targetSiteUrl);
  }

  // Update service when target site changes
  React.useEffect(() => {
    if (customActionServiceRef.current && targetSiteUrl) {
      customActionServiceRef.current.setTargetSite(targetSiteUrl);
    }
  }, [targetSiteUrl]);

  const applyFilters = useCallback(() => {
    let filtered = [...customActions];

    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(action =>
        (action.Title && action.Title.toLowerCase().includes(searchTerm)) ||
        (action.Description && action.Description.toLowerCase().includes(searchTerm)) ||
        (action.Location && action.Location.toLowerCase().includes(searchTerm))
      );
    }

    if (filter.scope !== 'All') {
      filtered = filtered.filter(action => action.Scope === filter.scope);
    }

    if (filter.location) {
      filtered = filtered.filter(action => action.Location === filter.location);
    }

    if (filter.group) {
      filtered = filtered.filter(action => action.Group === filter.group);
    }

    if (filter.componentId && filter.componentId.trim()) {
      const componentId = filter.componentId.trim().toLowerCase();
      filtered = filtered.filter(action =>
        action.ClientSideComponentId?.toLowerCase() === componentId
      );
    }

    if (typeof filter.registrationType === 'number') {
      filtered = filtered.filter(action => action.RegistrationType === filter.registrationType);
    }

    if (typeof filter.hasCommandUI === 'boolean') {
      filtered = filtered.filter(action => {
        const hasCommand = !!action.CommandUIExtension && action.CommandUIExtension.trim().length > 0;
        return filter.hasCommandUI ? hasCommand : !hasCommand;
      });
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pagination.pageSize);

    setFilteredActions(filtered);
    setPagination(prev => ({
      ...prev,
      totalItems,
      totalPages
    }));
  }, [customActions, filter, pagination.pageSize]);

  const loadCustomActions = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const actions = await customActionServiceRef.current!.getCustomActions(filter.scope);
      setCustomActions(actions);
    } catch (err) {
      const errorInfo = ErrorHandler.handleError(err);
      ErrorHandler.logError(errorInfo, 'useCustomActionState.loadCustomActions');
      setError(errorInfo.userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  }, [filter.scope]);

  const setFilter = useCallback((newFilter: Partial<ICustomActionFilter>) => {
    setFilterState(prev => {
      const updated = { ...prev, ...newFilter };
      try {
        window.sessionStorage.setItem(filterStorageKey, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to persist filters:', error);
      }
      return updated;
    });
  }, [filterStorageKey]);

  const resetFilters = useCallback(() => {
    try {
      window.sessionStorage.removeItem(filterStorageKey);
    } catch (error) {
      console.warn('Failed to clear stored filters:', error);
    }
    setFilterState(defaultFilter);
  }, [defaultFilter, filterStorageKey]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshData = useCallback(async (): Promise<void> => {
    await loadCustomActions();
  }, [loadCustomActions]);

  const setSelectedSiteUrls = useCallback((urls: string[]) => {
    setSelectedSiteUrlsState(urls);
    try {
      window.sessionStorage.setItem(siteStorageKey, JSON.stringify(urls));
    } catch (error) {
      console.warn('Failed to persist selected sites:', error);
    }
  }, [siteStorageKey]);

  // Apply filters whenever customActions or filter changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Auto-reload custom actions when target site changes
  useEffect(() => {
    if (targetSiteUrl) {
      loadCustomActions().catch(err => {
        console.error('Failed to reload custom actions after site change:', err);
      });
    }
  }, [targetSiteUrl, loadCustomActions]);

  return {
    customActions,
    filteredActions,
    loading,
    error,
    filter,
    pagination,
    selectedSiteUrls,
    loadCustomActions,
    setFilter,
    clearError,
    refreshData,
    resetFilters,
    setSelectedSiteUrls
  };
}
