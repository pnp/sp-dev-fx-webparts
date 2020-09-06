import * as React from 'react';
import {
  css,
  DocumentCard,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  Spinner
} from 'office-ui-fabric-react';

import styles from '../TrendingInTheSitesIFollow.module.scss';
import { ITrendingInTheSitesIFollowWebPartProps } from '../ITrendingInTheSitesIFollowWebPartProps';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';
import { ITrendingDocument } from '../../ITrendingDocument';
import { IActorInformation } from '../../IActorInformation';
import { SearchUtils, ISearchQueryResponse, IRow, ICell, IEdge } from '../../SearchUtils';
import { Utils } from '../../Utils';

export interface ITrendingInTheSitesIFollowProps extends ITrendingInTheSitesIFollowWebPartProps {
  httpClient: SPHttpClient;
  siteUrl: string;
}

export interface ITrendingInTheSitesIFollowState {
  trendingDocuments: ITrendingDocument[];
  loading: boolean;
  error: string;
}

interface ISiteInfo {
  Uri: string;
}

export default class TrendingInTheSitesIFollow extends React.Component<ITrendingInTheSitesIFollowProps, ITrendingInTheSitesIFollowState> {
  constructor(props: ITrendingInTheSitesIFollowProps, state: ITrendingInTheSitesIFollowState) {
    super(props);

    this.state = {
      trendingDocuments: [] as ITrendingDocument[],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this.loadDocuments(this.props.siteUrl, this.props.numberOfDocuments);
  }

  public componentDidUpdate(prevProps: ITrendingInTheSitesIFollowProps, prevState: ITrendingInTheSitesIFollowState, prevContext: any): void {
    if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
      this.props.siteUrl !== prevProps.siteUrl && (
        this.props.numberOfDocuments && this.props.siteUrl
      )) {
      this.loadDocuments(this.props.siteUrl, this.props.numberOfDocuments);
    }
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{ margin: '0 auto' }}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error: </strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.trendingDocuments.map((doc: ITrendingDocument, i: number) => {
      const iconUrl: string = `https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/32/${doc.extension}.png`;
      return (
        <DocumentCard onClickHref={doc.url} key={doc.id}>
          <DocumentCardPreview
            previewImages={[
              {
                previewImageSrc: doc.previewImageUrl,
                iconSrc: iconUrl,
                width: 318,
                height: 196,
                accentColor: '#ce4b1f'
              }
            ]}
            />
          <DocumentCardTitle title={doc.title}/>
          <DocumentCardLocation location={doc.webTitle} locationHref={doc.webUrl} />
          <DocumentCardActivity
            activity={`${doc.activity.name} ${doc.activity.date}`}
            people={
              [
                { name: doc.activity.actorName, profileImageSrc: doc.activity.actorPhotoUrl }
              ]
            }
            />
        </DocumentCard>
      );
    });
    return (
      <div className={styles.trendingInTheSitesIFollow}>
        <div className={css('ms-font-xl', styles.webPartTitle) }>{this.props.title}</div>
        {loading}
        {error}
        {documents}
        <div style={{ clear: 'both' }}/>
      </div>
    );
  }

  private loadDocuments(siteUrl: string, numberOfDocuments: number): void {
    this.setState({
      loading: true,
      error: undefined,
      trendingDocuments: []
    });
    const trendingDocuments: ITrendingDocument[] = [];
    this.getSitesIFollow(siteUrl)
      .then((sitesIFollow: string[]): Promise<ITrendingDocument[]> => {
        return this.getTrendingDocuments(sitesIFollow, siteUrl, numberOfDocuments);
      })
      .then((trendingDocuments: ITrendingDocument[]): void => {
        this.setState({
          loading: false,
          error: undefined,
          trendingDocuments: trendingDocuments
        });
      }, (error: any): void => {
        this.setState({
          loading: false,
          error: error,
          trendingDocuments: []
        });
      });

    return;
  }

  private getSitesIFollow(siteUrl: string): Promise<string[]> {
    return new Promise((resolve: (sitesIFollow: string[]) => void, reject: (error: any) => void): void => {
      this.props.httpClient.get(`${siteUrl}/_api/social.following/my/followed(types=4)`,SPHttpClient.configurations.v1 , {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: SPHttpClientResponse): Promise<{ value: ISiteInfo[] }> => {
          return response.json();
        })
        .then((sitesIFollowInfo: { value: ISiteInfo[] }): void => {
          const sitesIFollow: string[] = [];

          for (let i: number = 0; i < sitesIFollowInfo.value.length; i++) {
            sitesIFollow.push(sitesIFollowInfo.value[i].Uri);
          }

          resolve(sitesIFollow);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private getTrendingDocuments(sitesIFollow: string[], siteUrl: string, numberOfDocuments: number): Promise<ITrendingDocument[]> {
    return new Promise((resolve: (trendingDocuments: ITrendingDocument[]) => void, reject: (error: any) => void): void => {
      if (sitesIFollow.length === 0) {
        return resolve([]);
      }

      let query: string = '(';
      for (let i: number = 0; i < sitesIFollow.length; i++) {
        if (query.length > 1) {
          query += ' OR ';
        }

        query += `Path:"${sitesIFollow[i]}"`;
      }
      query += ') AND (IsDocument:1)';

      const postData: string = JSON.stringify({
        'request': {
          '__metadata': {
            'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
          },
          'Querytext': query,
          'SelectProperties': {
            'results': ['Author', 'AuthorOwsUser', 'DocId', 'DocumentPreviewMetadata', 'Edges', 'EditorOwsUser', 'FileExtension', 'FileType', 'HitHighlightedProperties', 'HitHighlightedSummary', 'LastModifiedTime', 'LikeCountLifetime', 'ListID', 'ListItemID', 'OriginalPath', 'Path', 'Rank', 'SPWebUrl', 'SecondaryFileExtension', 'ServerRedirectedURL', 'SiteTitle', 'Title', 'ViewCountLifetime', 'siteID', 'uniqueID', 'webID']
          },
          'ClientType': 'TrendingInTheSitesIFollow',
          'BypassResultTypes': 'true',
          'RowLimit': numberOfDocuments,
          'StartRow': '0',
          'RankingModelId': '0c77ded8-c3ef-466d-929d-905670ea1d72',
          'Properties': {
            'results': [{
              'Name': 'IncludeExternalContent',
              'Value': {
                'BoolVal': 'True',
                'QueryPropertyValueTypeIndex': 3
              }
            }, {
                'Name': 'GraphQuery',
                'Value': {
                  'StrVal': 'actor(ME,action:1021)',
                  'QueryPropertyValueTypeIndex': 1
                }
              }]
          }
        }
      });
      this.props.httpClient.post(`${siteUrl}/_api/search/postquery`, SPHttpClient.configurations.v1 , {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        },
        body: postData
      })
        .then((response: SPHttpClientResponse): Promise<ISearchQueryResponse> => {
          return response.json();
        })
        .then((response: ISearchQueryResponse): void => {
          if (!response ||
            !response.PrimaryQueryResult ||
            !response.PrimaryQueryResult.RelevantResults ||
            response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
            resolve([]);
            return;
          }

          const trendingDocuments: ITrendingDocument[] = [];
          for (let i: number = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
            const row: IRow = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
            const cells: ICell[] = row.Cells;
            const editorInfo: string[] = SearchUtils.getValueFromResults('EditorOwsUser', cells).split('|');
            const modifiedDate: Date = new Date(SearchUtils.getValueFromResults('LastModifiedTime', cells).replace('.0000000', ''));
            const dateString: string = (modifiedDate.getMonth() + 1) + '/' + modifiedDate.getDate() + '/' + modifiedDate.getFullYear();
            trendingDocuments.push({
              id: SearchUtils.getValueFromResults('DocId', cells),
              url: SearchUtils.getValueFromResults('ServerRedirectedURL', cells),
              webUrl: SearchUtils.getValueFromResults('SPWebUrl', cells),
              webTitle: SearchUtils.getValueFromResults('SiteTitle', cells),
              title: SearchUtils.getValueFromResults('Title', cells),
              previewImageUrl: SearchUtils.getPreviewImageUrl(cells, siteUrl),
              extension: SearchUtils.getValueFromResults('FileType', cells),
              activity: {
                actorId: -1,
                actorName: Utils.trim(editorInfo[1]),
                actorPhotoUrl: Utils.getUserPhotoUrl(Utils.trim(editorInfo[0]), siteUrl),
                date: dateString,
                name: 'Modified'
              }
            });
          }

          resolve(trendingDocuments);
        }, (error: any): void => {
          reject(error);
        });
    });
  }
}
