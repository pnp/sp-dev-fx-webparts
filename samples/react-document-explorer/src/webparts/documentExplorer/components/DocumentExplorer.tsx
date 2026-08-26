import * as React from 'react';
import styles from './DocumentExplorer.module.scss';
import { 
  IDocumentExplorerProps, 
  IDocumentExplorerState, 
  IFolderNode, 
  IFileItem, 
  ILibraryInfo,
  IFilters
} from './IDocumentExplorerProps';
import { 
  MessageBar, 
  MessageBarType, 
  Spinner, 
  SpinnerSize,
  SearchBox,
  Icon
} from '@fluentui/react';
import FolderTreeView from './FolderTreeView';
import FileListView from './FileListView';
import FilterPanel from './FilterPanel';

export default class DocumentExplorer extends React.Component<IDocumentExplorerProps, IDocumentExplorerState> {
  
  constructor(props: IDocumentExplorerProps) {
    super(props);
    
    this.state = {
      libraries: [],
      folderTree: [],
      files: [],
      filteredFiles: [],
      selectedFolder: '',
      searchText: '',
      loading: true,
      error: '',
      filters: {
        author: '',
        fileType: '',
        dateFrom: undefined,
        dateTo: undefined
      },
      authors: [],
      fileTypes: []
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.loadLibraries();
  }

  public async componentDidUpdate(prevProps: IDocumentExplorerProps): Promise<void> {
    if (JSON.stringify(prevProps.selectedLibraries) !== JSON.stringify(this.props.selectedLibraries)) {
      await this.loadLibraries();
    }
  }

  private async loadLibraries(): Promise<void> {
    this.setState({ loading: true, error: '' });

    try {
      const { selectedLibraries } = this.props;
      
      if (!selectedLibraries || selectedLibraries.length === 0) {
        this.setState({ 
          loading: false, 
          error: 'No libraries selected. Please configure the web part and select at least one library.' 
        });
        return;
      }

      const libraryUrls = Array.isArray(selectedLibraries) 
        ? selectedLibraries 
        : [selectedLibraries];

      console.log('Loading libraries:', libraryUrls);

      const libraryPromises = libraryUrls.map(url => this.fetchLibraryInfo(url));
      const libraries = await Promise.all(libraryPromises);

      const accessibleLibraries = libraries.filter(lib => lib.hasAccess);
      
      if (accessibleLibraries.length === 0) {
        this.setState({ 
          loading: false, 
          error: 'You do not have access to any of the selected libraries. Please contact your administrator.',
          libraries
        });
        return;
      }

      const folderTree = await this.buildFolderTree(accessibleLibraries);

      console.log('Libraries loaded successfully:', accessibleLibraries.length);

      this.setState({ 
        libraries, 
        folderTree, 
        loading: false 
      });

    } catch (error) {
      console.error('Error loading libraries:', error);
      this.setState({ 
        loading: false, 
        error: 'An error occurred while loading libraries. Please try again or contact your administrator.' 
      });
    }
  }

  private async fetchLibraryInfo(serverRelativeUrl: string): Promise<ILibraryInfo> {
    try {
      const folder = await this.props.sp.web
        .getFolderByServerRelativePath(serverRelativeUrl)
        .select('Name', 'ServerRelativeUrl')
        .expand('ListItemAllFields')();

      return {
        title: folder.Name,
        url: `${this.props.siteUrl}${serverRelativeUrl}`,
        serverRelativeUrl,
        hasAccess: true
      };
    } catch (error) {
      console.warn(`⚠️ No access to library: ${serverRelativeUrl}`, error);
      return {
        title: serverRelativeUrl.split('/').pop() || serverRelativeUrl,
        url: '',
        serverRelativeUrl,
        hasAccess: false,
        error: 'Access Denied'
      };
    }
  }

  private async buildFolderTree(libraries: ILibraryInfo[]): Promise<IFolderNode[]> {
    const treeNodes: IFolderNode[] = [];

    for (const library of libraries) {
      if (!library.hasAccess) continue;

      const rootNode: IFolderNode = {
        name: library.title,
        path: library.title,
        serverRelativeUrl: library.serverRelativeUrl,
        children: [],
        expanded: false,
        library: library.title,
        hasChildren: true
      };
      treeNodes.push(rootNode);
    }

    return treeNodes;
  }

  private loadFolderChildren = async (node: IFolderNode): Promise<IFolderNode[]> => {
    try {
      const folders = await this.props.sp.web
        .getFolderByServerRelativePath(node.serverRelativeUrl)
        .folders
        .select('Name', 'ServerRelativeUrl', 'ItemCount')();

      return folders.map(f => ({
        name: f.Name,
        path: `${node.path}/${f.Name}`,
        serverRelativeUrl: f.ServerRelativeUrl,
        children: [],
        expanded: false,
        library: node.library,
        hasChildren: f.ItemCount > 0
      }));
    } catch (error) {
      console.error(`Error loading children for ${node.name}:`, error);
      return [];
    }
  };

 
  //Load all files recursively from a folder and its subfolders
   
  private loadAllFilesRecursively = async (folderUrl: string, libraryName: string): Promise<IFileItem[]> => {
    const allFiles: IFileItem[] = [];

    const processFolder = async (currentFolderUrl: string): Promise<void> => {
      try {
        // Get files in current folder
        const files = await this.props.sp.web
          .getFolderByServerRelativePath(currentFolderUrl)
          .files
          .select("Name", "ServerRelativeUrl", "TimeLastModified", "Length")();

        // Add files to collection
        files.forEach(f => {
          const ext = f.Name.split('.').pop()?.toLowerCase() || '';
          allFiles.push({
            name: f.Name,
            serverRelativeUrl: f.ServerRelativeUrl,
            fileType: ext,
            modified: new Date(f.TimeLastModified),
            modifiedBy: '-',
            author: '-',
            size: Number(f.Length) || 0,
            library: libraryName,
            iconUrl: this.getFileIconUrl(ext)
          });
        });

        // Get subfolders
        const folders = await this.props.sp.web
          .getFolderByServerRelativePath(currentFolderUrl)
          .folders
          .select('Name', 'ServerRelativeUrl')();

        for (const folder of folders) {
          if (!folder.Name.startsWith('_') && folder.Name !== 'Forms') {
            await processFolder(folder.ServerRelativeUrl);
          }
        }
      } catch (error) {
        console.warn(`⚠️ Could not process folder: ${currentFolderUrl}`, error);
      }
    };

    await processFolder(folderUrl);
    return allFiles;
  };

  private loadFolderFiles = async (folderUrl: string, libraryName: string, recursive: boolean = false): Promise<void> => {
    this.setState({ loading: true, error: '' });

    try {
      console.log('Loading files from folder:', folderUrl, 'Recursive:', recursive);

      let fileItems: IFileItem[];

      if (recursive) {
        // Load all files recursively
        fileItems = await this.loadAllFilesRecursively(folderUrl, libraryName);
        console.log('Found', fileItems.length, 'files (including subfolders)');
      } else {
        // Get files only from current folder
        const files = await this.props.sp.web
          .getFolderByServerRelativePath(folderUrl)
          .files
          .select("Name", "ServerRelativeUrl", "TimeLastModified", "Length")();

        console.log('Found', files.length, 'files');

        // Transform to file items
        fileItems = files.map(f => {
          const ext = f.Name.split('.').pop()?.toLowerCase() || '';

          return {
            name: f.Name,
            serverRelativeUrl: f.ServerRelativeUrl,
            fileType: ext,
            modified: new Date(f.TimeLastModified),
            modifiedBy: '-',
            author: '-',
            size: Number(f.Length) || 0,
            library: libraryName,
            iconUrl: this.getFileIconUrl(ext)
          };
        });
      }

      if (fileItems.length === 0) {
        this.setState({
          files: [],
          filteredFiles: [],
          authors: [],
          fileTypes: [],
          loading: false,
          selectedFolder: folderUrl,
          error: ''
        });
        return;
      }

      const fileTypes = [...new Set(fileItems.map(f => f.fileType).filter(t => t))].sort();

      this.setState({
        files: fileItems,
        filteredFiles: fileItems,
        authors: [],
        fileTypes,
        loading: false,
        selectedFolder: folderUrl,
        error: ''
      }, () => this.applyFilters());

    } catch (error: unknown) {
      console.error('Error loading files:', error);
      const errorObj = error as { message?: string; data?: { responseBody?: { error?: { message?: { value?: string } } } } };
      const errorMessage = errorObj?.message || errorObj?.data?.responseBody?.error?.message?.value || '';
      
      let userMessage = 'Unable to load files from this folder.';
      if (errorMessage.includes('Access denied') || errorMessage.includes('403')) {
        userMessage = 'You do not have permission to access this folder. Please contact your administrator.';
      } else if (errorMessage) {
        userMessage = `Error: ${errorMessage}`;
      }

      this.setState({
        loading: false,
        error: userMessage,
        files: [],
        filteredFiles: []
      });
    }
  };

  private getFileIconUrl(fileExtension: string): string {
    const iconMap: { [key: string]: string } = {
      pdf: 'pdf', doc: 'docx', docx: 'docx', xls: 'xlsx', xlsx: 'xlsx',
      ppt: 'pptx', pptx: 'pptx', txt: 'txt', jpg: 'photo', jpeg: 'photo',
      png: 'photo', gif: 'photo', zip: 'zip', msg: 'email'
    };
    const iconName = iconMap[fileExtension] || 'genericfile';
    return `https://res-1.cdn.office.net/files/fabric/assets/item-types/16/${iconName}.svg`;
  }

  private handleFolderSelect = async (node: IFolderNode, isAllFiles: boolean = false): Promise<void> => {
    await this.loadFolderFiles(node.serverRelativeUrl, node.library, isAllFiles);
  };

  private handleFolderExpand = async (node: IFolderNode): Promise<IFolderNode[]> => {
    return await this.loadFolderChildren(node);
  };

  private handleSearch = (text: string): void => {
    this.setState({ searchText: text }, () => this.applyFilters());
  };

  private handleFilterChange = (filters: IFilters): void => {
    this.setState({ filters }, () => this.applyFilters());
  };

  private applyFilters(): void {
    const { files, searchText, filters } = this.state;
    let filtered = [...files];

    if (searchText) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (filters.fileType) filtered = filtered.filter(file => file.fileType === filters.fileType);
    if (filters.dateFrom) filtered = filtered.filter(file => file.modified >= filters.dateFrom!);
    if (filters.dateTo) filtered = filtered.filter(file => file.modified <= filters.dateTo!);

    this.setState({ filteredFiles: filtered });
  }

  public render(): React.ReactElement<IDocumentExplorerProps> {
    const { showFolderTree, showFileList, showFilterPanel, layoutType } = this.props;
    const { folderTree, filteredFiles, loading, error, filters, authors, fileTypes, libraries, selectedFolder } = this.state;

    const layoutClass = layoutType === 'stacked' ? styles.stackedLayout : styles.rowLayout;
    
    //Dynamic width calculation based on visible panels
    const visiblePanels = [showFolderTree, showFileList, showFilterPanel].filter(Boolean).length;
    
    let folderTreeWidth = '0%';
    let fileListWidth = '0%';
    let filterPanelWidth = '0%';
    
    if (visiblePanels === 3) {
      // All three visible: 20% + 60% + 20%
      folderTreeWidth = '20%';
      fileListWidth = '60%';
      filterPanelWidth = '20%';
    } else if (visiblePanels === 2) {
      // Two visible: 20% + 80% or 80% + 20%
      if (showFolderTree && showFileList) {
        folderTreeWidth = '20%';
        fileListWidth = '80%';
      } else if (showFolderTree && showFilterPanel) {
        folderTreeWidth = '20%';
        filterPanelWidth = '80%';
      } else if (showFileList && showFilterPanel) {
        fileListWidth = '80%';
        filterPanelWidth = '20%';
      }
    } else if (visiblePanels === 1) {
      // Only one visible: 100%
      if (showFolderTree) folderTreeWidth = '100%';
      if (showFileList) fileListWidth = '100%';
      if (showFilterPanel) filterPanelWidth = '100%';
    }

    const currentFolderPath = selectedFolder ? selectedFolder.split('/').filter(p => p).join(' > ') : 'No folder selected';

    return (
      <div className={styles.documentExplorer}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h2>Document Explorer</h2>
            {showFileList && (
              <SearchBox
                placeholder="Search files..."
                onSearch={this.handleSearch}
                onChange={(_, newValue) => this.handleSearch(newValue || '')}
                className={styles.searchBox}
              />
            )}
          </div>
          {selectedFolder && (
            <div className={styles.breadcrumb}>
              <Icon iconName="FolderHorizontal" className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbText}>{currentFolderPath}</span>
            </div>
          )}
        </div>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={true} onDismiss={() => this.setState({ error: '' })}>
            {error}
          </MessageBar>
        )}

