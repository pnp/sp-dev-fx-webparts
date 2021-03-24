import * as React from 'react';
import * as strings from 'QuestionsWebPartStrings';
import styles from './Attachments.module.scss';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { LogHelper } from 'utilities';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IFileAttachment, IPostItem } from 'models';
// controls
import UploadAttachmentComponent from './UploadAttachment';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { ActionButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

interface IConnectedDispatch {
}

interface IConnectedState {
  themeVariant: IReadonlyTheme | undefined;
}

// map actions to properties so they can be invoked
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
  return {
    themeVariant: state.themeVariant,
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
const mapDispatchToProps = {
};

interface IAttachmentProps {
  item: IPostItem;
  disabled: boolean;
  attachmentsChanged: (attachments: IFileAttachment[]) => void;
  newAttachmentsChanged: (newAttachments: File[]) => void;
  removeAttachmentsChanged: (removedAttachments: string[]) => void;
}

interface IAttachmentState {
  showAttachmentRemoveConfirm: boolean;
  attachmentToRemove?: string | undefined;
  showUpload: boolean;
  savingAttachmentChanges: boolean;
}

class AttachmentsComponent extends React.Component<IAttachmentProps & IConnectedState & IConnectedDispatch, IAttachmentState> {

  constructor(props: IAttachmentProps & IConnectedState & IConnectedDispatch) {
    super(props);
    LogHelper.verbose(this.constructor.name, 'ctor', 'start');

    this.state = {
      showAttachmentRemoveConfirm: false,
      showUpload: false,
      savingAttachmentChanges: false
    };
  }

  public render(): React.ReactElement<IAttachmentProps> {

    // only show header if we are editing or we have attachments in read mode
    let showAttachmentHeader = this.props.disabled === false || (this.props.disabled === true && this.props.item.attachments.length > 0);

    return (
      <div className={styles.attachmentsContainer}>

        { showAttachmentHeader &&
          (<div className={styles.attachmentsHeader}>{strings.HeaderText_Attachments}</div>)
        }

        <div className={styles.attachmentItems}>
          {
            this.props.item.attachments.map(file => {
              var encodedFileName = encodeURIComponent(file.fileName);
              var serverRelativeUrl = file.serverRelativeUrl.replace(file.fileName, encodedFileName);

              if (this.props.disabled === true) {
                return (
                  <ActionButton className={styles.viewAttachmentItem}
                    title={file.fileName}
                    onClick={() => window.open(`${serverRelativeUrl}?web=1`, "_blank")}>
                    {file.fileName}
                  </ActionButton>
                );
              }
              else {
                return (
                  <div className={styles.editAttachmentContainer}>
                    <ActionButton
                      className={styles.editAttachmentItem}
                      title={file.fileName}
                      onClick={() => window.open(`${serverRelativeUrl}?web=1`, "_blank")}>
                      {file.fileName}
                    </ActionButton>
                    <ActionButton id="removeAttachment"
                      className={styles.removeAttachmentItem}
                      title={strings.Message_RemoveAttachment + file.fileName}
                      iconProps={{ iconName: 'ChromeClose' }}
                      onClick={(ev: any) => this.handleRemoveClick(file.fileName)} />
                  </div>
                );
              }
            })
          }
        </div>

        <div className={styles.newAttachmentItems}>
          {this.props.disabled === false && (

            this.props.item.newAttachments.map(file => {
              return (
                <div className={styles.newAttachmentContainer}>
                  <ActionButton
                    className={styles.newAttachmentItem}
                    title={file.name}>
                    {file.name}
                  </ActionButton>
                  <ActionButton id="removeAttachment"
                    className={styles.removeNewAttachmentItem}
                    title={strings.Message_RemoveAttachment + file.name}
                    iconProps={{ iconName: 'ChromeClose' }}
                    onClick={(ev: any) => this.handleRemoveNewClick(file.name)} />
                </div>
              );
            })
          )}
        </div>


        {this.props.disabled === false && (
          <div>
            <ActionButton
              title={strings.ButtonText_AddAttachment}
              iconProps={{ iconName: 'Attach' }}
              onClick={() => this.handleAddClick()}>
              {strings.ButtonText_AddAttachment}
            </ActionButton>

            <UploadAttachmentComponent
              disabled={this.props.disabled}
              onAttachmentUploadStart={() => this.handleAttachmentUploadStart()}
              onAttachmentUploadComplete={(file: File) => this.handleAttachmentUploadComplete(file)}
              showUpload={this.state.showUpload}
            />
          </div>
        )
        }

        <div>
          {
            this.state.savingAttachmentChanges === true ? <ProgressIndicator label={strings.Message_SavingAttachments} /> : ""
          }
        </div>

        {this.getConfirmRemoveDialog()}

      </div>
    );
  }

  private getConfirmRemoveDialog = (): JSX.Element | undefined => {
    const { showAttachmentRemoveConfirm } = this.state;

    if (showAttachmentRemoveConfirm === true) {
      return (
        <Dialog
          hidden={!showAttachmentRemoveConfirm}
          dialogContentProps={{
            type: DialogType.normal,
            title: (strings.Dialog_RemoveAttachmentTitle),
            subText: (`${strings.Dialog_RemoveAttachmentSubText}\n${this.state.attachmentToRemove}`)
          }}
          modalProps={{ isBlocking: true }}>
          <DialogFooter>
            <PrimaryButton text={strings.ButtonText_Remove}
              onClick={this.handleConfirmRemoveClick} />
            <DefaultButton text={strings.ButtonText_Cancel}
              onClick={() => this.setState({ showAttachmentRemoveConfirm: false, attachmentToRemove: undefined })} />
          </DialogFooter>
        </Dialog>
      );
    }
  }

  private handleAddClick = (): void => {
    this.setState({ showUpload: true });
  }

  private handleAttachmentUploadStart = (): void => {
    this.setState({ showUpload: false });
  }

  private handleAttachmentUploadComplete = (file: File) => {
    let newAttachments = this.props.item.newAttachments;
    let newIndex = newAttachments.findIndex(f => f.name.toLowerCase() === file.name.toLowerCase());
    if (newIndex !== -1) {
      newAttachments.splice(newIndex, 1);
    }
    newAttachments.push(file);

    this.props.newAttachmentsChanged(newAttachments);

    // if the new one is in existing, remove from attachments so the new one will be uploaded
    let attachments = this.props.item.attachments;
    let fileIndex = attachments.findIndex(f => f.fileName.toLowerCase() === file.name.toLowerCase());
    if (fileIndex !== -1) {
      attachments.splice(fileIndex, 1);
      let removedAttachments = this.props.item.removedAttachments;
      removedAttachments.push(file.name);
      this.props.removeAttachmentsChanged(removedAttachments);
      this.props.attachmentsChanged(attachments);
    }
  }

  private handleRemoveClick = (fileName: string): void => {
    this.setState({ showAttachmentRemoveConfirm: true, attachmentToRemove: fileName });
  }

  private handleRemoveNewClick = (fileName: string): void => {
    let newAttachments = this.props.item.newAttachments;
    let fileIndex = newAttachments.findIndex(f => f.name.toLowerCase() === fileName.toLowerCase());
    if (fileIndex !== -1) {
      newAttachments.splice(fileIndex, 1);
    }
    this.props.newAttachmentsChanged(newAttachments);
  }

  private handleConfirmRemoveClick = async () => {
    let removedAttachments = this.props.item.removedAttachments;
    if (this.state.attachmentToRemove) {
      // add to removed attachments to process later
      let attachmentName = this.state.attachmentToRemove;
      removedAttachments.push(attachmentName);
      this.props.removeAttachmentsChanged(removedAttachments);

      // remove from attachments so the UI looks right
      let attachments = this.props.item.attachments;
      let fileIndex = attachments.findIndex(f => f.fileName.toLowerCase() === attachmentName.toLowerCase());
      if (fileIndex !== -1) {
        attachments.splice(fileIndex, 1);
        this.props.attachmentsChanged(attachments);
      }
      this.setState({
        showAttachmentRemoveConfirm: false,
        attachmentToRemove: undefined,
      });
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentsComponent);
