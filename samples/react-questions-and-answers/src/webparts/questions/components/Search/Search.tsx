import * as React from 'react';
import styles from './Search.module.scss';
import * as strings from 'QuestionsWebPartStrings';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { searchQuestions, launchNewQuestion, navigateToViewAll, changeShowQuestionsOption } from 'webparts/questions/redux/actions/actions';
// models
import { ICurrentUser } from 'models';
// controls
import { SearchBox, ISearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { PrimaryButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DiscussionType, Parameters, ShowQuestionsOption } from 'utilities';

interface IConnectedDispatch {
  searchQuestions: (searchText: string, categoryFilter: string | null) => void;
  changeShowQuestionsOption: (option: string, categoryFilter: string | null) => void;
  launchNewQuestion: (initialTitle: string, category: string, type: DiscussionType) => void;
  navigateToViewAll: (categoryFilter: string | null) => void;
}

interface IConnectedState {
  currentUser?: ICurrentUser;
  searchText: string;
  hideViewAllButton: boolean;
  showQuestionAnsweredDropDown: boolean;
  themeVariant: IReadonlyTheme | undefined;
  selectedShowQuestionsOption: string;
  category: string;
  type: DiscussionType;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: ISearchProps): IConnectedState {
  return {
    currentUser: state.currentUser,
    searchText: state.searchText,
    hideViewAllButton: state.hideViewAllButton,
    showQuestionAnsweredDropDown: state.showQuestionAnsweredDropDown,
    themeVariant: state.themeVariant,
    selectedShowQuestionsOption: state.selectedShowQuestionsOption,
    category: state.category,
    type: DiscussionType[state.discussionType]
  };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
  searchQuestions,
  launchNewQuestion,
  navigateToViewAll,
  changeShowQuestionsOption
};

export interface ISearchProps {
  show: boolean;
  categoryFilter: string | null;
}

class SearchComponent extends React.Component<ISearchProps & IConnectedState & IConnectedDispatch, {}> {

  private _searchBox = React.createRef<ISearchBox>();

  protected establishCategory(): string | null {
    if (!(this.props.categoryFilter === null || this.props.categoryFilter === '')) {
      return this.props.categoryFilter;
    } else if (!(this.props.category === null || this.props.category === '')) {
      return this.props.category;
    } else {
      return null;
    }
}

  public render(): React.ReactElement<ISearchProps> {

    let searchPlaceHolderText = strings.Placeholder_Search_Questions;
    let buttonText = strings.ButtonText_AskQuestion;
    if(this.props.type === DiscussionType.Conversation) {
      searchPlaceHolderText = strings.Placeholder_Search_Conversations;
      buttonText = strings.ButtonText_StartConversation;
    }

    let viewAllStyle: any = undefined;
    let buttonStyle: any = undefined;
    if (this.props.themeVariant) {
      viewAllStyle = ({
          root: {color: this.props.themeVariant.semanticColors.link },
          rootHovered: {color: this.props.themeVariant.semanticColors.linkHovered },
          label: {margin: 0, marginRight: -5}
        });
      buttonStyle = ({
        root: {
          backgroundColor: this.props.themeVariant.semanticColors.primaryButtonBackground,
          color: this.props.themeVariant.semanticColors.primaryButtonText,
          borderColor: this.props.themeVariant.semanticColors.primaryButtonBackground,
        },
        rootHovered:  {
          backgroundColor: this.props.themeVariant.semanticColors.primaryButtonBackgroundHovered,
          color: this.props.themeVariant.semanticColors.primaryButtonTextHovered,
          borderColor: this.props.themeVariant.semanticColors.primaryButtonBackgroundHovered,
        }
      });
    }

    return (
      <div className={styles.search} style={{ display: this.props.show === true ? 'block' : 'none' }} >
        <div className={styles.container}>

          <div className={styles.searchContainer}>
            <SearchBox
              className={styles.searchBoxContainer}
              placeholder={searchPlaceHolderText}
              onClear={ev => this.props.searchQuestions('', this.establishCategory())}
              value={this.props.searchText}
              componentRef={this._searchBox}
              onChange={(event, filterText: string) => this.props.searchQuestions(filterText, this.establishCategory())}
              onSearch={filterText => this.props.searchQuestions(filterText, this.establishCategory())}
            />


            <div className={styles.userActions}>
              {this.props.currentUser && this.props.currentUser.canAddItems === true &&
                <PrimaryButton className={styles.askAQuestionButton} styles={buttonStyle} text={buttonText}
                  onClick={() => this.props.launchNewQuestion(this.props.searchText, this.CheckForCategoryQueryStringOverride(), this.props.type)} />
              }
              {this.props.hideViewAllButton !== true &&
                <ActionButton className={styles.viewAll} styles={viewAllStyle}
                  text={strings.ButtonText_ViewAll} onClick={() => this.props.navigateToViewAll(this.props.categoryFilter)} />
              }

              {this.props.showQuestionAnsweredDropDown === true &&
                <Dropdown className={styles.showQuestionsDropDown}
                  onChanged={(option) => this.props.changeShowQuestionsOption(option.key.toString(), this.CheckForCategoryQueryStringOverride())}
                  selectedKey={this.props.selectedShowQuestionsOption}
                  options={[
                    {
                      key: ShowQuestionsOption.All,
                      text: strings.DropDownItem_AllQuestions,
                    },
                    {
                      key: ShowQuestionsOption.Open,
                      text: strings.DropDownItem_OpenQuestions
                    },
                    {
                      key: ShowQuestionsOption.Answered,
                      text: strings.DropDownItem_AnsweredQuestions
                    }
                  ]}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @description When it comes to Categories, the Query String is ALWAYS king
   */
  private CheckForCategoryQueryStringOverride(): string {
    let queryParms = new URLSearchParams(window.location.search);
    let category: string | null;
    if(queryParms.has(Parameters.CATEGORY)) {
      category = String(queryParms.get(Parameters.CATEGORY));
    }
    else {
      category = this.props.category;
    }
    return category;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
