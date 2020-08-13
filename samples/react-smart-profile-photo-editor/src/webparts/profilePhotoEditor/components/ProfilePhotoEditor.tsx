import * as React from 'react';

import styles from './ProfilePhotoEditor.module.scss';
import { IProfilePhotoEditorProps } from './IProfilePhotoEditorProps';
import { IProfilePhotoEditorState } from './IProfilePhotoEditorState';

// Used for localized text
import * as strings from 'ProfilePhotoEditorWebPartStrings';

// Used to allow dragging and dropping files
import Files from "react-butterfiles";

// Used to crop image
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

// Used for messages
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

// Used for toolbar
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { AnalysisPanelDialog, IPhotoRequirements } from './AnalysisDialog';


// Used to determine if we should be making real calls to APIs or just mock calls
import { Environment, EnvironmentType, DisplayMode } from '@microsoft/sp-core-library';
import { WebCamDialog } from './WebCamDialog';

// Used to prompt user for configuration
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

// Constants used for file upload settings
const maxSize: string = '4mb';
const acceptedFiles: string[] = ["image/jpg", "image/jpeg", "image/png"];


/**
 * Displays an upload area with support for webcam and allows users to crop an image
 *
 * Used in this class:
 * - Cropper: provides image cropping functionality
 * - Files: provides drag and drop file upload capability
 */
export default class ProfilePhotoEditor extends React.Component<IProfilePhotoEditorProps, IProfilePhotoEditorState> {
  /**
   * Holds a reference to the cropper
   */
  private cropper: Cropper = undefined;

  /**
   * Holds a reference to the div that can be clicked to launch the file browser
   */
  private fileBrowser: HTMLDivElement = undefined;

  /**
   *  Constructor
   */
  constructor(props: IProfilePhotoEditorProps) {
    super(props);

    this.state = {
      errors: [],
      showWebCamDialog: false
    };
  }

  public render(): React.ReactElement<IProfilePhotoEditorProps> {
    const { azureVisionEndpoint, azureVisionKey } = this.props;

    const needsConfiguration = azureVisionEndpoint === undefined || azureVisionKey === undefined;

    return (
      <div className={styles.profilePhotoEditor}>
        { needsConfiguration ? this.renderPlaceholder() : this.renderPhotoEditor() }
      </div>
    );
  }

  private renderPlaceholder(): JSX.Element {
    return <Placeholder iconName='AzureLogo'
             iconText='Configure API key'
             description={`Before you can use this web part, you'll need to provide an API key for Azure Cognitive Services.`}
             buttonLabel='Configure'
             hideButton={this.props.displayMode === DisplayMode.Read}
             onConfigure={this._onConfigure} />;
  }

