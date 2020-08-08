import * as React from 'react';
import styles from './Outlook2SharePoint.module.scss';
import * as strings from 'Outlook2SharePointWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import GraphController from '../../../controller/GraphController';
import Groups from './Groups';
import OneDrive from './OneDrive';
import Teams from './Teams';
import { IOutlook2SharePointProps } from './IOutlook2SharePointProps';
import { IOutlook2SharePointState } from './IOutlook2SharePointState';

export default class Outlook2SharePoint extends React.Component<IOutlook2SharePointProps, IOutlook2SharePointState> {
  private graphController: GraphController;
  private saveMetadata = true; // For simplicity reasons and as I am not convinced with the current "Property handling" of Office Add-In we configure 'hard-coded'
  
  constructor(props) {
    super(props);
    this.state = {
      graphController: null,
      mailMetadata: null,
      showError: false,
      showSuccess: false,
      showOneDrive: false,
      showTeams: false,
      showGroups: false,
      successMessage: '',
      errorMessage: ''
    };
    this.graphController = new GraphController(this.saveMetadata);
    this.graphController.init(this.props.msGraphClientFactory)
      .then((controllerReady) => {
        if (controllerReady) {
          this.graphClientReady();
        }        
      });
  }

  public render(): React.ReactElement<IOutlook2SharePointProps> {

    return (
      <div className={ styles.outlook2SharePoint }>
        {this.state.mailMetadata !== null &&
          <div className={styles.metadata}>
            <div><Icon iconName="InfoSolid" /> {strings.SaveInfo}</div>
            <div className={styles.subMetadata}>{strings.To} <a href={this.state.mailMetadata.saveUrl}>{this.state.mailMetadata.saveDisplayName}</a></div>
            <div className={styles.subMetadata}>{strings.On} <span>{this.state.mailMetadata.savedDate.toLocaleDateString()}</span></div>
          </div>}
        {this.state.showSuccess && <div>
          <MessageBar
            messageBarType={MessageBarType.success}
            isMultiline={false}
            onDismiss={this.closeMessage}            
            dismissButtonAriaLabel="Close"
            truncated={true}
            overflowButtonAriaLabel="See more"
          >
            {this.state.successMessage}
          </MessageBar>
        </div>}  
        {this.state.showError && <div>
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={this.closeMessage}          
            dismissButtonAriaLabel="Close"
            truncated={true}
            overflowButtonAriaLabel="See more"
          >
            {this.state.errorMessage}
          </MessageBar>
        </div>} 
        <div className={styles.header} onClick={this.showOneDrive}>
          <Icon iconName="OneDrive" className={`ms-IconOneDrive ${styles.headerIcon}`} />                      
          <span className={styles.headerText}>OneDrive</span>
        </div>      
        {this.state.graphController && this.state.showOneDrive && 
                                        <OneDrive 
                                          graphController={this.state.graphController} 
                                          mail={this.props.mail}
                                          successCallback={this.showSuccess}
                                          errorCallback={this.showError}>
                                        </OneDrive>}
        
        <div className={styles.header} onClick={this.showTeams}>
          <Icon iconName="TeamsLogo" className={`ms-IconTeamsLogo ${styles.headerIcon}`} />                      
          <span className={styles.headerText}>Microsoft Teams</span>
        </div>
        {this.state.graphController && this.state.showTeams &&
                                        <Teams 
                                          graphController={this.state.graphController} 
                                          mail={this.props.mail}
                                          successCallback={this.showSuccess}
                                          errorCallback={this.showError}>
                                        </Teams>}
        <div className={styles.header} onClick={this.showGroups}>
          <Icon iconName="Group" className={`ms-IconGroup ${styles.headerIcon}`} />                      
          <span className={styles.headerText}>Microsoft Groups</span>
        </div>
        {this.state.graphController && this.state.showGroups &&
                                        <Groups 
                                          graphController={this.state.graphController} 
                                          mail={this.props.mail}
                                          successCallback={this.showSuccess}
                                          errorCallback={this.showError}>
                                        </Groups>}
      </div>
    );
  }

  
  /**
   * This function first retrieves all OneDrive root folders from user
   */
  private graphClientReady = () => {              
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        graphController: this.graphController
      };
    }); 
    if (this.saveMetadata) {
      this.getMetadata();
    }    
  }   
  
  private showError = (message: string) => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showError: true,
        showSuccess: false,
        errorMessage: message
      };
    });
  }

  private showSuccess = (message: string) => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showSuccess: true,
        showError: false,
        successMessage: message
      };
    });
  }

  private closeMessage = () => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showSuccess: false,
        showError: false
      };
    });
  }

  /**
   * This function expands the Teams section and collapses the other ones
   */
  private showTeams = () => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showTeams: true,
        showOneDrive: false,
        showGroups: false
      };
    });
  }

  /**
   * This function expands the OneDrive section and collapses the other ones
   */
  private showOneDrive = () => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showOneDrive: true,
        showTeams: false,
        showGroups: false
      };
    });
  }

  /**
   * This function expands the Groups section and collapses the other ones
   */
  private showGroups = () => {
    this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
      return {
        showGroups: true,
        showTeams: false,
        showOneDrive: false
      };
    });
  }

  private getMetadata() {
    this.state.graphController.retrieveMailMetadata(this.props.mail.id)
      .then((response) => {
        if (response !== null) {
          this.setState((prevState: IOutlook2SharePointState, props: IOutlook2SharePointProps) => {
            return {
              mailMetadata: response
            };
          });
        }
      });
  }
}
