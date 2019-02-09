import * as React from 'react';
import styles from './GoogleFitActivityViewer.module.scss';
import { IGoogleFitActivityViewerProps } from './IGoogleFitActivityViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, SPHttpClient, HttpClientConfiguration, HttpClientResponse, ODataVersion, IHttpClientConfiguration, IHttpClientOptions, ISPHttpClientOptions } from '@microsoft/sp-http';
import { GoogleAuthorize } from 'react-google-authorize';
import { IGoogleFitActivityViewerState } from './IGoogleFitActivityViewerState';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { GoogleFitService } from '../../../services/GoogleFitService';
import { IDataService } from '../../../services/IDataService';

export default class GoogleFitActivityViewer extends React.Component<IGoogleFitActivityViewerProps, IGoogleFitActivityViewerState> {
  private dataCenterServiceInstance: IDataService;

  constructor(props) {
    super(props);

    this.state = {
      isGoogleAuthenticated: false,
      accessToken: "",
      stepCount: 0,
      calories: 0,
      distance: 0,
      activityTime: 0
    };
  }

  public render(): React.ReactElement<IGoogleFitActivityViewerProps> {
    const responseGoogle = (response) => {
      this.setState(() => {
        return {
          ...this.state,
          isGoogleAuthenticated: true,
          accessToken: response.access_token
        };
      });

      this.readStepCount(this.state.accessToken);
      this.readCalories(this.state.accessToken);
      this.readDistance(this.state.accessToken);
      this.readActivityTime(this.state.accessToken);
    };

    const formatNumber = (num) => parseFloat(num.toFixed(2)).toLocaleString().replace(/\.([0-9])$/, ".$10");

    return (
      <div className={styles.googleFitActivityViewer}>
        <div className={styles.container}>
          {
            !this.state.isGoogleAuthenticated && this.state.accessToken == "" &&
            <GoogleAuthorize
              scope={'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'}
              clientId={this.props.clientId}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            >
              <span>Login with Google</span>
            </GoogleAuthorize>
          }

          {
            this.state.isGoogleAuthenticated &&
            <div>
              <div className={styles.msTable}>
                <div className={styles.msTableRowHeader}>
                  <span className={styles.msTableCell}>
                    Today, {new Date().toDateString()}
                  </span>
                </div>
              </div>

              <div className={styles.msTable}>
                <div className={styles.msTableRow}>
                  <span className={styles.msTableCell}>
                    <Icon iconName="Clock" className="ms-IconExample" />
                  </span>
                  <span className={styles.msTableCell}>
                    <b>{formatNumber(this.state.activityTime)}</b> min
                </span>
                </div>

                <div className={styles.msTableRow}>
                  <span className={styles.msTableCell}>
                    <Icon iconName="POI" className="ms-IconExample" />
                  </span>
                  <span className={styles.msTableCell}>
                    <b>{formatNumber(this.state.distance)}</b> km
                </span>
                </div>

                <div className={styles.msTableRow}>
                  <span className={styles.msTableCell}>
                    <Icon iconName="CaloriesAdd" className="ms-IconExample" />
                  </span>
                  <span className={styles.msTableCell}>
                    <b>{formatNumber(this.state.calories)}</b> calories
                </span>
                </div>

                <div className={styles.msTableRow}>
                  <span className={styles.msTableCell}>
                    <Icon iconName="Running" className="ms-IconExample" />
                  </span>
                  <span className={styles.msTableCell}>
                    <b>{formatNumber(this.state.stepCount)}</b> steps
                </span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  private readStepCount(accessToken: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(GoogleFitService.serviceKey);

    this.dataCenterServiceInstance.getStepCount(accessToken).then((stepCount: number) => {
      this.setState(() => {
        return {
          ...this.state,
          stepCount: stepCount
        };
      });
    });
  }

  private readCalories(accessToken: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(GoogleFitService.serviceKey);

    this.dataCenterServiceInstance.getCalories(accessToken).then((calories: number) => {
      this.setState(() => {
        return {
          ...this.state,
          calories: calories
        };
      });
    });
  }

  private readDistance(accessToken: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(GoogleFitService.serviceKey);

    this.dataCenterServiceInstance.getDistance(accessToken).then((distance: number) => {
      this.setState(() => {
        return {
          ...this.state,
          distance: distance
        };
      });
    });
  }

  private readActivityTime(accessToken: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(GoogleFitService.serviceKey);

    this.dataCenterServiceInstance.getActivityTime(accessToken).then((activityTime: number) => {
      this.setState(() => {
        return {
          ...this.state,
          activityTime: activityTime
        };
      });
    });
  }
}
