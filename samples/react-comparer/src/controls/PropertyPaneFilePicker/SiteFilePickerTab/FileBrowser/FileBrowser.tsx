import * as React from 'react';

// Custom styles
import styles from './FileBrowser.module.scss';

// Custom properties and state
import { IFileBrowserProps, IFileBrowserState, IFile } from './FileBrowser.types';

// PnP library for navigating through libraries
import { sp } from "@pnp/sp";

// Office Fabric
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsRowProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';

// Localized strings
import * as strings from 'PropertyPaneFilePickerStrings';

// used to format date
import * as moment from 'moment';

/**
 * Renders list of file in a list.
 * I should have used the PnP ListView control, but I wanted specific behaviour that I didn't
 * get with the PnP control.
 */
export default class FileBrowser extends React.Component<IFileBrowserProps, IFileBrowserState> {
  private _selection: Selection;

  constructor(props: IFileBrowserProps) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Type',
        ariaLabel: strings.TypeAriaLabel,
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'docIcon',
        headerClassName: styles.iconColumnHeader,
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          const folderIcon: string = strings.FolderIconUrl;
          const iconUrl: string = strings.PhotoIconUrl;
          const altText: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.docIcon);
          return <div className={styles.fileTypeIcon}>
            <img src={item.isFolder ? folderIcon : iconUrl} className={styles.fileTypeIconIcon} alt={altText} title={altText} />
          </div>;
        }
      },
      {
        key: 'column2',
        name: strings.NameField,
        fieldName: 'fileLeafRef',
        minWidth: 210,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: strings.SortedAscending,
        sortDescendingAriaLabel: strings.SortedDescending,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IFile) => {
          if (item.isFolder) {
            return <span className={styles.folderItem} onClick={(_event) => this._handleOpenFolder(item)}>{item.fileLeafRef}</span>;
          } else {
            return <span className={styles.fileItem}>{item.fileLeafRef}</span>;
          }

        },
      },
      {
        key: 'column3',
        name: strings.ModifiedField,
        fieldName: 'dateModifiedValue',
        minWidth: 120,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IFile) => {
          const dateModified = moment(item.modified).format(strings.DateFormat);
          return <span>{dateModified}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: strings.ModifiedByField,
        fieldName: 'modifiedBy',
        minWidth: 120,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          // Find the user name
          const userName: string = this.state.users[item.modifiedBy];
          return <span>{userName}</span>;
        },
        isPadded: true
      },
      {
        key: 'column5',
        name: strings.FileSizeField,
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          return <span>{item.fileSize ? this._formatBytes(item.fileSize, 2) : undefined}</span>;
        }
      }
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {

      }
    });

    this.state = {
      columns: columns,
      items: [],
      isLoading: true,
      currentPath: this.props.rootPath,
      users: {}
    };
  }

  /**
   * Gets the list of files when settings change
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IFileBrowserProps, prevState: IFileBrowserState): void {

    if (prevState.currentPath !== prevState.currentPath) {
      this._getListItems();
    }
  }

  /**
   * Gets the list of files when tab first loads
   */
  public componentDidMount(): void {
    this._getListItems();
  }

  public render(): React.ReactElement<IFileBrowserProps> {
    if (this.state.isLoading) {
      return (<Spinner label={strings.Loading} />);
    }

    return (
      <div>
        <DetailsList
          items={this.state.items}
          compact={false}
          columns={this.state.columns}
          selectionMode={SelectionMode.single}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          onActiveItemChanged={(item: IFile, index: number, ev: React.FormEvent<Element>) => this._itemChangedHandler(item, index, ev)}
          enterModalSelectionOnTouch={true}
          onRenderRow={this._onRenderRow}
        />
      </div>
    );
  }

  private _onRenderRow = (props: IDetailsRowProps): JSX.Element => {
    const fileItem: IFile = props.item;

    return <DetailsRow {...props} className={fileItem.isFolder ? styles.folderRow : styles.fileRow} />;
  }

  /**
   * Gratuitous sorting
   */
  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { items } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    items = items!.concat([]).sort((a, b) => {
      const firstValue = a[column.fieldName || ''];
      const secondValue = b[column.fieldName || ''];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      items: items,
      columns: columns!.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  }

  /**
 * When a folder is opened, calls parent tab to navigate down
 */
  private _handleOpenFolder = (item: IFile) => {
    // De-select the list item that was clicked, the item in the same position
    // item in the folder will appear selected
    this.setState({
      fileUrl: undefined,
      currentPath: item.fileRef
    }, () => this._getListItems());
    this.props.onOpenFolder(item);
  }

  /**
   * When user selects an item, save selection
   */
  private _itemChangedHandler = (item: IFile, _index: number, _ev): void => {
    if (item.isFolder) {
      this.setState({
        fileUrl: undefined
      });
      return;
    }

    // Notify parent tab
    const absoluteFileUrl: string = item.absoluteRef;
    this.props.onChange(absoluteFileUrl);
    this.setState({
      fileUrl: absoluteFileUrl
    });
  }

  /**
   * Gets all files in a library with a matchihg path
   */
  private _getListItems() {
    this.setState({
      isLoading: true
    });

    let itemsAndUsers: [Promise<any[]>, Promise<any[]>] = [sp.web.lists.getByTitle(this.props.libraryName).items.select("DocIcon",
      "FileRef",
      "FileLeafRef",
      "Modified_x0020_By",
      "Modified",
      "File_x0020_Type",
      "FileSizeDisplay",
      "FileDirRef",
      "FSObjType")
      .filter(`FileDirRef eq '${this.state.currentPath}'`)
      .getAll(),
    sp.web.siteUsers.select("Title", "LoginName").get()];

    Promise.all(itemsAndUsers).then((results: any[]) => {
      const allItems: any = results[0];
      const allUsers: any = results[1];
      const fileItems: IFile[] = allItems.map(fileItem => {
        const file: IFile = {
          fileLeafRef: fileItem.FileLeafRef,
          docIcon: fileItem.DocIcon,
          fileRef: fileItem.FileRef,
          modified: fileItem.Modified,
          fileSize: fileItem.FileSizeDisplay,
          fileType: fileItem.File_x0020_Type,
          modifiedBy: fileItem.Modified_x0020_By,
          isFolder: fileItem.FSObjType === 1,
          absoluteRef: this._buildAbsoluteUrl(fileItem.FileRef)
        };
        return file;
      });

      let siteUsers: { [id: string]: string; } = {};
      allUsers.forEach(user => {
        siteUsers[user.LoginName] = user.Title;
      });

      // de-select anything that was previously selected
      this._selection.setAllSelected(false);
      this.setState({
        items: fileItems.filter(fileItem => this.props.accepts.indexOf(fileItem.docIcon) > -1 || fileItem.isFolder),
        users: siteUsers,
        isLoading: false
      });
    });

  }

  /**
   * Creates an absolute URL
   */
  private _buildAbsoluteUrl = (relativeUrl: string) => {
    const siteUrl: string = this._getAbsoluteDomainUrl(this.props.context.pageContext.web.absoluteUrl);
    return siteUrl + relativeUrl;
  }

  /**
   * Gets the current domain url
   */
  private _getAbsoluteDomainUrl = (url: string): string => {
    if (url !== undefined) {
      const myURL = new URL(url.toLowerCase());
      return myURL.protocol + "//" + myURL.host;
    } else {
      return undefined;
    }
  }

  /**
   * Formats a file size in the right unit
   */
  private _formatBytes(bytes, decimals) {
    if (bytes == 0) {
      return strings.EmptyFileSize;
    }

    const k: number = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + strings.SizeUnit[i];
  }
}
