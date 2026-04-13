import type { IPrincipalListItem, ISPService } from '../../interfaces';

export type TPeoplePickerMode = 'single' | 'multiple';

export interface IPeoplePickerProps {
  spService: ISPService;
  label?: string;
  placeholder?: string;
  mode?: TPeoplePickerMode;
  allowGroups?: boolean;
  allowUsers?: boolean;
  /** When true, only SharePoint site groups are returned (no M365 / security groups) */
  allowSpGroupsOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  selectedItems?: IPrincipalListItem[];
  defaultSelectedItems?: IPrincipalListItem[];
  onSelectionChange?: (items: IPrincipalListItem[]) => void;
  noResultsText?: string;
  searchDebounceInMs?: number;
  maxSuggestions?: number;
}

export interface IPeoplePickerState {
  internalSelectedItems: IPrincipalListItem[];
  query: string;
  options: IPrincipalListItem[];
  isLoading: boolean;
}
