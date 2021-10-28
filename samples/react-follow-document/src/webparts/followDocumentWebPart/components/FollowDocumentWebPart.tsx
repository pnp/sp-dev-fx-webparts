import * as React from 'react';
import * as ReactDom from "react-dom";
import styles from './FollowDocumentWebPart.module.scss';
import { IFollowDocumentWebPartProps } from './IFollowDocumentWebPartProps';
import { IFollowDocumentWebPartState } from './IFollowDocumentWebPartState';
import { FollowDocumentGrid } from '../components/followDocumentGrid/index';
import Rest from '../Service/Rest';
import Graph from "../Service/GraphService";

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
    //Load using Graph
    this.getGraphFollowedDocs();

  }

  //get Web Name and Web Url of Document
  private getSearchWebID = async (graphData: any[], webs: any[]): Promise<any[]> => {
    const graphService: Graph = new Graph();
    const initialized = await graphService.initialize(this.props.context.serviceScope);
    let queryString: string = "";
    for (let index = 0; index < webs.length; index++) {
      if (index === 0) {
        queryString += "WebId:" + webs[index].replace('{', '').replace('}', '');
      } else {
        queryString += " OR WebId:" + webs[index].replace('{', '').replace('}', '') + " ";
      }
    }
    if (initialized) {
      const HeaderWeb = {
        "requests": [
          {
            "entityTypes": [
              "site"
            ],
            "query": {
              "queryString": "" + queryString + "",
            }
          }
        ]
      };
      //Retrieve webNames
      const tmpWebs = await graphService.postGraphContent("https://graph.microsoft.com/beta/search/query", HeaderWeb);
      graphData.forEach(element => {
        tmpWebs.value[0].hitsContainers[0].hits.forEach(Webelement => {
          if (element.fields.WebId.replace('{', '').replace('}', '') === Webelement.resource.id.split(/[, ]+/).pop().toUpperCase()) {
            element.WebName = Webelement.resource.name;
            element.WebUrl = Webelement.resource.webUrl;
          }
        }
        );
      });
      return graphData;
    }
  }

  private onActionTeamsClick = (action: any, ev: React.SyntheticEvent<HTMLElement>): void => {

    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog.initializedTeams(action, this.props.context, followType.SendTeams);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private getSearchListItemID = async (ListId: string): Promise<string> => {
    const graphService: Graph = new Graph();
    const initialized = await graphService.initialize(this.props.context.serviceScope);
    if (initialized) {
      const HeaderListId = {
        "requests": [
          {
            "entityTypes": [
              "list"
            ],
            "query": {
              "queryString": "ListID:" + ListId + ""
            },
            "fields": [
              "webUrl"
            ]
          }
        ]
      };
      const tmpFileID = await graphService.postGraphContent("https://graph.microsoft.com/beta/search/query", HeaderListId);
      console.log(tmpFileID);
      return tmpFileID.value[0].hitsContainers[0].hits[0].resource.webUrl.substring(0, tmpFileID.value[0].hitsContainers[0].hits[0].resource.webUrl.lastIndexOf("/"));
    }
  }
  private getListItemID = async (ListID, ItemID) => {
    const _ListId = await this.getSearchListItemID(ListID);
    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog.initialize(_ListId + "/dispForm.aspx?ID=" + ItemID, followType.ViewPropreties);
  }

  private _showPanel = (Url: string, Title: string): void => {
    this._renderPanelComponent({
      context: this.props.context,
      url: Url,
      filename: Title,
      isOpen: true,
    });
  }
  private _renderPanelComponent = (props: IfollowDocumentPreviewProps): void => {
    const element: React.ReactElement<IfollowDocumentPreviewProps> =
      React.createElement(followDocumentPreview, props);
    ReactDom.render(element, this._panelPlaceHolder);
  }

  private onActionPropertiesClick = (action: any, ev: React.SyntheticEvent<HTMLElement>): void => {
    //Get Document Display Form List   
    this.getListItemID(action.fields.ListId.replace('{', '').replace('}', ''), action.fields.ItemId);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private onActionFolderClick = (action: any, ev: React.SyntheticEvent<HTMLElement>): void => {
    window.open(action.fields.Url.replace(action.fields.Title, ""), "_blank");
    ev.stopPropagation();
    ev.preventDefault();
  }

  /**
   * Unfollow Option
   */
  private onActionUnfollowClick = async (action: any, ev: React.SyntheticEvent<HTMLElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    const dialog: FollowDocumentDialog = new FollowDocumentDialog();
    dialog._followTypeDialog = followType.Unfollow;
    dialog._filename = action.fields.Title;
    dialog.show().then(async () => {
      if (dialog._followDocumentState) {
        const restService: Rest = new Rest();
        const Status = await restService.stopfollowing(
          this.props.context.spHttpClient,
          action.fields.Url,
          this.props.context.pageContext.web.absoluteUrl,
        );
        if (Status) {
          dialog._followDocumentState = false;
          this.getListItems();
        }
      }
    });
  }

  private onActionPanelClick = async (action: any, ev: React.SyntheticEvent<HTMLElement>) => {
    this._showPanel(action.fields.Url, action.fields.Title);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private getGraphFollowedDocs = async () => {
    const GraphService: Graph = new Graph();
    let DriveItem: any = [];

    if (this.state.siteId === null) {
      let graphData: any = await GraphService.getGraphContent("https://graph.microsoft.com/v1.0/me/drive/list", this.props.context);
      this._siteId = graphData.parentReference.siteId;
      DriveItem = await this.getListID(graphData.parentReference.siteId);
    } else {
      if (this.state.listId === null) {
        DriveItem = await this.getListID(this.state.siteId);
      } else {
        DriveItem = await this.getFollowDocuments(this.state.siteId, this.state.listId);

      }
    }
    let items = [];
    DriveItem.forEach(element => {
      if (element.fields.IconUrl.indexOf("lg_iczip.gif") > -1) {
        element.fields.IconUrl = element.fields.IconUrl.replace("lg_iczip.gif", "lg_iczip.png");
      }
      if (element.fields.IconUrl.indexOf("lg_icmsg.png") > -1) {
        element.fields.IconUrl = element.fields.IconUrl.replace("lg_icmsg.png", "lg_icmsg.gif");
      }
      items.push({
        thumbnail: element.previewImg,
        title: element.fields.Title,
        profileImageSrc: element.fields.IconUrl,
        url: (element.fields.ServerUrlProgid === undefined ? element.fields.Url : element.fields.ServerUrlProgid.substring(1)),
        webName: element.WebName,
        webUrl: element.WebUrl,
        documentCardActions: [
          {
            iconProps: { iconName: 'TeamsLogo' },
            onClick: this.onActionTeamsClick.bind(this, element),
            ariaLabel: 'Send to Teams',
          },
          {
            iconProps: { iconName: 'FabricFolder' },
            onClick: this.onActionFolderClick.bind(this, element),
            ariaLabel: 'open Folder',
          },
          {
            iconProps: { iconName: 'FavoriteStarFill' },
            onClick: this.onActionUnfollowClick.bind(this, element),
            ariaLabel: 'Unfollow Document',
          },
          {
            iconProps: { iconName: 'Info' },
            onClick: this.onActionPropertiesClick.bind(this, element),
            ariaLabel: 'Document info',
          },
          {
            iconProps: { iconName: 'DocumentSearch' },
            onClick: this.onActionPanelClick.bind(this, element),
            ariaLabel: 'Preview',
          },

        ]
      });

    });
    let uniq = {};
    let group: Array<IDropdownOption> = new Array<IDropdownOption>();
    //Remove duplicated from array
    let uniqueArray = [];
    uniqueArray = items.filter(obj => !uniq[obj.webUrl] && (uniq[obj.webUrl] = true));
    group.push({ key: '0', text: 'All Sites' });
    uniqueArray.forEach(element => {
      group.push({
        key: element.webUrl,
        text: "Site: " + element.webName,
      });
    });
    this.setState({
      Items: items,
      ItemsSearch: items,
      ItemsGroup: group,
      visible: false,
      siteId: this._siteId,
      listId: this._listId
    });

  }
  private getListID = async (siteId: string): Promise<string> => {
    const GraphService: Graph = new Graph();
    let graphData: any = await GraphService.getGraphContent(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists?$select=id&$filter=displayName eq 'Social'`, this.props.context);
    this._listId = graphData.value[0].id;
    const DriveItem: string = await this.getFollowDocuments(siteId, graphData.value[0].id);
    return DriveItem;
  }

  private getFollowDocuments = async (siteId: string, listId: string): Promise<any> => {
    const GraphService: Graph = new Graph();
    let graphData: any = [];
    graphData = await GraphService.getGraphContent(`https://graph.microsoft.com/v1.0/sites/${siteId}/Lists/${listId}/items?expand=fields(select=ItemId,ListId,SiteId,webId,Title,Url,ServerUrlProgid,IconUrl,File_x0020_Type.progid)&$filter=fields/ItemId gt -1`, this.props.context);
    graphData.value = graphData.value.sort((a, b) => {
      return b.id - a.id;
    });

    //Get Web site Name 
    graphData = await this.getFollowDocumentsWebName(graphData);
    return graphData;
  }

  private getFollowDocumentsWebName = async (graphData) => {
    let _webs = [];
    graphData.value.forEach(element => {
      if (_webs.indexOf(element.fields.WebId) === -1) {
        _webs.push(element.fields.WebId);
      }
    });
    graphData = await this.getSearchWebID(graphData.value, _webs);
    return graphData;
  }
  public render(): React.ReactElement<IFollowDocumentWebPartProps> {
    //Filter Search Text
    const checkSearchDrive = (SearchQuery: string) => {
      let items = [];
      if (this._selectedGroup === "0") {
        items = this.state.Items.filter(item => (item.title.toLowerCase().indexOf(SearchQuery.toLowerCase()) > -1));

      } else {
        items = this.state.Items.filter(item => (item.title.toLowerCase().indexOf(SearchQuery.toLowerCase()) > -1 && item.webUrl.toLowerCase().indexOf(this._selectedGroup.toLowerCase()) > -1));
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
        items = this.state.Items.filter(item => (item.webUrl.toLowerCase().indexOf(this._selectedGroup.toLowerCase()) > -1));
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
        const items = this.state.Items.filter(item => item.webUrl.toLowerCase().indexOf(selectedOption.key.toString().toLowerCase()) > -1);
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
            onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
          />
        </div>
      </>
    );
  }
  private _onRenderGridItem = (item: any, finalSize: ISize, isCompact: boolean): JSX.Element => {

    return <div
      className={styles.documentTile}
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}

      >
        <div style={{ cursor: 'pointer' }} onClick={() => window.open(item.url, '_blank')}>
          <DocumentCardImage height={100} imageFit={ImageFit.center} imageSrc={item.profileImageSrc} />
        </div>
        {!isCompact && <DocumentCardLocation location={item.webName} onClick={() => window.open(item.webUrl, '_blank')} />}
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />

          <DocumentCardActions className={styles.DocumentCardActionsPadding} actions={item.documentCardActions} />
        </DocumentCardDetails>
      </DocumentCard>

    </div>;
  }
}
