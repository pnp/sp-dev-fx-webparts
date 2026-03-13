import * as React from 'react';
import styles from './SavedBookmarkGroups.module.scss';
import {
  DetailsList, IColumn, SelectionMode, Link, Icon,
  IconButton, Text, Stack, Dropdown, IDropdownOption,
  DetailsRow, IDetailsRowProps, DetailsListLayoutMode,
} from '@fluentui/react';
import { IBookmark, BookmarkType } from '../../../../services/models/IBookmark';
import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';
import { ISavedBookmarkGroupsProps } from './ISavedBookmarkGroupsProps';
import { BookmarkLabel } from '../shared/BookmarkLabel';
import { LabelSelector } from '../shared/LabelSelector';

const PAGE_SIZE = 10;

interface IGroupTableState {
  sortKey: 'title' | 'date' | undefined;
  isSortedDescending: boolean;
  currentPage: number;
}

interface ISavedBookmarkGroupsState {
  groupState: Record<number, IGroupTableState>;
  labelSelectorTarget: HTMLElement | undefined;
  selectedBookmark: IBookmark | undefined;
  draggedGroupIndex: number | undefined;
  dragOverGroupIndex: number | undefined;
}

const defaultGroupState: IGroupTableState = {
  sortKey: undefined,
  isSortedDescending: false,
  currentPage: 1,
};

export default class SavedBookmarkGroups extends React.Component<ISavedBookmarkGroupsProps, ISavedBookmarkGroupsState> {

  constructor(props: ISavedBookmarkGroupsProps) {
    super(props);
    this.state = {
      groupState: {},
      labelSelectorTarget: undefined,
      selectedBookmark: undefined,
      draggedGroupIndex: undefined,
      dragOverGroupIndex: undefined
    };
  }

  public componentDidUpdate(prevProps: ISavedBookmarkGroupsProps): void {
    // Reset all groups to page 1 when search query or label filter changes
    if (prevProps.searchQuery !== this.props.searchQuery || prevProps.activeLabelFilters !== this.props.activeLabelFilters) {
      const resetGroupState: Record<number, IGroupTableState> = {};
      Object.keys(this.state.groupState).forEach(key => {
        const groupIndex = Number(key);
        resetGroupState[groupIndex] = { ...this.state.groupState[groupIndex], currentPage: 1 };
      });
      this.setState({ groupState: resetGroupState });
    }
  }

  private _getGroupState(groupIndex: number): IGroupTableState {
    return this.state.groupState[groupIndex] ?? defaultGroupState;
  }

  private _setGroupState(groupIndex: number, patch: Partial<IGroupTableState>): void {
    this.setState(prev => ({
      groupState: {
        ...prev.groupState,
        [groupIndex]: { ...this._getGroupState(groupIndex), ...patch },
      },
    }));
  }

  private _getTypeIcon(type: BookmarkType): string {
    switch (type) {
      case BookmarkType.Site: return 'Globe';
      case BookmarkType.Email: return 'Mail';
      case BookmarkType.File: return 'Document';
      default: return 'Bookmark';
    }
  }

