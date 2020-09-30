import * as React from 'react';
import { LogHelper, ErrorHelper, FormMode } from 'utilities';
import styles from './Question.module.scss';
import { autobind } from '@uifabric/utilities/lib';
import * as strings from 'QuestionsWebPartStrings';
import { QuillConfig } from '../QuillConfig';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { getSelectedQuestion, likeQuestion, followQuestion, isDuplicateQuestion, deleteQuestion, saveQuestion } from 'webparts/questions/redux/actions/actions';
// models
import { IQuestionItem } from 'models';
// controls
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ActionButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Editor } from 'primereact/editor';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import ReplyListComponent from '../ReplyList/ReplyList';
import ReplyComponent from '../Reply/Reply';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

interface IConnectedDispatch {
  getSelectedQuestion: (questionId?: number) => void;
  likeQuestion: (question: IQuestionItem) => Promise<void>;
  followQuestion: (question: IQuestionItem) => Promise<void>;
  deleteQuestion: (question: IQuestionItem) => Promise<void>;
  isDuplicateQuestion: (question: IQuestionItem) => Promise<boolean>;
  saveQuestion: (question: IQuestionItem) => Promise<number>;
}

interface IConnectedState {
  selectedQuestion: IQuestionItem | null;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: IQuestionProps): IConnectedState {
  return {
    selectedQuestion: state.selectedQuestion,
  };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
  getSelectedQuestion,
  likeQuestion,
  followQuestion,
  deleteQuestion,
  saveQuestion,
  isDuplicateQuestion,
};

export interface IQuestionProps {
  show: boolean;
}

interface IQuestionState {
  formMode: FormMode;
  question?: IQuestionItem;
  isChanged: boolean;
  showUndoConfirm: boolean;
  showDeleteConfirm: boolean;
  showNotification: boolean;
  closeOnUndoConfirm: boolean;
  notificationMessage?: string;
  notificationType?: MessageBarType;

  showNewReply: boolean;
}
class QuestionComponent extends React.Component<IQuestionProps & IConnectedState & IConnectedDispatch, IQuestionState> {

  constructor(props: IQuestionProps & IConnectedState & IConnectedDispatch) {
    super(props);
    LogHelper.verbose(this.constructor.name, 'ctor', 'start');

    this.state = {
      formMode: FormMode.View,
      isChanged: false,
      showUndoConfirm: false,
      closeOnUndoConfirm: false,
      showDeleteConfirm: false,
      showNotification: false,
      showNewReply: false
    };

  }

  public componentDidUpdate(prevProps: IQuestionProps & IConnectedState & IConnectedDispatch, prevState: IQuestionState): void {
    // if our question has changed
    if (this.props.selectedQuestion && this.props.selectedQuestion !== prevProps.selectedQuestion) {
      // reset our question in state managed by this component
      this.setState({ question: this.props.selectedQuestion });

      // and previously it was null or undefined
      if (!prevProps.selectedQuestion) {
        // determine and set the appropriate initial form mode
        if (this.props.selectedQuestion.id && this.props.selectedQuestion.id > 0) {
          this.setState({ formMode: FormMode.View });
        }
        else {
          this.setState({ formMode: FormMode.New });
        }
      }
    }
  }

  public render(): React.ReactElement<IQuestionProps> {
    const { question, showNewReply: showNewReply } = this.state;
    let id: string = question ? `question-${question.id}` : `question-new`;

    if (question) {
      return (
        <div id={id} className={styles.question}
          style={{ display: this.props.show === true ? 'block' : 'none' }}>

          <div className={styles.containerHeader}>
            <ActionButton id="closePanel" text={strings.ButtonText_CloseQuestion}
              onClick={(ev: any) => this.handleCloseClick()} />
          </div>

          <div className={styles.container}>
            {this.renderQuestion()}

            {question.isAnswered === true && question.answerReply !== undefined &&
              <ReplyComponent
                show={true}
                readOnlyMode={true}
                formMode={FormMode.View}
                answerMode={true}
                reply={question.answerReply}
                parentQuestion={question} />
            }

            <ReplyComponent
              show={showNewReply}
              formMode={FormMode.New}
              parentQuestion={question}
              onActionCompleted={() => this.setState({ showNewReply: false })} />

            <ReplyListComponent
              replies={question.replies}
              parentQuestion={question} />

            {this.getUndoConfirmDialog()}
            {this.getUndoDeleteConfirmDialog()}

          </div>
        </div>

      );
    }
    else {
      return (<div id={id}></div>);
    }
  }

