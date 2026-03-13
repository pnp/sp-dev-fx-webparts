import * as React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, TextField, Stack, Text, Dropdown, IDropdownOption, IStackTokens, Checkbox } from '@fluentui/react';
import { IAddBookmarkManagerProps } from './IAddBookmarkManagerProps';
import { IAddBookmarkManagerState } from './IAddBookmarkManagerState';
import { IBookmark, BookmarkType } from '../../../../services/models/IBookmark';

const formStackTokens: IStackTokens = { childrenGap: 12 };

export default class AddBookmarkManager extends React.Component<
  IAddBookmarkManagerProps,
  IAddBookmarkManagerState
> {
  constructor(props: IAddBookmarkManagerProps) {
    super(props);
    this.state = {
      isFormDialogOpen: false,
      title: '',
      description: '',
      url: '',
      selectedLabels: [],
      selectedGroupId: undefined,
      titleError: '',
      urlError: '',
    };
  }

  public openDialog = (): void => {
    this.setState({
      isFormDialogOpen: true,
      title: '',
      description: '',
      url: '',
      selectedLabels: [],
      selectedGroupId: undefined,
      titleError: '',
      urlError: '',
    });
  };

  private _closeFormDialog = (): void => {
    this.setState({ isFormDialogOpen: false });
  };

  private _onTitleChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    const title = value ?? '';
    this.setState({
      title,
      titleError: title.trim() ? '' : 'Title is required',
    });
  };

  private _onDescriptionChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    this.setState({ description: value ?? '' });
  };

  private _onUrlChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string
  ): void => {
    const url = value ?? '';
    this.setState({
      url,
      urlError: this._isValidUrl(url) ? '' : 'Please enter a valid URL',
    });
  };

  private _onGroupChange = (
    _: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    this.setState({ selectedGroupId: option?.key as string });
  };

  private _onLabelChange = (labelName: string, checked: boolean): void => {
    this.setState(prev => ({
      selectedLabels: checked
        ? [...prev.selectedLabels, labelName]
        : prev.selectedLabels.filter(l => l !== labelName),
    }));
  };

  private _isValidUrl(url: string): boolean {
    if (!url || !url.trim()) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private _saveBookmark = (): void => {
    const { title, description, url, selectedLabels, selectedGroupId } = this.state;

    if (!title.trim()) {
      this.setState({ titleError: 'Title is required' });
      return;
    }

    if (!this._isValidUrl(url)) {
      this.setState({ urlError: 'Please enter a valid URL' });
      return;
    }

    const selectedLabelObjects = this.props.availableLabels.filter(l => selectedLabels.indexOf(l.name) !== -1);
    const selectedGroup = this.props.availableGroups.find(g => g.id === selectedGroupId);

    const newBookmark: IBookmark = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      url: url.trim(),
      date: new Date().toISOString(),
      type: BookmarkType.Site,
      isCustom: true,
      removedFromBackend: false,
      labels: selectedLabelObjects.length > 0 ? selectedLabelObjects : undefined,
      groups: selectedGroup ? [selectedGroup] : undefined,
    };

    this.props.onBookmarkAdded(newBookmark);
    this._closeFormDialog();
  };

  private _getGroupOptions(): IDropdownOption[] {
    return [
      { key: '', text: 'No group' },
      ...this.props.availableGroups.map(g => ({ key: g.id, text: g.name })),
    ];
  }

  public render(): React.ReactElement<IAddBookmarkManagerProps> {
    const { availableLabels } = this.props;
    const { isFormDialogOpen, title, description, url, selectedLabels, selectedGroupId, titleError, urlError } = this.state;

    return (
      <Dialog
        hidden={!isFormDialogOpen}
        onDismiss={this._closeFormDialog}
        minWidth={500}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Add Custom Bookmark',
          subText: 'Create a new bookmark with custom details.',
        }}
        modalProps={{
          isBlocking: false,
        }}
      >
        <Stack tokens={formStackTokens}>
          <TextField
            label="Title"
            value={title}
            onChange={this._onTitleChange}
            errorMessage={titleError}
            required
          />

          <TextField
            label="URL"
            value={url}
            onChange={this._onUrlChange}
            errorMessage={urlError}
            placeholder="https://example.com"
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={this._onDescriptionChange}
            multiline
            rows={3}
            placeholder="Optional description"
          />

          <Dropdown
            label="Group"
            selectedKey={selectedGroupId}
            onChange={this._onGroupChange}
            options={this._getGroupOptions()}
            placeholder="Select a group (optional)"
          />

          {availableLabels.length > 0 && (
            <div>
              <Text variant="small" block style={{ marginBottom: 8, fontWeight: 600 }}>
                Labels
              </Text>
              <Stack tokens={{ childrenGap: 8 }}>
                {availableLabels.map(label => (
                  <Checkbox
                    key={label.name}
                    label={label.name}
                    checked={selectedLabels.indexOf(label.name) !== -1}
                    onChange={(_, checked) => this._onLabelChange(label.name, checked || false)}
                  />
                ))}
              </Stack>
            </div>
          )}
        </Stack>

        <DialogFooter>
          <PrimaryButton onClick={this._saveBookmark} text="Add Bookmark" />
          <DefaultButton onClick={this._closeFormDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    );
  }
}