  private _buildColumns(
    groupIndex: number,
    sortKey: 'title' | 'date' | undefined,
    isSortedDescending: boolean,
  ): IColumn[] {
    const { groups, onAssignGroup, onRemoveBookmark, onRemoveLabel } = this.props;
    const groupOptions: IDropdownOption[] = groups
      .filter(g => !g.archived)
      .map(g => ({ key: g.index, text: g.name }));

    const onColumnClick = (_ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
      if (column.key !== 'title' && column.key !== 'date') return;
      const key = column.key as 'title' | 'date';
      const gs = this._getGroupState(groupIndex);
      const descending = gs.sortKey === key ? !gs.isSortedDescending : false;
      this._setGroupState(groupIndex, { sortKey: key, isSortedDescending: descending, currentPage: 1 });
    };

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
        maxWidth: 200,
        isResizable: true,
        flexGrow: 1,
        isSorted: sortKey === 'title',
        isSortedDescending: sortKey === 'title' && isSortedDescending,
        onColumnClick,
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
        minWidth: 90,
        maxWidth: 110,
        isSorted: sortKey === 'date',
        isSortedDescending: sortKey === 'date' && isSortedDescending,
        onColumnClick,
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
        minWidth: 100,
        maxWidth: 400,
        isResizable: true,
        flexGrow: 1,
        onRender: (item: IBookmark) => {
          const handleRemoveLabel = (label: IBookmarkLabel): void => {
            onRemoveLabel(item, label).catch(console.error);
          };
          return (
            <Stack horizontal wrap tokens={{ childrenGap: 4 }} verticalAlign="center">
              {(item.labels ?? []).map((label) => (
                <BookmarkLabel
                  key={label.name}
                  label={label}
                  onRemove={handleRemoveLabel}
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
        name: 'Change Group',
        fieldName: 'group',
        minWidth: 60,
        maxWidth: 80,
        isResizable: true,
        onRender: (item: IBookmark) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }}>
            <Dropdown
              key={item.id}
              placeholder="Change group..."
              selectedKey={null}
              options={groupOptions}
              styles={{ root: { minWidth: 30, width: '100%' } }}
              onChange={(_ev, option) => {
                if (!option) return;
                const group = groups.find((g: IBookmarkGroup) => g.index === option.key);
                if (group) { onAssignGroup(item, group).catch(console.error); }
              }}
            />
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              ariaLabel="Remove bookmark"
              title="Remove from saved bookmarks"
              styles={{ root: { color: '#a4262c' } }}
              onClick={() => onRemoveBookmark(item).catch(console.error)}
            />
          </Stack>
        ),
      },
    ];
  }

