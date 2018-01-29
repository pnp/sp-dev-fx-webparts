import * as React from 'react';
import { 
  Persona,
  PersonaSize,
  PersonaPresence,
  FontClassNames 
} from 'office-ui-fabric-react';
import { IPersonaListProps } from './PersonaCard.types';

export class PersonaList extends React.Component<IPersonaListProps, {}> {
  constructor(props: IPersonaListProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <div className={FontClassNames.large}>{this.props.title}</div>
        {this.props.users.map((user, index) => (
          <div key={index}>
            <Persona
              imageUrl={ user.PictureUrl !== null ?`/_layouts/15/userphoto.aspx?size=M&url=${user.PictureUrl}`:''}
              primaryText={user.DisplayName}
              secondaryText={user.Title}
              size={PersonaSize.regular}
              presence={PersonaPresence.none}
              onClick={(ev) => this._onProfileLinkClick(ev, user.UserUrl)}
            />
          </div>
        ))}
      </div>
    );
  }
  
  private _onProfileLinkClick(ev: any, userUrl:string):void{
    window.location.href = userUrl;  
    ev.stopPropagation();
    ev.preventDefault();            
  }
}