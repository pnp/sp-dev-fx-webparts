import * as React from 'react';
import { LogHelper, ErrorHelper, FormMode, DiscussionType, ApplicationPages, DateUtility, Parameters } from 'utilities';
import styles from './Question.module.scss';
import * as strings from 'QuestionsWebPartStrings';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { getSelectedQuestion, likeQuestion, followQuestion, updateDiscussionType, isDuplicateQuestion, deleteQuestion, saveQuestion } from 'webparts/questions/redux/actions/actions';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
// models
import { IFileAttachment, IQuestionItem } from 'models';
// controls
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ActionButton, PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import RichTextEditorComponent from '../RichTextEditor';
import AttachmentsComponent from '../Attachments/Attachments';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import ReplyListComponent from '../ReplyList/ReplyList';
import ReplyComponent from '../Reply/Reply';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import CategoryLabel from '../CategoryLabel/CategoryLabel';
import { LivePersonaCard } from '../LivePersonaCard';

interface IConnectedDispatch {
  getSelectedQuestion: (questionId?: number) => void;
  likeQuestion: (question: IQuestionItem) => Promise<void>;
  followQuestion: (question: IQuestionItem) => Promise<void>;
  updateDiscussionType: (question: IQuestionItem) => Promise<void>;
  deleteQuestion: (question: IQuestionItem) => Promise<void>;
  isDuplicateQuestion: (question: IQuestionItem) => Promise<boolean>;
  saveQuestion: (question: IQuestionItem) => Promise<number>;
}

