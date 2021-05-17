import * as React from 'react';
import * as strings from 'QuestionsWebPartStrings';
// import styles from './Attachments.module.scss';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { LogHelper } from 'utilities';
//controls
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

interface IConnectedDispatch {

}

interface IConnectedState {
}

// map actions to properties so they can be invoked
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
  return {
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
const mapDispatchToProps = {
};

interface IUploadAttachmentProps {
  disabled?: boolean;
  showUpload?: boolean;
  onAttachmentUploadStart: () => void;
  onAttachmentUploadComplete: (file: File) => void;
}

interface IUploadAttachmentState {
  file: any;
  hideDialog: boolean;
  dialogMessage: string;
  isLoading: boolean;
}

class UploadAttachmentComponent extends React.Component<IUploadAttachmentProps & IConnectedState & IConnectedDispatch, IUploadAttachmentState> {

  private fileInput;

  constructor(props: IUploadAttachmentProps & IConnectedState & IConnectedDispatch) {
    super(props);

    this.state = {
      file: null,
      hideDialog: true,
      dialogMessage: '',
      isLoading: false,
    };
    this.fileInput = React.createRef();
  }

  public componentDidUpdate(prevProps: IUploadAttachmentProps & IConnectedState & IConnectedDispatch, prevState: IUploadAttachmentState): void {

    LogHelper.verbose(this.constructor.name, 'componentDidUpdate', `start - [showUpload=${this.props.showUpload},prevShowUpload=${prevProps.showUpload}]`);

    if (this.props.showUpload === true) {
      this.fileInput.current.value = '';
      this.fileInput.current.click();
      this.props.onAttachmentUploadStart();
    }
  }

  // Add a new attachment
  private addAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isLoading: true });

    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = async () => {


        if (this.isFileSizeValid(file)) {
          if (this.isFileNameValid(file) === true) {
            this.setState({ file: file });
            try {
              this.props.onAttachmentUploadComplete(file);
              this.setState({ isLoading: false });
            }
            catch (error) {
              this.setState({
                hideDialog: false,
                isLoading: false,
                dialogMessage: strings.ErrorMessage_FileUpload.replace('{0}', file.name).replace('{1}', error.message)
              });
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  private isFileSizeValid = (file: File): boolean => {
    // 100MB max size
    let maxAllowedSize = 100 * 1024 * 1024;

    let isValid = true;
    if (file.size > maxAllowedSize) {
      isValid = false;
      this.setState({
        hideDialog: false,
        isLoading: false,
        dialogMessage: strings.ErrorMessage_FileUploadSize.replace('{0}', file.name).replace('{1}', '100')
      });
    }
    return isValid;
  }

  private isFileNameValid = (file: File): boolean => {
    //https://support.microsoft.com/en-us/office/invalid-file-names-and-file-types-in-onedrive-and-sharepoint-64883a5d-228e-48f5-b3d2-eb39e07630fa#invalidcharacters
    let isValid = true;
    if (isValid === true && file.name.indexOf("_vti_") !== -1) {
      isValid = false;
      this.setState({
        hideDialog: false,
        isLoading: false,
        dialogMessage: strings.ErrorMessage_FileUploadName.replace('{0}', file.name).replace('{1}', '_vti_')
      });
    }

    var specialCharsMatch = file.name.match(/\"|\*|\:|\<|\>|\?|\/|\\|\|/g);
    if (isValid === true &&  specialCharsMatch !== null) {
      isValid = false;
      this.setState({
        hideDialog: false,
        isLoading: false,
        dialogMessage: strings.ErrorMessage_FileUploadNameSpecialChars.replace('{0}', file.name).replace('{1}', '" * : < > ? / \ |')
      });
    }

    //" * : < > ? / \ |
    return isValid;
  }

  private closeDialog = () => {
    this.setState({ hideDialog: true, dialogMessage: '', });
  }

  public render() {
    return (
      <div>
        <input id="file-picker"
          style={{ display: 'none' }}
          type="file"
          onChange={(e) => this.addAttachment(e)}
          ref={this.fileInput} />
        <div>
          {
            this.state.isLoading ? <ProgressIndicator label={strings.Message_Uploading} /> : ""
          }
        </div>
        <Dialog
          hidden={this.state.hideDialog}
          type={DialogType.normal}
          onDismiss={() => this.closeDialog()}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.Dialog_AddAttachmentTitle,
            subText: this.state.dialogMessage
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }} >
          <DialogFooter>
            <PrimaryButton onClick={() => this.closeDialog()}>{strings.ButtonText_OK}</PrimaryButton>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadAttachmentComponent);
