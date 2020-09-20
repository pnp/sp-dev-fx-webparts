import * as React from 'react';
import { LogHelper, ErrorHelper, FormMode, Action } from 'utilities';
import styles from './Reply.module.scss';
import { autobind } from '@uifabric/utilities/lib';
import * as strings from 'QuestionsWebPartStrings';
import { QuillConfig } from '../QuillConfig';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { getReply, likeReply, helpfulReply, deleteReply, saveReply, markAnswer } from 'webparts/questions/redux/actions/actions';
// models
import { IReplyItem, IQuestionItem } from 'models';
// controls
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ActionButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Editor } from 'primereact/editor';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import ReplyListComponent from '../ReplyList/ReplyList';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

interface IConnectedDispatch {
  getReply: (replyId: number) => Promise<IReplyItem>;
  likeReply: (reply: IReplyItem) => Promise<void>;
  helpfulReply: (reply: IReplyItem) => Promise<void>;
  deleteReply: (reply: IReplyItem) => Promise<void>;
  saveReply: (reply: IReplyItem) => Promise<number>;
  markAnswer: (reply: IReplyItem) => Promise<void>;
}

interface IConnectedState { 
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: IReplyProps): IConnectedState {
  return {
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
      showNewReply: false
    };
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
        });
      }
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
    const { parentQuestion, readOnlyMode, answerMode } = this.props;
    const { reply, formMode, showNewReply, showNotification, notificationType, notificationMessage } = this.state;

    return (
      <div className={styles.replyContainer}>
        <div className={reply.isAnswer === true ? styles.replyAnswer : styles.replyItem}>
          {this.renderReplyAdminActions()}
          {this.renderIsAnswer(reply)}

          {formMode === FormMode.View && reply.author && reply.createdDate &&
            <div>
              <span>
                <Persona size={PersonaSize.size24}
                  text={reply.author.primaryText}
                  showSecondaryText={true}
                  onRenderSecondaryText={props =>
                    <div>
                      <Icon iconName={'Comment'} />
                      {strings.Message_RepliedOn} {reply.createdDate!.toLocaleString()}
                    </div>
                  } />
              </span>
            </div>
          }

          {this.renderReplyDetails()}

          {this.renderQuestionUserActions()}

          {formMode !== FormMode.View && readOnlyMode !== true &&
            <div className={styles.userActions}>
              <PrimaryButton id='Post' text={strings.ButtonText_Reply}
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
      if (reply.isAnswer) {
        items.push({
          key: 'markAnswer', name: (strings.MenuText_UnmarkAnswer), iconProps: { iconName: 'SingleBookMark' },
          onClick: (ev: any) => this.handleMarkAnswerClick()
        });
      }
      else {
        if (parentQuestion.isAnswered === false) {
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
          <ActionButton id="replySettings"
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
    const { readOnlyMode } = this.props;
    const { reply, formMode } = this.state;

    if (formMode === FormMode.View && readOnlyMode !== true) {
      return (
        <div className={styles.userActions}>
          {reply.canReact === true &&
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

    if (reply.isAnswer === true) {
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
          <Editor id="details"
            value={reply.details}
            headerTemplate={QuillConfig.header}
            placeholder={strings.Placeholder_QuestionDetails}
            onTextChange={(e) => this.handleEditorChanged('details', e.htmlValue, 'detailsText', e.textValue)} />
          <div className={styles.errorMessage}>{ErrorHelper.getUIError(reply, 'details')}</div>
        </div>
      );
    }
  }

  @autobind
  private handleEditClick(): void {
    this.refreshReplyInState();
    this.setState({ formMode: FormMode.Edit });
  }

  @autobind
  private handleSaveClick(): void {
    const { parentQuestion, parentReply } = this.props;
    const { reply, formMode } = this.state;
    let action = Action.Update;

    let isReplyValid = this.isReplyValid();
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
          formMode: FormMode.View,
          isChanged: false,
          notificationType: MessageBarType.success,
          notificationMessage: strings.Message_SavedReply,
        });

        // delay hiding the notification
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: undefined });
          this.handleActionCompleted(action);
        }, 2000);
      })
        .catch(e => {
          this.setState({
            showNotification: true,
            notificationType: MessageBarType.error,
            notificationMessage: e.message
          });
        });

    }
  }

  @autobind
  private handleLikeClick(): void {
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

  @autobind
  private handleHelpfulClick(): void {
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

  @autobind
  private handleMarkAnswerClick(): void {
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

  @autobind
  private isReplyValid(): boolean {
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

  @autobind
  private handleCancelClick(): void {
    let { isChanged } = this.state;

    if (isChanged === true) {
      // show a confirmation
      this.setState({ showUndoConfirm: true });
    }
    else {
      this.handleActionCompleted(Action.Cancel);
    }
  }

  @autobind
  private handleConfirmDeleteClick(): void {
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

  @autobind
  private handleActionCompleted(action: Action): void {
    let { formMode } = this.state;

    this.setState({ isChanged: false });

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
              onClick={() => this.handleActionCompleted(Action.Cancel)} />
            <DefaultButton text={strings.ButtonText_ResumeEdit}
              onClick={() => this.setState({ showUndoConfirm: false })} />
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

  @autobind
  private handleEditorChanged(htmlPropertyName: string, htmlValue: string | null, textPropertyName: string, textValue: string) {
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
      replies: []
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyComponent);