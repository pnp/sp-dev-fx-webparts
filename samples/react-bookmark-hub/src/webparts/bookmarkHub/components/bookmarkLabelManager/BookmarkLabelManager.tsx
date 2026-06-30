import * as React from 'react';
import { CommandBar, ICommandBarItemProps, DetailsList, DetailsListLayoutMode, SelectionMode, IColumn, IconButton, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, TextField, Stack, Text, MessageBar, MessageBarType, IStackTokens, TooltipHost, ColorPicker, IColor, getColorFromString } from '@fluentui/react';
import styles from './BookmarkLabelManager.module.scss';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';
import { IBookmarkLabelManagerProps } from './IBookmarkLabelManagerProps';
import { IBookmarkLabelManagerState } from './IBookmarkLabelManagerState';

const formStackTokens: IStackTokens = { childrenGap: 12 };
const footerStackTokens: IStackTokens = { childrenGap: 8 };

const DEFAULT_COLOR = '#0078d4';
const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export default class BookmarkLabelManager extends React.Component<
  IBookmarkLabelManagerProps,
  IBookmarkLabelManagerState
> {
  constructor(props: IBookmarkLabelManagerProps) {
    super(props);
    this.state = {
      isFormDialogOpen: false,
      isDeleteDialogOpen: false,
      editingLabel: undefined,
      editingIndex: undefined,
      labelToDelete: undefined,
      nameError: '',
      colorError: '',
      deleteError: '',
    };
  }

  private _openAddDialog = (): void => {
    this.setState({
      isFormDialogOpen: true,
      editingLabel: { name: '', description: '', color: DEFAULT_COLOR },
      editingIndex: undefined,
      nameError: '',
      colorError: '',
    });
  };

  private _openEditDialog = (label: IBookmarkLabel, index: number): void => {
    this.setState({
      isFormDialogOpen: true,
      editingLabel: { ...label },
      editingIndex: index,
      nameError: '',
      colorError: '',
    });
  };

  private _closeFormDialog = (): void => {
    this.setState({ isFormDialogOpen: false, editingLabel: undefined, editingIndex: undefined });
  };

  private _onNameChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    const name = value ?? '';
    this.setState(prev => ({
      editingLabel: { ...prev.editingLabel, name },
      nameError: name.trim() ? '' : 'Name is required',
    }));
  };

  private _onDescriptionChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    this.setState(prev => ({
      editingLabel: { ...prev.editingLabel, description: value ?? '' },
    }));
  };

  private _onColorPickerChange = (_: React.SyntheticEvent<HTMLElement>, colorObj: IColor): void => {
    const hex = `#${colorObj.hex}`;
    this.setState(prev => ({
      editingLabel: { ...prev.editingLabel, color: hex },
      colorError: '',
    }));
  };

  private _onHexFieldChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    const raw = value ?? '';
    // Prepend '#' if missing so typing "FF0000" also works
    const hex = raw.startsWith('#') ? raw : `#${raw}`;
    this.setState(prev => ({
      editingLabel: { ...prev.editingLabel, color: hex },
      colorError: HEX_REGEX.test(hex) ? '' : 'Enter a valid hex color (e.g. #FF5733)',
    }));
  };

  private _saveLabel = (): void => {
    const { editingLabel, editingIndex } = this.state;

    if (!editingLabel?.name?.trim()) {
      this.setState({ nameError: 'Name is required' });
      return;
    }
    const color = editingLabel.color ?? DEFAULT_COLOR;
    if (!HEX_REGEX.test(color)) {
      this.setState({ colorError: 'Enter a valid hex color (e.g. #FF5733)' });
      return;
    }

    const { labels, onLabelsChanged } = this.props;
    let updatedLabels: IBookmarkLabel[];

    if (editingIndex !== undefined) {
      updatedLabels = labels.map((l, i) =>
        i === editingIndex ? (editingLabel as IBookmarkLabel) : l
      );
    } else {
      updatedLabels = [...labels, editingLabel as IBookmarkLabel];
    }

    onLabelsChanged(updatedLabels);
    this._closeFormDialog();
  };

  private _openDeleteDialog = (label: IBookmarkLabel, index: number): void => {
    this.setState({ isDeleteDialogOpen: true, labelToDelete: { label, index }, deleteError: '' });
  };

  private _closeDeleteDialog = (): void => {
    this.setState({ isDeleteDialogOpen: false, labelToDelete: undefined, deleteError: '' });
  };

  private _confirmDelete = (): void => {
    const { labelToDelete } = this.state;
    const { bookmarks } = this.props;
    
    if (!labelToDelete) 
      return;

    const labelName = labelToDelete.label.name;
    const bookmarksUsingLabel = bookmarks.filter(bm => 
      bm.labels?.some(l => l.name === labelName)
    );

    if (bookmarksUsingLabel.length > 0) {
      const count = bookmarksUsingLabel.length;
      const pluralSuffix = count === 1 ? '' : 's';
      this.setState({ 
        deleteError: `Cannot delete this label. It is currently used by ${count} bookmark${pluralSuffix}. Please remove the label from all bookmarks first.` 
      });
      return;
    }

    const updated = this.props.labels.filter((_, i) => i !== labelToDelete.index);
    this.props.onLabelsChanged(updated);
    this._closeDeleteDialog();
  };

  private _getColumns(): IColumn[] {
    return [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 180,
        isResizable: true,
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 140,
        isResizable: true,
        onRender: (item: IBookmarkLabel) => (
          <Text variant="small">{item.description || '—'}</Text>
        ),
      },
      {
        key: 'color',
        name: 'Color',
        minWidth: 110,
        maxWidth: 140,
        onRender: (item: IBookmarkLabel) => (
          <div className={styles.colorCell}>
            <span
              className={styles.colorSwatch}
              style={{ backgroundColor: item.color }}
            />
            <Text variant="small">{item.color}</Text>
          </div>
        ),
      },
      {
        key: 'actions',
        name: '',
        minWidth: 72,
        maxWidth: 72,
        onRender: (item: IBookmarkLabel, rowIndex?: number) => (
          <Stack horizontal tokens={{ childrenGap: 0 }}>
            <TooltipHost content="Edit">
              <IconButton
                iconProps={{ iconName: 'Edit' }}
                ariaLabel="Edit label"
                styles={{ root: { height: 32, width: 32 } }}
                onClick={() => this._openEditDialog(item, rowIndex ?? 0)}
              />
            </TooltipHost>
            <TooltipHost content="Delete">
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                ariaLabel="Delete label"
                styles={{ root: { height: 32, width: 32 } }}
                onClick={() => this._openDeleteDialog(item, rowIndex ?? 0)}
              />
            </TooltipHost>
          </Stack>
        ),
      },
    ];
  }

  public render(): React.ReactElement {
    const {
      isFormDialogOpen,
      isDeleteDialogOpen,
      editingLabel,
      editingIndex,
      labelToDelete,
      nameError,
      colorError,
      deleteError,
    } = this.state;
    const { labels } = this.props;
    const isEditing = editingIndex !== undefined;

    // Resolve the current IColor for the ColorPicker; fall back to default blue
    const currentHex = editingLabel?.color ?? DEFAULT_COLOR;
    const pickerColor: IColor =
      getColorFromString(currentHex) ?? (getColorFromString(DEFAULT_COLOR) as IColor);

    const commandBarItems: ICommandBarItemProps[] = [
      {
        key: 'addLabel',
        text: 'Add Label',
        iconProps: { iconName: 'Add' },
        onClick: this._openAddDialog,
      },
    ];

    return (
      <>
        <div className={styles.commandBar}>
          <CommandBar items={commandBarItems} ariaLabel="Label actions" />
        </div>

        {labels.length === 0 ? (
          <div className={styles.emptyMessage}>
            <MessageBar messageBarType={MessageBarType.info}>
              No labels yet. Click &ldquo;Add Label&rdquo; to create one.
            </MessageBar>
          </div>
        ) : (
          <DetailsList
            items={labels}
            columns={this._getColumns()}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            getKey={(_item: IBookmarkLabel, index?: number) => String(index)}
          />
        )}

        <Dialog
          hidden={!isFormDialogOpen}
          onDismiss={this._closeFormDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: isEditing ? 'Edit Label' : 'Add Label',
          }}
          minWidth={380}
          modalProps={{ isBlocking: true }}
        >
          <Stack tokens={formStackTokens}>
            <div className={styles.formField}>
              <TextField
                label="Name"
                required
                value={editingLabel?.name ?? ''}
                onChange={this._onNameChange}
                errorMessage={nameError}
                placeholder="Enter label name"
              />
            </div>
            <div className={styles.formField}>
              <TextField
                label="Description"
                value={editingLabel?.description ?? ''}
                onChange={this._onDescriptionChange}
                multiline
                rows={2}
                placeholder="Enter description (optional)"
              />
            </div>
            <div className={styles.colorPickerSection}>
              <div className={styles.colorPickerLabel}>Color</div>
              <ColorPicker
                color={pickerColor}
                onChange={this._onColorPickerChange}
                alphaType="none"
                showPreview={true}
              />
              <div className={styles.formField}>
                <TextField
                  label="Hex value"
                  value={editingLabel?.color ?? ''}
                  onChange={this._onHexFieldChange}
                  errorMessage={colorError}
                  placeholder="#0078d4"
                  prefix="#"
                  onRenderPrefix={() => (
                    <span
                      className={styles.colorSwatch}
                      style={{ backgroundColor: HEX_REGEX.test(currentHex) ? currentHex : 'transparent' }}
                    />
                  )}
                />
              </div>
            </div>
          </Stack>
          <DialogFooter>
            <Stack horizontal tokens={footerStackTokens}>
              <PrimaryButton text="Save" onClick={this._saveLabel} />
              <DefaultButton text="Cancel" onClick={this._closeFormDialog} />
            </Stack>
          </DialogFooter>
        </Dialog>

        <Dialog
          hidden={!isDeleteDialogOpen}
          onDismiss={this._closeDeleteDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Delete Label',
            subText: `Are you sure you want to delete "${labelToDelete?.label.name ?? ''}"? This cannot be undone.`,
          }}
          modalProps={{ isBlocking: true }}
        >
          {deleteError && (
            <MessageBar messageBarType={MessageBarType.error} isMultiline>
              {deleteError}
            </MessageBar>
          )}
          <DialogFooter>
            <PrimaryButton text="Delete" onClick={this._confirmDelete} />
            <DefaultButton text="Cancel" onClick={this._closeDeleteDialog} />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}
