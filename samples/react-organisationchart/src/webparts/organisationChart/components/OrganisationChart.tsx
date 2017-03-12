import * as React from 'react';
import styles from './OrganisationChart.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import { IOrganisationChartProps } from './IOrganisationChartProps';


import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IPerson, IUserProfileService } from '../interfaces';
import { UserProfileService } from '../services';
import { MockUserProfileService } from '../mocks';

export interface IOrganisationChartWebPartState {
  managers?: IPerson[];
  user?: IPerson;
  reports?: IPerson[];
}

export default class OrganisationChart extends React.Component<IOrganisationChartProps, IOrganisationChartWebPartState> {

  private userProfileServiceInstance: IUserProfileService;

  constructor(props: IOrganisationChartProps) {
    super(props);

    this.state = {
      managers: [],
      user: {
      },
      reports: [],
    };

    let serviceScope: ServiceScope;
    serviceScope = this.props.serviceScope;

    // Based on the type of environment, return the correct instance of the IUserProfileService interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.userProfileServiceInstance = serviceScope.consume(UserProfileService.serviceKey);
    }
    else {
      // This means webpart is running in the local workbench or from a unit test.
      // So we will need a non default implementation of the UserProfileService i.e. MockUserProfileService
      this.userProfileServiceInstance = serviceScope.consume(MockUserProfileService.serviceKey);
    }

  }

  public render(): React.ReactElement<IOrganisationChartProps> {
    return (
      <div className={styles['ms-OrgChart']}>
        <div className="ms-font-xl">
          {escape(this.props.organisationName)}
        </div>
        <div className="ms-OrgChart-group">
          <div className="ms-OrgChart-groupTitle">Managers</div>
          <ul className={styles['ms-OrgChart-list']}>
            {this.state.managers.map((manager, index) => (
              <li key={index} className={styles['ms-OrgChart-listItem']}>
                <button className={styles['ms-OrgChart-listItemBtn']} onClick={() => this.onProfileLinkClick(manager.UserUrl)}>
                  <div className="ms-Persona">
                    <div className="ms-Persona-imageArea">
                      <img className="ms-Persona-image" alt="" role="presentation" src={this.getProfilePhoto(manager.PictureUrl)}></img>
                    </div>
                    <div className="ms-Persona-details">
                      <div className="ms-Persona-primaryText">{manager.DisplayName}</div>
                      <div className="ms-Persona-secondaryText">{manager.Title}</div>
                    </div>
                  </div>
                </button>
              </li>))}
          </ul>
        </div>
        <div className="ms-OrgChart-group">
          <div className="ms-OrgChart-groupTitle">You</div>
          <ul className={styles['ms-OrgChart-list']}>
            <li className={styles['ms-OrgChart-listItem']}>
              <button className={styles['ms-OrgChart-listItemBtn']} onClick={() => this.onProfileLinkClick(this.state.user.UserUrl)}>
                <div className="ms-Persona">
                  <div className="ms-Persona-imageArea">
                    <img className="ms-Persona-image" alt="" role="presentation" src={this.getProfilePhoto(this.state.user.PictureUrl)}></img>
                  </div>
                  <div className="ms-Persona-details">
                    <div className="ms-Persona-primaryText">{this.state.user.DisplayName}</div>
                    <div className="ms-Persona-secondaryText">{this.state.user.Title}</div>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div className="ms-OrgChart-group">
          <div className="ms-OrgChart-groupTitle">Reports</div>
          <ul className={styles['ms-OrgChart-list']}>
            {this.state.reports.map((report, index) => (
              <li key={index} className={styles['ms-OrgChart-listItem']}>
                <button className={styles['ms-OrgChart-listItemBtn']} onClick={() => this.onProfileLinkClick(report.UserUrl)}>
                  <div className="ms-Persona">
                    <div className="ms-Persona-imageArea">
                      <img className="ms-Persona-image" alt="" role="presentation" src={this.getProfilePhoto(report.PictureUrl)}></img>
                    </div>
                    <div className="ms-Persona-details">
                      <div className="ms-Persona-primaryText">{report.DisplayName}</div>
                      <div className="ms-Persona-secondaryText">{report.Title}</div>
                    </div>
                  </div>
                </button>
              </li>))}
          </ul>
        </div>
      </div>
    );
  }

  public onProfileLinkClick(profileLink: string): void {
    window.open(profileLink);
  }

  public componentDidMount(): void {
    this._getUserProperties();
  }

  public getProfilePhoto(photoUrl: string): string {
    return this.userProfileServiceInstance.getProfilePhoto(photoUrl);
  }

  private _getUserProperties(): void {

    // Get the current user details
    this.userProfileServiceInstance.getPropertiesForCurrentUser().then((person: IPerson) => {
      this.setState({ user: person });

      // Get manager details
      this.userProfileServiceInstance.getManagers(person.ExtendedManagers).then((mngrs: IPerson[]) => {
        this.setState({ managers: mngrs });
      });

      // Get details for reports
      this.userProfileServiceInstance.getReports(person.DirectReports).then((rprts: IPerson[]) => {
        this.setState({ reports: rprts });
      });
    });
  }
}
