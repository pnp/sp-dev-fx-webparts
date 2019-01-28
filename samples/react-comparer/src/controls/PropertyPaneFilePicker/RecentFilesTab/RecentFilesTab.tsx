import * as React from 'react';
import styles from './RecentFilesTab.module.scss';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { IRecentFilesTabProps, IRecentFilesTabState } from './RecentFilesTab.types';
import * as strings from 'PropertyPaneFilePickerStrings';
import { sp, SearchResults, SearchResult } from "@pnp/sp";
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { css } from "@uifabric/utilities/lib/css";
import { ItemType } from '../IPropertyPaneFilePicker';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class RecentFilesTab extends React.Component<IRecentFilesTabProps, IRecentFilesTabState> {
  constructor(props: IRecentFilesTabProps) {
    super(props);

    this.state = {
      isLoading: true,
      results: []
    };
  }

  public componentDidMount(): void {
    // Build a filter criteria for each accepted file type, if applicable
    const fileFilter: string = this._getFileFilter();

    // This is how you make two promises at once and wait for both results to return
    // TODO: research to see if there is a way to get this info in one call. Perhaps as context info?
    const getContext: [Promise<any[]>, Promise<any[]>] = [sp.web.select("Id").get(), sp.site.select("Id").get()];

    Promise.all(getContext).then((results: any[]) => {
      // retrieve site id and web id
      const webId: string = results[0].Id;
      const siteId: string = results[1].Id;

      // build a query template
      const queryTemplate: string = `((SiteID:${siteId} OR SiteID: {${siteId}}) AND (WebId: ${webId} OR WebId: {${webId}})) AND LastModifiedTime < {Today} AND -Title:OneNote_DeletedPages AND -Title:OneNote_RecycleBin${fileFilter}`;

      // search for recent changes with accepted file types
      sp.search({
        QueryTemplate: queryTemplate,
        RowLimit: 20,
        SelectProperties: [
          "Title",
          "Path",
          "Filename",
          "FileExtension",
          "FileType",
          "Created",
          "Author",
          "LastModifiedTime",
          "EditorOwsUser",
          "ModifiedBy",
          "LinkingUrl",
          "SiteTitle",
          "ParentLink",
          "DocumentPreviewMetadata",
          "ListID",
          "ListItemID",
          "SPSiteURL",
          "SiteID",
          "WebId",
          "UniqueID",
          "SPWebUrl",
          "DefaultEncodingURL",
          "PictureThumbnailURL"
        ],
        SortList: [
          {
            "Property": "LastModifiedTime",
            "Direction": 1
          }
        ]
      }).then((r: SearchResults) => {
        console.log("Results", r.PrimarySearchResults);
        this.setState({
          isLoading: false,
          results: r.PrimarySearchResults
        });
      });
    });


  }

  private _getFileFilter() {
    let fileFilter: string = undefined;
    if (this.props.itemType === ItemType.Images && this.props.accepts) {
      fileFilter = " AND (";
      this.props.accepts.split(",").forEach((fileType: string, index: number) => {
        fileType = fileType.replace(".", "");
        if (index > 0) {
          fileFilter = fileFilter + " OR ";
        }
        fileFilter = fileFilter + `FileExtension:${fileType} OR SecondaryFileExtension:${fileType}`;
      });
      fileFilter = fileFilter + ")";
    }
    return fileFilter;
  }

  public render(): React.ReactElement<IRecentFilesTabProps> {
    const imageType: boolean = this.props.itemType === ItemType.Images;
    const { results,
      isLoading } = this.state;
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{imageType ? strings.RecentImagesHeader : strings.RecentDocumentsHeader}</h2>
        </div>
        <div className={styles.tab}>
          {isLoading ?
            this._renderSpinner() :
            results === undefined || results.length < 1 ? this._renderPlaceholder() : this._renderGridList()
          }
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.fileUrl}
              onClick={() => this._handleSave()}
              className={styles.actionButton}
            >{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private _renderSpinner = (): JSX.Element => {
    return <Spinner label={strings.Loading} />;
  }

  private _renderPlaceholder = (): JSX.Element => {
    return <Placeholder iconName='OpenFolderHorizontal'
      iconText={strings.NoRecentFiles}
      description={strings.NoRecentFilesDescription}
    />;
  }

  private _renderGridList = (): JSX.Element => {
    return <FocusZone>
      <List
        items={this.state.results}
        onRenderCell={this._onRenderCell}

      />
    </FocusZone>;
  }

  private _onRenderCell = (item: SearchResult, index: number | undefined): JSX.Element => {
    const siteUrl: string = this.props.context.pageContext.web.absoluteUrl;
    return (
      <div
        className={css(styles.gridListCell, index === this.state.results.length - 1 && styles.cellLastRow, styles.cellRight)}
        data-is-focusable={true}
      >
        <div
          className={css(styles.itemTile, styles.isFile, styles.hasThumbnail)}
          role="link"
          onClick={(_event) => this._handleItemSelect(item)}
          aria-selected="false"
          data-is-draggable="false"
          data-is-focusable="true"
          data-selection-index={index}
          data-selection-invoke="true"
          data-item-index={index}
          data-automationid="ItemTile"
        >
          <div
            className={styles.itemTileContent}
          >
            <div className={styles.itemTileFile}>
              <div className={styles.itemTileFileContainer}>
                <div className={styles.itemTileThumbnail}>
                  <div className={styles.image}>
                    <img
                      alt="" role="presentation"
                      src={item["DefaultEncodingURL"]}
                      //src={`${siteUrl}/_layouts/15/getpreview.ashx?guidSite=${item["SiteID"]}&guidWeb=${item["WebId"]}&guidFile=${item["UniqueID"]}&clientType=modernWebPart`}
                      className="ms-Image-image is-loaded ms-Image-image--cover ms-Image-image--portrait is-fadeIn"></img>
                  </div>
                </div>
                <div className={styles.itemTileNamePlate}>
                  <div className={styles.itemTileName}>{item.Title}</div>
                  <div className={styles.itemTileSubText}>
                    <span>{strings.EditedByNamePlate}{item["ModifiedBy"]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _handleItemSelect = (item: SearchResult) => {
    this.setState({
      fileUrl: item["DefaultEncodingURL"]
    });
  }

  private _handleSave = () => {
    this.props.onSave(this.state.fileUrl);
  }

  private _handleClose = () => {
    this.props.onClose();
  }
}

