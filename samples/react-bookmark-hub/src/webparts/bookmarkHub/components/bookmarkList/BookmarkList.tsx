import * as React from 'react';
import styles from './BookmarkList.module.scss';
import { DetailsList, IColumn, SelectionMode, Link, Icon, MessageBar, MessageBarType, IconButton, Text, Stack, Dropdown, IDropdownOption, DefaultButton, Spinner, SpinnerSize, DetailsRow, IDetailsRowProps } from '@fluentui/react';
import { IBookmark, BookmarkType } from '../../../../services/models/IBookmark';
import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';
import { IBookmarkListProps } from './IBookmarkListProps';
import { BookmarkLabel } from '../shared/BookmarkLabel';
import { LabelSelector } from '../shared/LabelSelector';

const PAGE_SIZE = 10;

interface IBookmarkListState {
  sortKey: 'title' | 'date' | undefined;
  isSortedDescending: boolean;
  currentPage: number;
  isCopilotLoading: boolean;
  labelSelectorTarget: HTMLElement | undefined;
  selectedBookmark: IBookmark | undefined;
}

export default class BookmarkList extends React.Component<IBookmarkListProps, IBookmarkListState> {

  constructor(props: IBookmarkListProps) {
    super(props);
    this.state = {
      sortKey: undefined,
      isSortedDescending: false,
      currentPage: 1,
      isCopilotLoading: false,
      labelSelectorTarget: undefined,
      selectedBookmark: undefined,
    };
  }

  public componentDidUpdate(prevProps: IBookmarkListProps): void {
    if (prevProps.searchQuery !== this.props.searchQuery || prevProps.activeLabelFilters !== this.props.activeLabelFilters) {
      this.setState({ currentPage: 1 });
    }
  }

  private _getTypeIcon(type: BookmarkType): string {
    switch (type) {
      case BookmarkType.Site:  return 'Globe';
      case BookmarkType.Email: return 'Mail';
      case BookmarkType.File:  return 'Document';
      default:                 return 'Bookmark';
    }
  }

  private _getFilteredBookmarks(): IBookmark[] {
    const { bookmarks, savedBookmarks, searchQuery, activeLabelFilters } = this.props;
    
    const savedBookmarksMap = new Map(savedBookmarks.map(bm => [bm.id, bm]));
    
    const assignedIds = new Set(
      savedBookmarks
        .filter(bm => bm.groups && bm.groups.length > 0)
        .map(bm => bm.id)
    );
    
    let filtered = bookmarks
      .filter(bm => !assignedIds.has(bm.id))
      .map(bm => {
        const savedBookmark = savedBookmarksMap.get(bm.id);
        if (savedBookmark) {
          return { 
            ...bm, 
            labels: savedBookmark.labels,
            removedFromBackend: savedBookmark.removedFromBackend,
            isCustom: savedBookmark.isCustom
          };
        }
        return bm;
      });
    
    const automaticBookmarkIds = new Set(bookmarks.map(bm => bm.id));
    const customBookmarks = savedBookmarks
      .filter(bm => !automaticBookmarkIds.has(bm.id) && !assignedIds.has(bm.id))
      .map(bm => ({ ...bm }));
    
    filtered = [...filtered, ...customBookmarks];
    
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(bm => 
        bm.title.toLowerCase().includes(query)
      );
    }

    if (activeLabelFilters.length > 0) {
      filtered = filtered.filter(bm =>
        activeLabelFilters.every(name => (bm.labels ?? []).some(l => l.name === name))
      );
    }

