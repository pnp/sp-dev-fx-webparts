import * as React from 'react';
import styles from './ReactOfflineFirst.module.scss';
import { IReactOfflineFirstProps } from './IReactOfflineFirstProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReactOfflineFirstState } from './IReactOfflineFirstState';
import { IOfflineStorageRequest } from '../services/IOfflineStorageRequest';
import { IOfflineStorageItem } from '../services/IOffllineStorageItem';
import { OfflineFirstHTTPService } from '../services/OfflineFirstHTTPService';

export default class ReactOfflineFirst extends React.Component<IReactOfflineFirstProps, IReactOfflineFirstState> {
  private offlineHTTP: OfflineFirstHTTPService;

  public constructor(props: IReactOfflineFirstProps) {
    super(props);
    window['disableBeaconLogToConsole'] = true;
    this.state = {
      listOfGitHubRepos : []
    } as IReactOfflineFirstState;
    this.offlineHTTP = new OfflineFirstHTTPService();
  }

  public componentDidMount(): void {
    const demoUrl: string = "https://api.github.com/orgs/SharePoint/repos";
    const demoRequest: RequestInfo = {
      url: demoUrl
    } as RequestInfo;
    const demoOfflineRequest: IOfflineStorageRequest = {key: "demoGet", value:{ requestInfo: demoRequest, requestInit: null}} as IOfflineStorageRequest;

    this.offlineHTTP.getFromLocal(demoOfflineRequest.key)
    .then( (offlineItem: any) => {
      this.setState({listOfGitHubRepos: offlineItem},
        () => {
          console.log('retrieved items from offline.');
          //set state callback.
          this.componentDidMountWithLocal(demoOfflineRequest);
      });
    })
    .catch((error: Error|any) => {
      console.error(error);
    });
  }

  private componentDidMountWithLocal(demoOfflineRequest):void {
    this.offlineHTTP.getFromServer(demoOfflineRequest)
    .then( (onlineItem: any) => {
      this.setState({listOfGitHubRepos: onlineItem},
        () => {
          console.log('retrieved items from online.');
          //set state callback.
      });
    })
    .catch((error: Error|any) => {
      console.error(error);
    });
  }

  public render(): React.ReactElement<IReactOfflineFirstProps> {
    return (
      <div className={ styles.reactOfflineFirst }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              {
                this.state.listOfGitHubRepos &&
                this.state.listOfGitHubRepos.map((repo) => {
                  return (
                    <div>
                      {repo.full_name}
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