  private renderQuestion(): JSX.Element | undefined {
    const { question, formMode, showNotification, notificationType, notificationMessage } = this.state;

    if (question) {
      return (
        <div className={styles.questionContainer}>
          <div className={styles.questionItem}>

            {this.renderQuestionAdminActions()}
            {this.renderIsAnswered(question)}

            {this.renderQuestionTitle(question)}

            {formMode === FormMode.View && question.author && question.createdDate &&
              <div>
                <span>
                  <Persona size={PersonaSize.size24}
                    text={question.author.primaryText}
                    showSecondaryText={true}
                    onRenderSecondaryText={props => this.onRenderSecondaryText(question)} />
                </span>
              </div>
            }

            {this.renderQuestionDetails(question)}

            {this.renderQuestionUserActions()}

            {formMode !== FormMode.View &&
              <div className={styles.userActions}>
                <PrimaryButton id='Post' text={strings.ButtonText_Post}
                  iconProps={{ iconName: 'Send' }} onClick={() => this.handleSaveClick()} />
                <DefaultButton id='Undo' text={strings.ButtonText_Cancel}
                  iconProps={{ iconName: 'Undo' }} onClick={() => this.handleCancelClick()} />
              </div>
            }
            {
              showNotification &&
              <div className={styles.messagebarContainer}>
                <MessageBar messageBarType={notificationType}>{notificationMessage}</MessageBar>
              </div>
            }
          </div>
        </div>
      );
    }
  }

  private renderQuestionAdminActions(): JSX.Element | undefined {
    const { question } = this.state;
    const { formMode } = this.state;

    let items: IContextualMenuItem[] = [];

    if (question) {
      if (question.canEdit) {
        items.push({
          key: 'editQuestion', name: (strings.MenuText_Edit), iconProps: { iconName: 'Edit' },
          onClick: (ev: any) => this.handleEditClick()
        });
      }

      if (question.canDelete) {
        items.push({
          key: 'deleteQuestion', name: (strings.MenuText_Delete), iconProps: { iconName: 'Delete' },
          onClick: (ev: any) => this.setState({ showDeleteConfirm: true })
        });
      }
    }

    if (formMode === FormMode.View && items.length > 0) {
      return (
        <div className={styles.adminActionsContainer}>
          <ActionButton id="questionSettings"
            iconProps={{ iconName: 'Settings' }}
            menuProps={{
              directionalHint: DirectionalHint.bottomRightEdge,
              items: items
            }}
          />
        </div>
      );
    }
  }

  private renderQuestionUserActions(): JSX.Element | undefined {
    const { question } = this.state;
    const { formMode } = this.state;

    if (question && formMode === FormMode.View) {
      return (
        <div className={styles.userActions}>
          {question.canReact === true &&
            <ActionButton id="likeQuestion"
              text={` ${question.followedByCurrentUser ? strings.ButtonText_Following : strings.ButtonText_NotFollowing}`}
              title={strings.ButtonTitle_Following}
              iconProps={{ iconName: question.followedByCurrentUser === true ? 'MailSolid' : 'Mail' }}
              onClick={() => this.props.followQuestion(question)} />
          }
          {question.canReact === true &&
            <ActionButton id="likeQuestion"
              text={` ${strings.ButtonText_Like} (${question.likeCount ? question.likeCount : 0})`}
              iconProps={{ iconName: question.likedByCurrentUser === true ? 'LikeSolid' : 'Like' }}
              onClick={() => this.props.likeQuestion(question)} />
          }
          {question.canReply === true &&
            <ActionButton id="addReply"
              text={` ${strings.ButtonText_Reply} (${question.totalReplyCount ? question.totalReplyCount : 0})`}
              iconProps={{ iconName: 'CommentAdd' }}
              onClick={() => this.setState({ showNewReply: true })} />
          }
        </div>
      );
    }
  }