  private _renderPagination(groupIndex: number, totalItems: number): React.ReactElement | null {
    const { currentPage } = this._getGroupState(groupIndex);
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    if (totalPages <= 1) return null;
    return (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} className={styles.pagination}>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          ariaLabel="Previous page"
          disabled={currentPage === 1}
          onClick={() => this._setGroupState(groupIndex, { currentPage: currentPage - 1 })}
        />
        <Text variant="medium">{currentPage} / {totalPages}</Text>
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          ariaLabel="Next page"
          disabled={currentPage === totalPages}
          onClick={() => this._setGroupState(groupIndex, { currentPage: currentPage + 1 })}
        />
      </Stack>
    );
  }

  private _handleDragStart = (e: React.DragEvent<HTMLElement>, groupIndex: number): void => {
    this.setState({ draggedGroupIndex: groupIndex });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(groupIndex));
  };

  private _handleDragOver = (e: React.DragEvent<HTMLDivElement>, groupIndex: number): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const { draggedGroupIndex, dragOverGroupIndex } = this.state;
    if (draggedGroupIndex !== groupIndex && dragOverGroupIndex !== groupIndex) {
      this.setState({ dragOverGroupIndex: groupIndex });
    }
  };

  private _handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget as Node)) {
      this.setState({ dragOverGroupIndex: undefined });
    }
  };

  private _handleDrop = async (e: React.DragEvent<HTMLDivElement>, dropGroupIndex: number): Promise<void> => {
    e.preventDefault();
    const { draggedGroupIndex } = this.state;

    if (draggedGroupIndex === undefined || draggedGroupIndex === dropGroupIndex) {
      this.setState({ draggedGroupIndex: undefined, dragOverGroupIndex: undefined });
      return;
    }

    const visibleGroups = this.props.groups.filter(g => !g.archived);
    const archivedGroups = this.props.groups.filter(g => g.archived);

    const draggedGroupActualIndex = visibleGroups.findIndex(g => g.index === draggedGroupIndex);
    const dropGroupActualIndex = visibleGroups.findIndex(g => g.index === dropGroupIndex);

    if (draggedGroupActualIndex === -1 || dropGroupActualIndex === -1) {
      this.setState({ draggedGroupIndex: undefined, dragOverGroupIndex: undefined });
      return;
    }

    const draggedGroup = visibleGroups[draggedGroupActualIndex];

    const reorderedGroups = [...visibleGroups];
    reorderedGroups.splice(draggedGroupActualIndex, 1);
    reorderedGroups.splice(dropGroupActualIndex, 0, draggedGroup);

    const allGroups = [...reorderedGroups, ...archivedGroups];

    this.setState({ draggedGroupIndex: undefined, dragOverGroupIndex: undefined });

    try {
      await this.props.onReorderGroups(allGroups);
    } catch (error) {
      console.error('Error reordering groups:', error);
    }
  };

  private _handleDragEnd = (): void => {
    this.setState({ draggedGroupIndex: undefined, dragOverGroupIndex: undefined });
  };

  // eslint-disable-next-line @rushstack/no-new-null
  public render(): React.ReactElement<ISavedBookmarkGroupsProps> | null {
    const { savedBookmarks, groups, availableLabels, onAssignLabels, searchQuery, activeLabelFilters } = this.props;
    const { labelSelectorTarget, selectedBookmark } = this.state;

    const sections = groups
      .filter(g => !g.archived)
      .map(group => {
        let items = savedBookmarks.filter(bm => bm.groups?.some(g => g.id === group.id));

        if (searchQuery && searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          items = items.filter(bm => bm.title.toLowerCase().includes(query));
        }

        if (activeLabelFilters.length > 0) {
          items = items.filter(bm =>
            activeLabelFilters.every(name => (bm.labels ?? []).some(l => l.name === name))
          );
        }

        return { group, items };
      })
      .filter(s => s.items.length > 0);

    if (sections.length === 0) return null;

    const { draggedGroupIndex, dragOverGroupIndex } = this.state;

    return (
      <>
        {sections.map(({ group, items }) => {
          const gs = this._getGroupState(group.index);
          const sorted = gs.sortKey
            ? [...items].sort((a, b) => {
              let cmp = 0;
              if (gs.sortKey === 'title') cmp = a.title.localeCompare(b.title);
              else if (gs.sortKey === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
              return gs.isSortedDescending ? -cmp : cmp;
            })
            : items;
          const paged = sorted.slice((gs.currentPage - 1) * PAGE_SIZE, gs.currentPage * PAGE_SIZE);

          const isDragging = draggedGroupIndex === group.index;
          const isDragOver = dragOverGroupIndex === group.index;
          const groupSectionClass = `${styles.groupSection} ${isDragging ? styles.dragging : ''} ${isDragOver ? styles.dragOver : ''}`;

          return (
            <div
              key={group.index}
              className={groupSectionClass}
              onDragOver={(e) => this._handleDragOver(e, group.index)}
              onDragLeave={this._handleDragLeave}
              onDrop={(e) => this._handleDrop(e, group.index)}
            >
              <Stack horizontal verticalAlign="center" className={styles.groupHeader}>
                <Icon
                  iconName="GripperDotsVertical"
                  title="Drag to reorder"
                  draggable={true}
                  onDragStart={(e) => this._handleDragStart(e, group.index)}
                  onDragEnd={this._handleDragEnd}
                  styles={{
                    root: {
                      fontSize: 14,
                      color: '#605e5c',
                      cursor: 'grab',
                      padding: '0 4px',
                      ':hover': { color: '#323130' }
                    }
                  }}
                />
                <IconButton
                  iconProps={{ iconName: group.collapsed ? 'ChevronRight' : 'ChevronDown' }}
                  ariaLabel={group.collapsed ? 'Expand group' : 'Collapse group'}
                  onClick={() => this.props.onToggleGroupCollapse(group).catch(console.error)}
                />
                <Text variant="mediumPlus" className={group.suggestion ? styles.suggestionGroupTitle : styles.groupTitle}>{group.name}</Text>
                {group.suggestion && (
                  <Icon iconName="Lightbulb" title="Copilot suggestion" styles={{ root: { color: '#f0a500', marginLeft: 6 } }} />
                )}
              </Stack>
              {!group.collapsed && (
                <>
                  <DetailsList
                    items={paged}
                    columns={this._buildColumns(group.index, gs.sortKey, gs.isSortedDescending)}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={true}
                    layoutMode={DetailsListLayoutMode.justified}
                    className={styles.list}
                    onRenderRow={(rowProps: IDetailsRowProps | undefined) => {
                      if (!rowProps) return null;
                      const item = rowProps.item as IBookmark;

                      if (item.removedFromBackend) {
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

                      if (item.suggestion) {
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
                  {this._renderPagination(group.index, sorted.length)}
                </>
              )}
            </div>
          );
        })}

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
      </>
    );
  }
}
