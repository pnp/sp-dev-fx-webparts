import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './Breadcrumb.module.scss';
import { IBreadcrumbProps } from './IBreadcrumbProps';
//import { IFolderState } from './IFolderState';

export default class Breadcrumb extends React.Component<IBreadcrumbProps, {}> {  
  constructor(props) {
    super(props);
    
    this.state = {
      subFolders: []
    };
  }

  public render(): React.ReactElement<IBreadcrumbProps> {
    return (
      <div className={styles.breadcrumb}>
        {this.props.grandParentFolder !== null && this.props.parentFolder !== null &&
        <Icon onClick={this.showRoot} iconName="DoubleChevronLeft" className={`ms-IconDoubleChevronLeft ${styles.rootIcon}`} />} 
        <div className={styles.row}>
          {this.props.grandParentFolder &&
          <div className={styles.grandParent}>
            <span className={styles.link} onClick={this.showParentFolder}>{this.props.grandParentFolder.name}</span>
          </div>}
          {this.props.parentFolder && 
          <div className={styles.grandParent}>
            <Icon iconName="ChevronRight" className="ms-IconChevronRight" />
            <span className={styles.nonLink}>{this.props.parentFolder.name}</span>
          </div>}
        </div>
      </div>
    );
  }

  private showRoot = () => {
    this.props.rootCallback();
  }

  private showParentFolder = () => {
    this.props.parentFolderCallback(this.props.grandParentFolder);
  }
}