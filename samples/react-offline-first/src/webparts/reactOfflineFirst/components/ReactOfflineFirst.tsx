import * as React from 'react';
import styles from './ReactOfflineFirst.module.scss';
import { IReactOfflineFirstProps } from './IReactOfflineFirstProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReactOfflineFirstState } from './IReactOfflineFirstState';
import { IOfflineStorageRequest } from '../services/IOfflineStorageRequest';
import { IOfflineStorageItem } from '../services/IOffllineStorageItem';
import { OfflineFirstHTTPService } from '../services/OfflineFirstHTTPService';

/**
 * Uses the OfflineFistHTTPService as a demo of how to use it.
 * @export
 * @class ReactOfflineFirst
 * @extends {React.Component<IReactOfflineFirstProps, IReactOfflineFirstState>}
 */
export default class ReactOfflineFirst extends React.Component<IReactOfflineFirstProps, IReactOfflineFirstState> {
  private offlineHTTP: OfflineFirstHTTPService;

  /**
   * Creates an instance of ReactOfflineFirst.
   * @param {IReactOfflineFirstProps} props 
   * @memberof ReactOfflineFirst
   */
  public constructor(props: IReactOfflineFirstProps) {
    super(props);
    this.state = {
      listOfGitHubRepos : []
    } as IReactOfflineFirstState;
    this.offlineHTTP = new OfflineFirstHTTPService();
  }

  /**
   * Normal SPFX Webpart lifecycle.
   * But uses localStorage.
   * @memberof ReactOfflineFirst
   */
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
          //setstate callback.
          this.componentDidMountWithLocal(demoOfflineRequest);
      });
    })
    .catch((error: Error|any) => {
      // Wasn't found in local storage, try live versuon.
      this.componentDidMountWithLocal(demoOfflineRequest);
      console.error(error);
    });
  }

  /**
   * Custom SPFX Webpart lifecycle using setState optional callback.
   * Retrieves a live version. If the user is offline nothing will
   * happen, but the user will still get a result if they got an
   * item from localstorage.
   * @private
   * @param {any} demoOfflineRequest 
   * @memberof ReactOfflineFirst
   */
  private componentDidMountWithLocal(demoOfflineRequest):void {
    //setTimeout, so we can see what's happening
    setTimeout(() => {
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
    }, 3000);
  }

  /**
   * Normal SPFX Webpart lifecycle.
   * @returns {React.ReactElement<IReactOfflineFirstProps>} 
   * @memberof ReactOfflineFirst
   */
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
