import * as React from 'react';
import styles from './UploadFilePickerTab.module.scss';
import { IUploadFilePickerTabProps, IUploadFilePickerTabState } from '.';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import * as strings from 'PropertyPaneFilePickerStrings';
import { ItemType } from '../IPropertyPaneFilePicker';

export default class UploadFilePickerTab extends React.Component<IUploadFilePickerTabProps, IUploadFilePickerTabState> {
  constructor(props: IUploadFilePickerTabProps) {
    super(props);
    this.state = {
      fileUrl: undefined,
      fileName: undefined
    };
  }

  public render(): React.ReactElement<IUploadFilePickerTabProps> {
    const { fileUrl, fileName } = this.state;
    const imageType: boolean = this.props.itemType === ItemType.Images;
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{imageType ? strings.UploadImageHeader : strings.UploadFileHeader}</h2>
        </div>
        <div className={styles.tab}>
          <input
            className={styles.localTabInput}
            type="file" id="fileInput"
            accept={this.props.accepts} multiple={false} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this._handleFileUpload(event)} />
          {fileUrl && <div className={styles.localTabSinglePreview}>
            <img className={styles.localTabSinglePreviewImage} src={fileUrl} alt={fileName} />
          </div>}
          <label className={styles.localTabLabel} htmlFor="fileInput">{
            imageType ?
              (fileUrl ? strings.ChangeImageLinkLabel : strings.ChooseImageLinkLabel) :
              (fileUrl ? strings.ChangeFileLinkLabel : strings.ChooseFileLinkLabel)
          }</label>
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={fileUrl === undefined}
              onClick={() => this._handleSave()} className={styles.actionButton}>{imageType ? strings.AddImageButtonLabel : strings.AddFileButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private _handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    let files = event.target.files;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.setState({
        fileUrl: reader.result as string,
        fileName: file.name
      });
    };
  }


  private _handleSave = () => {
    this.props.onSave(this.state.fileUrl);
  }

  private _handleClose = () => {
    this.props.onClose();
  }
}
