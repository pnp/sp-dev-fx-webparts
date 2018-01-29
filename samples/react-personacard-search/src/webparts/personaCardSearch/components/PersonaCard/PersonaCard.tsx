import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  Text, 
  JsonUtilities,
  UrlUtilities
} from '@microsoft/sp-core-library';
import { PersonaList} from './PersonaList';
import {OrganisationChart} from './OrganisationChart';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
  IconButton,
  Spinner,
  SpinnerSize,
  Icon 
} from 'office-ui-fabric-react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  baseElementProperties
} from 'office-ui-fabric-react/lib/Utilities';
import {
  IPerson,   
  IPersonaCardProps,    
  IPersonCardState
} from './PersonaCard.types';
import { 
  assign, 
  getNativeProps 
} from '@uifabric/utilities';
import './PersonaCard.scss';
import { 
  Logger, 
  LogLevel
} from 'sp-pnp-js/lib/pnp';


export class PersonaCard extends BaseComponent<IPersonaCardProps, IPersonCardState> {
  constructor(props: IPersonaCardProps) {
    super(props); 
    this.state = {
      loading:false,     
      managers: [],
      reports:[],
      activeActionKey:'chat'      
    };    
  }
  
  public render() {    
    const user = this.props.user; 
    const areResultsLoading = this.state.loading;
    const managers = this.state.managers;
    const reports = this.state.reports;  
    const activeActionKey = this.state.activeActionKey;  
    const activeExpanderKey = this.state.ativeExpanderKey;
    const hasPhone = user.Properties.CellPhone.length > 0 || user.Properties.WorkPhone.length > 0 || user.Properties.HomePhone.length > 0;

    let orgChart: JSX.Element = areResultsLoading ? <Spinner size={ SpinnerSize.small } label={ 'Loading organisation chart..'} />: <div></div>;
    
    if(managers.length > 0 || reports.length > 0){
      orgChart = <OrganisationChart user={user}
                    managers={this.state.managers}
                    reports={this.state.reports} 
                  />;           
    }

    let wpContent: JSX.Element =    
      <div className={css('ms-PersonaCard', this.props.className)}>
          <div className='ms-PersonaCard-persona'>
            <Persona
              imageUrl={ user.PictureUrl !== null ?`/_layouts/15/userphoto.aspx?size=M&url=${user.PictureUrl}`:''}
              primaryText={user.DisplayName}
              secondaryText={user.Title}
              size={PersonaSize.large}
              presence={PersonaPresence.none}
              onClick={() => this._onProfileLinkClick(user.UserUrl)}
            />
          </div>
          <ul className='ms-PersonaCard-actions'>
            <li 
                className={css('ms-PersonaCard-action', ( activeActionKey === 'chat' ? 'is-active': null))}               
                onClick={(ev) => this._onActionClick('chat', ev)}>
                <Icon iconName='SkypeMessage'/>
            </li>
            {
              hasPhone ?
              <li 
                  className={css('ms-PersonaCard-action', ( activeActionKey === 'phone' ? 'is-active': null))}               
                  onClick={(ev) => this._onActionClick('phone', ev)}>
                  <Icon iconName='Phone'/>
              </li>
              :null
            } {
              hasPhone ?
              <li 
                  className={css('ms-PersonaCard-action', ( activeActionKey === 'call' ? 'is-active': null))}               
                  onClick={(ev) => this._onActionClick('call', ev)}>
                  <Icon iconName='SkypeForBusinessLogo16'/>
              </li>
              :null
            }           
            
            <li 
                className={css('ms-PersonaCard-action', ( activeActionKey === 'mail' ? 'is-active': null))}               
                onClick={(ev) => this._onActionClick('mail', ev)}>
                <Icon iconName='Mail'/>
            </li>
            <li className='ms-PersonaCard-overflow' title='View profile in Delve' onClick={() => this._onProfileLinkClick(user.UserUrl)}>View profile</li>
            <li 
                className={css('ms-PersonaCard-action ms-PersonaCard-orgChart', ( activeActionKey === 'org' ? 'is-active': null))}  
                onMouseDown={(ev) => this._onOrganisationChartClick(ev)}             
                onClick={(ev) => this._onActionClick('org', ev)}>
                <Icon iconName='Org'/>
            </li>
          </ul>
          <div className='ms-PersonaCard-actionDetailBox'>
            <div className={css('ms-PersonaCard-details', ( activeActionKey === 'chat' ? 'is-active': null))}> 
              <div className='ms-PersonaCard-detailLine'>
                <span className='ms-PersonaCard-detailLabel'>Skype: </span>
                <a className='ms-Link' href={`sip:${user.Email}`}>Start Skype chat</a>
              </div>              
            </div>
            {
              hasPhone ?               
                <div className={css('ms-PersonaCard-details', ( activeActionKey === 'phone' ? (activeExpanderKey === 'phone'? 'is-active' : 'is-active is-collapsed'): null))}>
                <div className='ms-PersonaCard-detailExpander'
                  onClick={(ev) => this._onExpanderClick('phone', ev)}
                  >
                </div>
                <div className='ms-PersonaCard-detailLine'>
                  <span className='ms-PersonaCard-detailLabel'>Details</span>
                </div> 
                  {
                     user.Properties.WorkPhone ?
                      <div className='ms-PersonaCard-detailLine'>
                        <span className='ms-PersonaCard-detailLabel'>Work Phone: </span>
                        {user.Properties.WorkPhone}
                      </div> 
                     :null
                  } 
                  {
                     user.Properties.HomePhone ?
                      <div className='ms-PersonaCard-detailLine'>
                        <span className='ms-PersonaCard-detailLabel'>Home Phone: </span>
                        {user.Properties.HomePhone}
                      </div> 
                     :null
                  }  
                  {
                     user.Properties.CellPhone ?
                      <div className='ms-PersonaCard-detailLine'>
                        <span className='ms-PersonaCard-detailLabel'>Cell Phone: </span>
                        {user.Properties.CellPhone}
                      </div> 
                     :null
                  }              
                </div> 
               :null
            }
            <div className={css('ms-PersonaCard-details', ( activeActionKey === 'call' ? 'is-active': null))}> 
              <div className='ms-PersonaCard-detailLine'>
                <span className='ms-PersonaCard-detailLabel'>Skype: </span>
                <a className='ms-Link' href={`callto:tel:${user.Properties.WorkPhone}`}>Start Skype call</a>
              </div>              
            </div>
            <div className={css('ms-PersonaCard-details', ( activeActionKey === 'mail' ? 'is-active': null))}> 
              <div className='ms-PersonaCard-detailLine'>
                <span className='ms-PersonaCard-detailLabel'>Work: </span>
                <a className='ms-Link' href={`mailto:${user.Email}`}>{user.Email}</a>
              </div>              
            </div>
            <div className={css('ms-PersonaCard-details', ( activeActionKey === 'org' ? 'is-active': null))}> 
              {orgChart}                           
            </div>          
          </div>
      </div>;  
    
    return (
      wpContent
    );
  }
  
