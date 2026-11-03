import * as React from 'react';
import { Log } from '@microsoft/sp-core-library';
import * as strings from 'LibraryQuickLinksWebPartStrings';
import styles from './LibraryQuickLinks.module.scss';
import type { ILibraryQuickLinksProps } from './ILibraryQuickLinksProps';
import { defaultHiddenLibraries, getDocumentLibraries, type IDocumentLibrary } from './documentLibraries';

type LibraryFilter = 'all' | 'withFiles' | 'empty';
type LibraryIcon = 'search' | 'filter' | 'file' | 'storage' | 'clock' | 'folder' | 'open';

interface ILibraryQuickLinksState {
  libraries: IDocumentLibrary[];
  loading: boolean;
  hasError: boolean;
  search: string;
  filter: LibraryFilter;
  filterOpen: boolean;
}

export default class LibraryQuickLinks extends React.Component<ILibraryQuickLinksProps, ILibraryQuickLinksState> {
  public state: ILibraryQuickLinksState = {
    libraries: [],
    loading: true,
    hasError: false,
    search: '',
    filter: 'all',
    filterOpen: false
  };

  private _requestId = 0;

  public componentDidMount(): void {
    this._loadLibraries().catch((error: Error) => Log.error('LibraryQuickLinks', error));
  }

  public componentDidUpdate(previousProps: ILibraryQuickLinksProps): void {
    if (previousProps.showHeader && !this.props.showHeader) {
      this.setState({ search: '', filter: 'all', filterOpen: false });
    } else if (previousProps.showMetadata && !this.props.showMetadata) {
      this.setState({ filter: 'all', filterOpen: false });
    }
    if (previousProps.webUrl !== this.props.webUrl || previousProps.spHttpClient !== this.props.spHttpClient ||
      !!previousProps.showMetadata !== !!this.props.showMetadata) {
      this._loadLibraries().catch((error: Error) => Log.error('LibraryQuickLinks', error));
    }
  }

  public componentWillUnmount(): void {
    this._requestId++;
  }

  private async _loadLibraries(): Promise<void> {
    const requestId = ++this._requestId;
    this.setState({ loading: true, hasError: false, libraries: [] });

    try {
      const libraries = await getDocumentLibraries(this.props.spHttpClient, this.props.webUrl, this.props.showMetadata);
      if (requestId === this._requestId) {
        this.setState({ libraries, loading: false });
      }
    } catch (error) {
      if (requestId === this._requestId) {
        this.setState({ loading: false, hasError: true });
      }
      throw error;
    }
  }

