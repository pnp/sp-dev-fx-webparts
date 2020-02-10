import * as React from 'react';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import Breadcrumb from './controls/Breadcrumb';
import Folder from './Folder';
import styles from './Groups.module.scss';
import { ITeamsProps } from './ITeamsProps';
import { ITeamsState } from './ITeamsState';
import { IFolder } from '../../../model/IFolder';

export default class Teams extends React.Component<ITeamsProps, ITeamsState> {  
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      grandParentFolder: null,
      parentFolder: null,
      showSpinner: false
    };    
  }

  public componentDidMount() {
    if (this.props.graphController !== null) {
      this.getTeams();
    }
  }

  public render(): React.ReactElement<ITeamsState> {
    let fldrs = this.state.folders.map((fldr) => {
      return <Folder folder={fldr} subFolderCallback={fldr.parentFolder===null?this.getGroupDrives:this.getSubFolders}></Folder>;
    });
    return (
      <div className={styles.groups}>
        <div>          
          <div>
            <Breadcrumb 
                grandParentFolder={this.state.grandParentFolder} 
                parentFolder={this.state.parentFolder}
                rootCallback={this.showRoot}
                parentFolderCallback={this.showParentFolder}>
            </Breadcrumb>
          </div>
        </div>
        <div className="recent-content">
          <ul className={styles.list}>
            {fldrs}
          </ul>
        </div>        
        <div>
          <PrimaryButton
              className={styles.saveBtn}         
              text="Save here"
              onClick={this.saveMailTo}
              disabled={this.state.parentFolder === null}
              allowDisabledFocus={true}
            />
          { this.state.showSpinner && (
              <div className={styles.spinnerContainer}>
                <Overlay >
                  <Spinner size={ SpinnerSize.large } label='Processing request' />
                </Overlay>
              </div>
            ) }
        </div>
      </div>
    );
  }

  private getTeams = () => {
    this.props.graphController.getJoinedTeams().then((folders) => {
      this.setState((prevState: ITeamsState, props: ITeamsProps) => {
        return {
          folders: folders
        };
      });
    });
  }

  private getGroupDrives = (group: IFolder) => {
    let nextParent: IFolder = null;
    this.state.folders.forEach((fldr) => {
      if (fldr.id === group.id) {
        nextParent = fldr;
      }
    });
    this.props.graphController.getGroupDrives(group).then((folders) => {
      if (folders.length > 0) {
        this.setState((prevState: ITeamsState, props: ITeamsProps) => {
          return {
            folders: folders,
            grandParentFolder: null,
            parentFolder: group
          };
        });
      }
    });
  }

  private getSubFolders = (folder: IFolder) => { 
    if (folder.id === folder.driveID) {
      this.props.graphController.getGroupRootFolders(folder).then((folders) => {
        this.setState((prevState: ITeamsState, props: ITeamsProps) => {
          return {
            folders: folders,
            grandParentFolder: folder.parentFolder,
            parentFolder: folder
          };
        });
      });
    }
    else {
      this.props.graphController.getSubFolder(folder).then((folders) => {
        this.setState((prevState: ITeamsState, props: ITeamsProps) => {
          return {
            folders: folders,
            grandParentFolder: folder.parentFolder,
            parentFolder: folder
          };
        });
      });
    }
  }

  
  private showRoot = () => {
    this.getTeams();
  }

  private showParentFolder = (parentFolder: IFolder) => {
    if (this.state.grandParentFolder===null) {
      this.getGroupDrives(parentFolder);
    }
    else {
      this.getSubFolders(parentFolder);
    }
  }

  private saveMailTo = () => {
    this.setState((prevState: ITeamsState, props: ITeamsProps) => {
      return {
        showSpinner: true
      };
    });
    this.props.graphController.retrieveMimeMail(this.state.parentFolder.driveID, this.state.parentFolder.id, this.props.mail, this.saveMailCallback);    
  }

  private saveMailCallback = (message: string) => {
    this.setState((prevState: ITeamsState, props: ITeamsProps) => {
      return {
        showSpinner: false
      };
    });
    if (message.indexOf('Success') > -1) {
      this.props.successCallback(message);
    }
    else {
      this.props.errorCallback(message);
    }
  }
}