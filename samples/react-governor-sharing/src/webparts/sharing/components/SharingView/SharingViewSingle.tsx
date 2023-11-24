import {
  DialogType,
  Facepile,
  IColumn,
  Icon,
  Label,
  Link,
  OverflowButtonType,
  Persona,
  PersonaSize,
  Selection,
  SelectionMode,
  ShimmeredDetailsList,
  Text,
  ThemeProvider,
  TooltipHost
} from '@fluentui/react';
import { FileIconType, getFileTypeIconProps } from '@fluentui/react-file-type-icons';
import { EnhancedThemeProvider } from "@pnp/spfx-controls-react/lib/EnhancedThemeProvider";
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { Toolbar } from '@pnp/spfx-controls-react/lib/Toolbar';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import * as moment from 'moment';
import * as React from 'react';
import { ISharingResult } from "./ISharingResult";
import { ISharingViewProps } from './ISharingViewProps';
import ISharingViewState from './ISharingViewState';
import { genericSort, textSort } from './Utils';

export default class SharingViewSingle extends React.Component<ISharingViewProps, ISharingViewState> {
  private columns: IColumn[];
  private selection: Selection;
  private siteUrl: string;
  private fileIds: string[];
  private files: ISharingResult[];

  constructor(props: ISharingViewProps) {
    super(props);

    // setting the URL of where the web part is running, either in Teams using the TeamsContext or using SPO using the webpartcontext
    this.siteUrl = (this.props.isTeams) ? this.props.context.sdks.microsoftTeams.context.teamSiteUrl : this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;
    this.selection = new Selection({});

    this.state = {
      // initialization of the arrys holding the documents
      files: [],
      fileIds: [],
      searchItems: [],
      groups: [],
      // initialization of the pagination - need to do this for each detailsList
      currentPage: 1,
      totalPages: 1,
      pageLimit: this.props.pageLimit,
      // initialization of the selected document
      selectedDocument: { FileExtension: "", FileName: "", LastModified: null, SharedWith: null, ListId: "", ListItemId: 0, Url: "", FolderUrl: "", SiteUrl: "", Channel: "", SharingUserType: "" },
      // initialization of the dialog
      isOpen: false,
      hideSharingSettingsDialog: true,
      frameUrlSharingSettings: "",
      loadingComplete: false,
      statusMessage: ""
    };

    const overflowButtonProps = {
      ariaLabel: 'More users'
    };

    this.columns = [
      {
        key: 'SharingUserType',
        name: 'SharingUserType',
        fieldName: 'SharingUserType',
        minWidth: 16,
        maxWidth: 16,
        isIconOnly: true,
        isResizable: false,
        onColumnClick: this._onColumnClick,
      },
      {
        key: 'FileExtension',
        name: 'FileExtension',
        fieldName: 'FileExtension',
        minWidth: 16,
        maxWidth: 16,
        isIconOnly: true,
        isResizable: false,
        onColumnClick: this._onColumnClick,
      },
      {
        key: 'FileName',
        name: 'Filename',
        fieldName: 'FileName',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        //isSorted: true,
        isSortedDescending: false,
        isRowHeader: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        onColumnClick: this._onColumnClick,
      },
      {
        key: 'SharedWith',
        name: 'Shared with',
        fieldName: 'SharedWith',
        minWidth: 150,
        maxWidth: 185,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        onRender: (item: ISharingResult) => {
          if (item.SharedWith === null)
            return <span />;
          if (item.SharedWith.length > 1) {
            return <Facepile
              personaSize={PersonaSize.size24}
              maxDisplayablePersonas={5}
              personas={item.SharedWith}
              overflowButtonType={OverflowButtonType.descriptive}
              overflowButtonProps={overflowButtonProps}
              ariaDescription="List of people who has been shared with."
              ariaLabel="List of people who has been shared with."
            />
          }
          else {
            switch (item.SharingUserType) {
              case "Link": return <Persona text={`${item.SharedWith[0].personaName}`} hidePersonaDetails={true} size={PersonaSize.size24} />; break;
              default:
                return <Persona text={`${item.SharedWith[0].personaName}`} hidePersonaDetails={true} size={PersonaSize.size24} />; break;
            }
          }
        },
      },
      {
        key: 'Channel',
        name: 'Channel / Folder',
        fieldName: 'Channel',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
      },
      {
        key: 'LastModified',
        name: 'Last modified',
        fieldName: 'LastModified',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isPadded: true,
        data: 'date',
        onColumnClick: this._onColumnClick,
      },
    ];
  }