  private _renderIcon(icon: LibraryIcon, className?: string): React.ReactNode {
    const paths: Record<LibraryIcon, React.ReactNode> = {
      search: <><circle cx="10.5" cy="10.5" r="7.5" /><path d="m16 16 5 5" /></>,
      filter: <path d="M3 3h18l-7 9v8l-4 1v-9z" />,
      file: <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h6" />,
      storage: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
      clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 3" /></>,
      folder: <path d="M3 7V4h6l4 4h8v13H3V7h18" />,
      open: <path d="m5 19 14-14M6 5h13v13" />
    };
    return (
      <svg className={className ?? styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {paths[icon]}
      </svg>
    );
  }

  private _renderMetadata(library: IDocumentLibrary): React.ReactNode {
    if (library.FileCount === undefined || library.FolderCount === undefined || library.SizeBytes === undefined ||
      !library.LastItemModifiedDate || !Number.isFinite(Date.parse(library.LastItemModifiedDate))) {
      return <span className={styles.metadata}>{strings.MetadataUnavailable}</span>;
    }

    const megabytes = (library.SizeBytes / (1024 * 1024))
      .toLocaleString(this.props.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const gigabytes = (library.SizeBytes / (1024 * 1024 * 1024))
      .toLocaleString(this.props.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const modified = new Date(library.LastItemModifiedDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dateLabel = modified.toDateString() === today.toDateString() ? strings.TodayLabel
      : modified.toDateString() === yesterday.toDateString() ? strings.YesterdayLabel
        : modified.toLocaleDateString(this.props.locale, {
          month: 'short',
          day: 'numeric',
          ...(modified.getFullYear() !== today.getFullYear() ? { year: 'numeric' } : {})
        });

    return (
      <span className={styles.metadata}>
        <span className={styles.counts}>
          <span className={styles.stat}>
            {this._renderIcon('file')}
            <span>{library.FileCount === 1 ? strings.OneFileLabel
              : strings.FileCountLabel.replace('{0}', library.FileCount.toLocaleString(this.props.locale))}</span>
          </span>
          <span className={styles.stat}>
            {this._renderIcon('folder')}
            <span>{library.FolderCount === 1 ? strings.OneFolderLabel
              : strings.FolderCountLabel.replace('{0}', library.FolderCount.toLocaleString(this.props.locale))}</span>
          </span>
        </span>
        <span className={styles.stat} aria-label={`${strings.LibrarySizeLabel}: ${megabytes} ${strings.MegabytesLabel} / ${gigabytes} ${strings.GigabytesLabel}`}>
          {this._renderIcon('storage')}
          <span>{megabytes} {strings.MegabytesLabel} / {gigabytes} {strings.GigabytesLabel}</span>
        </span>
        <time dateTime={library.LastItemModifiedDate}
          className={styles.edited}
          title={`${strings.LastUpdatedLabel}: ${modified.toLocaleString(this.props.locale)}`}
          aria-label={`${strings.LastUpdatedLabel}: ${modified.toLocaleString(this.props.locale)}`}>
          {this._renderIcon('clock')}
          <span>{strings.EditedLabel.replace('{0}', dateLabel)}</span>
        </time>
      </span>
    );
  }

  public render(): React.ReactElement<ILibraryQuickLinksProps> {
    const { libraries, loading, hasError, search, filterOpen } = this.state;
    const filter = this.props.showHeader ? this.state.filter : 'all';
    const hiddenTitles = new Set((this.props.hiddenLibraries ?? defaultHiddenLibraries)
      .split(/\r?\n/)
      .map(title => title.trim().toLowerCase())
      .filter(title => title.length > 0));
    const query = this.props.showHeader ? search.trim().toLocaleLowerCase(this.props.locale) : '';
    const visibleLibraries = libraries.filter(library => {
      if (hiddenTitles.has(library.Title.trim().toLowerCase())) return false;
      const folderName = decodeURIComponent(library.RootFolder.ServerRelativeUrl).replace(/\/$/, '').split('/').pop()?.toLowerCase();
      if (hiddenTitles.has('shared documents') && folderName === 'shared documents') return false;
      if (query && !`${library.Title} ${library.Description ?? ''}`.toLocaleLowerCase(this.props.locale).includes(query)) return false;
      if (this.props.showMetadata && filter === 'withFiles') return library.FileCount !== undefined && library.FileCount > 0;
      if (this.props.showMetadata && filter === 'empty') return library.FileCount === 0;
      return true;
    }).sort((left, right) => {
      const sortBy = this.props.sortBy ?? 'nameAsc';
      const nameOrder = left.Title.localeCompare(right.Title, this.props.locale, { sensitivity: 'base' });
      if (sortBy === 'nameAsc') return nameOrder;
      if (sortBy === 'nameDesc') return -nameOrder;
      const leftDate = Date.parse(left.LastItemModifiedDate ?? '');
      const rightDate = Date.parse(right.LastItemModifiedDate ?? '');
      if (!Number.isFinite(leftDate)) return Number.isFinite(rightDate) ? 1 : nameOrder;
      if (!Number.isFinite(rightDate)) return -1;
      const dateOrder = sortBy === 'modifiedAsc' ? leftDate - rightDate : rightDate - leftDate;
      return dateOrder || nameOrder;
    });

    return (
      <section className={styles.libraryQuickLinks} aria-label={strings.LibrariesLabel}>
        {this.props.showHeader && <div className={styles.toolbar}>
          <label className={styles.searchBox}>
            {this._renderIcon('search')}
            <input type="search" aria-label={strings.SearchLibrariesLabel} placeholder={strings.SearchLibrariesLabel}
              value={search} onChange={event => this.setState({ search: event.currentTarget.value })} />
          </label>
          <span className={styles.libraryCount} aria-live="polite">
            {!loading && !hasError && (visibleLibraries.length === 1 ? strings.OneLibraryLabel
              : strings.LibraryCountLabel.replace('{0}', visibleLibraries.length.toLocaleString(this.props.locale)))}
          </span>
          {this.props.showMetadata && (
            <button type="button" className={styles.filterButton} aria-label={strings.FilterLibrariesLabel}
              title={strings.FilterLibrariesLabel} aria-expanded={filterOpen} aria-pressed={filter !== 'all'}
              onClick={() => this.setState({ filterOpen: !filterOpen })}>
              {this._renderIcon('filter')}
            </button>
          )}
        </div>}
        {this.props.showHeader && this.props.showMetadata && filterOpen && (
          <div className={styles.filterPanel}>
            <label>
              {strings.FilterLibrariesLabel}
              <select value={filter} onChange={event => {
                const value = event.currentTarget.value;
                if (value === 'all' || value === 'withFiles' || value === 'empty') this.setState({ filter: value });
              }}>
                <option value="all">{strings.AllLibrariesLabel}</option>
                <option value="withFiles">{strings.WithFilesLabel}</option>
                <option value="empty">{strings.EmptyLibrariesLabel}</option>
              </select>
            </label>
          </div>
        )}
        {loading && <div role="status">{strings.LoadingLibraries}</div>}
        {hasError && <div role="alert">{strings.LoadLibrariesError}</div>}
        {!loading && !hasError && (visibleLibraries.length === 0
          ? <div role="status">{query || filter !== 'all' ? strings.NoMatchingLibraries : strings.NoLibraries}</div>
          : <div className={`${styles.scrollRegion}${this.props.showMetadata ? ` ${styles.cardScrollRegion}` : ''}`}
            role="region" aria-label={strings.LibrariesLabel} tabIndex={0}>
            <ul className={`${styles.links}${this.props.showMetadata ? ` ${styles.metadataView}` : ''}${this.props.viewedAs === 'list' ? ` ${styles.listView}` : ''}`}>
              {visibleLibraries.map(library => (
                <li key={library.Id}>
                  <a className={`${styles.libraryLink}${this.props.showMetadata
                    ? ` ${this.props.viewedAs === 'list' ? styles.metadataRow : styles.metadataCard}` : ''}`}
                    href={library.RootFolder.ServerRelativeUrl}>
                    <span className={styles.libraryHeading}>
                    <span className={styles.folderBadge}>{this._renderIcon('folder', styles.folderIcon)}</span>
                    <span className={styles.libraryText}>
                      <span className={styles.libraryTitle}>{library.Title}</span>
                      {this.props.showMetadata && library.Description && (
                        <span className={styles.description}>{library.Description}</span>
                      )}
                    </span>
                    {this.props.showMetadata && (
                      this._renderIcon('open', styles.openIcon)
                    )}
                    </span>
                    {this.props.showMetadata && this._renderMetadata(library)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }
}
