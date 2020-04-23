import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

import { FontClassNames } from '@uifabric/styling';

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

interface IPersonaListProps {
  title: string;
  users: IPerson[];
  getProfilePhoto: (photoUrl: string) => string;
  onProfileLinkClick: (profileLink: string) => void;
}

class PersonaList extends React.Component<IPersonaListProps, {}> {
  public render() {
    return (
      <div>
        <div className={FontClassNames.large}>{this.props.title}</div>
        {this.props.users.map((user, index) => (
          <div key={index}>
            <Persona
              imageUrl={this.props.getProfilePhoto(user.PictureUrl)}
              primaryText={user.DisplayName}
              secondaryText={user.Title}
              size={PersonaSize.regular}
              presence={PersonaPresence.none}
              onClick={() => this.props.onProfileLinkClick(user.UserUrl)}
            />
          </div>
        ))}
      </div>
    );
  }
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
      <div>
        <div className={FontClassNames.xLarge}>
          {escape(this.props.organisationName)}
        </div>
        <PersonaList
          title="Managers"
          users={this.state.managers}
          getProfilePhoto={this.getProfilePhoto.bind(this)}
          onProfileLinkClick={this.onProfileLinkClick.bind(this)}
        />
        <div>
          <div className={FontClassNames.large}>You</div>
          <Persona
            imageUrl={this.getProfilePhoto(this.state.user.PictureUrl)}
            primaryText={this.state.user.DisplayName}
            secondaryText={this.state.user.Title}
            size={PersonaSize.regular}
            presence={PersonaPresence.none}
            onClick={() => this.onProfileLinkClick(this.state.user.UserUrl)}
          />
        </div>
        <PersonaList
          title="Reports"
          users={this.state.reports}
          getProfilePhoto={this.getProfilePhoto.bind(this)}
          onProfileLinkClick={this.onProfileLinkClick.bind(this)}
        />
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
