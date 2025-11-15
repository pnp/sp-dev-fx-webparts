import * as React from 'react';
import { IUser, IUsersByRole, ICurrentPages } from '../types/interfaces';

export interface AppState {
  users: {
    usersByRole: IUsersByRole;
    loading: boolean;
    error: string | undefined;
    searchTerm: string;
    currentPages: ICurrentPages;
    lastFetchTime: number | undefined;
  };
  ui: {
    selectedUser: IUser | undefined;
    showSearchBox: boolean;
    sortField: string;
    itemsPerPage: number;
    presenceEnabled: boolean;
  };
  cache: {
    lastClearTime: number;
    hitRate: number;
    size: number;
  };
}

export type StateAction = 
  | { type: 'USERS_LOADING_START' }
  | { type: 'USERS_LOADING_SUCCESS'; payload: IUsersByRole }
  | { type: 'USERS_LOADING_ERROR'; payload: string }
  | { type: 'SEARCH_TERM_CHANGED'; payload: string }
  | { type: 'PAGE_CHANGED'; payload: { role: keyof IUsersByRole; page: number } }
  | { type: 'USER_SELECTED'; payload: IUser | undefined }
  | { type: 'SORT_FIELD_CHANGED'; payload: string }
  | { type: 'PRESENCE_TOGGLED'; payload: boolean }
  | { type: 'ITEMS_PER_PAGE_CHANGED'; payload: number }
  | { type: 'SHOW_SEARCH_BOX_CHANGED'; payload: boolean }
  | { type: 'CACHE_STATS_UPDATED'; payload: { hitRate: number; size: number } }
  | { type: 'STATE_RESET' };

export interface IStateManager {
  getState(): AppState;
  dispatch(action: StateAction): void;
  subscribe(listener: (state: AppState) => void): () => void;
  reset(): void;
}

export class StateManager implements IStateManager {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();
  private readonly initialOverrides?: Partial<AppState>;

  constructor(initialState?: Partial<AppState>) {
    this.initialOverrides = initialState;
    this.state = this.createState(initialState);
  }

  private createState(initialState?: Partial<AppState>): AppState {
    const defaultState: AppState = {
      users: {
        usersByRole: {
          owner: [],
          admin: [],
          member: [],
          visitor: []
        },
        loading: false,
        error: undefined,
        searchTerm: '',
        currentPages: {
          owner: 1,
          admin: 1,
          member: 1,
          visitor: 1
        },
        lastFetchTime: undefined
      },
      ui: {
        selectedUser: undefined,
        showSearchBox: true,
        sortField: 'name',
        itemsPerPage: 10,
        presenceEnabled: true
      },
      cache: {
        lastClearTime: Date.now(),
        hitRate: 0,
        size: 0
      }
    };

    if (!initialState) {
      return defaultState;
    }

    return {
      ...defaultState,
      ...initialState,
      users: {
        ...defaultState.users,
        ...initialState.users,
        usersByRole: {
          ...defaultState.users.usersByRole,
          ...(initialState.users?.usersByRole ?? {})
        },
        currentPages: {
          ...defaultState.users.currentPages,
          ...(initialState.users?.currentPages ?? {})
        }
      },
      ui: {
        ...defaultState.ui,
        ...initialState.ui
      },
      cache: {
        ...defaultState.cache,
        ...initialState.cache
      }
    };
  }

  public getState(): AppState {
    return { ...this.state };
  }

  public dispatch(action: StateAction): void {
    const previousState = this.state;
    this.state = this.reducer(this.state, action);
    
    // Notify all listeners if state actually changed
    if (previousState !== this.state) {
      this.notifyListeners();
    }
  }

  public subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public reset(): void {
    this.state = this.createState(this.initialOverrides);
    this.notifyListeners();
  }

