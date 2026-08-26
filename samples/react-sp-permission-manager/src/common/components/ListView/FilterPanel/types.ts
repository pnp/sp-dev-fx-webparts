export interface IListViewFilterPanelProps {
  open: boolean;
  title: string;
  values: string[];
  appliedValues: Set<string>;
  selectedValues: Set<string>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleValue: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}
