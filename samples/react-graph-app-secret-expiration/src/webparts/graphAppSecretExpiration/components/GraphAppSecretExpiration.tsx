import * as React from 'react';
import styles from './GraphAppSecretExpiration.module.scss';
import { IGraphAppSecretExpirationProps } from './IGraphAppSecretExpirationProps';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IApplications, IApplication, IFormattedApplication } from '../../../models/IApplication';
import { IGraphAppSecretExpirationState } from './GraphAppSecretExpirationState';
import * as moment from 'moment';
import { Spinner, mergeStyles, SearchBox } from '@fluentui/react';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import * as strings from 'GraphAppSecretExpirationWebPartStrings';
import sampleApplications from '../../../models/SampleApplications.json';

const stackItemHidden = mergeStyles({
  display: 'none',
});
const _viewFields: IViewField[] = [
  {
    name: "applicationId",
    displayName: "Application ID",
    minWidth: 250,
    linkPropertyName: "linkTitle"
  },
  {
    name: "displayName",
    displayName: "Display Name",
    minWidth: 150,
    maxWidth: 300
  },
  {
    name: "daysLeft",
    displayName: "Days left",
    minWidth: 80,
    sorting: true,
    render: (app: any) => {
      let fontColor;
      if (app.daysLeft == 0) {
        fontColor = "Red";
      } else if (app.daysLeft < 30) {
        fontColor = "Orange";
      }
      const element: any = React.createElement("span", { style: { color: fontColor } }, app.daysLeft);
      return element;
    }
  },
  {
    name: "type",
    displayName: "Type",
    minWidth: 60,
  },
  {
    name: "expirationDate",
    displayName: "Expiration Date",
    minWidth: 150,
  }
];


export default class GraphAppSecretExpiration extends React.Component<IGraphAppSecretExpirationProps, IGraphAppSecretExpirationState> {

  constructor(props: IGraphAppSecretExpirationProps) {
    super(props);
    this.state = {
      applications: [],
      filteredApplications: [],
      filterValue: "",
      searchFilter: "",
      error: undefined,
      loading: true,
      groupByFields: [],
      page: 1
    };
  }


  public componentDidMount(): void {
    if (!this.props.displaySampleData) {
      this._getApplications();
    } else {
      this._propertiesMapping(sampleApplications.applications);
    }

  }

  private _getApplications(): IApplication[] {
    let retrievedApplications: IApplication[] = [];
    if (!this.props.graphClient) {
      return;
    }

    this.props.graphClient
      .api("applications")
      .version("v1.0")
      .select("appId,displayName,passwordCredentials,keyCredentials")
      .get((err: any, res: IApplications): void => {
        if (err) {
          this.setState({
            error: err.message ? err.message : "An error occured",
            loading: false
          });
          return;
        }
        // applications retrived successfully
        if (res && res.value && res.value.length > 0) {
          this.setState({
            loading: false
          });
          retrievedApplications = res.value;
          this._propertiesMapping(retrievedApplications);
        }
        else {
          this.setState({
            loading: false
          });
        }
      });
  }


  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }


  private _propertiesMapping = (applications: IApplication[]) => {
    let displayedApplication: IFormattedApplication[] = [];
    var today = (moment(Date.now())).format('DD-MMM-YYYY');
    try {
      applications.forEach(app => {
        app.passwordCredentials.forEach(pswd => {
          let daysBeforeExpiration = moment.duration((moment(pswd.endDateTime)).diff(today, 'days'), 'days').asDays();
          let formatedApp: IFormattedApplication = {
            applicationId: app.appId,
            displayName: app.displayName,
            type: "Secret",
            expirationDate: (moment(pswd.endDateTime)).format('DD-MMM-YYYY'),
            daysLeft: daysBeforeExpiration > 0 ? daysBeforeExpiration : 0,
            linkTitle: "https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Credentials/appId/" + app.appId
          };
          if (this.props.expiringSoon) {
            if (daysBeforeExpiration < 30) {
              displayedApplication.push(formatedApp);
            }
          } else {
            displayedApplication.push(formatedApp);
          }
        });
        app.keyCredentials.forEach(keyCred => {
          let daysBeforeExpiration = moment.duration((moment(keyCred.endDateTime)).diff(today, 'days'), 'days').asDays();
          let formatedApp: IFormattedApplication = {
            applicationId: app.appId,
            displayName: app.displayName,
            type: "Certificate",
            expirationDate: (moment(keyCred.endDateTime)).format('DD-MMM-YYYY'),
            daysLeft: daysBeforeExpiration > 0 ? daysBeforeExpiration : 0,
            linkTitle: "https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Credentials/appId/" + app.appId
          };
          if (this.props.expiringSoon) {
            if (daysBeforeExpiration < 30) {
              displayedApplication.push(formatedApp);
            }
          } else {
            displayedApplication.push(formatedApp);
          }
        });
      });
      this.setState({
        applications: displayedApplication,
        filteredApplications: displayedApplication,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
    this._groupView();
  }

  private _getPage(selectedPage: number) {
    this.setState({
      page: selectedPage
    });
  }

  private _filterApplication = (value, clear: boolean) => {
    let searchResult: IFormattedApplication[] = [];
    if (clear) {
      this.state.applications.forEach(app => {
        if (this._filterByProperties(app, value)) {
          searchResult.push(app);
        }
      });
      this.setState({
        filteredApplications: searchResult,
        filterValue: value
      });
    } else {
      this.setState({
        filteredApplications: this.state.applications,
        filterValue: value,
        page: 1
      });
    }

  }

  private _filterByProperties(application: IFormattedApplication, filterValue) {
    if (application.applicationId.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
      return true;
    } else if (application.displayName.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
      return true;
    } else if (application.expirationDate.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
      return true;
    } else if (application.type.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  private _groupView = () => {
    if (this.props.groupByColumn !== "none") {
      let groupByFields: IGrouping[] = [
        {
          name: this.props.groupByColumn,
          order: GroupOrder.ascending
        }
      ];
      this.setState({
        groupByFields: groupByFields
      });
    } else {
      this.setState({
        groupByFields: []
      });
    }


  }

  public render(): React.ReactElement<IGraphAppSecretExpirationProps> {
    return (
      <div className={styles.graphAppSecretExpiration}>
        <div className={styles.container}>
          <br />
          <p className={styles.title}>Certificates and secrets :</p>
          <div className={this.state.loading ? "" : stackItemHidden}>
            <Spinner label="Loading..." ariaLive="assertive" labelPosition="left" />
            <br />
          </div>
          <div className={this.state.loading ? stackItemHidden : ""}>
            <SearchBox placeholder="Search" onChange={(e, text) => this._filterApplication(text, true)} onClear={() => this._filterApplication("", false)} value={this.state.filterValue} />
            <ListView
              items={this.state.filteredApplications.slice(this.state.page === 1 || this.state.filterValue !== "" ? 0 : this.state.page * 10 - 10, this.state.page * 10)}
              viewFields={_viewFields}
              iconFieldName="ServerRelativeUrl"
              compact={true}
              selectionMode={SelectionMode.none}
              selection={this._getSelection}
              groupByFields={this.state.groupByFields}
              showFilter={false}
              filterPlaceHolder="Search..." />
          </div>
          <Pagination
            currentPage={1}
            totalPages={Math.floor(this.state.filteredApplications.length / 10) + 1}
            onChange={(page) => this._getPage(page)}
            limiter={3} // Optional - default value 3
            hideFirstPageJump // Optional
            hideLastPageJump // Optional
            limiterIcon={"Emoji12"} // Optional
          />
        </div>
      </div>
    );
  }
}
