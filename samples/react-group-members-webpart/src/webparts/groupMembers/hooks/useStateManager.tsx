import { useState, useEffect, useCallback, useMemo } from 'react';
import { StateManager, AppState, useProvidedStateManager } from '../state/StateManager';
import { IUser, IUsersByRole } from '../types/interfaces';

// Hook for using the global state manager
export function useStateManager(): StateManager {
  return useProvidedStateManager();
}

// Hook for subscribing to state changes
export function useAppState(): AppState {
  const stateManager = useStateManager();
  const [state, setState] = useState(() => stateManager.getState());

  useEffect(() => {
    const unsubscribe = stateManager.subscribe(setState);
    return unsubscribe;
  }, [stateManager]);

  return state;
}

// Hook for users data
export function useUsers(): {
  loading: boolean;
  error: string | undefined;
  usersByRole: IUsersByRole;
  searchTerm: string;
  currentPages: {
    owner: number;
    admin: number;
    member: number;
    visitor: number;
  };
  lastFetchTime: number | undefined;
  actions: {
    loadUsersStart: () => void;
    loadUsersSuccess: (usersByRole: IUsersByRole) => void;
    loadUsersError: (error: string) => void;
  };
  selectors: {
    getFilteredUsers: (role: keyof IUsersByRole) => IUser[];
    getSortedUsers: (users: IUser[]) => IUser[];
    getPaginatedUsers: (role: keyof IUsersByRole) => {
      users: IUser[];
      totalPages: number;
      currentPage: number;
      hasMore: boolean;
    };
    getTotalUserCount: () => number;
    getSearchResultCount: () => number;
  };
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const actions = useMemo(() => ({
    loadUsersStart: () => stateManager.loadUsersStart(),
    loadUsersSuccess: (usersByRole: IUsersByRole) => stateManager.loadUsersSuccess(usersByRole),
    loadUsersError: (error: string) => stateManager.loadUsersError(error),
    setSearchTerm: (searchTerm: string) => stateManager.setSearchTerm(searchTerm),
    changePage: (role: keyof IUsersByRole, page: number) => stateManager.changePage(role, page),
    setSortField: (sortField: string) => stateManager.setSortField(sortField)
  }), [stateManager]);

  const selectors = useMemo(() => ({
    getFilteredUsers: (role: keyof IUsersByRole) => stateManager.getFilteredUsers(role),
    getSortedUsers: (users: IUser[]) => stateManager.getSortedUsers(users),
    getPaginatedUsers: (role: keyof IUsersByRole) => stateManager.getPaginatedUsers(role),
    getTotalUserCount: () => stateManager.getTotalUserCount(),
    getSearchResultCount: () => stateManager.getSearchResultCount()
  }), [stateManager]);

  return {
    usersByRole: state.users.usersByRole,
    loading: state.users.loading,
    error: state.users.error,
    searchTerm: state.users.searchTerm,
    currentPages: state.users.currentPages,
    lastFetchTime: state.users.lastFetchTime,
    actions,
    selectors
  };
}

// Hook for UI state
export function useUI(): {
  selectedUser: IUser | undefined;
  showSearchBox: boolean;
  sortField: string;
  itemsPerPage: number;
  presenceEnabled: boolean;
  actions: {
    selectUser: (user: IUser | undefined) => void;
    setSortField: (sortField: string) => void;
    togglePresence: (enabled: boolean) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    setShowSearchBox: (visible: boolean) => void;
  };
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const actions = useMemo(() => ({
    selectUser: (user: IUser | undefined) => stateManager.selectUser(user),
    setSortField: (sortField: string) => stateManager.setSortField(sortField),
    togglePresence: (enabled: boolean) => stateManager.togglePresence(enabled),
    setItemsPerPage: (itemsPerPage: number) => stateManager.setItemsPerPage(itemsPerPage),
    setShowSearchBox: (visible: boolean) => stateManager.setShowSearchBox(visible)
  }), [stateManager]);

  return {
    selectedUser: state.ui.selectedUser,
    showSearchBox: state.ui.showSearchBox,
    sortField: state.ui.sortField,
    itemsPerPage: state.ui.itemsPerPage,
    presenceEnabled: state.ui.presenceEnabled,
    actions
  };
}

