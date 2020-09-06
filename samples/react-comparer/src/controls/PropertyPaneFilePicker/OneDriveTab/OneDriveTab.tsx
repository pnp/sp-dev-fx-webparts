import * as React from 'react';

// Custom styles
import styles from './OneDriveTab.module.scss';

// Office Fabric
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List, IPageProps } from 'office-ui-fabric-react/lib/List';
import { css, IRenderFunction, IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsRowProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

// Used to read JSON string as JSON
import { unescape } from '@microsoft/sp-lodash-subset';

// Custom props and states
import { IOneDriveTabProps, IOneDriveTabState, IOneDriveFile, ViewType } from './OneDriveTab.types';

// Localized resources
import * as strings from 'PropertyPaneFilePickerStrings';

// Used to get OneDrive data
import { IGetListDataAsStreamResult, IRow, IParentFolderInfo } from '../../../services/OneDriveServices/IGetListDataAsStreamResult';
import { OneDriveServices, IDimensions } from '../../../services/OneDriveServices';

// Used to render custom tiles
import { FolderTile } from './FolderTile/FolderTile';
import { DocumentTile } from './DocumentTile/DocumentTile';
import { FormatBytes, GetAbsoluteDomainUrl } from '../../../CommonUtils';

/**
 * Rows per page
 */
const ROWS_PER_PAGE: number = 3;

/**
 * Maximum row height
 */
const MAX_ROW_HEIGHT: number = 250;

/**
 * Maximum number of cells per page
 */
const CELLS_PER_PAGE: number = 100;

/**
 * Standard tile margin
 */
const STANDARD_TILE_MARGIN: number = 4;

/**
 * Standard left and right padding
 */
const TILE_HORZ_PADDING: number = 32;

/**
 * Standard bottom margin
 */
const BOTTOM_MARGIN: number = 36;

const LAYOUT_STORAGE_KEY: string = 'comparerOneDriveLayout';
/**
 * This tab uses a different approach than the SiteFilePickerTab because,
 * unlike it, all requests are made to a separate site collection and separate domain.
 * Unfortuntely, we couldn't use the PnP libraries to make the API calls
 * and had to use RemoteWeb to allow retrieving content across domains.
 *
 */
export default class OneDriveTab extends React.Component<IOneDriveTabProps, IOneDriveTabState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;
  private _listElem: List = undefined;
  private _pageWidth: number;
  private _oneDriveService: OneDriveServices = undefined;


  constructor(props: IOneDriveTabProps) {
    super(props);

    // If possible, load the user's favourite layout
    const lastLayout: ViewType = localStorage ?
      localStorage.getItem(LAYOUT_STORAGE_KEY) as ViewType
      : 'tiles' as ViewType;

    // Set the columns we'll use for the list views
    const columns: IColumn[] = [
      {
        key: 'colIcon',
        name: 'Type',
        ariaLabel: strings.TypeAriaLabel,
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'docIcon',
        headerClassName: styles.iconColumnHeader,
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IOneDriveFile) => {
          // Get the icon
          const folderIcon: string = strings.FolderIconUrl;
          const iconUrl: string = strings.PhotoIconUrl;

          // Insert file type into localized string
          const altText: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);

          //TODO: This will have to change if we add support for non-image fiels
          return <div className={styles.fileTypeIcon}>
            <img src={item.isFolder ? folderIcon : iconUrl} className={styles.fileTypeIconIcon} alt={altText} title={altText} />
          </div>;
        }
      },
      {
        key: 'colName',
        name: strings.NameField,
        fieldName: 'fileLeafRef',
        minWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: strings.SortedAscending,
        sortDescendingAriaLabel: strings.SortedDescending,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IOneDriveFile) => {
          // If this is a folder, browse to that  folder
          if (item.isFolder) {
            return <span className={styles.folderItem} onClick={(_event) => this._handleOpenLibrary(item)}>{item.name}</span>;
          } else {
            // Just show the file name
            return <span className={styles.fileItem}>{item.name}</span>;
          }
        },
      },
      {
        key: 'colModified',
        name: strings.ODModifiedField,
        fieldName: 'modified',
        minWidth: 120,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IOneDriveFile) => {
          //aria-label="Modified column, March 9, 2017"
          const ariaLabel: string = strings.AriaCellValue.replace('{0}', strings.ODModifiedField).replace('{1}', item.modified);

          // Modified date already returns localized and formatted
          return <span aria-label={ariaLabel} >{item.modified}</span>;
        },
        isPadded: true
      },
      {
        key: 'colEditor',
        name: strings.ModifiedByField,
        fieldName: 'modifiedBy',
        minWidth: 100,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IOneDriveFile) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: 'colSize',
        name: strings.FileSizeField,
        fieldName: 'fileSizeDisplay',
        minWidth: 100,
        isResizable: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IOneDriveFile) => {
          // Format the size into a nice human-friendly format.
          return <span>{item.fileSizeDisplay ? FormatBytes(item.fileSizeDisplay, 1) : undefined}</span>;
        }
      },
      {
        key: 'colShared',
        name: strings.SharingField,
        fieldName: 'principalCount',
        minWidth: 100,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IOneDriveFile) => {
          // Can't find any references here, but I'm pretty sure that
          // if there are no other principals, nobody else is allowed to see it
          // but anything above zero means we shared with at least one person/group.

          const cellValue: string = item.isShared ? strings.SharingShared : strings.SharingPrivate;

          const ariaLabel: string = strings.AriaCellValue.replace('{0}', strings.SharingField).replace('{1}', cellValue);


          return <span aria-label={ariaLabel}>
            {item.isShared && <span>
              <Icon iconName="People" />
              <span>&nbsp;</span>
            </span>}
            {cellValue}
          </span>;
        }
      }
    ];

    this._selection = new Selection(
      {
        selectionMode: SelectionMode.single,
        onSelectionChanged: () => {
          // Get the selected item
          const selectedItems = this._selection.getSelection();

          if (selectedItems && selectedItems.length > 0) {
            const selectedKey: IOneDriveFile = selectedItems[0] as IOneDriveFile;
            if (!selectedKey.isFolder) {
              // Save the selected file
              this.setState({
                fileUrl: selectedKey.absoluteUrl
              });
            }
          } else {
            // Remove any selected file
            this.setState({
              fileUrl: undefined
            });
          }
          if (this._listElem) {
            // Force the list to update to show the selection check
            this._listElem.forceUpdate();
          }
        }
      });

    this.state = {
      isLoading: true,
      files: [],
      hideDialog: true,
      parentFolderInfo: [],
      selectedView: lastLayout,
      columns: columns
    };
  }

  /**
   * Gets the OneDrive files
   */
  public componentDidMount(): void {
    // Initialize the OneDrive services
    this._oneDriveService = new OneDriveServices(this.props.context, this.props.accepts);

    // Get the items at the root of the OneDrive folder
    this._getListItems();
  }

  /**
   * Handle if we change the relative folder we're browsing
   */
  public componentDidUpdate(_prevProps: IOneDriveTabProps, prevState: IOneDriveTabState): void {
    // Update the list of items if the folder changes
    if (prevState.serverRelativeFolderUrl !== this.state.serverRelativeFolderUrl) {
      this._getListItems();
    }
  }

  /**
   * Gets the list of items to display
   */
  private _getListItems = (): Promise<void> => {
    // We're loading!
    this.setState({
      isLoading: true
    });

    return this._oneDriveService.GetListDataAsStream(this.state.serverRelativeFolderUrl).then((listDataStream: IGetListDataAsStreamResult) => {

      // Get the thumbnail URL template -- stored in the list schema
      const thumbnailUrlTemplate: string = listDataStream.ListSchema[".thumbnailUrl"]
        .replace("{.mediaBaseUrl}", listDataStream.ListSchema[".mediaBaseUrl"])
        .replace("{.callerStack}", listDataStream.ListSchema[".callerStack"])
        .replace("{.driveAccessToken}", "encodeFailures=1&ctag={.ctag}");

      // Map every item to a OneDrive file
      const files: IOneDriveFile[] = listDataStream.ListData.Row.map((item: IRow) => {
        // Build the thumbnail URL from the template
        // The template is stored in the schema (see above) and contains list-specific
        // replacement tokens (which we already replaced above) and item-specific
        // tokens, which we're replacing right. now.
        const thumbnail: string = thumbnailUrlTemplate
          .replace('{.spItemUrl}', item[".spItemUrl"])
          .replace('{.ctag}', encodeURIComponent(item[".ctag"]))
          .replace('{.fileType}', item[".fileType"]);

        // Get the modified date
        const modifiedParts: string[] = item["Modified.FriendlyDisplay"]!.split('|');
        let modified: string = item.Modified;

        // If there is a friendly modified date, use that
        // The friendly dates seem to be a lot smarter than what I have here.
        // For example, it seems to use a different structure for dates that are on the same
        // day, within a few days, etc.
        // For this example, we just handle the regular friendly-dates, but if we
        // turn this into a PnP control, we'll want to handle all sorts of friendly dates
        if (modifiedParts.length === 2) {
          modified = modifiedParts[1];
        }

        // Parse media metadata to see if we can get known dimensions
        // Dimensions are stored as HTML-encoded JSON from media services.
        // If it is available, get the JSON structure and parse it.
        const media: any = item.MediaServiceFastMetadata && JSON.parse(unescape(item.MediaServiceFastMetadata));
        const dimensions: IDimensions = media && media.photo && {
          width: media.photo.width,
          height: media.photo.height
        };

        // Create a nice OneDriveFile interface so we're not saving all that extra metadata that
        // gets returned from SharePoint in our state.
        const file: IOneDriveFile = {
          key: item.UniqueId,
          name: item.FileLeafRef,
          absoluteUrl: this._buildOneDriveAbsoluteUrl(listDataStream.HttpRoot, item.FileRef),
          serverRelativeUrl: item.FileRef,
          isFolder: item.FSObjType === "1",
          modified: modified,
          modifiedBy: item.Editor[0].title,
          fileType: item.File_x0020_Type,
          fileIcon: item["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"],
          fileSizeDisplay: item.FileSizeDisplay,
          totalFileCount: +item.SMTotalFileCount, // quickly converts string to number
          thumbnail: thumbnail,
          dimensions: dimensions,
          isShared: parseInt(item.PrincipalCount) > 0
        };
        return file;
      });

      // Set the selection items so that we know what item we're selecting
      this._selection.setItems(files);

      // Store the files and stop the loading icon
      this.setState({
        files: files,
        isLoading: false, // we're done loading
        parentFolderInfo: listDataStream.ParentInfo.ParentFolderInfo // remember where we are
      });
    });
  }

  /**
   * Renders the tab
   */
  public render(): React.ReactElement<IOneDriveTabProps> {
    const {
      isLoading,
      files,
      selectedView,
      fileUrl } = this.state;

    return (
      <div className={css(styles.tabContainer)}>
        <div className={styles.tabHeaderContainer}>
          {this._onRenderHeader()}
          {this._onRenderCommandBar()}
        </div>
        <div className={styles.tab}>
          {isLoading && <Spinner label={strings.Loading} />}
          {!isLoading && files!.length > 0 &&
            selectedView !== 'tiles' && this._renderListLayout()}
          {!isLoading && files!.length > 0 &&
            selectedView === 'tiles' && this._renderTileLayout()}

          {!isLoading && files!.length < 1 &&
            this._renderEmptyFolder()
          }
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!fileUrl}
              onClick={() => this._handleSaveConfirm()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
        {this._onRenderConfirmDialog()}
      </div>
    );
  }

  /**
   * Gratuitous sorting
   */
  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { files } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    files = files!.concat([]).sort((a, b) => {
      const firstValue = a[column.fieldName || ''];
      const secondValue = b[column.fieldName || ''];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this._selection.setItems(files);
    this.setState({
      files: files,
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
   * Renders a tile
   */
  private _renderTileLayout = (): JSX.Element => {
    const { files } = this.state;

    return (<SelectionZone selection={this._selection}
      onItemInvoked={(item: IOneDriveFile) => this._handleItemInvoked(item)}
    >
      <FocusZone>
        <List
          ref={this._linkList}
          className={styles.folderList}
          items={files}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderPage={(pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) => this._onRenderPage(pageProps, defaultRender)}
        />
      </FocusZone>
    </SelectionZone>);
  }

  /**
   * Renders a list or a compact list
   */
  private _renderListLayout = (): JSX.Element => {
    const { files, selectedView, columns } = this.state;
    return (
      <DetailsList
        items={files}
        compact={selectedView === 'compact'}
        columns={columns}
        selectionMode={SelectionMode.single}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        selection={this._selection}
        selectionPreservedOnEmptyClick={true}
        onActiveItemChanged={(item: IOneDriveFile, index: number, ev: React.FormEvent<Element>) => this._itemChangedHandler(item, index, ev)}
        enterModalSelectionOnTouch={true}
        onRenderRow={this._onRenderRow}
      />
    );
  }

  /**
   * Renders a row in a detailed list
   */
  private _onRenderRow = (props: IDetailsRowProps): JSX.Element => {
    const fileItem: IOneDriveFile = props.item;

    return <DetailsRow
      getRowAriaLabel={(item: IOneDriveFile) => this._getRowAriaLabel(item)}
      {...props}
      className={fileItem.isFolder ?
        styles.folderRow
        : styles.fileRow} />;
  }

  /**
   * Gets called on every row to provide an ARIA label describing the data in the row.
   */
  private _getRowAriaLabel = (item: IOneDriveFile): string => {
    //Attachments, Folder, Modified March 9, 2017, edited by Hugo Bernier, 0 items, Private
    //me.png, .png Image, Modified December 12, 2017, edited by Hugo Bernier, 86.5 KB, Shared
    //"{0}, {1}, Modified {2}, edited by {3}, {4}, {5}"

    const fileType: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);
    const sharingValue: string = item.isShared ? strings.SharingShared : strings.SharingPrivate;

    const ariaLabel: string = strings.ODRowArialLabelTemplate.replace('{0}', item.name)
      .replace('{1}', fileType)
      .replace('{2}', item.modified)
      .replace('{3}', item.modifiedBy)
      .replace('{4}', item.fileSizeDisplay)
      .replace('{5}', sharingValue);
    return ariaLabel;
  }

  /**
   * Renders the command bar above the list/grid
   */
  private _onRenderCommandBar = (): JSX.Element => {
    return (<div className={styles.itemPickerTopBar}>
      <CommandBar
        items={this._getToolbarItems()}
        farItems={this.getFarItems()}
      />
    </div>);
  }

  /**
   * Display an annoying pop-up saying you should make sure
   * that you shared this file otherwise people won't see it
   */
  private _onRenderConfirmDialog = (): JSX.Element => {
    return (<Dialog
      hidden={this.state.hideDialog}
      dialogContentProps={{
        type: DialogType.normal,
        title: strings.OneDriveConfirmDialogTitle,
        subText: strings.OneDriveConfirmDialogBody
      }}
      modalProps={{
        isBlocking: true,
        containerClassName: styles.dialogMainOverride
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={(_ev) => this._handleSave()} text={strings.Yes} />
        <DefaultButton onClick={(_ev) => this._handleClose()} text={strings.No} />
      </DialogFooter>
    </Dialog>);
  }

  /**
   * Render a heading or a breadcrumb (depending on how many levels deep we're in)
   */
  private _onRenderHeader = (): JSX.Element => {
    const { parentFolderInfo } = this.state;

    // If we don't have parent info, or we're only 2 levels deep, don't render breadcrumbs.
    // just render a heading.
    // also, render a header until we're fully loaded, otherwise the breadcrumb starts
    // flickering.
    if (parentFolderInfo === undefined || parentFolderInfo.length < 2 || this.state.isLoading) {
      return (<h2 className={styles.tabHeader}>{this.state.folderName ? this.state.folderName : strings.OneDriveRootFolderName}</h2>);
    }

    // Get the breadcrumb path
    const breadCrumbItems: IBreadcrumbItem[] = [];

    // Parent info comes in reversed, so reverse it to render the breadcrumbs in the right order
    parentFolderInfo.reverse().forEach((parentFolder: IParentFolderInfo, index: number) => {
      // Anything after the first level is a link
      if (index > 1) {
        const folderName: string = this._getFolderName(parentFolder.ServerRelativeUrl);

        breadCrumbItems.push({
          text: folderName,
          key: folderName,
          onClick: () => this._handleOpenLibraryByPath(parentFolder.ServerRelativeUrl, folderName)
        });
      } else if (index === 1) {
        // First level is always a link to the OneDrive root
        breadCrumbItems.push({
          text: strings.OneDriveRootFolderName,
          key: strings.OneDriveRootFolderName,
          onClick: () => this._handleOpenLibraryByPath(parentFolder.ServerRelativeUrl, strings.OneDriveRootFolderName)
        });
      }
    });

    // List breadcrumb node is the current folder
    breadCrumbItems.push({ text: this.state.folderName, key: this.state.folderName, isCurrentItem: true });

    return <Breadcrumb
      className={styles.standaloneListBreadcrumb}
      items={breadCrumbItems}
    />;
  }

  /**
   * Renders a custom list page
   */
  private _onRenderPage = (pageProps: IPageProps, _defaultRender?: IRenderFunction<IPageProps>): JSX.Element => {
    const {
      page,
      className: pageClassName,
      ...divProps
    } = pageProps;

    const { items } = page;

    return <div {...divProps} className={css(pageClassName, styles.listPage)}>
      <div className={styles.grid}
        style={{
          width: this._pageWidth,
          marginTop: -STANDARD_TILE_MARGIN,
          marginBottom: BOTTOM_MARGIN,
          marginLeft: -STANDARD_TILE_MARGIN,
          marginRight: -STANDARD_TILE_MARGIN
        }}
      >
        {items.map((item: IOneDriveFile, index: number) => {
          return this._onRenderCell(item, index);
        })}
      </div>
    </div>;
  }

  /**
   * Renders a placeholder to indicate that the folder is empty
   */
  private _renderEmptyFolder = (): JSX.Element => {
    return (<div className={styles.emptyFolder}>
      <div className={styles.emptyFolderImage}>
        <img
          className={styles.emptyFolderImageTag}
          src={strings.OneDriveEmptyFolderIconUrl}
          alt={strings.OneDriveEmptyFolderAlt} />
      </div>
      <div role="alert">
        <div className={styles.emptyFolderTitle}>
          {strings.OneDriveEmptyFolderTitle}
        </div>
        <div className={styles.emptyFolderSubText}>
          <span className={styles.emptyFolderPc}>
            {strings.OneDriveEmptyFolderDescription}
          </span>
          {/* Removed until we add support to upload */}
          {/* <span className={styles.emptyFolderMobile}>
            Tap <Icon iconName="Add" className={styles.emptyFolderIcon} /> to add files here.
        </span> */}
        </div>
      </div>
    </div>);
  }


  /**
   * Get the list of toolbar items on the left side of the toolbar.
   * We leave it empty for now, but we may add the ability to upload later.
   */
  private _getToolbarItems = (): ICommandBarItemProps[] => {
    return [
      // This space for rent
    ];
  }

  private getFarItems = (): ICommandBarItemProps[] => {
    const { selectedView } = this.state;

    let viewIconName: string = undefined;
    let viewName: string = undefined;
    switch (this.state.selectedView) {
      case 'list':
        viewIconName = 'List';
        viewName = strings.ListLayoutList;
        break;
      case 'compact':
        viewIconName = 'AlignLeft';
        viewName = strings.ListLayoutCompact;
        break;
      default:
        viewIconName = 'GridViewMedium';
        viewName = strings.ListLayoutTile;
    }

    const farItems: ICommandBarItemProps[] = [
      {
        key: 'listOptions',
        className: styles.commandBarNoChevron,
        title: strings.ListOptionsTitle,
        ariaLabel: strings.ListOptionsAlt.replace('{0}', viewName),
        iconProps: {
          iconName: viewIconName
        },
        iconOnly: true,
        subMenuProps: {
          items: [
            {
              key: 'list',
              name: strings.ListLayoutList,
              iconProps: {
                iconName: 'List'
              },
              canCheck: true,
              checked: this.state.selectedView === 'list',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutList).replace('{1}', selectedView === 'list' ? strings.Selected : undefined),
              title: strings.ListLayoutListDescrition,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            },
            {
              key: 'compact',
              name: strings.ListLayoutCompact,
              iconProps: {
                iconName: 'AlignLeft'
              },
              canCheck: true,
              checked: this.state.selectedView === 'compact',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutCompact).replace('{1}', selectedView === 'compact' ? strings.Selected : undefined),
              title: strings.ListLayoutCompactDescription,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            },
            {
              key: 'tiles',
              name: 'Tiles',
              iconProps: {
                iconName: 'GridViewMedium'
              },
              canCheck: true,
              checked: this.state.selectedView === 'tiles',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutTile).replace('{1}', selectedView === 'tiles' ? strings.Selected : undefined),
              title: strings.ListLayoutTileDescription,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            }
          ]
        }
      }
    ];
    return farItems;
  }

  /**
   * Called when users switch the view
   */
  private _handleSwitchLayout = (item?: IContextualMenuItem) => {
    if (item) {
      // Store the user's favourite layout
      if (localStorage) {
        localStorage.setItem(LAYOUT_STORAGE_KEY, item.key);
      }

      this.setState({
        selectedView: item.key as ViewType
      });
    }
  }

  /**
  * Gets called what a file is selected.
  */
  private _handleItemInvoked = (item: IOneDriveFile) => {
    // If a file is selected, open the library
    if (item.isFolder) {
      this._handleOpenLibrary(item);
    } else {
      // Otherwise, remember it was selected
      this._selection.setKeySelected(item.key, true, true);
    }
  }

  /**
  * When user selects an item, save selection
  */
  private _itemChangedHandler = (item: IOneDriveFile, _index: number, _ev): void => {
    // When we highlight a folder, do nothing (except set the selection to blank)
    if (item.isFolder) {
      this.setState({
        fileUrl: undefined
      });
      return;
    }

    // set the item selected
    this._selection.setKeySelected(item.key, true, true);
  }

  /**
    * Calculates how many items there should be in the page
    */
  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
      this._pageWidth = surfaceRect.width;
    }

    // Get the list of items
    const { files } = this.state;
    const isFolder: boolean = files[itemIndex].isFolder;

    // Group items by folders and files
    let pageLength: number = 0;
    for (let index = itemIndex; index < files.length; index++) {
      const element = files[index];
      if (element.isFolder === isFolder) {
        pageLength++;
      } else {
        break;
      }
    }

    // Return the page lenght, up to the maximum number of cells per page
    return Math.min(pageLength, CELLS_PER_PAGE);
  }

  /** Calculates the list "page" height (a.k.a. row) */
  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  /**
   * Renders a file folder cover
   */
  private _onRenderCell = (item: IOneDriveFile, index: number | undefined): JSX.Element => {
    let isSelected: boolean = false;

    if (this._selection && index !== undefined) {
      isSelected = this._selection.isIndexSelected(index);
    }

    // I know this is a lot of divs and spans inside of each other, but my
    // goal was to mimic the HTML and style of the out-of-the-box file picker
    // to the best of my ability.
    return (
      <div
        className={styles.listCell}
        data-item-index={index}
        style={{
          flexBasis: this._columnWidth,
          maxWidth: this._columnWidth,
          margin: STANDARD_TILE_MARGIN,
          borderStyle: "none",
          borderWidth: 0
        }}
      >
        <div
          role="presentation"
          className={styles.cell}

          // I don't agree with this magic number. Where does this come from?
          style={{ paddingTop: "97.16%" }}
        >
          <div role="presentation" className={styles.cellContent}>
            {item.isFolder ? <FolderTile
              item={item}
              index={index}
              isSelected={isSelected}
              pageWidth={this._pageWidth}
              tileDimensions={{
                width: this._columnWidth - TILE_HORZ_PADDING,
                height: this._rowHeight - TILE_HORZ_PADDING
              }}
              onItemInvoked={(itemInvoked: IOneDriveFile) => this._handleItemInvoked(itemInvoked)}
            />
              : <DocumentTile
                item={item}
                index={index}
                isSelected={isSelected}
                pageWidth={this._pageWidth}
                tileDimensions={{
                  width: this._columnWidth - TILE_HORZ_PADDING,
                  height: this._rowHeight - TILE_HORZ_PADDING
                }}
                onItemInvoked={(itemInvoked: IOneDriveFile) => this._handleItemInvoked(itemInvoked)}
              />}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Creates an absolute URL
   */
  private _buildOneDriveAbsoluteUrl = (root: string, relativeUrl: string) => {
    const siteUrl: string = GetAbsoluteDomainUrl(root);
    return siteUrl + relativeUrl;
  }

  /**
   * Calls parent when library is opened
   */
  private _handleOpenLibrary = (library: IOneDriveFile) => {
    this.setState({
      serverRelativeFolderUrl: library.serverRelativeUrl,
      folderName: library.name
    });
  }

  /**
   * Gets called when someone clicks on a breadcrumb
   * In this case, we only have the path to work with, not the full
   * reference to the OneDrive file
   */
  private _handleOpenLibraryByPath = (serverRelativeUrl: string, libraryName: string) => {
    this.setState({
      serverRelativeFolderUrl: serverRelativeUrl,
      folderName: libraryName
    });
  }

  /**
   * Prompt user with dialog before they can save
   */
  private _handleSaveConfirm = () => {
    this.setState({
      hideDialog: false
    });
  }

  /**
   * Called when user saves
   */
  private _handleSave = () => {
    this.props.onSave(encodeURI(this.state.fileUrl));
  }

  /**
   * Called when user closes tab
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
 * Creates a ref to the list
 */
  private _linkList = (e: any) => {
    this._listElem = e;
  }

  /**
   * Extracts the last part of the path to get the folder name
   */
  private _getFolderName = (folderPath: string): string => {
    // break the folder path into its sub-folders
    const pathSegments: string[] = folderPath.split('/');
    return pathSegments.pop();
  }
}
