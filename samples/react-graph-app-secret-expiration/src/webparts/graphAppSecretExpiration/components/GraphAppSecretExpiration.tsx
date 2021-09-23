import * as React from 'react';
import styles from './GraphAppSecretExpiration.module.scss';
import { IGraphAppSecretExpirationProps } from './IGraphAppSecretExpirationProps';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IApplications, IApplication, IFormattedApplication } from '../../../models/IApplication';
import { IGraphAppSecretExpirationState } from './GraphAppSecretExpirationState';
import * as moment from 'moment';
import { DefaultButton, Spinner, mergeStyles } from '@fluentui/react';

const stackItemHidden = mergeStyles({
  display: 'none',
});
const _viewFields: IViewField[] = [
  {
    name: "applicationId",
    displayName: "Application ID",
    minWidth: 250
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
      error: undefined,
      loading: true,
      groupByFields: []
    };
  }


  public componentDidMount(): void {
    this._getApplications();
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

        if (app.passwordCredentials.length > 0) {
          app.passwordCredentials.forEach(pswd => {
            let daysBeforeExpiration = moment.duration((moment(pswd.endDateTime)).diff(today, 'days'), 'days').asDays();
            let formatedApp: IFormattedApplication = {
              applicationId: app.appId,
              displayName: app.displayName,
              type: "Secret",
              expirationDate: (moment(pswd.endDateTime)).format('DD-MMM-YYYY'),
              daysLeft: daysBeforeExpiration > 0 ? daysBeforeExpiration : 0
            };
            displayedApplication.push(formatedApp);
          });
        }
        if (app.keyCredentials.length > 0) {
          app.keyCredentials.forEach(keyCred => {
            let daysBeforeExpiration = moment.duration((moment(keyCred.endDateTime)).diff(today, 'days'), 'days').asDays();
            let formatedApp: IFormattedApplication = {
              applicationId: app.appId,
              displayName: app.displayName,
              type: "Certificate",
              expirationDate: (moment(keyCred.endDateTime)).format('DD-MMM-YYYY'),
              daysLeft: daysBeforeExpiration > 0 ? daysBeforeExpiration : 0
            };
            displayedApplication.push(formatedApp);
          });
        }
      });
      this.setState({
        applications: displayedApplication
      });
    } catch (error) {
      console.log(error);
    }
  }

  private _groupView = () => {
    if (this.state.groupByFields.length === 0) {
      let groupByFields: IGrouping[] = [
        {
          name: "applicationId",
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
          <p className={styles.title}>Application list :</p>
          <div className={this.state.loading ? "" : stackItemHidden}>
            <Spinner label="Loading..." ariaLive="assertive" labelPosition="left" />
            <br/>
          </div>
          <div className={this.state.loading ? stackItemHidden : ""}>
            <DefaultButton text={this.state.groupByFields.length === 0 ? "Group by App ID" : "Ungroup"} onClick={this._groupView} />
            <ListView
              items={this.state.applications}
              viewFields={_viewFields}
              iconFieldName="ServerRelativeUrl"
              compact={true}
              selectionMode={SelectionMode.none}
              selection={this._getSelection}
              groupByFields={this.state.groupByFields}
              showFilter={true}
              filterPlaceHolder="Search..." />
          </div>
        </div>
      </div>
    );
  }
}