interface IConnectedState {
  selectedQuestion: IQuestionItem | null;
  type: DiscussionType;
  webPartContext?: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
  applicationPage: string;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: IQuestionProps): IConnectedState {
  return {
    selectedQuestion: state.selectedQuestion,
    type: DiscussionType[state.discussionType],
    webPartContext: state.webPartContext,
    themeVariant: state.themeVariant,
    applicationPage: state.applicationPage
  };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
  getSelectedQuestion,
  likeQuestion,
  followQuestion,
  updateDiscussionType,
  deleteQuestion,
  saveQuestion,
  isDuplicateQuestion
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
  disablePost: boolean;
  showNewReply: boolean;
  expectedApplicationPage: string | undefined;
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
      showNewReply: false,
      disablePost: false,
      expectedApplicationPage: undefined
    };

  }

  public componentDidMount() {
    // check if we are on an application page with a query string to see if we even care to deal with people coming in on the 'wrong' url
    if(window.location.search.length > 0) {
      if(window.location.pathname.toLowerCase().endsWith(ApplicationPages.QUESTIONS.toLowerCase())) {
        this.setState({expectedApplicationPage: ApplicationPages.QUESTIONS});
      }
      if(window.location.pathname.toLowerCase().endsWith(ApplicationPages.CONVERSATIONS.toLowerCase())) {
        this.setState({expectedApplicationPage: ApplicationPages.CONVERSATIONS});
      }
    }

    window.addEventListener('beforeunload', this.beforeunload.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }


  public componentDidUpdate(prevProps: IQuestionProps & IConnectedState & IConnectedDispatch, prevState: IQuestionState): void {
    // if our question has changed
    if (this.props.selectedQuestion && this.props.selectedQuestion !== prevProps.selectedQuestion) {
      // reset our question in state managed by this component
      this.setState({ question: this.props.selectedQuestion });

      if(this.state.expectedApplicationPage === ApplicationPages.QUESTIONS
        && this.props.selectedQuestion.discussionType === DiscussionType.Conversation) {
        // we came in on Questions.aspx for an item that is a conversation so redirect
        window.location.replace(window.location.href.replace(new RegExp(ApplicationPages.QUESTIONS, "gi"), ApplicationPages.CONVERSATIONS));
      }
      else if(this.state.expectedApplicationPage === ApplicationPages.CONVERSATIONS
        && this.props.selectedQuestion.discussionType === DiscussionType.Question) {
        // we came in on Conversations.aspx for an item that is a question so redirect
        window.location.replace(window.location.href.replace(new RegExp(ApplicationPages.CONVERSATIONS, "gi"), ApplicationPages.QUESTIONS));
      }
      else {
        // ensure we don't execute the logic above after any further state changes
        this.setState({ expectedApplicationPage: undefined });
      }

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

    let buttonStyle: any = undefined;
    if (this.props.themeVariant) {
      buttonStyle = { color: this.props.themeVariant.semanticColors.link };
    }

    if (question) {
      return (
        <div id={id} className={styles.question}
          style={{ display: this.props.show === true ? 'block' : 'none' }}>

          <div className={styles.containerHeader}>
            <ActionButton id="closePanel" text={strings.ButtonText_Close}
              style={buttonStyle}
              iconProps={{ iconName: 'ChromeClose', style : buttonStyle }}
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
    const { question, formMode, showNotification, notificationType, notificationMessage, disablePost } = this.state;
    const { webPartContext } = this.props;

    if (question) {
      return (
        <div className={styles.questionContainer}>
          <div className={styles.questionItem}>

            {this.renderQuestionAdminActions()}
            {this.renderIsAnswered(question)}

            {this.renderQuestionTitle(question)}

            {formMode === FormMode.View && question.author && question.createdDate &&
              <div className={styles.questionPersonaContainer}>
                <span>
                  {(webPartContext !== null && webPartContext !== undefined ? 
                    <LivePersonaCard
                    serviceScope={webPartContext.serviceScope}
                    user={{
                      displayName: (question.author === null || question.author === undefined ? '' : (question.author.text === undefined ? '' : question.author.text)),
                      email: (question.author === null || question.author === undefined ? '' : (question.author.id === undefined ? '' : question.author.id.replace("i:0#.f|membership|", "")))
                    }}
                    >
                    <Persona size={PersonaSize.size32}
                      text={question.author.text}
                      showSecondaryText={true}
                      onRenderSecondaryText={props => this.onRenderSecondaryText(question)} />
                  </LivePersonaCard>
                    :
                    <Persona size={PersonaSize.size32}
                      text={question.author.text}
                      showSecondaryText={true}
                      onRenderSecondaryText={props => this.onRenderSecondaryText(question)} />
                  )}
                  
                </span>
                <span>
                  <CategoryLabel category={question.category} style={{ float: 'right' }}></CategoryLabel>
                </span>
              </div>
            }

            {this.renderQuestionDetails(question)}

            <AttachmentsComponent item={question}
              disabled={formMode === FormMode.View}
              attachmentsChanged={(attachments: IFileAttachment[]) => { this.attachmentsChanged(attachments); }}
              newAttachmentsChanged={(newAttachments: File[]) => { this.newAttachmentsChanged(newAttachments); }}
              removeAttachmentsChanged={(removedAttachments: string[]) => { this.removeAttachmentsChanged(removedAttachments); }} />

            {this.renderQuestionUserActions()}

            {formMode !== FormMode.View &&
              <div className={styles.userActions}>
                <span>
                  <CategoryLabel category={question.category} style={{ float: 'left' }}></CategoryLabel>
                </span>
                <PrimaryButton id='Post' text={strings.ButtonText_Post}
                  iconProps={{ iconName: 'Send' }} onClick={() => this.handleSaveClick()} disabled={disablePost} />
                <DefaultButton id='Undo' text={strings.ButtonText_Cancel}
                  iconProps={{ iconName: 'Undo' }} onClick={() => this.handleCancelClick()} disabled={disablePost} />
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

    const changeDiscussionTypeText = this.props.type === DiscussionType.Question ? strings.MenuText_ChangeToConversation : strings.MenuText_ChangeToQuestion;

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

      if(question.canEdit) {
        items.push({
          key: 'changeDiscussionType', name: (changeDiscussionTypeText), iconProps: { iconName: 'Switch' },
          onClick: (ev: any) => this.handleDiscussionTypeChangeClick()
        });
      }
    }

    if (formMode === FormMode.View && items.length > 0) {
      return (
        <div className={styles.adminActionsContainer}>
          <IconButton id="questionSettings"
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
          <ActionButton id="copyLink"
              text={strings.ButtonText_CopyLink}
              title={strings.ButtonText_CopyLink}
              iconProps={{ iconName: 'Link' }}
              onClick={() => this.handleCopyLinkClick(question.id) } />

          {question.canReact === true &&
            <ActionButton id="followQuestion"
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

    if (question.isAnswered === true && question.discussionType === DiscussionType.Question) {
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
          <textarea placeholder={(this.props.type === DiscussionType.Question ? strings.Placeholder_QuestionTitle : strings.Placeholder_ConversationTitle)}
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
          <RichTextEditorComponent id="details"
            value={question.details}
            questionTitle={question.title ? question.title : ''}
            placeholder={(this.props.type === DiscussionType.Question ? strings.Placeholder_QuestionDetails : strings.Placeholder_ConversationDetails)}
            onTextChange={(htmlValue, textValue) => this.handleEditorChanged('details', htmlValue, 'detailsText', textValue)}
            />
          <div className={styles.errorMessage}>{ErrorHelper.getUIError(question, 'details')}</div>
        </div>
      );
    }
  }

  private onRenderSecondaryText = (question: IQuestionItem): JSX.Element => {
    return (
      <div>
        <Icon iconName={'Comment'} />
        {strings.Message_PostedOn} {DateUtility.getFriendlyDate(question.createdDate, true)}
      </div>
    );
  }

  private handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
  }

  private handleTextChanged = (propertyName: string, newValue: string) => {
    const { question } = this.state;
    if (question) {
      question[propertyName] = newValue;

      ErrorHelper.removeUIError(question, propertyName);
      this.setState({ question });
      this.handleOnChanged(true);
    }
  }

  private handleEditorChanged = (htmlPropertyName: string, htmlValue: string | null, textPropertyName: string, textValue: string) => {
    const { question } = this.state;
    if (question) {
      question[htmlPropertyName] = htmlValue;
      question[textPropertyName] = textValue;

      ErrorHelper.removeUIError(question, htmlPropertyName);
      this.setState({ question });
      this.handleOnChanged(true);
    }
  }

  private handleEditClick = (): void => {
    const { question } = this.state;
    if (question) {
      // this is a refetch but we want to get the latest version when going to edit in case they've been on view awhile
      this.props.getSelectedQuestion(question.id);
      this.setState({ formMode: FormMode.Edit });
    }
  }

  private handleConfirmDeleteClick = (): void => {
    const { question } = this.state;
    if (question) {
      this.props.deleteQuestion(question).then(() => {
        this.setState({ showDeleteConfirm: false });
      });
    }
  }

  private handleCloseClick = (): void => {
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

  private handleCancelClick = (): void => {
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

  private handleUndoChangesClick = (): void => {
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

  private handleSaveClick = async (): Promise<void> => {
    const { question } = this.state;

    this.setState({ disablePost: true });
    let isQuestionValid = await this.isQuestionValid();
    if (isQuestionValid) {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.info,
        notificationMessage: (this.props.type === DiscussionType.Question ? strings.Message_SavingQuestion : strings.Message_SavingConversation)
      });

      if (question) {
        this.props.saveQuestion(question).then(id => {
          this.setState({
            disablePost: false,
            formMode: FormMode.View,
            showUndoConfirm: false,
            notificationType: MessageBarType.success,
            notificationMessage: (this.props.type === DiscussionType.Question ? strings.Message_SavedQuestion : strings.Message_SavedConversation )
          });
          this.handleOnChanged(false);

          // after 5 seconds hide the notification
          setTimeout(() => { this.setState({ showNotification: false, notificationMessage: undefined }); }, 5000);
        }).catch((e) => {
          this.setState({
            disablePost: false,
            showNotification: true,
            notificationType: MessageBarType.error,
            notificationMessage: e.message
          });
        });
      }
    }
    else {
      this.setState({ disablePost: false });
    }
  }

  private handleDiscussionTypeChangeClick = (): void =>  {
    const { question } = this.state;

    if(question) {
      question.discussionType = question.discussionType === DiscussionType.Question ? DiscussionType.Conversation : DiscussionType.Question;
      this.props.updateDiscussionType(question);
    }
  }

  private handleCopyLinkClick = (questionId?: number): void => {
    debugger;

    if(this.props.webPartContext && questionId) {
      const el = document.createElement('textarea');
      el.value = `${this.props.webPartContext.pageContext.web.absoluteUrl}/SitePages/${this.props.applicationPage}?${Parameters.QUESTIONID}=${questionId}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }

  private isQuestionValid = async (): Promise<boolean> => {
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
        ErrorHelper.setUIError(question, 'title', question.discussionType === DiscussionType.Question ? strings.ErrorMessage_QuestionRequired : strings.ErrorMessage_ConversationRequired);
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

  private handleOnChanged = (changed: boolean): void => {
    this.setState({ isChanged: changed });
  }

  private attachmentsChanged = (attachments: IFileAttachment[]): void => {
    const { question } = this.state;
    if (question) {
      question.attachments = attachments;
      this.setState({ question: question });
      this.handleOnChanged(true);
    }
  }

  private newAttachmentsChanged = (newAttachments: File[]): void => {
    const { question } = this.state;
    if (question) {
      question.newAttachments = newAttachments;
      this.setState({ question: question });
      this.handleOnChanged(true);
    }
  }

  private removeAttachmentsChanged = (removedAttachments: string[]): void => {
    const { question } = this.state;
    if (question) {
      question.removedAttachments = removedAttachments;
      this.setState({ question: question });
      this.handleOnChanged(true);
    }
  }

  // future common

  private getUndoConfirmDialog = (): JSX.Element | undefined => {
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
              onClick={() => this.setState({ showUndoConfirm: false })} />
          </DialogFooter>
        </Dialog>
      );
    }
  }

  private getUndoDeleteConfirmDialog = (): JSX.Element | undefined => {
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

  private beforeunload = (e) => {
    let { isChanged } = this.state;

    if (isChanged === true) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComponent);