  private renderIsAnswered(question: IQuestionItem): JSX.Element | undefined {

    if (question.isAnswered === true) {
      return (
        <div>
          <span className={styles.questionIsAnsweredContainer}>
            <Icon iconName={'CheckMark'} />
            {strings.Message_IsAnswered}
          </span>
        </div>
      );
    }
  }

  private renderQuestionTitle(question: IQuestionItem): JSX.Element {
    const { formMode } = this.state;

    if (formMode === FormMode.View) {
      return (
        <div className={styles.questionTitle}>
          {question.title}
        </div>
      );
    }
    else {
      return (
        <div className={styles.questionTitle}>
          <textarea placeholder={strings.Placeholder_QuestionTitle}
            value={question.title}
            maxLength={255}
            autoFocus={true}
            onKeyPress={this.handleOnKeyPress}
            onChange={(e) => this.handleTextChanged('title', e.target.value)}></textarea>
          <div className={styles.errorMessage}>{ErrorHelper.getUIError(question, 'title')}</div>
        </div>
      );
    }
  }

  private renderQuestionDetails(question: IQuestionItem): JSX.Element {
    const { formMode } = this.state;

    if (formMode === FormMode.View) {
      return (
        <div className={styles.questionBodyContainer}>
          <div dangerouslySetInnerHTML={{ __html: question.details }}></div>
        </div>
      );
    }
    else {
      return (
        <div className={styles.questionBodyContainer}>
          <Editor id="details"
            value={question.details}
            headerTemplate={QuillConfig.header}
            placeholder={strings.Placeholder_QuestionDetails}
            onTextChange={(e) => this.handleEditorChanged('details', e.htmlValue, 'detailsText', e.textValue)} />
          <div className={styles.errorMessage}>{ErrorHelper.getUIError(question, 'details')}</div>
        </div>
      );
    }
  }

  @autobind
  private onRenderSecondaryText(question: IQuestionItem): JSX.Element {
    return (
      <div>
        <Icon iconName={'Comment'} />
        {strings.Message_AskedOn} {question.createdDate!.toLocaleString()}
      </div>
    );
  }

  @autobind
  private handleOnKeyPress(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
  }

  @autobind
  private handleTextChanged(propertyName: string, newValue: string) {
    const { question } = this.state;
    if (question) {
      question[propertyName] = newValue;

      ErrorHelper.removeUIError(question, propertyName);
      this.setState({ question });
      this.handleOnChanged(true);
    }
  }

  @autobind
  private handleEditorChanged(htmlPropertyName: string, htmlValue: string | null, textPropertyName: string, textValue: string) {
    const { question } = this.state;
    if (question) {
      question[htmlPropertyName] = htmlValue;
      question[textPropertyName] = textValue;

      ErrorHelper.removeUIError(question, htmlPropertyName);
      this.setState({ question });
      this.handleOnChanged(true);
    }
  }

  @autobind
  private handleEditClick(): void {
    const { question } = this.state;
    if (question) {
      // this is a refetch but we want to get the latest version when going to edit in case they've been on view awhile
      this.props.getSelectedQuestion(question.id);
      this.setState({ formMode: FormMode.Edit });
    }
  }

  @autobind
  private handleConfirmDeleteClick(): void {
    const { question } = this.state;
    if (question) {
      this.props.deleteQuestion(question).then(() => {
        this.setState({ showDeleteConfirm: false });
      });
    }
  }

  @autobind
  private handleCloseClick(): void {
    let { isChanged } = this.state;

    if (isChanged === true) {
      // show a confirmation
      this.setState({ showUndoConfirm: true, closeOnUndoConfirm: true });
    }
    else {
      this.props.getSelectedQuestion();

      this.setState({
        formMode: FormMode.View,
        showUndoConfirm: false,
        showNotification: false
      });
      this.handleOnChanged(false);
    }
  }

  @autobind
  private handleCancelClick(): void {
    let { isChanged, formMode } = this.state;

    if (isChanged === true) {
      // show a confirmation
      this.setState({ showUndoConfirm: true });
    }
    else {
      if (formMode === FormMode.New) {
        this.props.getSelectedQuestion();
      }

      this.setState({
        formMode: FormMode.View,
        showUndoConfirm: false,
        showNotification: false
      });
      this.handleOnChanged(false);
    }
  }

