import * as React from 'react';
import styles from './LinkFilePickerTab.module.scss';
import { ILinkFilePickerTabProps, ILinkFilePickerTabState } from '.';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { FetchClient } from "@pnp/common";
import * as strings from 'PropertyPaneFilePickerStrings';
import { ItemType } from '../IPropertyPaneFilePicker';

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


  private _handleChange = (newValue?: string) => {
    this.setState({
      fileUrl: newValue
    });
  }

  private _getErrorMessagePromise(value: string): Promise<string> {
    return new Promise(resolve => {

      if (value === undefined) {
        this.setState({ isValid: false });
        resolve('');
        return;
      }

      if (!this._isUrl(value)) {
        this.setState({ isValid: false });
        resolve('');
        return;
      }

      if (!this.props.allowExternalTenantLinks && !this._isSameDomain(value)) {
        this.setState({ isValid: false });
        resolve(strings.NoExternalLinksValidationMessage);
        return;
      }

      if (this.props.itemType === ItemType.Images) {
        if (!this._isImage(value)) {
          this.setState({ isValid: false });
          resolve(strings.NoImageValidationMessage);
          return;
        }
      }

      // Verify the file exists
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
        this.setState({ isValid: false });
        resolve(strings.CantValidateValidationMessage);
      }
    });
  }

  private _handleSave = () => {
    this.props.onSave(this.state.fileUrl);
  }

  private _handleClose = () => {
    this.props.onClose();
  }

  private _isUrl = (fileUrl: string): boolean => {
    try {
      const myURL = new URL(fileUrl.toLowerCase());
      return myURL.host !== undefined;
    } catch (error) {
      return false;
    }
  }
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
    return this._getAbsoluteDomainUrl(siteUrl) === this._getAbsoluteDomainUrl(fileUrl);
  }

  private _getAbsoluteDomainUrl = (url: string): string => {
    if (url !== undefined) {
      const myURL = new URL(url.toLowerCase());
      return myURL.protocol + "//" + myURL.host;
    } else {
      return undefined;
    }
  }
}