  private reducer(state: AppState, action: StateAction): AppState {
    switch (action.type) {
      case 'USERS_LOADING_START':
        return {
          ...state,
          users: {
            ...state.users,
            loading: true,
            error: undefined
          }
        };

      case 'USERS_LOADING_SUCCESS': {
        // Filter out invalid users before storing in state
        const filteredUsersByRole: IUsersByRole = {
          owner: (action.payload.owner || []).filter(user => user && user.id && user.displayName && user.displayName.trim() !== ''),
          admin: (action.payload.admin || []).filter(user => user && user.id && user.displayName && user.displayName.trim() !== ''),
          member: (action.payload.member || []).filter(user => user && user.id && user.displayName && user.displayName.trim() !== ''),
          visitor: (action.payload.visitor || []).filter(user => user && user.id && user.displayName && user.displayName.trim() !== '')
        };
        
        return {
          ...state,
          users: {
            ...state.users,
            usersByRole: filteredUsersByRole,
            loading: false,
            error: undefined,
            lastFetchTime: Date.now()
          }
        };
      }

      case 'USERS_LOADING_ERROR':
        return {
          ...state,
          users: {
            ...state.users,
            loading: false,
            error: action.payload
          }
        };

      case 'SEARCH_TERM_CHANGED':
        return {
          ...state,
          users: {
            ...state.users,
            searchTerm: action.payload,
            // Reset pagination when search changes
            currentPages: {
              owner: 1,
              admin: 1,
              member: 1,
              visitor: 1
            }
          }
        };

      case 'PAGE_CHANGED':
        return {
          ...state,
          users: {
            ...state.users,
            currentPages: {
              ...state.users.currentPages,
              [action.payload.role]: action.payload.page
            }
          }
        };

      case 'USER_SELECTED':
        return {
          ...state,
          ui: {
            ...state.ui,
            selectedUser: action.payload
          }
        };

      case 'SORT_FIELD_CHANGED':
        return {
          ...state,
          ui: {
            ...state.ui,
            sortField: action.payload
          }
        };

      case 'PRESENCE_TOGGLED':
        return {
          ...state,
          ui: {
            ...state.ui,
            presenceEnabled: action.payload
          }
        };

      case 'CACHE_STATS_UPDATED':
        return {
          ...state,
          cache: {
            ...state.cache,
            hitRate: action.payload.hitRate,
            size: action.payload.size
          }
        };

      case 'ITEMS_PER_PAGE_CHANGED':
        return {
          ...state,
          ui: {
            ...state.ui,
            itemsPerPage: action.payload
          },
          users: {
            ...state.users,
            currentPages: {
              owner: 1,
              admin: 1,
              member: 1,
              visitor: 1
            }
          }
        };

      case 'SHOW_SEARCH_BOX_CHANGED':
        return {
          ...state,
          ui: {
            ...state.ui,
            showSearchBox: action.payload
          }
        };

      case 'STATE_RESET':
        return this.createState(this.initialOverrides);

      default:
        return state;
    }
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    }
  }

  // Computed selectors
  public getFilteredUsers(role: keyof IUsersByRole): IUser[] {
    const users = this.state.users.usersByRole[role];
    const searchTerm = this.state.users.searchTerm.toLowerCase().trim();
    
    if (!searchTerm) {
      return users;
    }

    return users.filter(user => {
      const searchableFields = [
        user.displayName,
        user.jobTitle,
        user.department,
        user.officeLocation
      ].filter(Boolean);
      
      return searchableFields.some(field => 
        field?.toLowerCase().includes(searchTerm)
      );
    });
  }

  public getSortedUsers(users: IUser[]): IUser[] {
    const sortField = this.state.ui.sortField;
    
    return [...users].sort((a, b) => {
      if (sortField === 'name') {
        return a.displayName.localeCompare(b.displayName);
      }
      return (a.jobTitle || '').localeCompare(b.jobTitle || '');
    });
  }

  public getPaginatedUsers(role: keyof IUsersByRole): {
    users: IUser[];
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  } {
    const filteredUsers = this.getFilteredUsers(role);
    const sortedUsers = this.getSortedUsers(filteredUsers);
    const currentPage = this.state.users.currentPages[role];
    const itemsPerPage = this.state.ui.itemsPerPage;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    
    return {
      users: paginatedUsers,
      totalPages,
      currentPage,
      hasMore: endIndex < sortedUsers.length
    };
  }

  public getTotalUserCount(): number {
    const { usersByRole } = this.state.users;
    return Object.values(usersByRole).reduce((total, users) => total + users.length, 0);
  }

  public getSearchResultCount(): number {
    const roles: (keyof IUsersByRole)[] = ['owner', 'admin', 'member', 'visitor'];
    return roles.reduce((total, role) => total + this.getFilteredUsers(role).length, 0);
  }

  public isLoading(): boolean {
    return this.state.users.loading;
  }

  public getError(): string | undefined {
    return this.state.users.error;
  }

  public getSearchTerm(): string {
    return this.state.users.searchTerm;
  }

  public getSelectedUser(): IUser | undefined {
    return this.state.ui.selectedUser;
  }

  public isPresenceEnabled(): boolean {
    return this.state.ui.presenceEnabled;
  }

  public getCacheStats(): { hitRate: number; size: number } {
    return {
      hitRate: this.state.cache.hitRate,
      size: this.state.cache.size
    };
  }

  // Action creators
  public loadUsersStart(): void {
    this.dispatch({ type: 'USERS_LOADING_START' });
  }

  public loadUsersSuccess(usersByRole: IUsersByRole): void {
    this.dispatch({ type: 'USERS_LOADING_SUCCESS', payload: usersByRole });
  }

  public loadUsersError(error: string): void {
    this.dispatch({ type: 'USERS_LOADING_ERROR', payload: error });
  }

  public setSearchTerm(searchTerm: string): void {
    this.dispatch({ type: 'SEARCH_TERM_CHANGED', payload: searchTerm });
  }

  public changePage(role: keyof IUsersByRole, page: number): void {
    this.dispatch({ type: 'PAGE_CHANGED', payload: { role, page } });
  }

  public selectUser(user: IUser | undefined): void {
    this.dispatch({ type: 'USER_SELECTED', payload: user });
  }

  public setSortField(sortField: string): void {
    this.dispatch({ type: 'SORT_FIELD_CHANGED', payload: sortField });
  }

  public togglePresence(enabled: boolean): void {
    this.dispatch({ type: 'PRESENCE_TOGGLED', payload: enabled });
  }

  public setItemsPerPage(itemsPerPage: number): void {
    this.dispatch({ type: 'ITEMS_PER_PAGE_CHANGED', payload: itemsPerPage });
  }

  public setShowSearchBox(visible: boolean): void {
    this.dispatch({ type: 'SHOW_SEARCH_BOX_CHANGED', payload: visible });
  }

  public updateCacheStats(hitRate: number, size: number): void {
    this.dispatch({ type: 'CACHE_STATS_UPDATED', payload: { hitRate, size } });
  }
}

const StateManagerContext = React.createContext<StateManager | null>(null);

export const StateManagerProvider: React.FC<React.PropsWithChildren<{ stateManager: StateManager }>> = ({
  stateManager,
  children
}) => React.createElement(StateManagerContext.Provider, { value: stateManager }, children);

export function useProvidedStateManager(): StateManager {
  const stateManager = React.useContext(StateManagerContext);
  if (!stateManager) {
    throw new Error('State manager is not available in the current React tree.');
  }
  return stateManager;
}

export default StateManager;