  private _renderItemColumn(item: ISharingResult, index: number, column: IColumn): any {
    const fieldContent = item[column.fieldName as keyof ISharingResult] as string;

    // in here we're going to make the column render differently based on the column name
    switch (column.key) {
      case 'FileExtension':
        switch (item.FileExtension) {
          case "folder": return <Icon {...getFileTypeIconProps({ type: FileIconType.documentsFolder, size: 16, imageFileType: 'png' })} />; break;
          default: return <Icon {...getFileTypeIconProps({ extension: `${item.FileExtension}`, size: 16, imageFileType: 'png' })} />; break;
        }
      case 'SharingUserType':
        switch (item.SharingUserType) {
          case "Guest": return <TooltipHost content="Shared with guest/external users" id="guestTip">
            <Icon aria-label="SecurityGroup" aria-describedby="guestTip" iconName="SecurityGroup" id="Guest" />
          </TooltipHost>;break;
          case "Everyone": return <TooltipHost content="Shared with everyone" id="everyoneTip">
            <Icon aria-label="Family" aria-describedby="everyoneTip" iconName="Family" id="Family" />
          </TooltipHost>;break;
          case "Member": return <span />;
          case "Link": return <TooltipHost content="Shared with organization" id="everyoneTip">
            <Icon aria-label="Family" aria-describedby="everyoneTip" iconName="Family" id="Family" />
          </TooltipHost>;break;
          case "Inherited": return <TooltipHost content="Shared by inheritance" id="inheritedTip">
            <Icon aria-label="PartyLeader" aria-describedby="inheritedTip" iconName="PartyLeader" id="PartyLeader" />
          </TooltipHost>;break;
        }
        break;
      case 'LastModified':
        return <span>{moment(item.LastModified).format('LL')}</span>;break;
      case 'FileName':
        return <span><Text><Link href={`${item.Url}`}>{`${item.FileName}`}</Link></Text></span>;break;
      case 'Channel':
        return <span><Text><Link href={`${item.FolderUrl}`}>{`${item.Channel}`}</Link></Text></span>;break;
      default:
        return <span>{fieldContent}</span>;break;
    }
  }

  // Gets the Selection Details
  private loadSharingDialogDetails(): void {
    const item = this.selection.getSelection()[0] as ISharingResult;
    const url = `${item.SiteUrl}/_layouts/15/sharedialog.aspx?listId=${item.ListId}&listItemId=${item.ListItemId}&clientId=sharePoint&mode=manageAccess&ma=0`;

    this.setState(
      {
        frameUrlSharingSettings: url,
        selectedDocument: item,
        hideSharingSettingsDialog: false
      });
  }

  // Handle Item Invoked - Item Invoked is when user selects a row
  // and presses the ENTER key
  private _handleItemInvoked = (item: ISharingResult): void => {
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = this.columns.slice();
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

    if (currColumn.data === 'string')
      this.setState({ files: textSort(this.state.files, currColumn.fieldName!, currColumn.isSortedDescending) });
    else
      this.setState({ files: genericSort(this.state.files, currColumn.fieldName!, currColumn.isSortedDescending) });
  }

  private _onSelectedFiltersChange = (selectedFilters: string[]): void => {
    this.setState({ selectedFilter: selectedFilters[0] });
    // we only have 1 filter, so no need to actually see what we're filtering on, 
    // it's either showing only guests/external users or all users
    this.setState({ files: (selectedFilters.length > 0) ? this.state.files.filter(i => i.SharingUserType == "Guest") : this.files });
  }

  private _findItem = (findQuery: string): string => {
    this.setState({ files: findQuery ? this.files.filter(i => i.FileName.toLowerCase().indexOf(findQuery.toLowerCase()) > -1) : this.files });
    return findQuery;
  };

  // needs to be here for the iframe to be rendered that holds the manage access page
  private _onIframeLoaded() { }

  private _onDialogDismiss() {
    this.setState(
      {
        hideSharingSettingsDialog: true
      });
  }