        {libraries.some(lib => !lib.hasAccess) && (
          <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
            You do not have access to some libraries:
            <ul>
              {libraries.filter(lib => !lib.hasAccess).map(lib => (
                <li key={lib.serverRelativeUrl}>{lib.title}</li>
              ))}
            </ul>
            Please contact your administrator for access.
          </MessageBar>
        )}

        {loading && folderTree.length === 0 ? (
          <div className={styles.loadingContainer}>
            <Spinner size={SpinnerSize.large} label="Loading libraries..." />
          </div>
        ) : (
          <div className={`${styles.content} ${layoutClass}`}>
            {showFolderTree && (
              <div className={styles.column} style={{ width: folderTreeWidth }}>
                <FolderTreeView
                  folders={folderTree}
                  onFolderSelect={this.handleFolderSelect}
                  onFolderExpand={this.handleFolderExpand}
                />
              </div>
            )}

            {showFileList && (
              <div className={styles.column} style={{ width: fileListWidth }}>
                {loading && filteredFiles.length === 0 ? (
                  <div className={styles.loadingContainer}>
                    <Spinner size={SpinnerSize.medium} label="Loading files..." />
                  </div>
                ) : (
                  <FileListView files={filteredFiles} siteUrl={this.props.siteUrl} />
                )}
              </div>
            )}

            {showFilterPanel && (
              <div className={styles.column} style={{ width: filterPanelWidth }}>
                <FilterPanel
                  filters={filters}
                  authors={authors}
                  fileTypes={fileTypes}
                  onFilterChange={this.handleFilterChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}