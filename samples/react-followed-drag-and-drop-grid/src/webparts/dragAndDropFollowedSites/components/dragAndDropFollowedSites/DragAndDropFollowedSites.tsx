import * as React from 'react';
import * as strings from 'DragAndDropFollowedSitesWebPartStrings';
import { MSGraphClient } from '@microsoft/sp-http';
import { IDragAndDropFollowedSitesProps } from './IDragAndDropFollowedSitesProps';
import { IDragAndDropFollowedSitesState } from './IDragAndDropFollowedSitesState';
import FollowedSitesService from '../../services/FollowedSites/FollowedSitesService';
import MyDataService from '../../services/MyData/MyDataService';
import IMyDataServiceInput from '../../services/MyData/IMyDataServiceInput';
import styles from './DragAndDropFollowedSites.module.scss';
import sortableStyles from '../sortableList/Sortable.module.scss';
import Constants from '../../../model/Constants';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import ErrorPanel from '../errorPanel/ErrorPanel';
import NoItems from '../noItems/NoItems';
import SortableList from '../sortableList/SortableList';
import { arrayMove } from 'react-sortable-hoc';
import IAppData from '../../../model/IAppData';
import IFollowedSite from '../../../model/IFollowedSite';

export default class DragAndDropFollowedSites extends React.Component<IDragAndDropFollowedSitesProps, IDragAndDropFollowedSitesState> {

  constructor(props) {
    super(props);

    this.state = {
      followedSitesService: null,
      myDataService: null,
      isError: false,
      isLoading: true,
      sortingIsActive: false,
      urls: []
    };
  }

  public componentDidMount(): void {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        const followedSitesService: FollowedSitesService = new FollowedSitesService(client);
        const myDataServiceInput: IMyDataServiceInput = {
          mSGraphClient: client,
          httpClient: this.props.context.httpClient,
          appDataFolderName: Constants.appDataFolderName,
          appDataJsonFileName: Constants.appDataJsonFileName
        };
        const myDataService: MyDataService = new MyDataService(myDataServiceInput);

        this.setState({
          followedSitesService,
          myDataService
        });

        this.state.myDataService.checkIfAppDataFolderExists()
          .then(appDataFolderExists => {
            if (appDataFolderExists.isError) {
              this.setState({
                isError: true,
                isLoading: false,
              });
              return;
            }

            if (!appDataFolderExists.folderExists) {
              this.state.myDataService
                .createAppDataFolder()
                .then(folderName => {
                  if (folderName === null) {
                    this.setState({
                      isError: true,
                      isLoading: false,
                    });
                    return;
                  }

                  this.LoadData();
                });
            } else {
              this.LoadData();
            }
          });
      });
  }

  public render(): React.ReactElement<IDragAndDropFollowedSitesProps> {

    const {
      urls,
      isLoading,
      isError,
      sortingIsActive } = this.state;

    const isEmpty: boolean = urls.length === 0 && !isLoading;

    return (
      <div className={styles.followedSites}>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div className={styles.columnFullWidth}>
              <Label className={styles.title}>{strings.Title}</Label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnFullWidth}>
              <div className={!isLoading || isError ? styles.hide : null}>
                <Spinner label={strings.Loading} ariaLive='assertive' labelPosition='right' />
              </div>
              <div className={!isError ? styles.hide : null}>
                <ErrorPanel />
              </div>
              <div className={isError ? styles.hide : null}>
                <div className={!isEmpty ? styles.hide : null}>
                  <NoItems />
                </div>
                <div className={sortingIsActive ? styles.isSortingActive : null} >
                  <SortableList
                    items={urls}
                    axis='xy'
                    helperClass={sortableStyles.sortableItemDragging}
                    onSortEnd={this.onSortEnd}
                    onSortStart={this.onSortStart}
                    useDragHandle={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private LoadData(): void {
    this.state.myDataService
      .getJsonAppDataFile()
      .then(appData => {
        if (appData === null) {
          this.setState({
            isError: true,
            isLoading: false,
          });
          return;
        }
        this.state.followedSitesService.getMyFollowedSites().then(followedSites => {
          const followedUrls: IFollowedSite[] = followedSites.value.map(element => {
            return {
              name: element[Constants.nameFollowedSites],
              url: element[Constants.urlFollowedSites]
            } as IFollowedSite;
          });
          followedUrls.forEach(followedItem => {
            if (appData.userFollowedSites.map(item => item.url).indexOf(followedItem.url) === -1) {
              appData.userFollowedSites.push(followedItem);
            }
          });
          appData.userFollowedSites = appData.userFollowedSites.filter(followedItem => followedUrls.map(item => item.url).indexOf(followedItem.url) > -1);
          this.state.myDataService.createOrUpdateJsonDataFile(appData);
          this.setState({
            urls: appData.userFollowedSites,
            isLoading: false,
            isError: false
          });
        });
      });
  }

  private onSortEnd = ({ oldIndex, newIndex }): void => {
    const prevItems = this.state.urls;
    this.setState({
      urls: arrayMove(prevItems, oldIndex, newIndex),
      sortingIsActive: false
    });

    const appData: IAppData = { userFollowedSites: this.state.urls };
    this.state.myDataService.createOrUpdateJsonDataFile(appData);
  }

  private onSortStart = (): void => {
    this.setState({ sortingIsActive: true });
  }
}
