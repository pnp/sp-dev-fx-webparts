import * as React from 'react';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
// other
import styles from './DefaultContainer.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
import SearchComponent from '../Search/Search';
import QuestionListComponent from '../QuestionList/QuestionList';
import QuestionComponent from '../Question/Question';
import ErrorComponent from '../Error/Error';
import { IQuestionItem } from 'models';
import { getPagedQuestions, inializeNewQuestion, getSelectedQuestion, IServiceCallStatus, IServiceCallState } from 'webparts/questions/redux/actions/actions';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartRenderMode } from 'utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DiscussionType } from 'utilities';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

interface IConnectedDispatch {
    getPagedQuestions: (goingToNextPage: boolean, categoryFilter: string | null) => void;
    inializeNewQuestion: (initialTitle: string, category: string, type: DiscussionType) => void;
    getSelectedQuestion: (questionId: number) => void;
}

interface IConnectedState {
    title: string;
    displayMode: DisplayMode;
    selectedQuestion: IQuestionItem | null;
    loadInitialPage: boolean;
    applicationErrorMessage?: string;
    themeVariant: IReadonlyTheme | undefined;
    webPartRenderMode: string;
    category: string;
    showCategory: boolean;
    stateLabel: string;
    discussionType: DiscussionType;
    applicationServiceCallInfo: IServiceCallStatus | undefined;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
    return {
        title: state.title,
        displayMode: state.displayMode,
        selectedQuestion: state.selectedQuestion,
        loadInitialPage: state.loadInitialPage,
        applicationErrorMessage: state.applicationErrorMessage,
        themeVariant: state.themeVariant,
        webPartRenderMode: state.webPartRenderMode,
        category: state.category,
        showCategory: state.showCategory,
        stateLabel: state.stateLabel,
        discussionType: DiscussionType[state.discussionType],
        applicationServiceCallInfo: state.applicationServiceCallInfo
    };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
    getPagedQuestions,
    inializeNewQuestion,
    getSelectedQuestion
};

export interface IDefaultContainerProps {
    selectedQuestionId: number;
    selectedCategory: string;
    updateTitle: (value: string) => void;
}

export interface IDefaultContainerState {
    showQuestions: boolean;
}

class DefaultContainerComponent extends React.Component<IDefaultContainerProps & IConnectedState & IConnectedDispatch, IDefaultContainerState> {

    constructor(props: IDefaultContainerProps & IConnectedState & IConnectedDispatch) {
        super(props);
        this.state = { showQuestions: true };
    }

    public componentDidMount() {
      //alert('boom');
        if (this.props.selectedQuestionId === 0) {
            //Category: Query String always trumps property pane value
            this.props.inializeNewQuestion('',
              (this.props.selectedCategory === undefined || this.props.selectedCategory === null || this.props.selectedCategory === '' ? this.props.category : this.props.selectedCategory),
              this.props.discussionType);
            this.setState({ showQuestions: false });
        }
        else if (this.props.selectedQuestionId > 0) {
            this.props.getSelectedQuestion(this.props.selectedQuestionId);
            this.setState({ showQuestions: false });
        }
        else if (this.props.loadInitialPage === true) {
            this.props.getPagedQuestions(false, (this.props.selectedCategory === undefined || this.props.selectedCategory === null || this.props.selectedCategory === '' ? this.props.category : this.props.selectedCategory));
        }
    }

    public componentDidUpdate(prevProps: IDefaultContainerProps & IConnectedState & IConnectedDispatch, prevState: IDefaultContainerState): void {

        // if our question has changed
        if (this.props.selectedQuestion !== prevProps.selectedQuestion) {
            if (this.props.selectedQuestion !== null) {
                this.setState({ showQuestions: false });
            }
            else {
                this.setState({ showQuestions: true });
            }
        }
    }

    public render(): React.ReactElement<IDefaultContainerProps> {

        const { applicationErrorMessage, webPartRenderMode, applicationServiceCallInfo } = this.props;
        const { showQuestions } = this.state;

        const color: string = (!!this.props.themeVariant && this.props.themeVariant.semanticColors.bodyText) || "inherit";

        return (
            <div style={{ color: color }} className={styles.defaultcontainer}>
                <Label style={{ color: color }} className={styles.webpartTitle}>{(this.props.stateLabel ? this.props.stateLabel: '') + (this.props.showCategory === true ? this.props.category + ' ' : '' ) + this.props.title}</Label>
                {(applicationServiceCallInfo !== undefined && applicationServiceCallInfo.display) ? (
                    <MessageBar messageBarType={this.renderMessageType(applicationServiceCallInfo)}>{((applicationServiceCallInfo !== undefined) ? applicationServiceCallInfo.message : '')}</MessageBar>
                ) : null }

                {!applicationErrorMessage ? (
                    <div>
                        {webPartRenderMode !== WebPartRenderMode.OpenQuestions &&
                         webPartRenderMode !== WebPartRenderMode.AnsweredQuestions &&
                         webPartRenderMode !== WebPartRenderMode.ConversationsList &&
                            <SearchComponent show={showQuestions} categoryFilter={(this.props.selectedCategory === undefined || this.props.selectedCategory === null || this.props.selectedCategory === '' ? this.props.category : this.props.selectedCategory)} />
                        }
                        <QuestionListComponent show={showQuestions} categoryFilter={(this.props.selectedCategory === undefined || this.props.selectedCategory === null || this.props.selectedCategory === '' ? this.props.category : this.props.selectedCategory)} />
                        <QuestionComponent show={!showQuestions} />
                    </div>
                ) : (
                        <ErrorComponent erroMessage={applicationErrorMessage} />
                    )
                }

            </div>
        );
    }

    public renderMessageType(status: IServiceCallStatus | undefined): MessageBarType {
        if (status !== undefined) {
          switch (status.state) {
            case IServiceCallState.Success:
              return MessageBarType.success;
            case IServiceCallState.Information:
              return MessageBarType.info;
            case IServiceCallState.Warning:
              return MessageBarType.warning;
            case IServiceCallState.Error:
              return MessageBarType.error;
            default:
              return MessageBarType.info;
          }
      } else {
        return MessageBarType.severeWarning;
      }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultContainerComponent);
