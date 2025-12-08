import * as React from 'react';
import { 
  DetailsList, 
  DetailsListLayoutMode, 
  IColumn, 
  SelectionMode,
  Icon
} from '@fluentui/react';
import { IFileItem } from './IDocumentExplorerProps';
import styles from './DocumentExplorer.module.scss';

export interface IFileListViewProps {
  files: IFileItem[];
  siteUrl: string;
}

export interface IFileListViewState {
  columns: IColumn[];
  sortedFiles: IFileItem[];
}

export default class FileListView extends React.Component<IFileListViewProps, IFileListViewState> {
  
  constructor(props: IFileListViewProps) {
    super(props);
    
    const columns: IColumn[] = [
      {
        key: 'icon',
        name: '',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'iconUrl',
        minWidth: 20,
        maxWidth: 20,
        onRender: (item: IFileItem) => {
          return <img src={item.iconUrl} alt={item.fileType} style={{ width: 16, height: 16 }} />;
        }
      },
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 250,
        maxWidth: 500,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this.onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IFileItem) => {
          // Direct file URL - works for PDFs and all file types
          const directFileUrl = `${window.location.origin}${item.serverRelativeUrl}`;
          
          return (
            <a 
              href={directFileUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.fileLink}
              title={`Open ${item.name}`}
            >
              {item.name}
            </a>
          );
        }
      },
      {
        key: 'fileType',
        name: 'Type',
        fieldName: 'fileType',
        minWidth: 60,
        maxWidth: 80,
        isResizable: true,
        onColumnClick: this.onColumnClick,
        data: 'string'
      },
      {
        key: 'modified',
        name: 'Modified',
        fieldName: 'modified',
        minWidth: 150,
        maxWidth: 180,
        isResizable: true,
        isSorted: true,
        isSortedDescending: true,
        onColumnClick: this.onColumnClick,
        data: 'date',
        onRender: (item: IFileItem) => {
          return <span>{item.modified.toLocaleDateString()} {item.modified.toLocaleTimeString()}</span>;
        }
      },
      {
        key: 'size',
        name: 'Size',
        fieldName: 'size',
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        onColumnClick: this.onColumnClick,
        data: 'number',
        onRender: (item: IFileItem) => {
          return <span>{this.formatFileSize(item.size)}</span>;
        }
      }
    ];

    this.state = {
      columns,
      sortedFiles: this.sortFiles(props.files, 'modified', true)
    };
  }

  public componentDidUpdate(prevProps: IFileListViewProps): void {
    if (prevProps.files !== this.props.files) {
      const sortColumn = this.state.columns.find(col => col.isSorted);
      if (sortColumn) {
        const sorted = this.sortFiles(
          this.props.files, 
          sortColumn.fieldName!, 
          sortColumn.isSortedDescending ? true : false
        );
        this.setState({ sortedFiles: sorted });
      } else {
        this.setState({ sortedFiles: this.props.files });
      }
    }
  }

  private onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, sortedFiles } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    const newSortedFiles = this.sortFiles(
      sortedFiles, 
      currColumn.fieldName!, 
      currColumn.isSortedDescending ? true : false
    );

    this.setState({
      columns: newColumns,
      sortedFiles: newSortedFiles
    });
  };

  private sortFiles(files: IFileItem[], fieldName: string, descending: boolean): IFileItem[] {
    const sorted = [...files].sort((a, b) => {
      const aValue = a[fieldName as keyof IFileItem];
      const bValue = b[fieldName as keyof IFileItem];

      if (aValue instanceof Date && bValue instanceof Date) {
        return descending 
          ? bValue.getTime() - aValue.getTime() 
          : aValue.getTime() - bValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aLower = aValue.toLowerCase();
        const bLower = bValue.toLowerCase();
        
        if (descending) {
          return bLower.localeCompare(aLower);
        }
        return aLower.localeCompare(bLower);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return descending ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });

    return sorted;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  public render(): React.ReactElement<IFileListViewProps> {
    const { sortedFiles, columns } = this.state;

    return (
      <div className={styles.fileList}>
        <div className={styles.panelHeader}>
          <Icon iconName="Document" />
          <span>Files ({sortedFiles.length})</span>
        </div>
        <div className={styles.listContent}>
          {sortedFiles.length === 0 ? (
            <div className={styles.emptyState}>
              <Icon iconName="FolderOpen" style={{ fontSize: 48, color: '#0078d4', marginBottom: 16 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No files to display</div>
              <div style={{ fontSize: 14, color: '#605e5c' }}>
                Select a folder from the tree to view its files
              </div>
            </div>
          ) : (
            <DetailsList
              items={sortedFiles}
              columns={columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              checkboxVisibility={2}
            />
          )}
        </div>
      </div>
    );
  }
}