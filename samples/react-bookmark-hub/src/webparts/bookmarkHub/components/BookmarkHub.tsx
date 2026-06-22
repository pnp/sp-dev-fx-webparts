import * as React from 'react';
import styles from './BookmarkHub.module.scss';
import { IAppData } from "../../../services/models/IAppData";
import type { IBookmarkHubProps } from './IBookmarkHubProps';
import { IBookmarkHubState } from './IBookmarkHubState';
import { IBookmarkGroup } from '../../../services/models/IBookmarkGroup';
import { IBookmarkLabel } from '../../../services/models/IBookmarkLabel';
import { ActionButton, Spinner, SpinnerSize, Stack, Text, MessageBar, MessageBarType } from '@fluentui/react';
import { IBookmark } from '../../../services/models/IBookmark';
import { BookmarkLabel } from './shared/BookmarkLabel';
import BookmarkHubToolbar from './bookmarkHubToolbar/BookmarkHubToolbar';
import BookmarkList from './bookmarkList/BookmarkList';
import SavedBookmarkGroups from './savedBookmarkGroups/SavedBookmarkGroups';
import { CopilotChatService } from '../../../services/CopilotChatService';
import { organizeBookmarksWithCopilot, mergeCopilotSuggestions } from '../../../services/CopilotOrganizeService';

export default class BookmarkHub extends React.Component<IBookmarkHubProps, IBookmarkHubState> {

  constructor(props: IBookmarkHubProps | Readonly<IBookmarkHubProps>) {
    super(props);

    this.state = {
      bookmarks: [],
      appData: { bookmarks: [], groups: [], labels: [] },
      isLoading: true,
      hasCopilotSuggestions: false,
      searchQuery: '',
      activeLabelFilters: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    await CopilotChatService.init(this.props.context.msGraphClientFactory);
    const { backendBookmarks, appData } = await this.props.bookmarkHubService.getMergedBookmarks();
    this.setState({ bookmarks: backendBookmarks, appData, isLoading: false });
  }

  private _onAssignGroup = async (bookmark: IBookmark, group: IBookmarkGroup): Promise<void> => {
    const { appData } = this.state;
    const existingBookmarks = appData?.bookmarks ?? [];
    const existingIndex = existingBookmarks.findIndex(bm => bm.id === bookmark.id);
    const updatedBookmark: IBookmark = { ...bookmark, groups: [group] };
    const updatedBookmarks = existingIndex >= 0
      ? existingBookmarks.map((bm, i) => i === existingIndex ? updatedBookmark : bm)
      : [...existingBookmarks, updatedBookmark];
    const updatedAppData: IAppData = { ...appData, bookmarks: updatedBookmarks };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error assigning group:', error);
    }
  };

  private _onRemoveBookmark = async (bookmark: IBookmark): Promise<void> => {
    const { appData } = this.state;
    const updatedBookmarks = (appData?.bookmarks ?? []).filter(bm => bm.id !== bookmark.id);
    const updatedAppData: IAppData = { ...appData, bookmarks: updatedBookmarks };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  private _onLabelsChanged = async (labels: IBookmarkLabel[]): Promise<void> => {
    const updatedAppData: IAppData = { ...this.state.appData, labels };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error saving labels:', error);
    }
  };

