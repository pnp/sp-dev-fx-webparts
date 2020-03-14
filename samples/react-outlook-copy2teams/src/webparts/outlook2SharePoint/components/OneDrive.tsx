import * as React from 'react';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import Folder from './Folder';
import styles from './Groups.module.scss';
import Breadcrumb from './controls/Breadcrumb';
import { IOneDriveProps } from './IOneDriveProps';
import { IOneDriveState } from './IOneDriveState';
import { IFolder } from '../../../model/IFolder';

export default class OneDrive extends React.Component<IOneDriveProps, IOneDriveState> {  
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
      this.getFolder();
    }
  }
  public render(): React.ReactElement<IOneDriveProps> {
    let fldrs = this.state.folders.map((fldr) => {
      return <Folder folder={fldr} subFolderCallback={this.getSubFolders}></Folder>;
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

  private getFolder = () => {
    this.props.graphController.getOneDriveFolder().then((folders) => {
      this.setState((prevState: IOneDriveState, props: IOneDriveProps) => {
        return {
          folders: folders
        };
      });
    });
  }

  private getSubFolders = (folder: IFolder) => {
    this.props.graphController.getSubFolder(folder).then((folders) => {
      if (folders.length > 0) {
        this.setState((prevState: IOneDriveState, props: IOneDriveProps) => {
          return {
            folders: folders,
            grandParentFolder: folder.parentFolder,
            parentFolder: folder
          };
        });
      }
    });
  }

  private showRoot = () => {
    this.getFolder();
  }

  private showParentFolder = (parentFolder: IFolder) => {
    this.getSubFolders(parentFolder);
  }

  private saveMailTo = () => {
    this.setState((prevState: IOneDriveState, props: IOneDriveProps) => {
      return {
        showSpinner: true
      };
    });
    this.props.graphController.retrieveMimeMail(this.state.parentFolder.driveID, this.state.parentFolder.id, this.props.mail, this.saveMailCallback);    
  }

  private saveMailCallback = (message: string) => {
    this.setState((prevState: IOneDriveState, props: IOneDriveProps) => {
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