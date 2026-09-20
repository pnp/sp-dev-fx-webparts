import type * as React from 'react';
import type { FieldProps, TagPickerProps } from '@fluentui/react-components';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type { MSGraphClientFactory, SPHttpClient } from '@microsoft/sp-http';
import type { ISPService } from '../../../interfaces/ISPService';
import type { IPrincipalListItem, TPrincipalType } from '../../../interfaces/IPrincipal';
import type { IPeoplePickerCacheOptions } from '../../../utils/cache';
import type { IGraphSearchResult } from '../../../services/GraphService';
import type { Group, User } from '@microsoft/microsoft-graph-types';

/** Identifies which API resolved a given suggestion. */
export type TPeoplePickerSource = 'sharepoint' | 'graph';

/** Selection cardinality. */
export type TPeoplePickerMode = 'single' | 'multiple';

/** Defines what kinds of principals the picker should look up. */
export type TPeoplePickerSearchScope = 'users' | 'groups' | 'both';

/** Strategy used when both SharePoint and Graph are available. */
export type TPeoplePickerSourceStrategy =
  /** Query SharePoint, fall back to Graph only when SharePoint returns nothing. */
  | 'sharepoint-first'
  /** Query Graph only. */
  | 'graph-only'
  /** Query SharePoint only. */
  | 'sharepoint-only'
  /** Query both in parallel and merge (de-duplicated by login/email/id). */
  | 'merge';

/**
 * Picker item surfaced to consumers. Extends {@link IPrincipalListItem} so
 * existing SP-typed code keeps working, and adds source / Graph-payload info.
 */
export interface IPeoplePickerItem extends IPrincipalListItem {
  /** API the principal was resolved from. */
  source: TPeoplePickerSource;
  /** True when {@link IPeoplePickerProps.ensureUser} resolved a SharePoint site user. */
  isEnsured?: boolean;
  /** Numeric SharePoint site user id, populated only after `ensureUser`. */
  spUserId?: number;
  /**
   * Full source-of-truth payload. Populated for Graph results and for
   * SharePoint results that can be hydrated. Consumers may read any property
   * off `data` even when it is not surfaced on the picker item itself.
   */
  data?: User | Group | Record<string, unknown>;
}

/** Per-slot class-name overrides. */
export interface IPeoplePickerClassNames {
  /** Wrapper around the Field + TagPicker. */
  root?: string;
  /** Fluent UI `Field` element. */
  field?: string;
  /** Fluent UI `TagPicker` element. */
  picker?: string;
  /** Fluent UI `TagPickerControl`. */
  control?: string;
  /** Fluent UI `TagPickerInput`. */
  input?: string;
  /** Fluent UI `TagPickerGroup`. */
  selectedGroup?: string;
  /** Selected `Tag` chips. */
  selectedTag?: string;
  /** Suggestion list `TagPickerList`. */
  suggestionList?: string;
  /** Each suggestion `TagPickerOption`. */
  suggestionOption?: string;
  /** Loading container shown while a search is in flight. */
  loading?: string;
  /** "No results" message. */
  noResults?: string;
  /** Error message shown when a search or ensure operation fails. */
  error?: string;
}

/** Per-slot inline style overrides. */
export interface IPeoplePickerStyles {
  root?: React.CSSProperties;
  field?: React.CSSProperties;
  picker?: React.CSSProperties;
  control?: React.CSSProperties;
  input?: React.CSSProperties;
  selectedGroup?: React.CSSProperties;
  selectedTag?: React.CSSProperties;
  suggestionList?: React.CSSProperties;
  suggestionOption?: React.CSSProperties;
  loading?: React.CSSProperties;
  noResults?: React.CSSProperties;
  error?: React.CSSProperties;
}

/** Configuration for the underlying People Picker cache. */
export type IPeoplePickerCacheConfig = IPeoplePickerCacheOptions;

/**
 * Callback invoked every time the picker has finished resolving suggestions
 * for the current query. Receives the full set the picker will display
 * (already de-duplicated against the current selection).
 */
export type PeoplePickerResultsCallback = (
  items: IPeoplePickerItem[],
  context: { query: string; isCacheHit: boolean }
) => void;

export interface IPeoplePickerProps {
  // ---------------------------------------------------------------------------
  // SharePoint / Graph plumbing
  // ---------------------------------------------------------------------------

  /**
   * SPFx web part context. Used to obtain default `spHttpClient` /
   * `msGraphClientFactory` when callers don't override them.
   */
  context: WebPartContext;
  /** Optional override for the SharePoint HTTP client. Defaults to `context.spHttpClient`. */
  spHttpClient?: SPHttpClient;
  /** Optional override for the Microsoft Graph client factory. Defaults to `context.msGraphClientFactory`. */
  msGraphClientFactory?: MSGraphClientFactory;
  /**
   * Pre-built `ISPService` instance. When omitted the picker builds one from
   * `context`. Provide your own to share state with other components.
   */
  spService?: ISPService;

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  /** Single vs. multi-select. Defaults to `multiple`. */
  mode?: TPeoplePickerMode;
  /** Controlled selection. When provided, `defaultSelectedItems` is ignored. */
  selectedItems?: IPeoplePickerItem[];
  /** Initial selection for uncontrolled usage. */
  defaultSelectedItems?: IPeoplePickerItem[];
  /** Fires whenever the selection changes. */
  onSelectionChange?: (items: IPeoplePickerItem[]) => void;

