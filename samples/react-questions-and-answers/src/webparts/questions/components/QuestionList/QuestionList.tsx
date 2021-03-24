import * as React from 'react';
import * as strings from 'QuestionsWebPartStrings';
import styles from './QuestionList.module.scss';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { getPagedQuestions, getPrevPagedQuestions, launchQuestion } from 'webparts/questions/redux/actions/actions';
// models
import { IQuestionItem, IPagedItems } from 'models';
// controls
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { DiscussionType, DateUtility } from 'utilities';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import CategoryLabel from '../CategoryLabel/CategoryLabel';

interface IConnectedDispatch {
  getPagedQuestions: (goingToNextPage: boolean, categoryFilter: string | null) => void;
  getPrevPagedQuestions: () => void;
  launchQuestion: (questionId?: number) => void;
}

interface IConnectedState {
  currentPagedQuestions: IPagedItems<IQuestionItem> | null;
  previousPagedQuestions: IPagedItems<IQuestionItem>[];
  type: DiscussionType;
  searchText: string;
  selectedQuestionChanged: boolean;
  themeVariant: IReadonlyTheme | undefined;
}

// map actions to properties so they can be invoked
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
  return {
    currentPagedQuestions: state.currentPagedQuestions,
    previousPagedQuestions: state.previousPagedQuestions,
    type: DiscussionType[state.discussionType],
    searchText: state.searchText,
    selectedQuestionChanged: state.selectedQuestionChanged,
    themeVariant: state.themeVariant
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
const mapDispatchToProps = {
  getPagedQuestions,
  getPrevPagedQuestions,
  launchQuestion
};

export interface IQuestionListProps {
  show: boolean;
  categoryFilter: string | null;
}

class QuestionListComponent extends React.Component<IQuestionListProps & IConnectedState & IConnectedDispatch, {}> {

  public componentDidUpdate(prevProps: IQuestionListProps & IConnectedState & IConnectedDispatch, prevState: any): void {

    /*
      this tells us they are returning to the list of questions from a question and we don't have a list qustions
      typically this is when user launched via a querystring directly to a new/existing question
    */
    if(this.props.show !== prevProps.show && this.props.show === true) {
      if(this.props.currentPagedQuestions === null) {
        this.props.getPagedQuestions(false, this.props.categoryFilter);
      }
      else if(this.props.selectedQuestionChanged === true) {
        this.props.getPagedQuestions(false, this.props.categoryFilter);
      }
    }
  }

  public render(): React.ReactElement<IQuestionListProps> {
    const { currentPagedQuestions, previousPagedQuestions } = this.props;

    const showPrev = previousPagedQuestions && previousPagedQuestions.length > 0;
    let showNext = currentPagedQuestions && currentPagedQuestions.nextHref ? true : false;

    let prevButtonStyle: any = undefined;
    let nextButtonStyle: any = undefined;
    if (this.props.themeVariant) {
      prevButtonStyle = showPrev === true ? { color: this.props.themeVariant.semanticColors.link } : undefined;
      nextButtonStyle = showNext === true ? { color: this.props.themeVariant.semanticColors.link } : undefined;
    }

    if (currentPagedQuestions && currentPagedQuestions.items && currentPagedQuestions.items.length > 0) {
      return (
        <div id="questionsList" className={styles.questionList}
          style={{ display: this.props.show === true ? 'block' : 'none' }}>
          <div className={styles.container}>
            <List items={currentPagedQuestions.items} onRenderCell={this.onRenderQuestion}></List>
          </div>

          {(showPrev === true || showNext) &&
            <div className={styles.pagingContainer}>
              <ActionButton id="prevButton"
                text={strings.ButtonText_Prev}
                style={prevButtonStyle}
                disabled={!showPrev}
                iconProps={{ iconName: 'ChevronLeft', style : prevButtonStyle }}
                onClick={this.props.getPrevPagedQuestions} />
              <ActionButton id="nextButton"
                text={strings.ButtonText_Next}
                style={nextButtonStyle}
                styles={{ flexContainer: { flexDirection: 'row-reverse' } }}
                disabled={!showNext}
                iconProps={{ iconName: 'ChevronRight', style : nextButtonStyle}}
                onClick={() => this.props.getPagedQuestions(true, this.props.categoryFilter)} />
            </div>
          }
        </div>
      );
    }
    else {
      if(this.props.searchText && this.props.searchText.length > 2) {
      return (<div id="questionsList">{this.props.type === DiscussionType.Question ? strings.Message_NoQuestionsFound : strings.Message_NoConversationsFound} '{this.props.searchText}'</div>);
      }
      else {
        return (<div id="questionsList"></div>);
      }
    }
  }

  private onRenderQuestion = (question: IQuestionItem, index: number | undefined): JSX.Element => {

    let iconStyle: any = undefined;
    if (this.props.themeVariant) {
      iconStyle = { color: this.props.themeVariant.semanticColors.primaryButtonBackground };
    }

    return (
      <div id={`question-${question.id}`} className={styles.questionOuterContainer}>
        <div className={styles.questionInnerContainer}
          onClick={ev => this.props.launchQuestion(question.id)} data-is-focusable={true}>
          <div className={styles.questionIconContainer} >
            {(question.discussionType === DiscussionType.Question && question.isAnswered === true) &&
              <Icon className={styles.questionAnswered} style={iconStyle} iconName="FeedbackResponseSolid" />
            }
            {(question.discussionType === DiscussionType.Question && question.isAnswered !== true) &&
              <Icon className={styles.questionUnanswered} style={iconStyle} iconName="FeedbackRequestSolid" />
            }
            {question.discussionType === DiscussionType.Conversation &&
              <Icon className={styles.questionAnswered} style={iconStyle} iconName="ActivityFeed" />
            }
          </div >
          <div className={styles.questionBody}>
            <div className={styles.questionTitle} title={question.title}>{question.title}</div>
            <div className={styles.questionDetails}>
              {question.detailsText}
            </div>
            <div className={styles.questionAuthorDetails}>
                <span className={styles.questionAuthor}>{question.author!.text}</span>
                <span className={styles.postDate}>{DateUtility.getFriendlyDate(question.createdDate, false)}</span>
                <CategoryLabel category={question.category} style={{ float: 'right' }}></CategoryLabel>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionListComponent);