  private async _processSharingLinks(fileIds: string[]): Promise<ISharingResult[]> {
    // setting these to be empty because of the pagination, 
    // otherwise in the pagination items will be added to the existing array
    const sharingLinks: ISharingResult[] = [];

    const paginatedListItems: Record<string, any> = {};
    fileIds.forEach((fileId) => {
      paginatedListItems[fileId] = this.state.searchItems[fileId];
    });


    // getting the sharing links using expensive REST API calls based on the given list of Id's 
    const sharedLinkResults = await this.props.dataProvider.getSharingLinks(paginatedListItems);
    if (sharedLinkResults === null)
      return;

    sharedLinkResults.forEach((sharedResult) => {
      if (sharedResult.SharedWith === null)
        return;

      sharingLinks.push(sharedResult)
    });

    return (sharingLinks);
  }

  private async loadPage(page: number): Promise<void> {
    // to inform the user we're getting items, we set the loadingComplete to false to enable the 'shimmer' effect
    this.setState({ loadingComplete: false });

    // get the first and last index of the items to be displayed on the page
    const lastIndex = page * this.state.pageLimit;
    const firstIndex = lastIndex - this.state.pageLimit;

    // get the items to be displayed on the page
    const paginatedItems = this.fileIds.slice(firstIndex, lastIndex);
    this.setState({ currentPage: page });

    // if there are no items to be displayed, we're done
    if (paginatedItems.length == 0) {
      this.setState({ loadingComplete: true, statusMessage: "No items to display" });
      return;
    }
    else {
      this.setState({ statusMessage: `${this.fileIds.length} shared items found` });
    }
    // get the sharing links for the items on the page
    this.files = await this._processSharingLinks(paginatedItems);
    this.setState({ files: this.files });

    // if the filter is set already, enable it again for the next paged result set
    if (this.state.selectedFilter !== undefined) {
      this.setState({ files: this.files.filter(i => i.SharingUserType === "Guest") });
    }
    else {
      this.setState({ files: this.files });
    }
    this.setState({ loadingComplete: true });
  }

  public componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      // get the default group titles, this is used to later determine if documents have inherited permissions
      await this.props.dataProvider.loadAssociatedGroups();

      // this will hold all the shared documents based on the search query
      const searchItems: Record<string, any> = await this.props.dataProvider.getSearchResults();
      this.fileIds = Object.keys(searchItems);

      this.setState({
        searchItems: searchItems,
        fileIds: this.fileIds,
        totalPages: Math.ceil(this.fileIds.length / this.state.pageLimit),
      });

      await this.loadPage(this.state.currentPage);
    })();
  }

  public render(): React.ReactElement<ISharingViewProps> {
    const { currentPage, totalPages, files, loadingComplete, statusMessage } = this.state;

    return (
      <ThemeProvider>
        <EnhancedThemeProvider context={this.props.context}>
          <Toolbar actionGroups={{
            'share': {
              'share': {
                title: 'Sharing Settings',
                iconName: 'Share',
                onClick: () => this.loadSharingDialogDetails()
              }
            }
          }}
            filters={[
              {
                id: "f1",
                title: "Guest/External Users",
              }]}
            onSelectedFiltersChange={this._onSelectedFiltersChange.bind(this)}
            find={true}
            onFindQueryChange={this._findItem}
          />
          <IFrameDialog
            url={this.state.frameUrlSharingSettings}
            iframeOnLoad={this._onIframeLoaded.bind(this)}
            hidden={this.state.hideSharingSettingsDialog}
            onDismiss={this._onDialogDismiss.bind(this)}
            modalProps={{
              isBlocking: false
            }}
            dialogContentProps={{
              type: DialogType.close,
              showCloseButton: false
            }}
            width={'570px'}
            height={'815px'}
          />
          <Label>{statusMessage}</Label>
          <ShimmeredDetailsList

            usePageCache={true}
            columns={this.columns}
            enableShimmer={(!loadingComplete)}
            items={files}
            selection={this.selection}
            onItemInvoked={this._handleItemInvoked}
            selectionMode={SelectionMode.single}
            onRenderItemColumn={this._renderItemColumn}
          />
          <Pagination
            key="files"
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(page) => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              this.loadPage(page);
            }}
            limiter={3} // Optional - default value 3
            hideFirstPageJump // Optional
            hideLastPageJump // Optional
            limiterIcon={"Emoji12"} // Optional
          />
        </EnhancedThemeProvider>
      </ThemeProvider>
    );
  }
}