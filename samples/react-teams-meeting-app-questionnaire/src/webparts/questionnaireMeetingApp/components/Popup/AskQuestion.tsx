import * as React from 'react';
import * as strings from 'QuestionnaireMeetingAppWebPartStrings';
import styles from './AskQuestion.module.scss';
import { IAskQuestionProps } from './IAskQuestionProps';
import { IAskQuestionState } from './IAskQuestionState';
import { TextField, Dialog, DialogType, DefaultButton, PrimaryButton, DialogFooter } from 'office-ui-fabric-react';
import SPOService from '../../../../services/SPOService';
import { IQuestionnaireItem } from '../../../../models/IQuestionnaireItem';

export class AskQuestion extends React.Component<IAskQuestionProps, IAskQuestionState> {
  private SPOService: SPOService = null;

  public constructor(props) {
    super(props);

    this.state = {
      questionTitle: "",
      questionDescription: "",
      isloading: false,
      isSaveClicked: false,
      isQuestionTitleEmpty: true
    };

    this.onSave = this.onSave.bind(this);
    this.SPOService = new SPOService();
    this.hidePanel = this.hidePanel.bind(this);
  }

  private hidePanel() {
    this.props.onDissmissPanel(true);
  }

  private async onSave() {
    this.setState({ isSaveClicked: true });
    if (!this.state.isQuestionTitleEmpty) {
      let item: IQuestionnaireItem = {
        Title: this.state.questionTitle,
        Description: this.state.questionDescription,
        MeetingID: this.props.context.sdks.microsoftTeams.context.meetingId
      };

      this.SPOService.addQuestion(this.props.listName, item)
        .then((response: any) => {
          this.props.onDissmissPanel(true);
        });
    }
  }

  public render(): React.ReactElement<IAskQuestionProps> {
    return (
      <div className={styles.askQuestion}>
        <Dialog
          isOpen={this.props.showPopup}
          dialogContentProps={{
            type: DialogType.normal,
            title: strings.AddQuestion,
            showCloseButton: true
          }}
          modalProps={{ containerClassName: styles.askQuestion }}
          onDismiss={this.hidePanel}
          hidden={false}>
          <div>
            {
              !this.state.isloading &&
              <div>
                <div>
                  <TextField
                    label={strings.Title}
                    required
                    deferredValidationTime={500}
                    onChange={(ev, title) => {
                      this.setState({ questionTitle: title, isQuestionTitleEmpty: false, isSaveClicked: false });
                    }}
                  />
                  {this.state.isSaveClicked &&
                    this.state.questionTitle.trim().length == 0 && (
                      <div className={styles.labelRequired}>
                        Client Note Title is required
                      </div>
                    )}
                </div>

                <div>
                  <TextField
                    label={strings.Description}
                    required
                    multiline
                    deferredValidationTime={500}
                    onChange={(ev, addedBy) => {
                      this.setState({ questionDescription: addedBy, isSaveClicked: false });
                    }}
                  />
                </div>
              </div>
            }
          </div>
          <DialogFooter>
            <PrimaryButton className={styles.button} onClick={this.onSave} text="Save" />
            <DefaultButton onClick={this.hidePanel} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