    return filtered;
  }

  private _getSortedBookmarks(): IBookmark[] {
    const { sortKey, isSortedDescending } = this.state;
    const unassigned = this._getFilteredBookmarks();
    if (!sortKey) return unassigned;
    return [...unassigned].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortKey === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      return isSortedDescending ? -cmp : cmp;
    });
  }

  private _onColumnHeaderClick = (_ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    if (column.key !== 'title' && column.key !== 'date') return;
    const key = column.key as 'title' | 'date';
    const { sortKey, isSortedDescending } = this.state;
    const descending = sortKey === key ? !isSortedDescending : false;
    this.setState({ sortKey: key, isSortedDescending: descending, currentPage: 1 });
  };

  private _getColumns(): IColumn[] {
    const { groups, onAssignGroup } = this.props;
    const { sortKey, isSortedDescending } = this.state;
    const groupOptions: IDropdownOption[] = groups
      .filter(g => !g.archived)
      .map(g => ({ key: g.index, text: g.name }));

    return [
      {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        minWidth: 36,
        maxWidth: 36,
        onRender: (item: IBookmark) => {
          const isRemoved = item.removedFromBackend === true && item.isCustom !== true;
          
          return (
            <Stack horizontal tokens={{ childrenGap: 4 }} verticalAlign="center">
              <Icon
                iconName={this._getTypeIcon(item.type)}
                title={item.type}
                styles={{ root: { fontSize: 16, verticalAlign: 'middle' } }}
              />
              {isRemoved && (
                <Icon
                  iconName="Warning"
                  title="This item no longer exists in the backend (unfollowed, unflagged, etc.)"
                  styles={{ root: { fontSize: 14, color: '#d13438' } }}
                />
              )}
            </Stack>
          );
        },
      },
      {
        key: 'title',
        name: 'Title',
        fieldName: 'title',
        minWidth: 150,
        maxWidth: 260,
        isResizable: true,
        isSorted: sortKey === 'title',
        isSortedDescending: sortKey === 'title' && isSortedDescending,
        onColumnClick: this._onColumnHeaderClick,
        onRender: (item: IBookmark) => (
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </Link>
        ),
      },
      {
        key: 'date',
        name: 'Date',
        fieldName: 'date',
        minWidth: 100,
        maxWidth: 120,
        isSorted: sortKey === 'date',
        isSortedDescending: sortKey === 'date' && isSortedDescending,
        onColumnClick: this._onColumnHeaderClick,
        onRender: (item: IBookmark) => {
          const d = new Date(item.date);
          const label = isNaN(d.getTime())
            ? item.date
            : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
          return <span>{label}</span>;
        },
      },
      {
        key: 'labels',
        name: 'Labels',
        fieldName: 'labels',
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        onRender: (item: IBookmark) => {
          const { onRemoveLabel } = this.props;
          return (
            <Stack horizontal wrap tokens={{ childrenGap: 4 }} verticalAlign="center">
              {(item.labels ?? []).map((label) => (
                <BookmarkLabel
                  key={label.name}
                  label={label}
                  onRemove={(label) => onRemoveLabel(item, label).catch(console.error)}
                />
              ))}
              <IconButton
                iconProps={{ iconName: 'Add' }}
                title="Add labels"
                ariaLabel="Add labels"
                styles={{ root: { height: 20, width: 20 } }}
                onClick={(e) => {
                  this.setState({
                    labelSelectorTarget: e.currentTarget as HTMLElement,
                    selectedBookmark: item
                  });
                }}
              />
            </Stack>
          );
        },
      },
      {
        key: 'group',
        name: 'Assign Group',
        fieldName: 'group',
        minWidth: 120,
        maxWidth: 200,
        onRender: (item: IBookmark) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }}>
            <Dropdown
              key={item.id}
              placeholder="Assign to group..."
              selectedKey={null}
              options={groupOptions}
              styles={{ root: { minWidth: 120, width: '100%' } }}
              onChange={(_ev, option) => {
                if (!option) return;
                const group = groups.find((g: IBookmarkGroup) => g.index === option.key);
                if (group) { onAssignGroup(item, group).catch(console.error); }
              }}
            />
          </Stack>
        ),
      },
    ];
  }

  private _renderPagination(totalItems: number): React.ReactElement | null {
    const { currentPage } = this.state;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    if (totalPages <= 1) return null;
    return (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} className={styles.pagination}>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          ariaLabel="Previous page"
          disabled={currentPage === 1}
          onClick={() => this.setState({ currentPage: currentPage - 1 })}
        />
        <Text variant="medium">{currentPage} / {totalPages}</Text>
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          ariaLabel="Next page"
          disabled={currentPage === totalPages}
          onClick={() => this.setState({ currentPage: currentPage + 1 })}
        />
      </Stack>
    );
  }

  private _onCopilotClick = async (): Promise<void> => {
    this.setState({ isCopilotLoading: true });
    try {
      await this.props.onOrganizeWithCopilot();
    } finally {
      this.setState({ isCopilotLoading: false });
    }
  };

  private _onRetryClick = async (): Promise<void> => {
    this.setState({ isCopilotLoading: true });
    try {
      await this.props.onCopilotRetry();
    } finally {
      this.setState({ isCopilotLoading: false });
    }
  };

  public render(): React.ReactElement<IBookmarkListProps> {
    const { currentPage, isCopilotLoading, labelSelectorTarget, selectedBookmark } = this.state;
    const { hasCopilotSuggestions, onCopilotApprove, onCopilotDecline, savedBookmarks, availableLabels, onAssignLabels, searchQuery } = this.props;
    const sorted = this._getSortedBookmarks();
    const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const renderCopilotActions = (): React.ReactElement => {
      if (isCopilotLoading) {
        return <Spinner size={SpinnerSize.small} label="Organizing with Copilot…" labelPosition="right" />;
      }
      if (hasCopilotSuggestions) {
        return (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <DefaultButton
              text="Approve"
              iconProps={{ iconName: 'CheckMark' }}
              className={styles.approveButton}
              onClick={() => { onCopilotApprove().catch(console.error); }}
            />
            <DefaultButton
              text="Retry"
              iconProps={{ iconName: 'Refresh' }}
              onClick={this._onRetryClick}
            />
            <DefaultButton
              text="Decline"
              iconProps={{ iconName: 'Cancel' }}
              className={styles.declineButton}
              onClick={() => { onCopilotDecline().catch(console.error); }}
            />
          </Stack>
        );
      }
      return (
        <DefaultButton
          text="Organize with Copilot"
          iconProps={{ iconName: 'ChatBot' }}
          ariaLabel="Organize with Microsoft 365 Copilot"
          className={styles.copilotButton}
          onClick={this._onCopilotClick}
        />
      );
    };

    return (
      <div className={styles.container}>
        <Stack
          horizontal
          verticalAlign="center"
          horizontalAlign="space-between"
          className={styles.headerContainer}
        >
          <h2 className={styles.header}>Not assigned bookmarks</h2>
          {renderCopilotActions()}
        </Stack>

        {sorted.length > 0 ? (
          <>
            <DetailsList
              items={paged}
              columns={this._getColumns()}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              className={styles.list}
              onRenderRow={(rowProps: IDetailsRowProps | undefined) => {
                if (!rowProps) return null;
                const item = rowProps.item as IBookmark;
                const savedEntry = savedBookmarks.find(bm => bm.id === item.id);
                
                if (savedEntry?.removedFromBackend) {
                  return (
                    <DetailsRow
                      {...rowProps}
                      styles={{
                        root: { 
                          borderLeft: '3px solid #d13438', 
                          backgroundColor: '#fef6f6',
                          opacity: 0.85 
                        }
                      }}
                    />
                  );
                }
                
                if (savedEntry?.suggestion) {
                  return (
                    <DetailsRow
                      {...rowProps}
                      styles={{
                        root: { borderLeft: '3px solid #f0a500', backgroundColor: '#fffcf0' }
                      }}
                    />
                  );
                }
                
                return <DetailsRow {...rowProps} />;
              }}
            />
            {this._renderPagination(sorted.length)}
          </>
        ) : (
          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={false}
            className={styles.emptyState}
          >
            {searchQuery && searchQuery.trim() !== '' 
              ? 'No bookmarks match your search.'
              : 'No unassigned bookmarks - all bookmarks have been assigned to a group.'}
          </MessageBar>
        )}
        
        {labelSelectorTarget && selectedBookmark && (
          <LabelSelector
            targetElement={labelSelectorTarget}
            availableLabels={availableLabels}
            selectedLabels={selectedBookmark.labels ?? []}
            onDismiss={() => this.setState({ labelSelectorTarget: undefined, selectedBookmark: undefined })}
            onApply={(selectedLabels) => {
              onAssignLabels(selectedBookmark, selectedLabels).catch(console.error);
            }}
          />
        )}
      </div>
    );
  }
}
