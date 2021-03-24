import * as React from 'react';
import { LogHelper, ErrorHelper, FormMode, Action, DiscussionType, DateUtility } from 'utilities';
import styles from './Reply.module.scss';
import * as strings from 'QuestionsWebPartStrings';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { getReply, likeReply, helpfulReply, deleteReply, saveReply, markAnswer } from 'webparts/questions/redux/actions/actions';
// models
import { IReplyItem, IQuestionItem, IFileAttachment } from 'models';
// controls
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ActionButton, PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import RichTextEditorComponent  from '../RichTextEditor';
import AttachmentsComponent from '../Attachments/Attachments';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import ReplyListComponent from '../ReplyList/ReplyList';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { LivePersonaCard } from '../LivePersonaCard';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IConnectedDispatch {
  getReply: (replyId: number) => Promise<IReplyItem>;
  likeReply: (reply: IReplyItem) => Promise<void>;
  helpfulReply: (reply: IReplyItem) => Promise<void>;
  deleteReply: (reply: IReplyItem) => Promise<void>;
  saveReply: (reply: IReplyItem) => Promise<number>;
  markAnswer: (reply: IReplyItem) => Promise<void>;
}

interface IConnectedState {
  webPartContext?: WebPartContext;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: IReplyProps): IConnectedState {
  return {
    webPartContext: state.webPartContext
  };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
  getReply,
  likeReply,
  helpfulReply,
  deleteReply,
  saveReply,
  markAnswer
};

export interface IReplyProps {
  show: boolean;
  formMode: FormMode;
  parentQuestion: IQuestionItem;
  parentReply?: IReplyItem;
  reply?: IReplyItem;
  readOnlyMode?: boolean;
  answerMode?: boolean;
  onActionCompleted?: () => void;
}

interface IReplyState {
  formMode: FormMode;
  reply: IReplyItem;
  isChanged: boolean;
  showUndoConfirm: boolean;
  showDeleteConfirm: boolean;
  showNotification: boolean;
  notificationMessage?: string;
  notificationType?: MessageBarType;
  showNewReply: boolean;
  disablePost: boolean;
  postButton: React.RefObject<any>;
  scrolledIntoView: boolean;
}

class ReplyComponent extends React.Component<IReplyProps & IConnectedState & IConnectedDispatch, IReplyState> {

  constructor(props: IReplyProps & IConnectedState & IConnectedDispatch) {
    super(props);
    LogHelper.verbose(this.constructor.name, 'ctor', `start`);

    this.state = {
      formMode: props.formMode,
      reply: props.reply !== undefined ? props.reply : this.initializeReply(),
      isChanged: false,
      showUndoConfirm: false,
      showDeleteConfirm: false,
      showNotification: false,
      showNewReply: false,
      disablePost: false,
      postButton: React.createRef(),
      scrolledIntoView: false,
    };
  }

  public componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  public componentDidUpdate(prevProps: IReplyProps & IConnectedState & IConnectedDispatch, prevState: IReplyState): void {
    // if our reply has changed
    if (this.props.reply && this.props.reply !== prevProps.reply) {
      // reset our reply in state managed by this component
      this.setState({ reply: this.props.reply });
    }

    if (this.props.show !== prevProps.show) {
      if (this.props.show === true
        && this.state.formMode === FormMode.New) {
        this.setState({
          reply: this.initializeReply(),
          isChanged: false,
          showUndoConfirm: false,
          showDeleteConfirm: false,
          showNotification: false,
          scrolledIntoView: false
        });
      }
    }

    if(this.state.postButton && this.state.postButton.current && this.state.postButton.current._buttonElement && this.state.scrolledIntoView === false) {
      this.state.postButton.current._buttonElement.current.scrollIntoViewIfNeeded();
      this.setState({ scrolledIntoView: true });
    }
  }

  public render(): React.ReactElement<IReplyProps> {
    const { answerMode, show, reply } = this.props;
    let id: string = reply ? `reply-${reply.id}` : `reply-new`;

    if (show === true) {
      return (
        <div id={id} className={styles.reply}>
          <div className={answerMode === true ? styles.containerAnswerMode : styles.container}>
            {this.renderReply()}
          </div>

          {this.getUndoConfirmDialog()}
          {this.getUndoDeleteConfirmDialog()}
        </div>
      );
    }
    else {
      return (
        <div id={id}></div>
      );
    }
  }

