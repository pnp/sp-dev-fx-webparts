import * as React from 'react';
import { PersonaList }  from './PersonaList';
import { 
  Persona,
  PersonaSize,
  PersonaPresence 
} from 'office-ui-fabric-react';
import { FontClassNames } from '@uifabric/styling';
import { escape } from '@microsoft/sp-lodash-subset';
import { 
    IOrganisationChartProps,
    IPerson 
} from './PersonaCard.types';

export class OrganisationChart extends React.Component<IOrganisationChartProps, any> {
  // private userProfileServiceInstance: IUserProfileService;

  constructor(props: IOrganisationChartProps) {
      super(props);     
  }

  public render(): React.ReactElement<IOrganisationChartProps> {
    const user = this.props.user;
    const managers = this.props.managers;
    const reports = this.props.reports;

    return (
      <div>
        <div className={FontClassNames.xLarge}>
          {escape(user.Properties.Department)}
        </div>
        <PersonaList
          title='Managers'           
          users={managers}
        />
        <div>
          <div className={FontClassNames.large}>You</div>
          <Persona
            imageUrl={ user.PictureUrl !== null ?`/_layouts/15/userphoto.aspx?size=M&url=${user.PictureUrl}`:''}
            primaryText={user.DisplayName}
            secondaryText={user.Title}
            size={PersonaSize.regular}
            presence={PersonaPresence.none}
            onClick={(ev) =>this._onProfileLinkClick(ev, user.UserUrl)}
          />
        </div>
        <PersonaList
          title='Reports'
          users={reports} 
        />
      </div>
    );
  } 
  
  private _onProfileLinkClick(ev: any, userUrl:string):void{
    window.location.href = userUrl;  
    ev.stopPropagation();
    ev.preventDefault();            
  }
}
  