  private _onAssignLabels = async (bookmark: IBookmark, labels: IBookmarkLabel[]): Promise<void> => {
    const { appData } = this.state;
    const existingBookmarks = appData?.bookmarks ?? [];
    const existingIndex = existingBookmarks.findIndex(bm => bm.id === bookmark.id);
    const updatedBookmark: IBookmark = { ...bookmark, labels };
    const updatedBookmarks = existingIndex >= 0
      ? existingBookmarks.map((bm, i) => i === existingIndex ? updatedBookmark : bm)
      : [...existingBookmarks, updatedBookmark];
    const updatedAppData: IAppData = { ...appData, bookmarks: updatedBookmarks };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error assigning labels:', error);
    }
  };

  private _onRemoveLabel = async (bookmark: IBookmark, labelToRemove: IBookmarkLabel): Promise<void> => {
    const { appData } = this.state;
    const existingBookmarks = appData?.bookmarks ?? [];
    const existingIndex = existingBookmarks.findIndex(bm => bm.id === bookmark.id);
    if (existingIndex < 0) return;

    const updatedLabels = (bookmark.labels ?? []).filter(l => l.name !== labelToRemove.name);
    const updatedBookmark: IBookmark = { ...bookmark, labels: updatedLabels };
    const updatedBookmarks = existingBookmarks.map((bm, i) => i === existingIndex ? updatedBookmark : bm);
    const updatedAppData: IAppData = { ...appData, bookmarks: updatedBookmarks };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error removing label:', error);
    }
  };

  private _onBookmarkAdded = async (bookmark: IBookmark): Promise<void> => {
    const { appData } = this.state;
    const updatedBookmarks = [...(appData?.bookmarks ?? []), bookmark];
    const updatedAppData: IAppData = { ...appData, bookmarks: updatedBookmarks };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  private _onToggleGroupCollapse = async (group: IBookmarkGroup): Promise<void> => {
    const { appData } = this.state;
    const updatedGroups = (appData?.groups ?? []).map(g =>
      g.id === group.id ? { ...g, collapsed: !g.collapsed } : g
    );
    const updatedAppData: IAppData = { ...appData, groups: updatedGroups };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error toggling group collapse:', error);
    }
  };

  private _onGroupsChanged = async (groups: IBookmarkGroup[]): Promise<void> => {
    const updatedAppData: IAppData = { ...this.state.appData, groups };
    this.setState({ appData: updatedAppData });
    try {
      await this.props.bookmarkHubService.saveAppData(updatedAppData);
    } catch (error) {
      console.error('Error saving groups:', error);
    }
  };

  private _onSummarizeWithCopilot = async (): Promise<void> => {
    const { appData, bookmarks } = this.state;
    const result = await organizeBookmarksWithCopilot(bookmarks, appData);
    if (result.success && result.organizedAppData) {
      const mergedAppData = mergeCopilotSuggestions(appData, result.organizedAppData);
      // Don't persist yet — wait for user to Approve
      this.setState({ appData: mergedAppData, hasCopilotSuggestions: true });
    }
  };

  private _onCopilotApprove = async (): Promise<void> => {
    const { appData } = this.state;
    const approvedAppData: IAppData = {
      ...appData,
      bookmarks: appData.bookmarks.map(bm => ({ ...bm, suggestion: false })),
      groups: appData.groups.map(g => ({ ...g, suggestion: false })),
    };
    this.setState({ appData: approvedAppData, hasCopilotSuggestions: false });
    try {
      await this.props.bookmarkHubService.saveAppData(approvedAppData);
    } catch (error) {
      console.error('[Copilot] Error saving approved data:', error);
    }
  };

  private _onCopilotDecline = async (): Promise<void> => {
    const { appData } = this.state;
    const cleanedAppData: IAppData = {
      ...appData,
      bookmarks: appData.bookmarks.filter(bm => !bm.suggestion),
      groups: appData.groups.filter(g => !g.suggestion),
    };
    this.setState({ appData: cleanedAppData, hasCopilotSuggestions: false });
    try {
      await this.props.bookmarkHubService.saveAppData(cleanedAppData);
    } catch (error) {
      console.error('[Copilot] Error saving after decline:', error);
    }
  };

  private _onCopilotRetry = async (): Promise<void> => {
    const { appData, bookmarks } = this.state;
    // Clean up previous suggestions first (in memory, don't persist yet)
    const cleanedAppData: IAppData = {
      ...appData,
      bookmarks: appData.bookmarks.filter(bm => !bm.suggestion),
      groups: appData.groups.filter(g => !g.suggestion),
    };
    this.setState({ appData: cleanedAppData, hasCopilotSuggestions: false });
    // Re-run with the cleaned state
    const result = await organizeBookmarksWithCopilot(bookmarks, cleanedAppData);
    if (result.success && result.organizedAppData) {
      const mergedAppData = mergeCopilotSuggestions(cleanedAppData, result.organizedAppData);
      this.setState({ appData: mergedAppData, hasCopilotSuggestions: true });
    }
  };

  private _onSearchChange = (_event?: React.ChangeEvent<HTMLInputElement>, newValue?: string): void => {
    this.setState({ searchQuery: newValue || '' });
  };

  public render(): React.ReactElement<IBookmarkHubProps> {
    const { bookmarks, appData, isLoading, searchQuery, activeLabelFilters } = this.state;

    return (
      <section className={styles.bookmarkHub}>
        <div>
          <div className={styles.toolbarGroupSection}>
            <div style={{ marginBottom: 24 }}>
              <Text variant="xLarge" block style={{ fontWeight: 600, marginBottom: 4 }}>
                Bookmark Hub
              </Text>
              <Text variant="medium" block style={{ color: '#605e5c' }}>
                Unified view across Microsoft 365
              </Text>
            </div>

            <BookmarkHubToolbar
              groups={appData?.groups ?? []}
              labels={appData?.labels ?? []}
              bookmarks={appData?.bookmarks ?? []}
              onGroupsChanged={this._onGroupsChanged}
              onLabelsChanged={this._onLabelsChanged}
              onBookmarkAdded={this._onBookmarkAdded}
              searchQuery={searchQuery}
              onSearchChange={this._onSearchChange}
            />


            {!isLoading && (() => {
              const usedLabelNames = new Set<string>();
              (appData?.bookmarks ?? []).forEach(bm => {
                (bm.labels ?? []).forEach(l => usedLabelNames.add(l.name));
              });
              const filterLabels = (appData?.labels ?? []).filter(l => usedLabelNames.has(l.name));
              if (filterLabels.length === 0) return null;
              return (
                <Stack horizontal wrap verticalAlign="center" tokens={{ childrenGap: 6 }} className={styles.labelFilters}>
                  {filterLabels.map(label => {
                    const isActive = activeLabelFilters.indexOf(label.name) !== -1;
                    const toggle = (): void => {
                      const next = isActive
                        ? activeLabelFilters.filter(n => n !== label.name)
                        : [...activeLabelFilters, label.name];
                      this.setState({ activeLabelFilters: next });
                    };
                    return (
                      <div
                        key={label.name}
                        role="button"
                        tabIndex={0}
                        className={isActive ? styles.labelFilterPillActive : styles.labelFilterPill}
                        onClick={toggle}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
                        title={isActive ? `Remove "${label.name}" filter` : `Filter by "${label.name}"`}
                      >
                        <BookmarkLabel label={label} showRemove={false} />
                      </div>
                    );
                  })}
                  {activeLabelFilters.length > 0 && (
                    <ActionButton
                      iconProps={{ iconName: 'ClearFilter' }}
                      className={styles.clearFiltersButton}
                      onClick={() => this.setState({ activeLabelFilters: [] })}
                    >
                      Clear filters
                    </ActionButton>
                  )}
                </Stack>
              );
            })()}

            {!isLoading && (() => {
              const removedCount = (appData?.bookmarks ?? []).filter(bm => bm.removedFromBackend === true && bm.isCustom !== true).length;
              if (removedCount === 0) return null;
              return (
                <MessageBar
                  messageBarType={MessageBarType.warning}
                  isMultiline={false}
                  styles={{ root: { marginTop: 12 } }}
                >
                  <strong>{removedCount}</strong> bookmark{removedCount !== 1 ? 's' : ''} no longer exist{removedCount === 1 ? 's' : ''} in the backend.
                </MessageBar>
              );
            })()}

          </div>

          {isLoading ? (
            <Spinner
              size={SpinnerSize.large}
              label="Loading bookmarks..."
              className={styles.spinner}
            />
          ) : (
            <BookmarkList
              bookmarks={bookmarks}
              savedBookmarks={appData?.bookmarks ?? []}
              groups={appData?.groups ?? []}
              availableLabels={appData?.labels ?? []}
              onAssignGroup={this._onAssignGroup}
              onOrganizeWithCopilot={this._onSummarizeWithCopilot}
              hasCopilotSuggestions={this.state.hasCopilotSuggestions}
              onCopilotApprove={this._onCopilotApprove}
              onCopilotDecline={this._onCopilotDecline}
              onCopilotRetry={this._onCopilotRetry}
              onAssignLabels={this._onAssignLabels}
              onRemoveLabel={this._onRemoveLabel}
              searchQuery={searchQuery}
              activeLabelFilters={activeLabelFilters}
            />
          )}

          {!isLoading && (
            <SavedBookmarkGroups
              savedBookmarks={appData?.bookmarks ?? []}
              groups={appData?.groups ?? []}
              availableLabels={appData?.labels ?? []}
              onAssignGroup={this._onAssignGroup}
              onRemoveBookmark={this._onRemoveBookmark}
              onToggleGroupCollapse={this._onToggleGroupCollapse}
              onReorderGroups={this._onGroupsChanged}
              onAssignLabels={this._onAssignLabels}
              onRemoveLabel={this._onRemoveLabel}
              searchQuery={searchQuery}
              activeLabelFilters={activeLabelFilters}
            />
          )}

          {/* Temporary view to remove later */}
          {/* <h3>Saved App Data - from OneDrive App Root</h3>
          <pre className={styles.bookmarkHubPre}>
            {JSON.stringify(appData, null, 2)}
          </pre> */}
          {/* Temporary view to remove later */}
        </div>
      </section>
    );
  }
}
