import * as React from 'react';
import styles from './Search.module.scss';
import { createRef } from '@uifabric/utilities/lib';
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
import { ShowQuestionsOption } from 'utilities';

interface IConnectedDispatch {
  searchQuestions: (searchText: string) => void;
  changeShowQuestionsOption: (option: string) => void;
  launchNewQuestion: (initialTitle: string) => void;
  navigateToViewAll: () => void;
}

interface IConnectedState {
  currentUser?: ICurrentUser;
  searchText: string;
  hideViewAllButton: boolean;
  showQuestionAnsweredDropDown: boolean;
  themeVariant: IReadonlyTheme | undefined;
  selectedShowQuestionsOption: string;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: ISearchProps): IConnectedState {
  return {
    currentUser: state.currentUser,
    searchText: state.searchText,
    hideViewAllButton: state.hideViewAllButton,
    showQuestionAnsweredDropDown: state.showQuestionAnsweredDropDown,
    themeVariant: state.themeVariant,
    selectedShowQuestionsOption: state.selectedShowQuestionsOption
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
}

class SearchComponent extends React.Component<ISearchProps & IConnectedState & IConnectedDispatch, {}> {

  private _searchBox = createRef<ISearchBox>();

  public render(): React.ReactElement<ISearchProps> {

    let viewAllStyle: any = undefined;
    if (this.props.themeVariant) {
      viewAllStyle = { color: this.props.themeVariant.semanticColors.link };
    }

    return (
      <div className={styles.search} style={{ display: this.props.show === true ? 'block' : 'none' }} >
        <div className={styles.container}>

          <div className={styles.searchContainer}>
            <SearchBox
              className={styles.searchBoxContainer}
              placeholder={strings.Placeholder_Search}
              onClear={ev => this.props.searchQuestions('')}
              value={this.props.searchText}
              componentRef={this._searchBox}
              onChange={filterText => this.props.searchQuestions(filterText)}
              onSearch={filterText => this.props.searchQuestions(filterText)}
            />


            <div className={styles.userActions}>
              {this.props.currentUser && this.props.currentUser.canAddItems === true &&
                <PrimaryButton className={styles.askAQuestionButton} text={strings.ButtonText_AskQuestion}
                  onClick={() => this.props.launchNewQuestion(this.props.searchText)} />
              }
              {this.props.hideViewAllButton !== true &&
                <ActionButton className={styles.viewAll} style={viewAllStyle}
                  text={strings.ButtonText_ViewAll} onClick={this.props.navigateToViewAll} />
              }

              {this.props.showQuestionAnsweredDropDown === true &&
                <Dropdown className={styles.showQuestionsDropDown}
                  onChanged={(option) => this.props.changeShowQuestionsOption(option.key.toString())}
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
