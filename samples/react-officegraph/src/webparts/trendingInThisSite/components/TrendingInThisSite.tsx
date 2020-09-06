import * as React from 'react';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  Spinner
} from 'office-ui-fabric-react';

import styles from '../TrendingInThisSite.module.scss';
import { ITrendingInThisSiteWebPartProps } from '../ITrendingInThisSiteWebPartProps';

export interface ITrendingInThisSiteProps extends ITrendingInThisSiteWebPartProps {
  siteUrl: string;
}

export interface ITrendingInThisSiteState {
  trendingDocuments: ITrendingDocument[];
  loading: boolean;
  error: string;
}

export interface ITrendingDocument {
  id: string;
  title: string;
  url: string;
  previewImageUrl: string;
  lastModifiedByPhotoUrl: string;
  lastModifiedByName: string;
  lastModifiedTime: string;
  extension: string;
}

interface ISearchResultValue {
  Key: string;
  Value: string;
}

export default class TrendingInThisSite extends React.Component<ITrendingInThisSiteProps, ITrendingInThisSiteState> {
  constructor(props: ITrendingInThisSiteProps, state: ITrendingInThisSiteState) {
    super(props);

    this.state = {
      trendingDocuments: [] as ITrendingDocument[],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this.loadTrendingContent(this.props.siteUrl, this.props.numberOfDocuments);
  }

  public componentDidUpdate(prevProps: ITrendingInThisSiteProps, prevState: ITrendingInThisSiteState, prevContext: any): void {
    if (this.props.numberOfDocuments !== prevProps.numberOfDocuments ||
      this.props.siteUrl !== prevProps.siteUrl && (
        this.props.numberOfDocuments && this.props.siteUrl
      )) {
      this.loadTrendingContent(this.props.siteUrl, this.props.numberOfDocuments);
    }
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{margin: '0 auto'}}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error:</strong> {this.state.error}</div> : <div/>;
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
          <DocumentCardActivity
            activity={'Modified ' + doc.lastModifiedTime}
            people={
              [
                { name: doc.lastModifiedByName, profileImageSrc: doc.lastModifiedByPhotoUrl }
              ]
            }
            />
        </DocumentCard>
      );
    });
    return (
      <div className={styles.trendingInThisSite}>
        {loading}
        {error}
        {documents}
        <div style={{clear: 'both'}}/>
      </div>
    );
  }

  private getValueFromResults(key: string, results: ISearchResultValue[]): string {
    let value: string = '';

    if (results != null && results.length > 0 && key != null) {
      for (let i: number = 0; i < results.length; i++) {
        const resultItem: ISearchResultValue = results[i];
        if (resultItem.Key === key) {
          value = resultItem.Value;
          break;
        }
      }
    }

    return value;
  }

  private trim(s: string): string {
    if (s != null && s.length > 0) {
      return s.replace(/^\s+|\s+$/gm, '');
    }
    else {
      return s;
    }
  }

  private getPreviewImageUrl(result: ISearchResultValue[], siteUrl: string): string {
    const uniqueID: string = this.getValueFromResults('uniqueID', result);
    const siteId: string = this.getValueFromResults('siteID', result);
    const webId: string = this.getValueFromResults('webID', result);
    const docId: string = this.getValueFromResults('DocId', result);
    if (uniqueID !== null && siteId !== null && webId !== null && docId !== null) {
      return `${siteUrl}/_layouts/15/getpreview.ashx?guidFile=${uniqueID}&guidSite=${siteId}&guidWeb=${webId}&docid=${docId}
      &metadatatoken=300x424x2&ClientType=CodenameOsloWeb&size=small`;
    }
    else {
      return '';
    }
  }

  private getUserPhotoUrl(userEmail: string, siteUrl: string): string {
    return `${siteUrl}/_layouts/15/userphoto.aspx?size=S&accountname=${userEmail}`;
  }

  private request<T>(url: string, method: string = 'GET', headers: any = null, data: any = null): Promise<T> {
    return new Promise<T>((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = function (): void {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(this.response as T);
          }
          else if (this.status >= 400) {
            reject({
              message: this.response['odata.error'].message.value,
              statusText: this.statusText,
              status: this.status
            });
          }
        }
      };

      xhr.open(method, url, true);
      if (headers === null) {
        xhr.setRequestHeader('Accept', 'application/json;odata=nometadata');
      }
      else {
        for (var header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }
      }
      xhr.responseType = 'json';
      xhr.send(data);
    });
  }

  private getSiteMembers(siteUrl: string): Promise<string[]> {
    const component: TrendingInThisSite = this;
    return new Promise<string[]>((resolve: (siteMembers: string[]) => void, reject: (err: any) => void): void => {
      component.request(`${siteUrl}/_api/Web/AssociatedMemberGroup/Users?$select=Email`).then((members: { value: { Email: string }[] }): void => {
        const siteMembers: string[] = [];
        for (let i: number = 0; i < members.value.length; i++) {
          siteMembers.push(members.value[i].Email);
        }

        resolve(siteMembers);
      }, (error: any): void => {
        reject(error);
      });
    });
  }

  private getActors(siteMembers: string[], requestDigest: string, siteUrl: string): Promise<string[]> {
    const component: TrendingInThisSite = this;
    let query: string = '';
    siteMembers.forEach((member: string): void => {
      if (query.length > 0) {
        query += ' OR ';
      }
      query += `UserName:${member}`;
    });
    const postData: string = JSON.stringify({
      'request': {
        '__metadata': {
          'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
        },
        'Querytext': query,
        'SelectProperties': {
          'results': ['DocId', 'WorkEmail']
        },
        'RowLimit': '100',
        'StartRow': '0',
        'SourceId': 'b09a7990-05ea-4af9-81ef-edfab16c4e31'
      }
    });

    return new Promise<string[]>((resolve: (actors: string[]) => void, reject: (err?: any) => void): void => {
      component.request(`${siteUrl}/_api/search/postquery`, 'POST', {
        'Accept': 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': requestDigest
      }, postData).then((data: any): void => {
        if (data && data.PrimaryQueryResult && data.PrimaryQueryResult.RelevantResults) {
          const actors: string[] = [];
          data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach((row: any): void => {
            const actorId: string = component.getValueFromResults('DocId', row.Cells);
            if (actorId != null && actorId.length > 0) {
              actors.push(actorId);
            }
          });
          resolve(actors);
        }
        else {
          reject();
        }
      }, (error: any): void => {
        reject(error);
      });
    });
  }

  private getTrendingContent(siteUrl: string, actors: string[], requestDigest: string): Promise<ITrendingDocument[]> {
    const component: TrendingInThisSite = this;
    let gq: string = '';
    if (actors.length > 1) {
      actors.forEach((actor: string): void => {
        if (gq.length > 0) {
          gq += ',';
        }
        gq += `actor(${actor},action:1020)`;
      });
      gq += ',and(actor(me,action:1021),actor(me,or(action:1021,action:1036,action:1037,action:1039)))';
      gq = `or(${gq})`;
    }
    else {
      gq = `or(actor(${actors[0]},action:1020),and(actor(me,action:1021),actor(me,or(action:1021,action:1036,action:1037,action:1039))))`;
    }
    siteUrl = siteUrl.replace(':443/', '/');
    const postData: string = JSON.stringify({
      'request': {
        '__metadata': {
          'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
        },
        'Querytext': 'path:' + siteUrl,
        'SelectProperties': {
          'results': ['Author', 'AuthorOwsUser', 'DocId', 'DocumentPreviewMetadata', 'Edges', 'EditorOwsUser', 'FileExtension', 'FileType', 'HitHighlightedProperties', 'HitHighlightedSummary', 'LastModifiedTime', 'LikeCountLifetime', 'ListID', 'ListItemID', 'OriginalPath', 'Path', 'Rank', 'SPWebUrl', 'SecondaryFileExtension', 'ServerRedirectedURL', 'SiteTitle', 'Title', 'ViewCountLifetime', 'siteID', 'uniqueID', 'webID']
        },
        'ClientType': 'TrendingInThisSite',
        'BypassResultTypes': 'true',
        'RowLimit': component.props.numberOfDocuments.toString(),
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
                'StrVal': gq,
                'QueryPropertyValueTypeIndex': 1
              }
            }, {
              'Name': 'GraphRankingModel',
              'Value': {
                'StrVal': '{"features":[{"function":"EdgeWeight"}],"featureCombination":"sum","actorCombination":"sum"}',
                'QueryPropertyValueTypeIndex': 1
              }
            }]
        }
      }
    });
    return new Promise<ITrendingDocument[]>((resolve: (trendingDocuments: ITrendingDocument[]) => void, reject: (err: any) => void): void => {
      component.request(`${siteUrl}/_api/search/postquery`, 'POST', {
        'Accept': 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': requestDigest
      }, postData).then((data: any): void => {
        const trendingContent: ITrendingDocument[] = [];
        if (data.PrimaryQueryResult && data.PrimaryQueryResult.RelevantResults &&
          data.PrimaryQueryResult.RelevantResults.Table.Rows.length > 0) {
          data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach((row: any): void => {
            const cells: ISearchResultValue[] = row.Cells;
            const editorInfo: string[] = component.getValueFromResults('EditorOwsUser', cells).split('|');
            const modifiedDate: Date = new Date(component.getValueFromResults('LastModifiedTime', cells).replace('.0000000', ''));
            const dateString: string = (modifiedDate.getMonth() + 1) + '/' + modifiedDate.getDate() + '/' + modifiedDate.getFullYear();
            trendingContent.push({
              id: component.getValueFromResults('DocId', cells),
              url: component.getValueFromResults('ServerRedirectedURL', cells),
              title: component.getValueFromResults('Title', cells),
              previewImageUrl: component.getPreviewImageUrl(cells, siteUrl),
              lastModifiedTime: dateString,
              lastModifiedByName: component.trim(editorInfo[1]),
              lastModifiedByPhotoUrl: component.getUserPhotoUrl(component.trim(editorInfo[0]), siteUrl),
              extension: component.getValueFromResults('FileType', cells)
            });
          });
        }
        resolve(trendingContent);
      }, (error: any): void => {
        reject(error);
      });
    });
  }

  private loadTrendingContent(siteUrl: string, numberOfDocuments: number): void {
    const component: TrendingInThisSite = this;

    let requestDigest: string = null;
    component.getRequestDigest(siteUrl)
      .then((digest: string): void => {
        requestDigest = digest;
      }, (err: any): void => {
        component.handleError(err);
      })
      .then((): Promise<string[]> => {
        return component.getSiteMembers(siteUrl);
      }, (err: any): void => {
        component.handleError(err);
      })
      .then((siteMembers: string[]): Promise<string[]> => {
        return component.getActors(siteMembers, requestDigest, siteUrl);
      }, (err: any): void => {
        component.handleError(err);
      })
      .then((actors: string[]): Promise<ITrendingDocument[]> => {
        return component.getTrendingContent(siteUrl, actors, requestDigest);
      }, (err: any): void => {
        component.handleError(err);
      })
      .then((trendingDocuments: ITrendingDocument[]): void => {
        component.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
          previousState.trendingDocuments.length = 0;
          return previousState;
        });
        trendingDocuments.forEach((result): void => {
          component.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
            previousState.trendingDocuments.push(result);
            return previousState;
          });
        });
        component.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
          previousState.loading = false;
          return previousState;
        });
      }, (err: any): void => {
        component.handleError(err);
      });
  }

  private handleError(err: any): void {
    if (err.responseJSON && err.responseJSON.error) {
      this.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
        previousState.error = "The following error has occured while running the query: " + err.responseJSON.error.message.value;
        return previousState;
      });
    } else if (err.responseJSON && err.responseJSON["odata.error"]) {
      this.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
        previousState.error = "The following error has occured while running the query: " + err.responseJSON["odata.error"].message.value;
        return previousState;
      });
    } else {
      this.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
        previousState.error = "An unexpected error occured while running the query";
        return previousState;
      });
    }

    this.setState((previousState: ITrendingInThisSiteState, curProps: ITrendingInThisSiteProps): ITrendingInThisSiteState => {
      previousState.loading = false;
      return previousState;
    });
  }

  private getRequestDigest(siteUrl: string): Promise<string> {
    const component: TrendingInThisSite = this;
    return new Promise<string>((resolve, reject): void => {
      component.request(`${siteUrl}/_api/contextinfo`, 'POST').then((data: { FormDigestValue: string }): void => {
        resolve(data.FormDigestValue);
      }, (error: any): void => {
        reject(error);
      });
    });
  }
}