  private renderReply(): JSX.Element {
    const { parentQuestion, readOnlyMode, answerMode, webPartContext } = this.props;
    const { reply, formMode, showNewReply, showNotification, notificationType, notificationMessage, disablePost } = this.state;

    return (
      <div className={styles.replyContainer}>
        <div className={(reply.isAnswer === true && parentQuestion.discussionType === DiscussionType.Question) ? styles.replyAnswer : styles.replyItem}>
          {this.renderReplyAdminActions()}
          {this.renderIsAnswer(reply)}

          {formMode === FormMode.View && reply.author && reply.createdDate &&
            <div>
              <span>
                {(webPartContext !== null && webPartContext !== undefined ?
                  <LivePersonaCard
                    serviceScope={webPartContext.serviceScope}
                    user={{
                      displayName: (reply.author === null || reply.author === undefined ? '' : (reply.author.text === undefined ? '' : reply.author.text)),
                      email: (reply.author === null || reply.author === undefined ? '' : (reply.author.id === undefined ? '' : reply.author.id.replace("i:0#.f|membership|", "")))
                    }}
                    >
                    <Persona size={PersonaSize.size32}
                      text={reply.author.text}
                      showSecondaryText={true}
                      onRenderSecondaryText={props =>
                        <div>
                          <Icon iconName={'Comment'} />
                          {strings.Message_RepliedOn} {DateUtility.getFriendlyDate(reply.createdDate, true)}
                        </div>
                      } />
                  </LivePersonaCard>
                    :
                    <Persona size={PersonaSize.size32}
                      text={reply.author.text}
                      showSecondaryText={true}
                      onRenderSecondaryText={props =>
                        <div>
                          <Icon iconName={'Comment'} />
                          {strings.Message_RepliedOn} {DateUtility.getFriendlyDate(reply.createdDate, true)}
                        </div>
                      } />
                  )}

              </span>
            </div>
          }

          {this.renderReplyDetails()}

          <AttachmentsComponent item={reply}
            disabled={formMode === FormMode.View}
            attachmentsChanged={(attachments: IFileAttachment[]) => { this.attachmentsChanged(attachments); }}
            newAttachmentsChanged={(newAttachments: File[]) => { this.newAttachmentsChanged(newAttachments); }}
            removeAttachmentsChanged={(removedAttachments: string[]) => { this.removeAttachmentsChanged(removedAttachments); }} />

          {this.renderQuestionUserActions()}

          {formMode !== FormMode.View && readOnlyMode !== true &&
            <div className={styles.userActions}>
              <PrimaryButton id='Post' text={strings.ButtonText_Reply}
                componentRef={this.state.postButton}
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

        {answerMode !== true &&
          <ReplyComponent
            show={showNewReply}
            formMode={FormMode.New}
            parentQuestion={parentQuestion}
            parentReply={reply}
            onActionCompleted={() => this.setState({ showNewReply: false })}
            getReply={this.props.getReply}
            likeReply={this.props.likeReply}
            helpfulReply={this.props.helpfulReply}
            deleteReply={this.props.deleteReply}
            saveReply={this.props.saveReply}
            markAnswer={this.props.markAnswer}
          />
        }
        {answerMode !== true &&
          <ReplyListComponent
            replies={reply.replies}
            parentQuestion={parentQuestion} />
        }
      </div>
    );
  }

  private renderReplyAdminActions(): JSX.Element | undefined {
    const { formMode, reply } = this.state;
    const { readOnlyMode, parentQuestion } = this.props;

    let items: IContextualMenuItem[] = [];

    if (reply.canEdit) {
      items.push({
        key: 'editReply', name: (strings.MenuText_Edit), iconProps: { iconName: 'Edit' },
        onClick: (ev: any) => this.handleEditClick()
      });
    }

    if (reply.canDelete) {
      items.push({
        key: 'deleteReply', name: (strings.MenuText_Delete), iconProps: { iconName: 'Delete' },
        onClick: (ev: any) => this.setState({ showDeleteConfirm: true })
      });
    }

    if (reply.canMarkAsAnswer) {
      if (parentQuestion.discussionType === DiscussionType.Question && reply.isAnswer) {
        items.push({
          key: 'markAnswer', name: (strings.MenuText_UnmarkAnswer), iconProps: { iconName: 'SingleBookMark' },
          onClick: (ev: any) => this.handleMarkAnswerClick()
        });
      }
      else {
        if (parentQuestion.discussionType === DiscussionType.Question && parentQuestion.isAnswered === false) {
          items.push({
            key: 'markAnswer', name: (strings.MenuText_MarkAnswer), iconProps: { iconName: 'SingleBookMarkSolid' },
            onClick: (ev: any) => this.handleMarkAnswerClick()
          });
        }
      }
    }

    if (formMode === FormMode.View && readOnlyMode !== true && items.length > 0) {
      return (
        <div className={styles.adminActionsContainer}>
          <IconButton id="replySettings"
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
    const { readOnlyMode, parentQuestion } = this.props;
    const { reply, formMode } = this.state;

    if (formMode === FormMode.View && readOnlyMode !== true) {
      return (
        <div className={styles.userActions}>
          {reply.canReact === true && parentQuestion.discussionType === DiscussionType.Question &&
            <ActionButton id="helpfulReply"
              text={` ${strings.ButtonText_Helpful} (${reply.helpfulCount ? reply.helpfulCount : 0})`}
              iconProps={{ iconName: reply.helpfulByCurrentUser === true ? 'FavoriteStarFill' : 'FavoriteStar' }}
              onClick={() => this.handleHelpfulClick()} />
          }
          {reply.canReact === true &&
            <ActionButton id="likeReply"
              text={` ${strings.ButtonText_Like} (${reply.likeCount ? reply.likeCount : 0})`}
              iconProps={{ iconName: reply.likedByCurrentUser === true ? 'LikeSolid' : 'Like' }}
              onClick={() => this.handleLikeClick() } />
          }
          {reply.canReply === true &&
            <ActionButton id="addReply"
              text={strings.ButtonText_Reply}
              iconProps={{ iconName: 'CommentAdd' }}
              onClick={() => this.setState({ showNewReply: true })} />
          }

        </div>
      );
    }
  }

  private renderIsAnswer(reply: IReplyItem): JSX.Element | undefined {

    if (reply.isAnswer === true && this.props.parentQuestion.discussionType === DiscussionType.Question) {
      return (
        <div>
          <span className={styles.replyIsAnswerContainer}>
            <Icon iconName={'SingleBookMarkSolid'} />
            {strings.Message_IsAnswer}
          </span>
        </div>
      );
    }
  }

  private renderReplyDetails(): JSX.Element {
    const { formMode, reply } = this.state;

    if (formMode === FormMode.View) {
      return (
        <div className={styles.replyDetails}>
          <div dangerouslySetInnerHTML={{ __html: reply.details }}></div>
        </div>
      );
    }
    else {
      return (
        <div className={styles.replyDetails}>
          <RichTextEditorComponent id="details"
            value={reply.details}
            questionTitle={this.props.parentQuestion.title ? this.props.parentQuestion.title : ''}
            placeholder={this.props.parentQuestion.discussionType === DiscussionType.Question ? strings.Placeholder_QuestionReplyDetails : strings.Placeholder_ConversationReplyDetails}
            onTextChange={(htmlValue, textValue) => this.handleEditorChanged('details', htmlValue, 'detailsText', textValue)} />
          <div className={styles.errorMessage}>{ErrorHelper.getUIError(reply, 'details')}</div>
        </div>
      );
    }
  }

  private handleEditClick = (): void => {
    this.refreshReplyInState();
    this.setState({ formMode: FormMode.Edit });
  }

  private handleSaveClick = (): void => {
    const { parentQuestion, parentReply } = this.props;
    const { reply, formMode } = this.state;
    let action = Action.Update;

    let isReplyValid = this.isReplyValid();
    this.setState({ disablePost: true });
    if (isReplyValid) {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.info,
        notificationMessage: strings.Message_SavingReply
      });

      if (formMode === FormMode.New) {
        action = Action.Add;
        reply.parentQuestionId = parentQuestion.id;
        reply.title = `${strings.Prefix_Reply}${parentQuestion.title}`;

        if (parentReply) {
          reply.parentReplyId = parentReply.id;
          reply.title = `${strings.Prefix_Reply}${parentReply.title}`;
        }
      }

      this.props.saveReply(reply).then(id => {
        this.setState({
          disablePost: false,
          formMode: FormMode.View,
          isChanged: false,
          notificationType: MessageBarType.success,
          notificationMessage: strings.Message_SavedReply
        });

        // delay hiding the notification
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: undefined });
          this.handleActionCompleted(action);
        }, 2000);
      })
        .catch(e => {
          this.setState({
            disablePost: false,
            showNotification: true,
            notificationType: MessageBarType.error,
            notificationMessage: e.message
          });
        });

    }
    else {
      this.setState({ disablePost: false });
    }
  }

  private handleLikeClick = (): void => {
    const { reply } = this.state;
    this.props.likeReply(reply).then(() => {
      this.refreshReplyInState();
    })
    .catch(e => {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.error,
        notificationMessage: e.message
      });
    });
  }

  private handleHelpfulClick = (): void => {
    const { reply } = this.state;
    this.props.helpfulReply(reply).then(() => {
      this.refreshReplyInState();
    })
    .catch(e => {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.error,
        notificationMessage: e.message
      });
    });
  }

  private handleMarkAnswerClick = (): void => {
    const { reply } = this.state;
    this.props.markAnswer(reply).then(() => {
      this.refreshReplyInState();
    })
    .catch(e => {
      this.setState({
        showNotification: true,
        notificationType: MessageBarType.error,
        notificationMessage: e.message
      });
    });
  }

  private isReplyValid = (): boolean => {
    let isValid: boolean = true;
    const { reply } = this.state;
    reply.uiErrors = new Map<string, string>();

    if (!reply.details) {
      isValid = false;
      ErrorHelper.setUIError(reply, 'details', strings.ErrorMessage_DetailsRequired);
    }

    this.setState({
      reply: reply,
      showNotification: !isValid,
      notificationType: MessageBarType.error,
      notificationMessage: isValid === false ? strings.MessageBar_QuestionSaveErrors : undefined
    });

    return isValid;
  }

  private handleCancelClick = (): void => {
    let { isChanged } = this.state;

    if (isChanged === true) {
      // show a confirmation
      this.setState({ showUndoConfirm: true });
    }
    else {
      this.handleActionCompleted(Action.Cancel);
    }
  }

  private handleConfirmDeleteClick = (): void => {
    const { reply } = this.state;
    this.props.deleteReply(reply).then(() => {
      this.setState({ showDeleteConfirm: false });
    })
    .catch(e => {
      this.setState({
        showDeleteConfirm: false,
        showNotification: true,
        notificationType: MessageBarType.error,
        notificationMessage: e.message
      });
    });
  }

  private refreshReplyInState() {
    const { reply } = this.state;
    if (reply && reply.id) {
      this.props.getReply(reply.id).then(r => {
        this.setState({ reply: r });
      });
    }
  }

  private handleActionCompleted = (action: Action): void => {
    let { formMode } = this.state;

    this.setState({ isChanged: false, scrolledIntoView: false });

    switch (action) {
      case Action.Cancel:
        this.setState({ showUndoConfirm: false, showNotification: false });

        if (formMode == FormMode.Edit) {
          this.refreshReplyInState();
          this.setState({ formMode: FormMode.View });
        }
        break;
      case Action.Update:
        break;
      case Action.Add:
        this.setState({ formMode: FormMode.New, reply: this.initializeReply() });
        break;
      case Action.Delete:
        break;
    }

    if (this.props.onActionCompleted) {
      this.props.onActionCompleted();
    }
  }

  private attachmentsChanged = (attachments: IFileAttachment[]): void => {
    const { reply } = this.state;
    if (reply) {
      reply.attachments = attachments;
      this.setState({ reply: reply, isChanged: true });
    }
  }

  private newAttachmentsChanged = (newAttachments: File[]): void => {
    const { reply } = this.state;
    if (reply) {
      reply.newAttachments = newAttachments;
      this.setState({ reply });
      this.setState({ reply: reply, isChanged: true });
    }
  }

  private removeAttachmentsChanged = (removedAttachments: string[]): void => {
    const { reply } = this.state;
    if (reply) {
      reply.removedAttachments = removedAttachments;
      this.setState({ reply });
      this.setState({ reply: reply, isChanged: true });
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
              onClick={() => this.handleActionCompleted(Action.Cancel)} />
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

  private handleEditorChanged = (htmlPropertyName: string, htmlValue: string | null, textPropertyName: string, textValue: string) => {
    const { reply } = this.state;
    reply[htmlPropertyName] = htmlValue;
    reply[textPropertyName] = textValue;

    ErrorHelper.removeUIError(reply, htmlPropertyName);
    this.setState({ reply: reply, isChanged: true });
  }

  private initializeReply(): IReplyItem {
    return {
      id: 0,
      details: '',
      detailsText: '',
      likeCount: 0,
      likeIds: [],
      likedByCurrentUser: false,
      helpfulCount: 0,
      helpfulIds: [],
      helpfulByCurrentUser: false,
      isAnswer: false,
      canDelete: false,
      canEdit: false,
      canMarkAsAnswer: false,
      canReact: false,
      canReply: false,
      replies: [],
      attachments: [],
      newAttachments: [],
      removedAttachments: []
    };
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
)(ReplyComponent);