// Hook for cache information
export function useCache(): {
  hitRate: number;
  size: number;
  lastClearTime: number;
  actions: {
    updateCacheStats: (hitRate: number, size: number) => void;
  };
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const actions = useMemo(() => ({
    updateCacheStats: (hitRate: number, size: number) => stateManager.updateCacheStats(hitRate, size)
  }), [stateManager]);

  return {
    lastClearTime: state.cache.lastClearTime,
    hitRate: state.cache.hitRate,
    size: state.cache.size,
    actions
  };
}

// Hook for paginated user data with all computed properties
export function usePaginatedUsers(role: keyof IUsersByRole): {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  actions: {
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
  };
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const paginationData = useMemo(() => {
    return stateManager.getPaginatedUsers(role);
  }, [stateManager, role, state.users.usersByRole, state.users.searchTerm, state.ui.sortField, state.users.currentPages]);

  const actions = useMemo(() => ({
    goToPage: (page: number) => stateManager.changePage(role, page),
    nextPage: () => {
      if (paginationData.hasMore) {
        stateManager.changePage(role, paginationData.currentPage + 1);
      }
    },
    prevPage: () => {
      if (paginationData.currentPage > 1) {
        stateManager.changePage(role, paginationData.currentPage - 1);
      }
    }
  }), [stateManager, role, paginationData.currentPage, paginationData.hasMore]);

  return {
    ...paginationData,
    actions
  };
}

// Hook for search functionality
export function useSearch(): {
  searchTerm: string;
  searchResults: {
    isFiltered: boolean;
    resultCount: number;
    totalCount: number;
    hasResults: boolean;
  };
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const setSearchTerm = useCallback((searchTerm: string) => {
    stateManager.setSearchTerm(searchTerm);
  }, [stateManager]);

  const clearSearch = useCallback(() => {
    stateManager.setSearchTerm('');
  }, [stateManager]);

  const searchResults = useMemo(() => {
    const totalCount = stateManager.getTotalUserCount();
    const resultCount = stateManager.getSearchResultCount();
    
    return {
      totalCount,
      resultCount,
      isFiltered: state.users.searchTerm.length > 0,
      hasResults: resultCount > 0
    };
  }, [stateManager, state.users.searchTerm]);

  return {
    searchTerm: state.users.searchTerm,
    searchResults,
    setSearchTerm,
    clearSearch
  };
}

// Hook for loading states
export function useLoadingState(): {
  loading: boolean;
  error: string | undefined;
  retry: () => void;
} {
  const state = useAppState();
  const stateManager = useStateManager();

  const retry = useCallback(() => {
    if (state.users.error) {
      stateManager.loadUsersStart();
    }
  }, [stateManager, state.users.error]);

  return {
    loading: state.users.loading,
    error: state.users.error,
    retry
  };
}

// Hook for user selection
export function useUserSelection(): {
  selectedUser: IUser | undefined;
  selectUser: (user: IUser | undefined) => void;
  clearSelection: () => void;
  hasSelection: boolean;
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const selectUser = useCallback((user: IUser | undefined) => {
    stateManager.selectUser(user);
  }, [stateManager]);

  const clearSelection = useCallback(() => {
    stateManager.selectUser(undefined);
  }, [stateManager]);

  return {
    selectedUser: state.ui.selectedUser,
    selectUser,
    clearSelection,
    hasSelection: state.ui.selectedUser !== undefined
  };
}

// Hook for presence functionality
export function usePresence(): {
  presenceEnabled: boolean;
  togglePresence: (enabled: boolean) => void;
} {
  const stateManager = useStateManager();
  const state = useAppState();

  const togglePresence = useCallback((enabled?: boolean) => {
    const newValue = enabled !== undefined ? enabled : !state.ui.presenceEnabled;
    stateManager.togglePresence(newValue);
  }, [stateManager, state.ui.presenceEnabled]);

  return {
    presenceEnabled: state.ui.presenceEnabled,
    togglePresence
  };
}

// Hook for debug information
export function useDebugInfo(): {
  userCount: number;
  searchResultCount: number;
  cacheStats: { hitRate: number; size: number };
  lastFetch: string | undefined;
  hasData: boolean;
} {
  const state = useAppState();
  const stateManager = useStateManager();

  const debugInfo = useMemo(() => ({
    userCount: stateManager.getTotalUserCount(),
    searchResultCount: stateManager.getSearchResultCount(),
    cacheStats: stateManager.getCacheStats(),
    lastFetch: state.users.lastFetchTime ? new Date(state.users.lastFetchTime).toISOString() : undefined,
    hasData: state.users.lastFetchTime !== undefined
  }), [state, stateManager]);

  return debugInfo;
}

export default useStateManager;
