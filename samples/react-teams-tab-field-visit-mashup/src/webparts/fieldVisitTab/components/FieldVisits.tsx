import * as React from 'react';
import styles from './FieldVisits.module.scss';
import { IVisitService } from '../services/VisitService/IVisitService';
import { IWeatherService } from '../services/WeatherService/IWeatherService';
import { IMapService } from '../services/MapService/IMapService';
import { IDocumentService } from '../services/DocumentService/IDocumentService';
import { IActivityService } from '../services/ActivityService/IActivityService';
import { IConversationService } from '../services/ConversationService/IConversationService';
import { IPhotoService } from '../services/PhotoService/IPhotoService';

import { IVisit } from '../model/IVisit';
import { IUser } from '../model/IUser';

import { UserTabs } from './UserTabs';
import { VisitList } from './VisitList';
import { CompanyInfo } from './CompanyInfo';
import { Weather } from './Weather';
import { Map } from './Map';
import { Documents } from './Documents';
import { Activities } from './Activities';
import { PostToChannel } from './PostToChannel';
import { Photos } from './Photos';

export interface IFieldVisitsProps {
  visitService: IVisitService;
  weatherService: IWeatherService;
  mapService: IMapService;
  documentService: IDocumentService;
  activityService: IActivityService;
  conversationService: IConversationService;
  photoService: IPhotoService;
  currentUserEmail: string;
  groupName?: string;
  groupId?: string;
  channelId?: string;
  teamsApplicationId: string;
  entityId: string;
  subEntityId?: string;
}

export interface IFieldVisitsState {
  dataFetched?: boolean;
  users?: IUser[];
  allVisits?: IVisit[];
  filteredVisits?: IVisit[];
  selectedVisit?: IVisit;
  subEntityId?: string;
}

export class FieldVisits extends React.Component<IFieldVisitsProps, IFieldVisitsState> {

  constructor(props: IFieldVisitsProps) {
    super(props);
    this.state = {
      dataFetched: false,
      users: [],
      allVisits: [],
      filteredVisits: [],
      selectedVisit: undefined,   // NOTE If defined, selectedVisit should reference a member of visits[]
      subEntityId: props.subEntityId
    };
  }

