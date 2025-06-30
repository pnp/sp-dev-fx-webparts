import * as React from 'react';
import { IAzureAppsProps } from './IAzureAppsProps';
import { IAppModel } from '../../../common/models/IAppModel';
import { IAzureAppsState } from './IAzureAppsState';
import { DefaultButton, Dialog, DialogFooter, DocumentCard, DocumentCardActivity, DocumentCardDetails, DocumentCardTitle, DocumentCardType, IButtonStyles, IconButton, IDocumentCardActivityPerson, Modal, ScrollablePane, Spinner, Sticky, StickyPositionType } from 'office-ui-fabric-react';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import RegisterApp from '../../../common/components/RegisterApp';
import styles from './AzureApps.module.scss';
import * as _ from 'lodash';
import * as moment from 'moment';

export default class azureApps extends React.Component<IAzureAppsProps, IAzureAppsState> {
  private appEditLink = "https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/";
  constructor(props: IAzureAppsProps, state: IAzureAppsState) {
    super(props);

    this.state = {
      apps: [],
      loading: true,
      error: "",
      isModalOpen: false,
      isDialogHidden: true,
      isRefreshed: true,
    }

  }

  componentDidMount(): void {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getApps().then((retrievedApps) => {

      retrievedApps.forEach(async currentApp => {
        await this.getAllOwners(currentApp.Id).then((users) => {
          currentApp.users = users;
        });

        this.setState((prevState: IAzureAppsState, nextState: IAzureAppsState): IAzureAppsState => {
          nextState = cloneDeep(prevState);

          nextState.apps = retrievedApps;
          nextState.error = "";
          nextState.loading = false;

          return nextState;
        })
      });

    })
  }

  private getApps = (): Promise<IAppModel[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<IAppModel[]>(async (resolve, reject) => {
      try {
        const retrievedApps: IAppModel[] = [];
        const result = await this.props.graphClient
          .api("applications")
          .get();

        if (result && result.value && result.value.length > 0) {

          for (let index = 0; index < result.value.length; index++) {
            const currApp = result.value[index];
            if (currApp.createdDateTime !== null) {
              const app: IAppModel = {
                Id: "",
                appId: "",
                displayName: "",
                createdDateTime: null,
                users: []
              };

              app.Id = currApp.id;
              app.appId = currApp.appId;
              app.displayName = currApp.displayName;
              app.createdDateTime = moment(new Date(currApp.createdDateTime)).format("LLLL");

              retrievedApps.push(app);
            }
          }
          resolve(retrievedApps);
        }
        else {
          this.setState({
            loading: false
          });
        }

      }
      catch (Exception) {
        console.log("error");
        reject();
      }
    })
  }

  private getAllOwners = (id: string): Promise<IDocumentCardActivityPerson[]> => {
    const users: IDocumentCardActivityPerson[] = [];
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.props.graphClient
          .api("/applications/" + id + "/owners").
          get();

        if (result && result.value && result.value.length) {
          for (let index = 0; index < result.value.length; index++) {
            const currentUser = result.value[index]
            const userDetails: IDocumentCardActivityPerson = {
              name: "",
              profileImageSrc: ""
            };

            userDetails.name = currentUser.displayName;
            userDetails.profileImageSrc = '';

            users.push(userDetails);
          }

          resolve(users);
        }
      }
      catch (Exception) {
        reject();
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public refreshCallback = async (latestapp: IAppModel) => {
    const apps = this.state.apps;
    apps.push(latestapp);
    console.log("Apps on callback: " + this.state.apps.length);
    await this.setState((prevState: IAzureAppsState, newState: IAzureAppsState) => {
      newState = cloneDeep(prevState);
      newState.apps.push(latestapp);
      newState.isRefreshed = false;

      return newState;
    })

  }

  public ModalAction(): void {
    this.setState((prevState: IAzureAppsState, newState: IAzureAppsState) => {
      newState = cloneDeep(prevState);
      newState.isModalOpen = !this.state.isModalOpen;

      return newState;
    })
  }

  private handlerRefreshClick = (): void => {
    window.location.reload();

    this.setState((prevState: IAzureAppsState, newState: IAzureAppsState): IAzureAppsState => {
      newState = cloneDeep(prevState);

      newState.isRefreshed = true;

      return newState;
    })
  }

  public render(): React.ReactElement<IAzureAppsProps> {
    const iconStyles: Partial<IButtonStyles> = {
      root: {
        //color: black,
        marginLeft: '650px',
        marginTop: '4px',
      },
      rootHovered: {
        //color: theme.palette.neutralDark,
      },
    };

    _.orderBy(this.state.apps, function (o) {
      return moment(new Date(o.createdDateTime)).format("hh:mm:ss")
    }, ['desc']);


    return (
      <div className={styles.mainarea}>
        {
          this.state.loading ?
            <div>
              <Spinner hidden={this.state.loading} label="Loading Data..." ariaLive="assertive" labelPosition="top" />
            </div> :
            <ScrollablePane className={styles.scrollPane}>
              <Sticky stickyPosition={StickyPositionType.Header}>
                <DefaultButton text='Register App' onClick={this.ModalAction.bind(this)} />
              </Sticky>
              {

                this.state.apps.length ?
                  this.state.apps.map(currentApp => (
                    <div key={currentApp.Id}>
                      {currentApp.users.length ?
                        <DocumentCard
                          className={styles.documentCard}
                          type={DocumentCardType.compact}
                          onClickHref={this.appEditLink + currentApp.appId}
                          onClickTarget='_blank'>
                          <DocumentCardDetails>
                            <DocumentCardTitle title={currentApp.displayName} className={styles.documentCardTitle} />
                            <DocumentCardActivity activity={currentApp.createdDateTime.toString()} people={currentApp.users.slice(0, currentApp.users.length)} />
                          </DocumentCardDetails>
                        </DocumentCard>
                        :
                        <div />
                      }
                    </div>

                  ))
                  :
                  <h4>No apps found</h4>
              }
            </ScrollablePane>
        }

        {/* Modal to register new app. */}
        <div>
          <Modal isOpen={this.state.isModalOpen}>
            <div>

              {/* <div className={styles.iconButtonStyles}> */}
              <div>
                <IconButton
                  className={styles.iconButtonStyles}
                  styles={iconStyles}
                  iconProps={{ iconName: 'Cancel' }}
                  ariaLabel="Close popup modal"
                  onClick={this.ModalAction.bind(this)}
                />
              </div>
              <RegisterApp
                graphClient={this.props.graphClient}
                modal={this.ModalAction.bind(this)}
                callBack={this.refreshCallback.bind(this)} />
            </div>
          </Modal>
        </div>
        {/* Dialog to reload page. */}
        <div>
          <Dialog dialogContentProps={{
            title: "Refresh to get the latest app."
          }}
            styles={{
              main: {
                maxHeight: '150px !important',
                minHeight: '150px !important'
              }
            }}
            hidden={this.state.isRefreshed}>
            <DialogFooter>
              <DefaultButton text='Refresh' onClick={this.handlerRefreshClick.bind(this)} />
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    );
  }
}
