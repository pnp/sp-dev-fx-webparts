import * as React from 'react';
import { MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './MicrosoftGroups.module.scss';
import TeamsGraphConsumer from './MyTeams';
import GraphConsumer from './Microsoft365Groups';
export interface IMicrosoftGroupsProps {
  context: WebPartContext;
}

export interface IMicrosoftGroupsState {
    title: string;
}
export default class MicrosoftGroups extends React.Component<IMicrosoftGroupsProps, IMicrosoftGroupsState> {
  constructor(props) {
    super(props);
    this.state = {
        title: ''
    };
  }
  public SwitchGroupList(ID) {
      this.setState({title: ID});
  }

  public render(): React.ReactElement<IMicrosoftGroupsProps> {
return <div>  
        <div className={styles.tableStyle}>
      <div className={styles.headerStyle}  >  
        <button className={styles.MainViewCenter} id={'Microsoft 365 Groups'} onClick={() => this.SwitchGroupList('Microsoft 365 Groups')}>Microsoft 365 Groups</button> 
        <button className={styles.MainViewCenter} id={'My Teams'} onClick={() => this.SwitchGroupList('My Teams')}>My Teams</button>  
   </div></div>
   {this.state.title === 'Microsoft 365 Groups' ? <GraphConsumer context={this.props.context}/> : <div></div>}
   {this.state.title === 'My Teams' ? <TeamsGraphConsumer context={this.props.context} hidden={false}/>: <TeamsGraphConsumer context={this.props.context} hidden={true}/>}
   </div>;
}
}