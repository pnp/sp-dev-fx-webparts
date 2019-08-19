import * as React from 'react';

// Custom styles
import styles from './SiteFilePickerTab.module.scss';

// Custom picker interface
import { ISiteFilePickerTabProps, ISiteFilePickerTabState } from '.';
import { ILibrary } from './DocumentLibraryBrowser/DocumentLibraryBrowser.types';
import FileBrowser from './FileBrowser/FileBrowser';
import { IFile } from './FileBrowser/FileBrowser.types';
import DocumentLibraryBrowser from './DocumentLibraryBrowser/DocumentLibraryBrowser';

// Office Fabric
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';

// Localized strings
import * as strings from 'PropertyPaneFilePickerStrings';

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

  /**
   * Is called when user selects a different file
   */
  private _handleSelectionChange = (imageUrl: string) => {
    this.setState({
      fileUrl: imageUrl
    });
  }

  /**
   * Called when user saves
   */
  private _handleSave = () => {
    this.props.onSave(encodeURI(this.state.fileUrl));
  }

  /**
   * Called when user closes tab
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
   * Triggered when user opens a file folder
   */
  private _handleOpenFolder = (folder: IFile) => {
    this.setState({
      libraryPath: folder.fileRef,
      folderName: folder.fileLeafRef,
      libraryAbsolutePath: folder.absoluteRef
    });
  }

  /**
   * Triggered when user opens a top-level document library
   */
  private _handleOpenLibrary = (library: ILibrary) => {
    this.setState({
      libraryAbsolutePath: library.absoluteUrl,
      libraryTitle: library.title,
      libraryPath: library.serverRelativeUrl
    });
  }
}
