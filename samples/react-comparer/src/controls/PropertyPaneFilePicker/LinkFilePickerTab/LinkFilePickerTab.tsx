import * as React from 'react';

// Custom styles
import styles from './LinkFilePickerTab.module.scss';

// Custom props and state
import { ILinkFilePickerTabProps, ILinkFilePickerTabState } from '.';
import { ItemType } from '../IPropertyPaneFilePicker';

// Office Fabric
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// PnP
import { FetchClient } from "@pnp/common";

// Localized strings
import * as strings from 'PropertyPaneFilePickerStrings';
import { GetAbsoluteDomainUrl } from '../../../CommonUtils';

export default class LinkFilePickerTab extends React.Component<ILinkFilePickerTabProps, ILinkFilePickerTabState> {
  constructor(props: ILinkFilePickerTabProps) {
    super(props);
    this.state = { isValid: false };
  }

  public render(): React.ReactElement<ILinkFilePickerTabProps> {
    const imageType: boolean = this.props.itemType === ItemType.Images;
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.LinkHeader}</h2>
        </div>
        <div className={styles.tab}>
          <TextField
            multiline={true}
            required={true}
            resizable={false}
            deferredValidationTime={300}
            className={styles.linkTextField}
            label={imageType ? strings.LinkImageInstructions : strings.LinkFileInstructions}
            ariaLabel={imageType ? strings.LinkImageInstructions : strings.LinkFileInstructions}
            defaultValue={"https://"}
            onGetErrorMessage={(value: string) => this._getErrorMessagePromise(value)}
            autoAdjustHeight={false}
            underlined={false}
            borderless={false}
            validateOnFocusIn={false}
            validateOnFocusOut={false}
            validateOnLoad={true}
            value={this.state.fileUrl}
            onChanged={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this._handleChange(newValue)}
          />
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.isValid}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Called as user types in a new value
   */
  private _handleChange = (newValue?: string) => {
    this.setState({
      fileUrl: newValue
    });
  }

  /**
   * Verifies the url that was typed in
   * @param value
   */
  private _getErrorMessagePromise(value: string): Promise<string> {
    return new Promise(resolve => {

      // DOn't give an error for blank or placeholder value, but don't make it a valid entry either
      if (value === undefined || value === 'https://') {
        this.setState({ isValid: false });
        resolve('');
        return;
      }

      // Make sure that user is typing a valid URL format
      if (!this._isUrl(value)) {
        this.setState({ isValid: false });
        resolve('');
        return;
      }

      // If we don't allow external links, verify that we're in the same domain
      if (!this.props.allowExternalTenantLinks && !this._isSameDomain(value)) {
        this.setState({ isValid: false });
        resolve(strings.NoExternalLinksValidationMessage);
        return;
      }

      // Make sure that item is an image
      if (this.props.itemType === ItemType.Images) {
        if (!this._isImage(value)) {
          this.setState({ isValid: false });
          resolve(strings.NoImageValidationMessage);
          return;
        }
      }

      // Verify the file exists by actually getting the item
      try {
        const client = new FetchClient();
        client.fetch(value, { method: "HEAD" }).then((response) => {
          if (!response.ok) {
            this.setState({ isValid: false });
            resolve(strings.CantValidateValidationMessage);
            return;
          }
          // the file exists
          this.setState({ isValid: true });
          resolve('');
        }, () => {
          this.setState({ isValid: false });
          resolve(strings.CantValidateValidationMessage);
        }).catch(() => {
          this.setState({ isValid: false });
          resolve(strings.CantValidateValidationMessage);
        });
      } catch (error) {
        console.log("Error verifying file", error);
        this.setState({ isValid: false });
        resolve(strings.CantValidateValidationMessage);
      }
    });
  }

  /**
   * Handles when user saves
   */
  private _handleSave = () => {
    this.props.onSave(encodeURI(this.state.fileUrl));
  }

  /**
   * HAndles when user closes without saving
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
   * Is this a URL ?
   * (insert guy holding a butterfly meme)
   */
  private _isUrl = (fileUrl: string): boolean => {
    try {
      const myURL = new URL(fileUrl.toLowerCase());
      return myURL.host !== undefined;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that file ends with an image extension.
   * Should really check the content type instead.
   */
  private _isImage = (fileName: string): boolean => {
    const acceptableExtensions: string[] = this.props.accepts.toLowerCase().split(",");
    // ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg"

    const thisExtension: string = this._getFileExtension(fileName);
    return acceptableExtensions.indexOf(thisExtension) > -1;
  }

  /**
   * Inspired from the code in PnP controls
   */
  private _getFileExtension = (fileName): string => {

    // Split the URL on the dots
    const splitFileName = fileName.toLowerCase().split('.');

    // Take the last value
    let extensionValue = splitFileName.pop();

    // Check if there are query string params in place
    if (extensionValue.indexOf('?') !== -1) {
      // Split the string on the question mark and return the first part
      const querySplit = extensionValue.split('?');
      extensionValue = querySplit[0];
    }

    return `.${extensionValue}`;
  }

  private _isSameDomain = (fileUrl: string): boolean => {
    const siteUrl: string = this.props.context.pageContext.web.absoluteUrl;
    return GetAbsoluteDomainUrl(siteUrl) === GetAbsoluteDomainUrl(fileUrl);
  }
}