  // ---------------------------------------------------------------------------
  // Behaviour
  // ---------------------------------------------------------------------------

  /**
   * Maximum suggestions surfaced per query.
   *
   * @defaultValue 20
   */
  maxSuggestions?: number;
  /**
   * Maximum number of items the user can select. When `undefined`, selection
   * is unbounded.
   */
  maxSelections?: number;
  /**
   * Debounce window applied to the search input, in milliseconds.
   *
   * @defaultValue 300
   */
  searchDebounceInMs?: number;
  /**
   * What to look up: users only, groups only, or both.
   *
   * @defaultValue 'both'
   */
  searchScope?: TPeoplePickerSearchScope;
  /**
   * Source orchestration strategy. The default `sharepoint-first` runs
   * SharePoint first and falls back to Graph only when SharePoint returns
   * no results.
   *
   * @defaultValue 'sharepoint-first'
   */
  sourceStrategy?: TPeoplePickerSourceStrategy;
  /**
   * Restrict SharePoint group results to SharePoint site groups only,
   * excluding M365 / security groups returned by ProcessQuery.
   */
  restrictToSharePointSiteGroups?: boolean;
  /**
   * When set, SharePoint user search is restricted to members of the
   * given SharePoint site group id. Implementation detail: the picker
   * loads the group's users via `ISPService.getUsersInGroup` and filters
   * them client-side against the query.
   */
  searchInSharePointGroupId?: number;
  /**
   * When set, Graph user search is restricted to members of the supplied
   * AAD group object id.
   */
  searchInAadGroupObjectId?: string;
  /**
   * Include Microsoft 365 (unified) groups in Graph group queries.
   *
   * @defaultValue true
   */
  includeM365Groups?: boolean;
  /**
   * Include AAD security groups in Graph group queries.
   *
   * @defaultValue false
   */
  includeSecurityGroups?: boolean;
  /**
   * When `true`, every selected principal that does not yet have a
   * SharePoint site user id is resolved through `_api/web/ensureuser`
   * before being emitted via `onSelectionChange`. When `false` (default),
   * Graph principals are returned as-is without ensuring.
   *
   * @defaultValue false
   */
  ensureUser?: boolean;
  /**
   * Limit which principal types are accepted when `ensureUser` is on. By
   * default only `User` principals are ensured (SharePoint cannot ensure
   * a group object id as a site user).
   *
   * @defaultValue ['User']
   */
  ensureUserFor?: TPrincipalType[];

  // ---------------------------------------------------------------------------
  // Caching
  // ---------------------------------------------------------------------------

  /**
   * Caching configuration. The cache mirrors the MGT cache model: keyed by
   * query + scope + source, time-based invalidation, and `localStorage`
   * persistence. Set `enabled: false` to disable.
   */
  cache?: IPeoplePickerCacheConfig;

  // ---------------------------------------------------------------------------
  // Chrome
  // ---------------------------------------------------------------------------

  /** Field label. */
  label?: FieldProps['label'];
  validationMessage?: FieldProps['validationMessage'];
  validationState?: FieldProps['validationState'];
  hint?: FieldProps['hint'];
  fieldProps?: Omit<FieldProps, 'children' | 'label' | 'required' | 'validationMessage' | 'validationState' | 'hint'>;
  /** Input placeholder. */
  placeholder?: string;
  /** Text shown when a search returns no suggestions. */
  noResultsText?: string;
  /** Marks the field as required. */
  required?: boolean;
  /** Disables the input and removes interactive affordances. */
  disabled?: boolean;
  /** Outer wrapper class name. */
  className?: string;

  /** Per-slot class-name overrides. */
  classNames?: IPeoplePickerClassNames;
  /** Per-slot inline style overrides. */
  styles?: IPeoplePickerStyles;
  /**
   * Pass-through props forwarded to the underlying Fluent UI `TagPicker`.
   * Use this to override any prop the dedicated props don't expose.
   */
  tagPickerProps?: Partial<TagPickerProps>;

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  /**
   * Fires whenever a search has resolved suggestions. Receives the full
   * candidate list — i.e. **all the users / groups the picker will show** —
   * plus contextual metadata. Use this when you need to inspect or audit
   * the suggestion set without mounting your own picker.
   */
  onResults?: PeoplePickerResultsCallback;
  /** Fires for every keystroke after debouncing. */
  onSearchTextChange?: (query: string) => void;
}

/**
 * Imperative handle exposed via `ref`. Lets consumers programmatically run
 * a search and inspect the suggestion list (requirement #4 — "expose a
 * function that provides the feasibility to provide all the users a people
 * picker will show").
 */
export interface IPeoplePickerHandle {
  /**
   * Runs a search using the current picker configuration and returns the
   * resolved candidate list. Bypasses the debounced UI input — useful for
   * programmatic auditing, exporting, or feeding the results into other
   * controls.
   */
  getSuggestions: (query: string) => Promise<IPeoplePickerItem[]>;
  /** Clears the picker's local search cache. */
  clearCache: () => void;
}

/** Internal mapping helper: re-exports {@link IGraphSearchResult} for hooks. */
export type GraphSearchPayload = IGraphSearchResult<User> | IGraphSearchResult<Group>;
