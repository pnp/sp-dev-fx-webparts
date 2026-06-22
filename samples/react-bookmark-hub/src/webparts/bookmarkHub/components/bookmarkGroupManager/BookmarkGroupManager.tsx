import * as React from 'react';
import { CommandBar, ICommandBarItemProps, DetailsList, DetailsListLayoutMode, SelectionMode, IColumn, IconButton, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, TextField, Stack, Text, MessageBar, MessageBarType, IStackTokens, TooltipHost } from '@fluentui/react';
import styles from './BookmarkGroupManager.module.scss';
import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';
import { IBookmarkGroupManagerProps } from './IBookmarkGroupManagerProps';
import { IBookmarkGroupManagerState } from './IBookmarkGroupManagerState';

const formStackTokens: IStackTokens = { childrenGap: 12 };
const footerStackTokens: IStackTokens = { childrenGap: 8 };

export default class BookmarkGroupManager extends React.Component<
  IBookmarkGroupManagerProps,
  IBookmarkGroupManagerState
> {
  constructor(props: IBookmarkGroupManagerProps) {
    super(props);
    this.state = {
      isFormDialogOpen: false,
      isDeleteDialogOpen: false,
      editingGroup: undefined,
      groupToDelete: undefined,
      nameError: '',
    };
  }

  private _moveUp = (itemIndex: number): void => {
    const sorted = this._getSorted();
    
    if (itemIndex === 0) 
      return;

    const updated = [...sorted];
    [updated[itemIndex - 1], updated[itemIndex]] = [updated[itemIndex], updated[itemIndex - 1]];
    this.props.onGroupsChanged(updated.map((g, i) => ({ ...g, index: i })));
  };

  private _moveDown = (itemIndex: number): void => {
    const sorted = this._getSorted();
    
    if (itemIndex === sorted.length - 1) 
      return;

    const updated = [...sorted];
    [updated[itemIndex], updated[itemIndex + 1]] = [updated[itemIndex + 1], updated[itemIndex]];
    this.props.onGroupsChanged(updated.map((g, i) => ({ ...g, index: i })));
  };

  private _openAddDialog = (): void => {
    this.setState({
      isFormDialogOpen: true,
      editingGroup: { name: '', description: '', archived: false, collapsed: false },
      nameError: '',
    });
  };

  private _openEditDialog = (group: IBookmarkGroup): void => {
    this.setState({ isFormDialogOpen: true, editingGroup: { ...group }, nameError: '' });
  };

  private _closeFormDialog = (): void => {
    this.setState({ isFormDialogOpen: false, editingGroup: undefined, nameError: '' });
  };

  private _onNameChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    const name = value ?? '';
    this.setState(prev => ({
      editingGroup: { ...prev.editingGroup, name },
      nameError: name.trim() ? '' : 'Name is required',
    }));
  };

  private _onDescriptionChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    this.setState(prev => ({
      editingGroup: { ...prev.editingGroup, description: value ?? '' },
    }));
  };

  private _saveGroup = (): void => {
    const { editingGroup } = this.state;
    if (!editingGroup?.name?.trim()) {
      this.setState({ nameError: 'Name is required' });
      return;
    }

    const { groups, onGroupsChanged } = this.props;
    const isEditing = !!editingGroup.id;
    let updatedGroups: IBookmarkGroup[];

    if (isEditing) {
      updatedGroups = groups.map(g =>
        g.id === editingGroup.id ? (editingGroup as IBookmarkGroup) : g
      );
    } else {
      const sorted = this._getSorted();
      const newGroup: IBookmarkGroup = {
        ...(editingGroup as IBookmarkGroup),
        id: crypto.randomUUID(),
        index: sorted.length,
      };
      updatedGroups = [...groups, newGroup];
    }

    onGroupsChanged(updatedGroups.sort((a, b) => a.index - b.index));
    this._closeFormDialog();
  };

  private _openDeleteDialog = (group: IBookmarkGroup): void => {
    this.setState({ isDeleteDialogOpen: true, groupToDelete: group });
  };

  private _closeDeleteDialog = (): void => {
    this.setState({ isDeleteDialogOpen: false, groupToDelete: undefined });
  };

  private _confirmDelete = (): void => {
    const { groupToDelete } = this.state;
    if (!groupToDelete) return;

    const { groups, onGroupsChanged } = this.props;
    const updated = groups
      .filter(g => g.id !== groupToDelete.id)
      .sort((a, b) => a.index - b.index)
      .map((g, i) => ({ ...g, index: i }));

    onGroupsChanged(updated);
    this._closeDeleteDialog();
  };

  private _getSorted = (): IBookmarkGroup[] =>
    [...this.props.groups].sort((a, b) => a.index - b.index);

  private _getColumns(): IColumn[] {
    const sorted = this._getSorted();

    return [
      {
        key: 'order',
        name: '#',
        minWidth: 28,
        maxWidth: 28,
        onRender: (_item: IBookmarkGroup, rowIndex?: number) => (
          <Text variant="small">{(rowIndex ?? 0) + 1}</Text>
        ),
      },
      {
        key: 'reorder',
        name: '',
        minWidth: 64,
        maxWidth: 64,
        onRender: (_item: IBookmarkGroup, rowIndex?: number) => {
          const idx = rowIndex ?? 0;
          return (
            <div className={styles.reorderCell}>
              <TooltipHost content="Move up">
                <IconButton
                  iconProps={{ iconName: 'ChevronUp' }}
                  ariaLabel="Move up"
                  disabled={idx === 0}
                  styles={{ root: { height: 24, width: 24 }, icon: { fontSize: 10 } }}
                  onClick={() => this._moveUp(idx)}
                />
              </TooltipHost>
              <TooltipHost content="Move down">
                <IconButton
                  iconProps={{ iconName: 'ChevronDown' }}
                  ariaLabel="Move down"
                  disabled={idx === sorted.length - 1}
                  styles={{ root: { height: 24, width: 24 }, icon: { fontSize: 10 } }}
                  onClick={() => this._moveDown(idx)}
                />
              </TooltipHost>
            </div>
          );
        },
      },
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 120,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 160,
        isResizable: true,
        onRender: (item: IBookmarkGroup) => (
          <Text variant="small">{item.description || '—'}</Text>
        ),
      },
      {
        key: 'actions',
        name: '',
        minWidth: 72,
        maxWidth: 72,
        onRender: (item: IBookmarkGroup) => (
          <Stack horizontal tokens={{ childrenGap: 0 }}>
            <TooltipHost content="Edit">
              <IconButton
                iconProps={{ iconName: 'Edit' }}
                ariaLabel="Edit group"
                styles={{ root: { height: 32, width: 32 } }}
                onClick={() => this._openEditDialog(item)}
              />
            </TooltipHost>
            <TooltipHost content="Delete">
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                ariaLabel="Delete group"
                styles={{ root: { height: 32, width: 32 } }}
                onClick={() => this._openDeleteDialog(item)}
              />
            </TooltipHost>
          </Stack>
        ),
      },
    ];
  }

  public render(): React.ReactElement {
    const { isFormDialogOpen, isDeleteDialogOpen, editingGroup, groupToDelete, nameError } =
      this.state;
    const isEditing = !!editingGroup?.id;
    const sorted = this._getSorted();

    const commandBarItems: ICommandBarItemProps[] = [
      {
        key: 'addGroup',
        text: 'Add Group',
        iconProps: { iconName: 'Add' },
        onClick: this._openAddDialog,
      },
    ];

    return (
      <>
        <div className={styles.commandBar}>
          <CommandBar items={commandBarItems} ariaLabel="Group actions" />
        </div>

        {sorted.length === 0 ? (
          <div className={styles.emptyMessage}>
            <MessageBar messageBarType={MessageBarType.info}>
              No groups yet. Click &ldquo;Add Group&rdquo; to create one.
            </MessageBar>
          </div>
        ) : (
          <DetailsList
            items={sorted}
            columns={this._getColumns()}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            getKey={(item: IBookmarkGroup) => item.id}
          />
        )}

        <Dialog
          hidden={!isFormDialogOpen}
          onDismiss={this._closeFormDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: isEditing ? 'Edit Group' : 'Add Group',
          }}
          minWidth={440}
          modalProps={{ isBlocking: true }}
        >
          <Stack tokens={formStackTokens}>
            <div className={styles.formField}>
              <TextField
                label="Name"
                required
                value={editingGroup?.name ?? ''}
                onChange={this._onNameChange}
                errorMessage={nameError}
                placeholder="Enter group name"
              />
            </div>
            <div className={styles.formField}>
              <TextField
                label="Description"
                value={editingGroup?.description ?? ''}
                onChange={this._onDescriptionChange}
                multiline
                rows={3}
                placeholder="Enter group description (optional)"
              />
            </div>
          </Stack>
          <DialogFooter>
            <Stack horizontal tokens={footerStackTokens}>
              <PrimaryButton text="Save" onClick={this._saveGroup} />
              <DefaultButton text="Cancel" onClick={this._closeFormDialog} />
            </Stack>
          </DialogFooter>
        </Dialog>

        <Dialog
          hidden={!isDeleteDialogOpen}
          onDismiss={this._closeDeleteDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Delete Group',
            subText: `Are you sure you want to delete "${groupToDelete?.name ?? ''}"? This cannot be undone.`,
          }}
          modalProps={{ isBlocking: true }}
        >
          <DialogFooter>
            <PrimaryButton text="Delete" onClick={this._confirmDelete} />
            <DefaultButton text="Cancel" onClick={this._closeDeleteDialog} />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}