  private renderPhotoEditor(): JSX.Element {
    return <>
    {this.state.errors.length > 0 && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={(_ev) => this.resetFiles()}
            dismissButtonAriaLabel={strings.CloseLabel}
            truncated={false}
          >
            {this.state.errors.map((error: any, _index: number) => {
              console.log("ERROR:", error);
              let errorMessage: string = strings.UnexpectedErrorLabel;
              switch (error.type) {
                case "unsupportedFileType":
                  errorMessage = strings.UnsupportedFileTypeErrorLabel;
                  break;
                case "maxSizeExceeded":
                  errorMessage = strings.MaxSizeExceededErrorLabel;
                  break;
                case "multipleNotAllowed":
                  errorMessage = strings.MultipleFileTypeErrorLabel;
                  break;
              }

              return <p><b>{strings.ErrorLabel}:</b> {errorMessage}</p>;

            })}
          </MessageBar>
        )}
        <CommandBar
          items={this.getCommandBarItems()}
          overflowItems={this.getOverflowItems()}
          overflowButtonProps={{ ariaLabel: strings.MoreCommandAriaLabel }}
          farItems={this.getFarItems()}
          ariaLabel={strings.CommandBarAriaLabel}
        />
        <Files
          accept={acceptedFiles}
          convertToBase64
          maxSize={maxSize}
          onSuccess={this.handleSuccess}
          onError={this.handleErrors}
        >
          {({ browseFiles, getDropZoneProps }) => (
            <>
              {this.state.imageUrl !== undefined ? (
                <div
                  {...getDropZoneProps({
                    className: styles.dropZone
                  })}>
                  <Cropper
                    className={styles.cropper}
                    aspectRatio={1}
                    guides={true}
                    src={this.state.imageUrl}
                    ref={cropper => { this.cropper = cropper; }}
                  />
                  <div ref={(elm) => this.fileBrowser = elm}
                    onClick={browseFiles}
                    {...getDropZoneProps({
                      className: styles.hiddenDropZone
                    })}
                  />
                </div>
              ) : (
                  <div
                    ref={(elm) => this.fileBrowser = elm}
                    onClick={browseFiles}
                    {...getDropZoneProps({
                      className: styles.dropZone
                    })}
                  >
                    <div className={styles.placeholderDescription}>
                      <span className={styles.placeholderDescriptionText}>{this.props.instructions}</span>
                    </div>
                  </div>
                )}
            </>
          )}
        </Files>
        {this.state.showWebCamDialog &&
          <WebCamDialog
            onDismiss={() => {
              this.setState({
                showWebCamDialog: false
              });
            }}
            onCapture={(imageUrl: string) => {
              this.setState({
                imageUrl,
                showWebCamDialog: false
              });
            }}
          />}
          </>;
  }

  /**
   * Gets called when a file has been successfully uploaded
   */
  private handleSuccess = (files: any) => {
    this.setState({
      imageUrl: files[0].src.base64,
      errors: []
    });
  }

  /**
   * Gets called when an error has occurred uploading a file
   */
  private handleErrors = (errors: any) => {
    console.log("Handle errors", errors);
    this.setState({
      imageUrl: undefined,
      errors
    });
  }

  /**
   * Resets the editor by removing all files and errors
   */
  private resetFiles = () => {
    this.setState({
      imageUrl: undefined,
      errors: []
    });
  }

  /**
   * Renders the command bar items
   */
  private getCommandBarItems = () => {
    return [
      {
        key: 'upload',
        name: strings.UploadButtonName,
        iconProps: {
          iconName: 'Add'
        },
        onClick: () => {
          this.fileBrowser.click();
        }
      },
      {
        key: 'webcam',
        name: strings.CameraButtonName,
        iconProps: {
          iconName: 'Camera'
        },
        //disabled: true,
        title: strings.CameraButtonLabel,
        onClick: () => this.getWebCamPhoto()
      },
      {
        key: 'Save',
        name: strings.SubmitButtonName,
        iconProps: {
          iconName: 'Save'
        },
        disabled: this.state.imageUrl === undefined,
        title: this.state.imageUrl === undefined ? strings.SubmitPhotoDisabledTitle : strings.SubmitPhotoTitle,
        onClick: () => this.submitPhoto()
      }
    ];
  }

  /**
   * Renders the overflow items -- we don't have any right now
   */
  private getOverflowItems = () => {
    return [
    ];
  }

  /**
   * Renders the menu items at the far right of the toolbar
   */
  private getFarItems = () => {
    return [
      {
        key: 'reset',
        ariaLabel: strings.ResetAriaLabel,
        iconProps: {
          iconName: 'Refresh'
        },
        onClick: () => this.resetFiles()
      }
    ];
  }

  private getWebCamPhoto = () => {
    this.setState({
      showWebCamDialog: true
    });
  }

  /**
   * Calls the dialog to submit the photo
   */
  private submitPhoto = () => {
    // Get the image to approve
    const imageToApprove: string = this.cropper.getCroppedCanvas().toDataURL();
    this.cropper.getCroppedCanvas().toBlob((blob: Blob)=> {
      const photoRequirements: IPhotoRequirements = {
        allowAdult: this.props.allowAdult,
        allowClipart: this.props.allowClipart,
        allowGory: this.props.allowGory,
        allowLinedrawing: this.props.allowLinedrawing,
        requirePortrait: this.props.requirePortrait,
        allowRacy: this.props.allowRacy,
        forbiddenKeywords: this.props.forbiddenKeywords && this.props.forbiddenKeywords.replace('; ', ';').replace(' ;', ';').split(';')
      };
      // Create a new instance of the analysis dialog
      const callout: AnalysisPanelDialog = new AnalysisPanelDialog(imageToApprove, this.props.azureVisionKey, this.props.azureVisionEndpoint, photoRequirements, this.props.context, blob);

      // Show the dialog
      callout.show();

    });
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
}