  private _onActionClick(actionKey:string, ev: React.MouseEvent<HTMLElement>):void {
      this.setState({
        activeActionKey:actionKey === this.state.activeActionKey ? '': actionKey,       
      }); 
      ev.preventDefault();
      ev.stopPropagation();    
  }

  private _onExpanderClick(expanderKey:string, ev: React.MouseEvent<HTMLElement>):void {

    this.setState({
      ativeExpanderKey : expanderKey === this.state.ativeExpanderKey ? '' : expanderKey     
    }); 
    ev.preventDefault();
    ev.stopPropagation(); 
  }

  @autobind
  private _onOrganisationChartClick(ev: React.MouseEvent<HTMLElement>):void{
    this._getUserPropertiesFor();   
  }

  private _onProfileLinkClick(userUrl:string):void{
      window.location.href = userUrl;         
  }

  @autobind
  private async _getUserPropertiesFor(): Promise<void>{
    let person = this.props.user;

    if(person.ExtendedManagers.length > 0 && this.state.managers.length === 0){
      this.setState({ loading: true });

      this.props.getPropertiesForUsers(person.ExtendedManagers).then((managers: IPerson[]) =>{
        this.setState({ loading:false, managers: managers });
      });  
    }
    if(person.DirectReports.length > 0 && this.state.reports.length === 0){
      this.setState({ loading: true });

      this.props.getPropertiesForUsers(person.DirectReports).then((reports: IPerson[]) =>{
        this.setState({ loading:false, reports: reports });
      });  
    } 
  }  
}
