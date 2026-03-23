import * as React from 'react';
import { DefaultButton, Panel, PanelType, Stack, IStackTokens, SearchBox } from '@fluentui/react';
import { IBookmarkHubToolbarProps } from './IBookmarkHubToolbarProps';
import BookmarkGroupManager from '../bookmarkGroupManager/BookmarkGroupManager';
import BookmarkLabelManager from '../bookmarkLabelManager/BookmarkLabelManager';
import AddBookmarkManager from '../addBookmarkManager/AddBookmarkManager';

interface IBookmarkHubToolbarState {
  isGroupPanelOpen: boolean;
  isLabelPanelOpen: boolean;
}

const toolbarTokens: IStackTokens = { childrenGap: 8 };

export default class BookmarkHubToolbar extends React.Component<IBookmarkHubToolbarProps, IBookmarkHubToolbarState> {

  private _addBookmarkManagerRef = React.createRef<AddBookmarkManager>();

  constructor(props: IBookmarkHubToolbarProps) {
    super(props);
    this.state = {
      isGroupPanelOpen: false,
      isLabelPanelOpen: false,
    };
  }

  private _openGroupPanel = (): void => this.setState({ isGroupPanelOpen: true });
  private _closeGroupPanel = (): void => this.setState({ isGroupPanelOpen: false });
  private _openLabelPanel = (): void => this.setState({ isLabelPanelOpen: true });
  private _closeLabelPanel = (): void => this.setState({ isLabelPanelOpen: false });
  private _openAddBookmarkPanel = (): void => {
    this._addBookmarkManagerRef.current?.openDialog();
  };

  public render(): React.ReactElement<IBookmarkHubToolbarProps> {
    const { groups, labels, bookmarks, onGroupsChanged, onLabelsChanged, onBookmarkAdded, searchQuery, onSearchChange } = this.props;
    const { isGroupPanelOpen, isLabelPanelOpen } = this.state;

    return (
      <>
        <Stack horizontal tokens={toolbarTokens} horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginBottom: 16 } }}>
          <SearchBox
            placeholder="Search bookmarks..."
            ariaLabel="Search bookmarks"
            onChange={onSearchChange}
            value={searchQuery}
            styles={{ root: { width: 300 } }}
          />
          <Stack horizontal tokens={toolbarTokens}>
            <DefaultButton
              iconProps={{ iconName: 'Add' }}
              text="Add Bookmark"
              onClick={this._openAddBookmarkPanel}
            />
            <DefaultButton
              iconProps={{ iconName: 'GroupList' }}
              text="Manage Groups"
              onClick={this._openGroupPanel}
            />
            <DefaultButton
              iconProps={{ iconName: 'Tag' }}
              text="Manage Labels"
              onClick={this._openLabelPanel}
            />
          </Stack>
        </Stack>

        <Panel
          isOpen={isGroupPanelOpen}
          onDismiss={this._closeGroupPanel}
          type={PanelType.medium}
          headerText="Manage Groups"
          isBlocking={false}
          closeButtonAriaLabel="Close"
        >
          <BookmarkGroupManager
            groups={groups}
            onGroupsChanged={onGroupsChanged}
          />
        </Panel>

        <Panel
          isOpen={isLabelPanelOpen}
          onDismiss={this._closeLabelPanel}
          type={PanelType.medium}
          headerText="Manage Labels"
          isBlocking={false}
          closeButtonAriaLabel="Close"
        >
          <BookmarkLabelManager
            labels={labels}
            bookmarks={bookmarks}
            onLabelsChanged={onLabelsChanged}
          />
        </Panel>

        <AddBookmarkManager
          ref={this._addBookmarkManagerRef}
          availableLabels={labels}
          availableGroups={groups}
          onBookmarkAdded={onBookmarkAdded}
        />
      </>
    );
  }
}
