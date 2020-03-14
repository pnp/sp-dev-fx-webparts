import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './Folder.module.scss';
import { IFolderProps } from './IFolderProps';

export default class Folder extends React.Component<IFolderProps, {}> {  
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<IFolderProps> {
    return (
      <li className={styles.folder}>
        <Icon iconName="DocLibrary" className="ms-IconDocLibrary" />                      
        <span className={`${styles.header} ${styles.isLink}`} onClick={this.getSubFolder}>{this.props.folder.name}</span>
      </li>
    );
  }

  private getSubFolder = () => {
    this.props.subFolderCallback(this.props.folder);
  }
}