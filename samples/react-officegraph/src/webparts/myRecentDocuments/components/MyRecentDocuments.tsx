import * as React from 'react';
import {
  css,
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  Spinner
} from 'office-ui-fabric-react';

import styles from '../MyRecentDocuments.module.scss';
import { IMyRecentDocumentsWebPartProps } from '../IMyRecentDocumentsWebPartProps';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';
import { ITrendingDocument } from '../../ITrendingDocument';
import { IActorInformation } from '../../IActorInformation';
import { SearchUtils, ISearchQueryResponse, IRow, ICell, IEdge } from '../../SearchUtils';
import { Utils } from '../../Utils';

export interface IMyRecentDocumentsProps extends IMyRecentDocumentsWebPartProps {
  httpClient: SPHttpClient;
  siteUrl: string;
}

export interface IMyRecentDocumentsState {
  myDocuments: ITrendingDocument[];
  loading: boolean;
  error: string;
}

export default class MyRecentDocuments extends React.Component<IMyRecentDocumentsProps, IMyRecentDocumentsState> {
  constructor(props: IMyRecentDocumentsProps, state: IMyRecentDocumentsState) {
    super(props);

    this.state = {
      myDocuments: [] as ITrendingDocument[],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this.loadMyDocuments(this.props.siteUrl, this.props.numberOfDocuments);
  }

  public componentDidUpdate(prevProps: IMyRecentDocumentsProps, prevState: IMyRecentDocumentsState, prevContext: any): void {
    if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
      this.props.siteUrl !== prevProps.siteUrl && (
        this.props.numberOfDocuments && this.props.siteUrl
      )) {
      this.loadMyDocuments(this.props.siteUrl, this.props.numberOfDocuments);
    }
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{ margin: '0 auto' }}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error: </strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.myDocuments.map((doc: ITrendingDocument, i: number) => {
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
      <div className={styles.myRecentDocuments}>
        <div className={css('ms-font-xl', styles.webPartTitle)}>{this.props.title}</div>
        {loading}
        {error}
        {documents}
        <div style={{ clear: 'both' }}/>
      </div>
    );
  }

  private loadMyDocuments(siteUrl: string, numberOfDocuments: number): void {
    const myDocuments: ITrendingDocument[] = [];
    this.props.httpClient.get(`${siteUrl}/_api/search/query?querytext='*'&properties='GraphQuery:actor(me\\,or(action\\:1001\\,action\\:1003)),GraphRankingModel:{"features"\\:[{"function"\\:"EdgeTime"}]}'&selectproperties='Author,AuthorOwsUser,DocId,DocumentPreviewMetadata,Edges,EditorOwsUser,FileExtension,FileType,HitHighlightedProperties,HitHighlightedSummary,LastModifiedTime,LikeCountLifetime,ListID,ListItemID,OriginalPath,Path,Rank,SPWebUrl,SecondaryFileExtension,ServerRedirectedURL,SiteTitle,Title,ViewCountLifetime,siteID,uniqueID,webID'&rowlimit=${numberOfDocuments}&ClientType='MyRecentDocuments'&RankingModelId='0c77ded8-c3ef-466d-929d-905670ea1d72'`, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    })
      .then((response: SPHttpClientResponse): Promise<ISearchQueryResponse> => {
        return response.json();
      })
      .then((response: ISearchQueryResponse): Promise<IActorInformation> => {
        if (!response ||
          !response.PrimaryQueryResult ||
          !response.PrimaryQueryResult.RelevantResults ||
          response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
          return Promise.resolve();
        }

        let actorId: number = undefined;
        for (let i: number = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
          const row: IRow = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
          const edges: IEdge[] = JSON.parse(SearchUtils.getValueFromResults('Edges', row.Cells));
          if (edges.length < 1) {
            continue;
          }

          // we can get multiple edges back so let's show the information from the latest one
          let latestEdge: IEdge = edges[0];
          if (edges.length > 1) {
            let latestEdgeDate: Date = new Date(latestEdge.Properties.Time);
            for (let i: number = 1; i < edges.length; i++) {
              const edgeDate: Date = new Date(edges[i].Properties.Time);
              if (edgeDate > latestEdgeDate) {
                latestEdge = edges[i];
                latestEdgeDate = edgeDate;
              }
            }
          }

          if (!actorId) {
            // since all edges that we're retrieving are personal (I viewed, I modified)
            // we only need to get the actor ID once because it's the same on all edges (me)
            actorId = latestEdge.ActorId;
          }

          const cells: ICell[] = row.Cells;
          const date: Date = new Date(latestEdge.Properties.Time);
          const dateString: string = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
          myDocuments.push({
            id: SearchUtils.getValueFromResults('DocId', cells),
            url: SearchUtils.getValueFromResults('ServerRedirectedURL', cells),
            title: SearchUtils.getValueFromResults('Title', cells),
            previewImageUrl: SearchUtils.getPreviewImageUrl(cells, siteUrl),
            extension: SearchUtils.getValueFromResults('FileType', cells),
            activity: {
              actorId: latestEdge.ActorId,
              date: dateString,
              name: SearchUtils.getActionName(latestEdge.Properties.Action)
            }
          });
        }

        return this.getActorsInfo(actorId, siteUrl);
      }).
      then((actorInformation: IActorInformation): void => {
        if (actorInformation) {
          for (let i: number = 0; i < myDocuments.length; i++) {
            if (myDocuments[i].activity.actorId !== actorInformation.id) {
              continue;
            }

            myDocuments[i].activity.actorName = actorInformation.name;
            myDocuments[i].activity.actorPhotoUrl = actorInformation.photoUrl;
          }
        }

        this.setState({
          loading: false,
          error: null,
          myDocuments: myDocuments
        });
      }, (error: any): void => {
        this.setState({
          loading: false,
          error: error,
          myDocuments: []
        });
      });
  }

  private getActorsInfo(actorId: number, siteUrl: string): Promise<IActorInformation> {
    if (!actorId) {
      return Promise.resolve();
    }

    return new Promise((resolve: (actorInformation: IActorInformation) => void, reject: (error: any) => void): void => {
      this.props.httpClient.get(`${siteUrl}/_api/search/query?querytext='WorkId:${actorId}'&selectproperties='DocId,Title,WorkEmail'&ClientType='MyRecentDocuments'&SourceId='b09a7990-05ea-4af9-81ef-edfab16c4e31'`, SPHttpClient.configurations.v1 , {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: SPHttpClientResponse): Promise<ISearchQueryResponse> => {
          return response.json();
        })
        .then((response: ISearchQueryResponse): Promise<IActorInformation> => {
          if (!response ||
            !response.PrimaryQueryResult ||
            !response.PrimaryQueryResult.RelevantResults ||
            response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
            return Promise.resolve();
          }

          const cells: ICell[] = response.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells;

          resolve({
            email: SearchUtils.getValueFromResults('WorkEmail', cells),
            id: parseInt(SearchUtils.getValueFromResults('DocId', cells)),
            name: SearchUtils.getValueFromResults('Title', cells),
            photoUrl: Utils.getUserPhotoUrl(SearchUtils.getValueFromResults('WorkEmail', cells), siteUrl)
          });
        }, (error: any): void => {
          reject(error);
        });
    });
  }
}