  @autobind
  private handleUndoChangesClick(): void {
    let { formMode, question, closeOnUndoConfirm } = this.state;

    if (formMode === FormMode.New || closeOnUndoConfirm === true) {
      this.props.getSelectedQuestion();
    }
    else {
      /* revisit this to improve responsiveness
      selectedQuestion = this.props.selectedQuestion;
      this.setState({ question });
      */
      if (question) {
        this.props.getSelectedQuestion(question.id);
      }
    }
    this.setState({
      formMode: FormMode.View,
      showUndoConfirm: false,
      showNotification: false,
      closeOnUndoConfirm: false
    });

    this.handleOnChanged(false);
  }

  @autobind
  private async handleSaveClick(): Promise<void> {
    const { question } = this.state;

    let isQuestionValid = await this.isQuestionValid();
    if (isQuestionValid) {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.info,
        notificationMessage: strings.Message_SavingQuestion
      });

      if (question) {
        this.props.saveQuestion(question).then(id => {
          this.setState({
            formMode: FormMode.View,
            showUndoConfirm: false,
            notificationType: MessageBarType.success,
            notificationMessage: strings.Message_SavedQuestion,
          });
          this.handleOnChanged(false);

          // after 5 seconds hide the notification
          setTimeout(() => { this.setState({ showNotification: false, notificationMessage: undefined }); }, 5000);
        });
      }
    }
  }

  @autobind
  private async isQuestionValid(): Promise<boolean> {
    const { question } = this.state;
    let isValid: boolean = true;

    if (question) {
      question.uiErrors = new Map<string, string>();

      if (question.title) {
        let isDuplicate = await this.props.isDuplicateQuestion(question);
        if (isDuplicate === true) {
          ErrorHelper.setUIError(question, 'title', strings.ErrorMessage_DuplicateQuestion);
          isValid = false;
        }

      }
      else {
        isValid = false;
        ErrorHelper.setUIError(question, 'title', strings.ErrorMessage_QuestionRequired);
      }

      if (!question.details) {
        isValid = false;
        ErrorHelper.setUIError(question, 'details', strings.ErrorMessage_DetailsRequired);
      }
    }

    this.setState({
      showNotification: !isValid,
      notificationType: MessageBarType.error,
      notificationMessage: isValid === false ? strings.MessageBar_QuestionSaveErrors : undefined
    });

    return isValid;
  }

  @autobind
  private handleOnChanged(changed: boolean): void {
    this.setState({ isChanged: changed });
  }

  // future common

  @autobind
  private getUndoConfirmDialog(): JSX.Element | undefined {
    const { showUndoConfirm } = this.state;

    if (showUndoConfirm === true) {
      return (
        <Dialog
          hidden={!showUndoConfirm}
          dialogContentProps={{
            type: DialogType.normal,
            title: (strings.Dialog_UnsavedChangesTitle),
            subText: (strings.Dialog_UnsavedChangedSubText)
          }}
          modalProps={{ isBlocking: true }}>
          <DialogFooter>
            <PrimaryButton text={strings.ButtonText_Continue}
              onClick={this.handleUndoChangesClick} />
            <DefaultButton text={strings.ButtonText_ResumeEdit}
              onClick={() => this.setState({ showUndoConfirm: false })} />/>
        </DialogFooter>
        </Dialog>
      );
    }
  }

  @autobind
  private getUndoDeleteConfirmDialog(): JSX.Element | undefined {
    const { showDeleteConfirm } = this.state;

    if (showDeleteConfirm === true) {
      return (
        <Dialog
          hidden={!showDeleteConfirm}
          dialogContentProps={{
            type: DialogType.normal,
            title: (strings.Dialog_DeleteConfirmTitle),
            subText: (strings.Dialog_DeleteConfirmSubText)
          }}
          modalProps={{ isBlocking: true }}>
          <DialogFooter>
            <PrimaryButton text={strings.ButtonText_Yes}
              onClick={this.handleConfirmDeleteClick} />
            <DefaultButton text={strings.ButtonText_No}
              onClick={() => this.setState({ showDeleteConfirm: false })} />
          </DialogFooter>
        </Dialog>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComponent);