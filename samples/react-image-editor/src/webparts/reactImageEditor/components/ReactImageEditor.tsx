import * as React from 'react';
import styles from './ReactImageEditor.module.scss';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { DisplayMode, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { ImageManipulation, IImageManipulationSettings } from '../../../components/ImageManipulation';


import { sp } from "@pnp/sp";
import { IconButton } from '@fluentui/react';


export interface IReactImageEditorBaseProps {
  showTitle: boolean;
  showEditIcon: boolean;
  title: string;
  url?: string;
  settings?: IImageManipulationSettings[];
  altText?: string;
  hideRecentTab?: boolean;
  hideWebSearchTab?: boolean;
  hideStockImages?: boolean;
  hideOrganisationalAssetTab?: boolean;
  hideOneDriveTab?: boolean;
  hideSiteFilesTab?: boolean;
  hideLocalUploadTab?: boolean;
  hideLinkUploadTab?: boolean;
}

export interface IReactImageEditorProps extends IReactImageEditorBaseProps {
  displayMode: DisplayMode;
  context: WebPartContext;
  updateTitleProperty: (value: string) => void;
  updateUrlProperty: (value: string) => void;
  updateManipulationSettingsProperty: (value: IImageManipulationSettings[]) => void;

}

export interface IReactImageEditorState {
  isFilePickerOpen: boolean;
  statekey: string;
}

export default class ReactImageEditor extends React.Component<IReactImageEditorProps, IReactImageEditorState> {
  constructor(props: IReactImageEditorProps) {
    super(props);
    this.state = {
      isFilePickerOpen: false,
      statekey: 'init'
    };
    this._onConfigure = this._onConfigure.bind(this);
    this._onUrlChanged = this._onUrlChanged.bind(this);
    this._onSettingsChanged = this._onSettingsChanged.bind(this);
     // Initialize the PnPjs `sp` object with the web part context
     sp.setup({
      spfxContext: this.props.context
  });
  }
  public render(): React.ReactElement<IReactImageEditorProps> {
    const { url } = this.props;
    const { isFilePickerOpen } = this.state;
    const isConfigured: boolean = !!url && url.length > 0;
    return (

      <div className={styles.reactImageEditor}>
        {this.props.showTitle &&
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateTitleProperty} />
        }
        {(isFilePickerOpen &&
          <FilePicker
            hideRecentTab={this.props.hideRecentTab}
            hideWebSearchTab={this.props.hideWebSearchTab}
            hideStockImages={this.props.hideStockImages}
            hideOrganisationalAssetTab={this.props.hideOrganisationalAssetTab}
            hideOneDriveTab={this.props.hideOneDriveTab}
            hideSiteFilesTab={this.props.hideSiteFilesTab}
            hideLocalUploadTab={this.props.hideLocalUploadTab}
            hideLinkUploadTab={this.props.hideLinkUploadTab}
            isPanelOpen={isFilePickerOpen}
            accepts={['.gif', '.jpg', '.jpeg', '.png']}
            buttonIcon={'FileImage'}
            onSave={(filePickerResult: IFilePickerResult[]) => {
             if(filePickerResult.length > 0){ 
              this.handleFileSave(filePickerResult[0]).catch((error => {
              console.error("Error in handleFileSave:", error);
            }));
          }
          
          }}
            
            onCancel={() => {
              this.setState({ isFilePickerOpen: false });
            }}
            onChange={(filePickerResult: IFilePickerResult[]) =>  {
              if(filePickerResult.length >0){
              this.setState({ isFilePickerOpen: false }, () => this._onUrlChanged(filePickerResult[0].fileAbsoluteUrl));
              }

            }}
            context={this.props.context}


          />)}
        {!isConfigured && this.props.displayMode !== DisplayMode.Edit ?
          <Placeholder iconName='Edit' iconText='Configure your web part'
            description='This web parts requires configuration. When you switch the page to edit mode it will enable you to select an image to display here.' /> : <div></div>
        }
        {!isConfigured && this.props.displayMode === DisplayMode.Edit ? (<Placeholder iconName='Edit'
          iconText='Select Image'
          description='Please select an image to display in this webpart.'
          buttonLabel='Select Image'
          onConfigure={this._onConfigure} />) :
          (
            <div>
              {
                this.props.displayMode === DisplayMode.Edit ?
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      title="Remove the current selected image"
                      ariaLabel="Remove"
                      onClick={this._clearSelection}
                    />
                    <IconButton
                      iconProps={{ iconName: 'Edit' }}
                      title="Change the selected image"
                      ariaLabel="Change image"
                      onClick={() => { this.setState({ isFilePickerOpen: true }) }}
                    />
                  </div> : <div></div>


              } <ImageManipulation
                settings={this.props.settings}
                configSettings={{
                  rotateButtons: [-90, -45, -30, 0, 30, 45, 90]
                }
                }
                displayMode={this.props.displayMode}
                settingsChanged={this._onSettingsChanged}
                src={this.props.url!} altText={this.props.altText? this.props.altText : "Image"}
              />
            </div>
          )
        }
      </div >
    );
  }
  private handleFileSave = async (filePickerResult: IFilePickerResult):Promise<void> => {
    try {
      if (!filePickerResult.downloadFileContent) {
        this.setState(
          { isFilePickerOpen: false },
          () => this._onUrlChanged(filePickerResult.fileAbsoluteUrl)
        );
        return;
      }

      // Get the base URL for Site Assets without duplicating paths
      const siteAssetsFolderUrl = `${this.props.context.pageContext.web.serverRelativeUrl}/SiteAssets`.replace(/\/+$/, "");

      // Ensure the folder structure exists for the current page
      const pageFolderUrl = await this.ensurePageFolder(siteAssetsFolderUrl);

      // Upload the file to the folder and get its absolute URL
      const uploadedFileUrl = await this.uploadFileToFolder(filePickerResult, pageFolderUrl);

      if (uploadedFileUrl) {
        // Update state and trigger URL change callback
        this.setState(
          { isFilePickerOpen: false },
          () => this._onUrlChanged(uploadedFileUrl)
        );
      }
    } catch (error) {
      console.error("Error handling file save:", error);
      this.setState({ isFilePickerOpen: false });
    }
  };


  /**
   * Ensures the folder hierarchy exists for the current page in the Site Assets library.
   * @param siteAssetsFolderUrl The base URL of the Site Assets library.
   * @returns The URL of the folder for the current page.
   */
  private async ensurePageFolder(siteAssetsFolderUrl: string): Promise<string> {
    try {
        const sitePagesFolderUrl = `${siteAssetsFolderUrl}/SitePages`;

        // Extract the current page name from the request path
        const pageName = this.getPageName();
        if (!pageName) {
            throw new Error("Unable to determine the current page name.");
        }

        const pageFolderUrl = `${sitePagesFolderUrl}/${pageName}`;

        // Ensure "SitePages" folder exists
        await this.ensureFolder(siteAssetsFolderUrl, "SitePages");

        // Ensure the folder for the current page exists
        await this.ensureFolder(sitePagesFolderUrl, pageName);

        return pageFolderUrl;
    } catch (error) {
        console.error("Error ensuring page folder:", error);
        throw error;
    }
}


  /**
  * Extracts the page name from the server request path.
  * @returns The current page name or null if not determinable.
  */
  private getPageName(): string | null {
    const requestPath = this.props.context.pageContext.site.serverRequestPath;
    if (!requestPath) {
      return null;
    }
    return requestPath.split('/').pop() ? requestPath.split('/').pop()!.replace(/\.[^/.]+$/, "") : null;

  }


  /**
   * Ensures a folder exists under a given parent folder.
   * @param parentFolderUrl The parent folder's URL.
   * @param folderName The name of the folder to ensure.
   */
  private async ensureFolder(parentFolderUrl: string, folderName: string): Promise<void> {
    try {
     // const folderUrl = `${parentFolderUrl}/${folderName}`;
     // const folder = await sp.web.getFolderByServerRelativeUrl(folderUrl).get();
      console.log(`Folder '${folderName}' already exists under '${parentFolderUrl}'`);
    } catch (error) {
      if (error.message.includes("404")) {
        // If the folder does not exist (404 error), create it
        await sp.web.getFolderByServerRelativeUrl(parentFolderUrl).folders.add(folderName);
        console.log(`Folder '${folderName}' created under '${parentFolderUrl}'`);
      } else {
        console.error("Error checking or creating folder:", error);
        throw error; // Rethrow other unexpected errors
      }
    }
  }



  /**
   * Uploads a file to a specified folder with a unique filename.
   * @param filePickerResult The result from the FilePicker.
   * @param folderUrl The URL of the folder to upload the file to.
   * @returns The absolute URL of the uploaded file.
   */
  private async uploadFileToFolder(filePickerResult: any, folderUrl: string): Promise<string | null> {
    try {
      if (!filePickerResult.downloadFileContent) {
        console.error("No file content to upload.");
        return null;
      }

      const fileBlob = await filePickerResult.downloadFileContent();

      // Generate a unique filename with a timestamp
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const uniqueFileName = `${filePickerResult.fileName.replace(/\.[^/.]+$/, "")}_${timestamp}${filePickerResult.fileName.match(/\.[^/.]+$/)[0]}`;

      // Convert the fileBlob to an ArrayBuffer
      const arrayBuffer = await fileBlob.arrayBuffer();

      // Upload the file
      const uploadResult = await sp.web.getFolderByServerRelativeUrl(folderUrl).files.add(uniqueFileName, arrayBuffer, true);

      // Return the absolute URL of the uploaded file
      return `${this.props.context.pageContext.web.absoluteUrl}${uploadResult.data.ServerRelativeUrl}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }

  private _clearSelection = ():void => {
    this.props.updateUrlProperty("");
    this.setState({
      isFilePickerOpen: false
    });
  }
  private _onConfigure = ():void => {
    if (Environment.type === EnvironmentType.Local) {
      this.setState({ isFilePickerOpen: false }, () => {
        this._onUrlChanged(
          'https://media.gettyimages.com/photos/'
          + 'whitewater-paddlers-descend-vertical-waterfall-in-kayak-picture-id1256321293?s=2048x2048'
        );
      });
    } else {
      this.setState({ isFilePickerOpen: true });
    }
  }
  private _onUrlChanged = (url: string):void => {
    this.props.updateUrlProperty(url);
  }
  private _onSettingsChanged = (settings: IImageManipulationSettings[]):void => {
    this.props.updateManipulationSettingsProperty(settings);
  }
}
