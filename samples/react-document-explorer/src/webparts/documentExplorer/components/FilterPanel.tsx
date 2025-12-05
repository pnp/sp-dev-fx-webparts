import * as React from 'react';
import { 
  Dropdown, 
  IDropdownOption, 
  DatePicker, 
  DefaultButton,
  Icon
} from '@fluentui/react';
import { IFilters } from './IDocumentExplorerProps';
import styles from './DocumentExplorer.module.scss';

export interface IFilterPanelProps {
  filters: IFilters;
  authors: string[];
  fileTypes: string[];
  onFilterChange: (filters: IFilters) => void;
}

export default class FilterPanel extends React.Component<IFilterPanelProps> {
  
  private handleFileTypeChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      const newFilters = {
        ...this.props.filters,
        fileType: option.key === 'all' ? '' : option.key as string
      };
      this.props.onFilterChange(newFilters);
    }
  };

  private handleDateFromChange = (date: Date | null | undefined): void => {
    const newFilters = {
      ...this.props.filters,
      dateFrom: date || undefined
    };
    this.props.onFilterChange(newFilters);
  };

  private handleDateToChange = (date: Date | null | undefined): void => {
    const newFilters = {
      ...this.props.filters,
      dateTo: date || undefined
    };
    this.props.onFilterChange(newFilters);
  };

  private handleClearFilters = (): void => {
    const clearedFilters: IFilters = {
      author: '',
      fileType: '',
      dateFrom: undefined,
      dateTo: undefined
    };
    this.props.onFilterChange(clearedFilters);
  };

  public render(): React.ReactElement<IFilterPanelProps> {
    const { filters, fileTypes } = this.props;

    const fileTypeOptions: IDropdownOption[] = [
      { key: 'all', text: 'All Types' },
      ...fileTypes.map(type => ({ key: type, text: type.toUpperCase() }))
    ];

    const hasActiveFilters = filters.fileType || filters.dateFrom || filters.dateTo;

    return (
      <div className={styles.filterPanel}>
        <div className={styles.panelHeader}>
          <Icon iconName="Filter" />
          <span>Filters</span>
        </div>
        
        <div className={styles.filterContent}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>File Type</label>
            <Dropdown
              placeholder="Select file type"
              options={fileTypeOptions}
              selectedKey={filters.fileType || 'all'}
              onChange={this.handleFileTypeChange}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Modified From</label>
            <DatePicker
              placeholder="Select date..."
              value={filters.dateFrom || undefined}
              onSelectDate={this.handleDateFromChange}
              formatDate={(date?: Date) => date ? date.toLocaleDateString() : ''}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Modified To</label>
            <DatePicker
              placeholder="Select date..."
              value={filters.dateTo || undefined}
              onSelectDate={this.handleDateToChange}
              formatDate={(date?: Date) => date ? date.toLocaleDateString() : ''}
            />
          </div>

          {hasActiveFilters && (
            <div className={styles.filterGroup}>
              <DefaultButton
                text="Clear Filters"
                iconProps={{ iconName: 'ClearFilter' }}
                onClick={this.handleClearFilters}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}