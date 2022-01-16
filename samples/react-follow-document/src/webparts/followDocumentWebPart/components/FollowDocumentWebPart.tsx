import * as React from 'react';
import * as ReactDom from "react-dom";
import styles from './FollowDocumentWebPart.module.scss';
import { IFollowDocumentWebPartProps } from './IFollowDocumentWebPartProps';
import { IFollowDocumentWebPartState } from './IFollowDocumentWebPartState';
import { FollowDocumentGrid } from '../components/followDocumentGrid/index';
import Graph from "../Service/GraphService";
import { FollowDocument } from "../models/followDocument";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// Used to render list grid
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardActions,
  DocumentCardTitle,
  DocumentCardLocation,
  DocumentCardType,
  DocumentCardImage
} from 'office-ui-fabric-react/lib/DocumentCard';

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { followDocumentPreview } from './followDocumentPreview/followDocumentPreview';
import { IfollowDocumentPreviewProps } from './followDocumentPreview/IfollowDocumentPreviewProps';
import FollowDocumentDialog from './followDocumentDialog/followDocumentDialog';
import { followType } from '../util/followType';

import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ISize } from 'office-ui-fabric-react/lib/Utilities';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export default class FollowDocumentWebPart extends React.Component<IFollowDocumentWebPartProps, IFollowDocumentWebPartState> {
  private _siteId: string = null;
  private _listId: string = null;
  private _panelPlaceHolder: HTMLDivElement = null;
  private _selectedGroup: string = "0";
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      siteId: null,
      listId: null,
      previewImgUrl: null,
      visible: true,
    };
    this._panelPlaceHolder = document.body.appendChild(
      document.createElement("div")
    );
    this.getListItems();
  }

  private getListItems = () => {
    this._selectedGroup = "0";
    if (!this.state.visible) {
      this.setState({
        visible: true,
      });
    }
    let followDocuments: FollowDocument[] = [];
    this.getFollowDocuments(followDocuments).then((Items: FollowDocument[]) => {
      //Order by Date
      Items = Items.sort((a, b) => {
        return b.followedDateTime.getTime() - a.followedDateTime.getTime();
      });
      let uniq = {};
      let group: Array<IDropdownOption> = new Array<IDropdownOption>();
      //Remove duplicated from array
      let uniqueArray = [];
      uniqueArray = Items.filter(obj => !uniq[obj.WebUrl] && (uniq[obj.WebUrl] = true));
      group.push({ key: '0', text: 'All Sites' });
      uniqueArray.forEach(Item => {
        group.push({
          key: Item.WebUrl,
          text: "Site: " + Item.WebName,
        });
      });
      this.setState({
        Items: Items,
        ItemsSearch: Items,
        ItemsGroup: group,
        visible: false,
      });
    });
  }
  /********************************************************************** */
  private getFollowDocuments = async (followDocuments: FollowDocument[]): Promise<any> => {
    const graphService: Graph = new Graph();
    let graphData: any = [];
    graphData = await graphService.getGraphContent(`https://graph.microsoft.com/v1.0/me/drive/following?$select=id,name,webUrl,parentReference,followed,size&Top=1000&Filter=size%20ne%200`, this.props.context);
    if (graphData.value !== undefined) {
      graphData.value.forEach(data => {

        let followDocument: FollowDocument = {
          ItemId: data.id,
          Title: data.name,
          WebFileUrl: data.webUrl,
          DriveId: data.parentReference.driveId,
          followedDateTime: new Date(data.followed.followedDateTime),
        } as FollowDocument;
        this.GetIcon(data.name).then(icon => {
          followDocument.IconUrl = (this.props.context.pageContext.web.absoluteUrl + "/_layouts/15/images/lg_" + icon).replace("lg_iczip.gif", "lg_iczip.png").replace("lg_icmsg.png", "lg_icmsg.gif");
        });
        followDocuments.push(followDocument);
      });
      followDocuments = await this.getList(followDocuments);
    }
    return followDocuments;
  }

  private getList = async (followDocuments: FollowDocument[]): Promise<any> => {
    let items: FollowDocument[] = [];
    const graphService: Graph = new Graph();
    const initialized = await graphService.initialize(this.props.context.serviceScope);
    if (initialized) {
      let uniq = {};
      let uniqueArray = [];
      uniqueArray = followDocuments.filter(obj => !uniq[obj.DriveId] && (uniq[obj.DriveId] = true));
      const requests = this.getBatchRequest(uniqueArray, "/me/drives/{driveId}/list?select=id,webUrl,parentReference", "GET");
      for (let index = 0; index < requests.length; index++) {
        const graphData: any = await graphService.postGraphContent("https://graph.microsoft.com/v1.0/$batch", requests[index]);
        graphData.responses.forEach((data: any) => {
          followDocuments.forEach((followDocument: FollowDocument) => {
            let driveId: string = decodeURI(data.body["@odata.context"].substring(
              data.body["@odata.context"].indexOf("drives('") + 8,
              data.body["@odata.context"].lastIndexOf("'")
            ));
            if (followDocument.DriveId === driveId && (followDocument.ListId === undefined || followDocument.ListId === "")) {
              followDocument.ListId = data.body.id;
              followDocument.ItemProperties = data.body.webUrl + "/Forms/dispForm.aspx?ID=";
              followDocument.SiteId = data.body.parentReference.siteId;
              items.push(followDocument);
            }
          });
        });

      }
    }
    followDocuments = await this.getDriveItem(items);
    return followDocuments;

  }

  private getDriveItem = async (followDocuments: FollowDocument[]): Promise<any> => {
    const graphService: Graph = new Graph();
    let items: FollowDocument[] = [];
    const initialized = await graphService.initialize(this.props.context.serviceScope);
    if (initialized) {
      const requests = this.getBatchRequest(followDocuments, "/me/drives/{driveId}/items/{ItemID}?$select=id,content.downloadUrl,ListItem&expand=ListItem(select=id,webUrl),thumbnails(select=large)", "GET");
      for (let index = 0; index < requests.length; index++) {
        const graphData: any = await graphService.postGraphContent("https://graph.microsoft.com/v1.0/$batch", requests[index]);
        graphData.responses.forEach((data: any) => {
          followDocuments.forEach((followDocument: FollowDocument) => {

            if (followDocument.ItemId === data.body.id && followDocument.Url === undefined) {
              followDocument.id = data.body.listItem.id;
              followDocument.Url = data.body.listItem.webUrl;
              followDocument.Folder = data.body.listItem.webUrl.substring(0, data.body.listItem.webUrl.lastIndexOf("/") + 1);
              followDocument.ItemProperties = followDocument.ItemProperties + data.body.listItem.id;
              followDocument.DownloadFile = data.body["@microsoft.graph.downloadUrl"];
              followDocument.Thumbnail = data.body.thumbnails.length > 0 ? data.body.thumbnails[0].large.url : "";
              items.push(followDocument);
            }
          });
        });
      }
      followDocuments = await this.getWeb(items);
      return followDocuments;
    }
  }

  private getWeb = async (followDocuments: FollowDocument[]): Promise<any> => {
    const graphService: Graph = new Graph();
    let items: FollowDocument[] = [];
    const initialized = await graphService.initialize(this.props.context.serviceScope);
    if (initialized) {
      let uniq = {};
      let uniqueArray = [];
      uniqueArray = followDocuments.filter(obj => !uniq[obj.SiteId] && (uniq[obj.SiteId] = true));
      const requests = this.getBatchRequest(uniqueArray, "/sites/{SiteId}?$select=id,siteCollection,webUrl,name,displayName", "GET");
      for (let index = 0; index < requests.length; index++) {
        const graphData = await graphService.postGraphContent("https://graph.microsoft.com/v1.0/$batch", requests[index]);
        graphData.responses.forEach((data: any) => {
          followDocuments.forEach((followDocument: FollowDocument) => {
            if (followDocument.SiteId === data.body.id && (followDocument.Domain === undefined || followDocument.Domain === "")) {
              followDocument.Domain = data.body.siteCollection.hostname;
              followDocument.WebUrl = data.body.webUrl;
              followDocument.WebName = data.body.displayName;
              followDocument.documentCardActions = [
                {
                  iconProps: { iconName: 'TeamsLogo' },
                  onClick: this.onActionTeamsClick.bind(this, followDocument),
                  ariaLabel: 'Send to Teams',
                },
                {
                  iconProps: { iconName: 'FabricFolder' },
                  onClick: this.onActionFolderClick.bind(this, followDocument),
                  ariaLabel: 'open Folder',
                },
                {
                  iconProps: { iconName: 'FavoriteStarFill' },
                  onClick: this.onActionUnfollowClick.bind(this, followDocument),
                  ariaLabel: 'Unfollow Document',
                },
                {
                  iconProps: { iconName: 'Info' },
                  onClick: this.onActionPropertiesClick.bind(this, followDocument),
                  ariaLabel: 'Document info',
                },
                {
                  iconProps: { iconName: 'DocumentSearch' },
                  onClick: this.onActionPanelClick.bind(this, followDocument),
                  ariaLabel: 'Preview',
                },

              ];
              items.push(followDocument);
            }
          });
        });
        return items;
      }
    }

  }

  public GetIcon = async (name: string): Promise<string> => {
    var url = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/maptoicon(filename='${name}',%20progid='',%20size=0)`;
    const value = await this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse): Promise<{
      value: string;
    }> => {
      return response.json();
    })
      .then((item: { value: string }) => {
        return item.value;
      });

    return value;
  }

  public getBatchRequest = (followDocuments: FollowDocument[], graphQuery: string, method: string) => {
    let HeaderDriveItemsId = {
      "requests": []
    };
    let count = 1;
    let Items = [];
    followDocuments.forEach((element, index) => {
      if (count < 21) {
        HeaderDriveItemsId.requests.push({
          "url": graphQuery.replace("{driveId}", element.DriveId).replace("{ItemID}", element.ItemId).replace("{SiteId}", element.SiteId),
          "method": method,
          "id": count
        });
        count++;
      } else if (count === 21) {
        Items.push(HeaderDriveItemsId);
        HeaderDriveItemsId = {
          "requests": []
        };
        count = 1;
        HeaderDriveItemsId.requests.push({
          "url": graphQuery.replace("{driveId}", element.DriveId).replace("{ItemID}", element.ItemId).replace("{SiteId}", element.SiteId),
          "method": method,
          "id": count
        });
        count++;
      }
      if (index === followDocuments.length - 1) {
        Items.push(HeaderDriveItemsId);
        HeaderDriveItemsId = {
          "requests": []
        };
        count = 1;
      }
    });
    return Items;
  }

  /************************************************************************************* */

  private onActionTeamsClick = (action: FollowDocument, ev: React.SyntheticEvent<HTMLElement>): void => {

    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog.initializedTeams(action, this.props.context, followType.SendTeams);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private _showPanel = (followDocument: FollowDocument): void => {
    this._renderPanelComponent({
      FollowDocument: followDocument,
      context: this.props.context,
      url: followDocument.Url,
      filename: followDocument.Title,
      isOpen: true,
    });
  }
  private _renderPanelComponent = (props: IfollowDocumentPreviewProps): void => {
    const element: React.ReactElement<IfollowDocumentPreviewProps> =
      React.createElement(followDocumentPreview, props);
    ReactDom.render(element, this._panelPlaceHolder);
  }

  private onActionPropertiesClick = (action: FollowDocument, ev: React.SyntheticEvent<HTMLElement>): void => {
    //Get Document Display Form List   
    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog.initialize(action.ItemProperties, followType.ViewPropreties);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private onActionFolderClick = (action: FollowDocument, ev: React.SyntheticEvent<HTMLElement>): void => {
    window.open(action.Url.replace(action.Title, ""), "_blank");
    ev.stopPropagation();
    ev.preventDefault();
  }

  /**
   * Unfollow Option
   */
  private onActionUnfollowClick = async (action: FollowDocument, ev: React.SyntheticEvent<HTMLElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog._followTypeDialog = followType.Unfollow;
    dialog._filename = action.Title;
    dialog.show().then(async () => {
      if (dialog._followDocumentState) {
        const graphService: Graph = new Graph();
        const initialized = await graphService.initialize(this.props.context.serviceScope);
        if (initialized) {
          const graphData: any = await graphService.postGraphContent(`https://graph.microsoft.com/v1.0/drives/${action.DriveId}/items/${action.ItemId}/unfollow`, "");
          if (graphData === undefined) {
            dialog._followDocumentState = false;
            this.getListItems();
          }
        }
      }
    });
  }

  private onActionPanelClick = async (action: FollowDocument, ev: React.SyntheticEvent<HTMLElement>) => {
    this._showPanel(action);
    ev.stopPropagation();
    ev.preventDefault();
  }

  public render(): React.ReactElement<IFollowDocumentWebPartProps> {
    //Filter Search Text
    const checkSearchDrive = (SearchQuery: string) => {
      let items = [];
      if (this._selectedGroup === "0") {
        items = this.state.Items.filter(item => (item.Title.toLowerCase().indexOf(SearchQuery.toLowerCase()) > -1));

      } else {
        items = this.state.Items.filter(item => (item.Title.toLowerCase().indexOf(SearchQuery.toLowerCase()) > -1 && item.WebUrl.toLowerCase().indexOf(this._selectedGroup.toLowerCase()) > -1));
      }
      this.setState({
        ItemsSearch: items,
      });
    };
    const checkClear = (ev: any) => {
      let items = [];
      if (this._selectedGroup === "0") {
        items = this.state.Items;

      } else {
        items = this.state.Items.filter(item => (item.WebUrl.toLowerCase().indexOf(this._selectedGroup.toLowerCase()) > -1));
      }
      this.setState({
        ItemsSearch: items,
      });
    };

    const filterall = (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
      this._selectedGroup = selectedOption.key.toString();
      if (selectedOption.key.toString() === "0") {
        this.setState({
          ItemsSearch: this.state.Items,
        });
      } else {
        const items = this.state.Items.filter(item => item.WebUrl.toLowerCase() === selectedOption.key.toString().toLowerCase());
        this.setState({
          ItemsSearch: items,
        });
      }
    };

    return (
      <>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} moreLink={
            <div style={{ display: "inline-flex" }}>
              {(!this.state.visible) &&
                <div>
                  <IconButton
                    iconProps={{ iconName: 'Refresh' }}
                    onClick={
                      this.getListItems
                    } allowDisabledFocus disabled={false} checked={false}
                  />
                </div>
              }
              {(!this.state.visible) &&
                <Dropdown
                  placeholder="Filter by Site"
                  onChange={filterall}
                  tabIndex={0}
                  // eslint-disable-next-line react/jsx-no-bind

                  options={this.state.ItemsGroup}
                  styles={{ dropdown: { width: 300 } }}
                />
              }
            </div>
          } />
        <div className={styles.spinnerLoading}>
          {(this.state.visible) &&

            <Spinner size={SpinnerSize.large} />

          }
          {(!this.state.visible) &&
            <Stack tokens={stackTokens}>

              <SearchBox style={{ width: "80%" }} placeholder="Search Document" onSearch={checkSearchDrive} onClear={checkClear} />
            </Stack>
          }
        </div>
        <div className={styles.grid}>
          <FollowDocumentGrid
            items={this.state.ItemsSearch}
            onRenderGridItem={(item, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
          />
        </div>
      </>
    );
  }
  private _onRenderGridItem = (item: FollowDocument, finalSize: ISize, isCompact: boolean): JSX.Element => {

    return <div className={styles.documentTile} data-is-focusable={true} aria-label={item.Title} >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}

      >
        <div style={{ cursor: 'pointer' }} onClick={() => window.open(item.WebFileUrl, '_blank')}>
          <DocumentCardImage height={100} imageFit={ImageFit.center} imageSrc={item.IconUrl} />
        </div>
        {!isCompact && <DocumentCardLocation location={item.WebName} onClick={() => window.open(item.WebUrl, '_blank')} />}
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.Title}
            shouldTruncate={true}
          />

          <DocumentCardActions className={styles.DocumentCardActionsPadding} actions={item.documentCardActions} />
        </DocumentCardDetails>
      </DocumentCard>

    </div>;
  }
}
