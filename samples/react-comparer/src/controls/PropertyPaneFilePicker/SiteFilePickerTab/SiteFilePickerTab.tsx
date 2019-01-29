import * as React from 'react';
import styles from './SiteFilePickerTab.module.scss';
import { ISiteFilePickerTabProps, ISiteFilePickerTabState } from '.';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import DocumentLibraryBrowser from './DocumentLibraryBrowser/DocumentLibraryBrowser';
import { ILibrary } from './DocumentLibraryBrowser/DocumentLibraryBrowser.types';
import FileBrowser from './FileBrowser/FileBrowser';
import * as strings from 'PropertyPaneFilePickerStrings';
import { IFile } from './FileBrowser/FileBrowser.types';

export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
  constructor(props: ISiteFilePickerTabProps) {
    super(props);

    this.state = {
      libraryAbsolutePath: undefined,
      libraryTitle: strings.DocumentLibraries,
      libraryPath: undefined,
      folderName: strings.DocumentLibraries
    };
  }


  public render(): React.ReactElement<ISiteFilePickerTabProps> {


    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{this.state.folderName}</h2>
        </div>
        <div className={styles.tab}>
          {this.state.libraryAbsolutePath === undefined &&
            <DocumentLibraryBrowser
              context={this.props.context}
              onOpenLibrary={(selectedLibrary: ILibrary) => this._handleOpenLibrary(selectedLibrary)} />}
          {this.state.libraryAbsolutePath !== undefined &&
            <FileBrowser
              onChange={(fileUrl: string) => this._handleSelectionChange(fileUrl)}
              onOpenFolder={(folder: IFile) => this._handleOpenFolder(folder)}
              context={this.props.context}
              libraryName={this.state.libraryTitle}
              rootPath={this.state.libraryPath}
              accepts={this.props.accepts} />}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.fileUrl}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }


  private _handleSelectionChange = (imageUrl: string) => {
    this.setState({
      fileUrl: imageUrl
    });
  }

  private _handleSave = () => {
    this.props.onSave(this.state.fileUrl);
  }

  private _handleClose = () => {
    this.props.onClose();
  }

  private _handleOpenFolder = (folder: IFile) => {
    this.setState({
      libraryPath: folder.fileRef,
      folderName: folder.fileLeafRef,
      libraryAbsolutePath: folder.absoluteRef
    });
  }

  private _handleOpenLibrary = (library: ILibrary) => {
    this.setState({
      libraryAbsolutePath: library.absoluteUrl,
      libraryTitle: library.title,
      libraryPath: library.serverRelativeUrl
    });
  }
}