  public render(): React.ReactElement<IFieldVisitsProps> {

    if (!this.state.dataFetched) {
      this.props.visitService.getGroupVisits(this.props.groupId, this.props.groupName)
        .then((visits) => {
          var u = this.getUsersFromVisits(visits);
          var fv = this.filterVisitsBySelectedUsers(visits, u);
          this.setState({
            users: u,
            allVisits: visits,
            filteredVisits: fv,
            selectedVisit: undefined,
            dataFetched: true
          });
        });
    }

    if (this.state.dataFetched) {

      // Unpack data
      let address: string = "";
      let city: string = "";
      let state: string = "";
      let country: string = "";
      let postalCode: string = "";
      let customerId: string = "";
      let customerName: string = "";
      if (this.state.selectedVisit && this.state.selectedVisit.customer) {
        address = this.state.selectedVisit.customer.Address;
        city = this.state.selectedVisit.customer.City;
        state = this.state.selectedVisit.customer.Region;
        country = this.state.selectedVisit.customer.Country;
        postalCode = this.state.selectedVisit.customer.PostalCode;
        customerId = this.state.selectedVisit.customer.CustomerID;
        customerName = this.state.selectedVisit.customer.CompanyName;
      }

      // Handle deep link, if any
      let userChanged = false;
      if (this.state.subEntityId) {
        let [deeplinkUser, deeplinkCustomerId] = this.props.subEntityId ?
          this.props.subEntityId.split(':') : ["", ""];

        if (this.state.users) {
          this.state.users.forEach(user => {
            if (user.email == deeplinkUser && !user.isSelected) {
              userChanged = true;
              this.handleUserSelectionChanged(user);
            }
          });
        }

        if (!userChanged) {
          if (this.state.filteredVisits) {
            this.state.filteredVisits.forEach(visit => {
              if (visit.customer.CustomerID == deeplinkCustomerId) {
                this.handleVisitSelectionChanged(visit);
              }
              this.setState({
                subEntityId: undefined
              });
            });
          }
        }
      }

      // Get currently selected user
      let selectedUser = "";
      if (this.state.users) {
        this.state.users.forEach((user) => { if (user.isSelected) { selectedUser = user.email; } });
      }

      return (

        <div className={styles.fieldVisits}>
          <div className={styles.fieldVisitsRow}>
            <div className={styles.fieldVisitsLeftColumn}>
              <UserTabs users={this.state.users}
                userSelectionChanged={this.handleUserSelectionChanged.bind(this)}
              />
              <VisitList visits={this.state.filteredVisits}
                selectedVisit={this.state.selectedVisit}
                visitSelectionChanged={this.handleVisitSelectionChanged.bind(this)}
              />
              <Activities service={this.props.activityService}
                customerId={customerId} />
              <Documents service={this.props.documentService}
                customerId={customerId} />
              <Photos service={this.props.photoService}
                customerId={customerId} />
            </div>
            <div className={styles.fieldVisitsRightColumn}>
              <Weather service={this.props.weatherService}
                country={country} postalCode={postalCode} />
              <CompanyInfo visit={this.state.selectedVisit} />
              <PostToChannel channelId={this.props.channelId}
                entityId={this.props.entityId}
                teamsApplicationId={this.props.teamsApplicationId}
                customerId={customerId}
                customerName={customerName}
                selectedUser={selectedUser}
                address={address}
                city={city}
                state={state}
                country={country}
                postalCode={postalCode}
                conversationService={this.props.conversationService}
                mapService={this.props.mapService} />
              <Map service={this.props.mapService}
                address={address} city={city} state={state}
                country={country} postalCode={postalCode} />
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }

  private handleUserSelectionChanged(user: IUser) {
    var oldUsers = this.state.users;
    var newUsers: IUser[] = [];
    // ** use this code to allow only one user to be selected **
    if (oldUsers) {
      oldUsers.forEach((u) => {
        let newUser = u;
        newUser.isSelected = u.email == user.email;
        newUsers.push(newUser);
      });  
    }
    // ** use this code to allow multuple users to be selected **
    // oldUsers.forEach((u) => {
    //   let newUser = u;
    //   if (u.email == user.email) {
    //     newUser.isSelected = !u.isSelected;
    //   }
    //   newUsers.push(newUser);
    // });
    var fv = this.filterVisitsBySelectedUsers(this.state.allVisits, newUsers);
    var sv = fv.filter((v) => (v == this.state.selectedVisit)).length > 0 ?
      this.state.selectedVisit : undefined;
    this.setState({
      users: newUsers,
      filteredVisits: fv,
      selectedVisit: sv
    });
  }

  private handleVisitSelectionChanged(visit: IVisit) {
    this.setState({
      selectedVisit: visit
    });
  }

  private filterVisitsBySelectedUsers(visits: IVisit[] | undefined, users: IUser[]): IVisit[] {
    var result: IVisit[] = [];

    if (visits) {
      visits.forEach((visit) => {
        let showVisit = false;
        visit.calendarItem.Attendees.forEach((attendee) => {
          if (users.filter((u) => (u.isSelected && u.email == attendee.email)).length > 0) {
            showVisit = true;
          }
        });
        if (showVisit) {
          result.push(visit);
        }
      });    
    }

    return result;
  }

  private getUsersFromVisits(visits: IVisit[]) {

    var result: IUser[] = [];
    visits.forEach((visit) => {
      if (visit.calendarItem.Attendees) {
        visit.calendarItem.Attendees.forEach((attendee) => {
          if ((attendee.email != "?? GROUP EMAIL ??") &&
            (result.filter((i: IUser) => (i.email == attendee.email)).length == 0)) {
            result.push({
              fullName: attendee.fullName,
              email: attendee.email,
              isSelected: attendee.email == this.props.currentUserEmail
            });
          }
        });
      }
    });

    return result.sort((a, b) => (a.fullName < b.fullName ? -1 : 1));
  }
}
