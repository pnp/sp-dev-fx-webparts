import * as React from 'react';
import { autobind } from '@uifabric/utilities/lib';
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

interface IConnectedDispatch {
  getPagedQuestions: (goingToNextPage: boolean) => void;
  getPrevPagedQuestions: () => void;
  launchQuestion: (questionId?: number) => void;
}

interface IConnectedState {
  currentPagedQuestions: IPagedItems<IQuestionItem> | null;
  previousPagedQuestions: IPagedItems<IQuestionItem>[];
}

// map actions to properties so they can be invoked
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
  return {
    currentPagedQuestions: state.currentPagedQuestions,
    previousPagedQuestions: state.previousPagedQuestions,
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
}

class QuestionListComponent extends React.Component<IQuestionListProps & IConnectedState & IConnectedDispatch, {}> {

  public componentDidUpdate(prevProps: IQuestionListProps & IConnectedState & IConnectedDispatch, prevState: any): void {

    /* 
      this tells us they are returning to the list of questions from a question and we don't have a list qustions 
      typically this is when user launched via a querystring directly to a new/existing question
    */
    if(this.props.show !== prevProps.show && 
      this.props.show === true &&
      this.props.currentPagedQuestions === null) {
        this.props.getPagedQuestions(false);
    }
  }

  public render(): React.ReactElement<IQuestionListProps> {
    const { currentPagedQuestions, previousPagedQuestions } = this.props;

    const showPrev = previousPagedQuestions && previousPagedQuestions.length > 0;
    let showNext = currentPagedQuestions && 
      currentPagedQuestions.pagedItemCollection && 
          currentPagedQuestions.pagedItemCollection.hasNext === true;

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
                disabled={!showPrev}
                iconProps={{ iconName: 'ChevronLeft' }}
                onClick={this.props.getPrevPagedQuestions} />
              <ActionButton id="nextButton"
                text={strings.ButtonText_Next}
                styles={{ flexContainer: { flexDirection: 'row-reverse' } }}
                disabled={!showNext}
                iconProps={{ iconName: 'ChevronRight' }}
                onClick={() => this.props.getPagedQuestions(true)} />
            </div>
          }
        </div>
      );
    }
    else {
      return (<div id="questionsList"></div>);
    }
  }

  @autobind
  private onRenderQuestion(question: IQuestionItem, index: number | undefined): JSX.Element {
    return (
      <div id={`question-${question.id}`} className={styles.questionOuterContainer}>
        <div className={styles.questionInnerContainer}
          onClick={ev => this.props.launchQuestion(question.id)} data-is-focusable={true}>
          <div className={styles.questionIconContainer}>
            {question.isAnswered === true &&
              <Icon className={styles.questionAnswered} iconName="FeedbackResponseSolid" />
            }
            {question.isAnswered !== true &&
              <Icon className={styles.questionUnanswered} iconName="FeedbackRequestSolid" />
            }
          </div >
          <div className={styles.questionBody}>
            <div className={styles.questionTitle}>{question.title}</div>
            <div className={styles.questionDetails}>
              {question.detailsText}
            </div>
            <div className={styles.questionAuthorDetails}>
                <span className={styles.questionAuthor}>{question.author!.primaryText}</span> {question.createdDate!.toLocaleDateString()}
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