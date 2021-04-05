import { Action, ActionTypes, IServiceCallStatus } from '../actions/actions';
import { Reducer } from 'redux';
import { SortOption, FormMode, ShowQuestionsOption, WebPartRenderMode, DiscussionType } from 'utilities';
import { IQuestionItem, ICurrentUser, IPagedItems } from 'models';
import { IQuestionsWebPartProps } from '../../IQuestionsWebPartProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IApplicationState extends IQuestionsWebPartProps {
	currentUser?: ICurrentUser;
	webPartContext?: WebPartContext;
	displayMode: DisplayMode;

	searchText: string;
	selectedShowQuestionsOption: string;

	currentPagedQuestions: IPagedItems<IQuestionItem> | null;
	previousPagedQuestions: IPagedItems<IQuestionItem>[];

	selectedQuestion: IQuestionItem | null;
  selectedQuestionFormMode: FormMode;
  selectedQuestionChanged: boolean;
	showQuestion: boolean;

  applicationErrorMessage?: string;
  applicationServiceCallInfo?: IServiceCallStatus;

	themeVariant: IReadonlyTheme | undefined;
}

export const initialState: IApplicationState = {
	currentUser: undefined,
	webPartContext: undefined,
	displayMode: DisplayMode.Read,
	title: '',
	pageSize: 5,
	sortOption: SortOption.Title,
	selectedShowQuestionsOption: ShowQuestionsOption.All,
	loadInitialPage: false,
	showQuestionAnsweredDropDown: false,
	hideViewAllButton: false,
	applicationPage: '',
	useApplicationPage: true,

	searchText: '',

	currentPagedQuestions: null,
	previousPagedQuestions: [],

	selectedQuestion: null,
  selectedQuestionFormMode: FormMode.View,
  selectedQuestionChanged: false,
	showQuestion: false,
	themeVariant: undefined,
  webPartRenderMode: WebPartRenderMode.Standard,
  category: '',
  showCategory: false,
  stateLabel: '',
  discussionType: DiscussionType.Question
};

//Reducer determines how the state should change after every action.
export const appReducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action: Action): IApplicationState => {
	switch (action.type) {
		case ActionTypes.UPDATE_THEMEVARIANT:
			state = { ...state, themeVariant: action.themeVariant };
			break;
		case ActionTypes.UPDATE_WEBPARTPROPERTY:
			state = { ...state, [action.propertyName]: action.propertyValue };
			break;
		case ActionTypes.UPDATE_WEBPARTDISPLAYMODE:
			state = { ...state, displayMode: action.displayMode };
			break;
		case ActionTypes.UPDATE_WEBPARTCONTEXT:
			state = { ...state, webPartContext: action.webPartContext };
			break;
		case ActionTypes.UPDATE_CURRENTUSER:
			state = { ...state, currentUser: action.currentUser };
			break;
		case ActionTypes.UPDATE_PAGED_QUESTIONS:
			state = {
				...state,
				currentPagedQuestions: action.currentPagedQuestions,
				previousPagedQuestions: action.previousPagedQuestions
			};
			break;
		case ActionTypes.UPDATE_SEARCHTEXT:
			state = { ...state, searchText: action.searchText };
			break;
		case ActionTypes.UPDATE_SHOWQUESTIONSOPTION:
			state = { ...state, selectedShowQuestionsOption: action.option };
			break;
		case ActionTypes.UPDATE_SELECTED_QUESTION:
			state = {
				...state,
				selectedQuestion: action.selectedQuestion,
				selectedQuestionFormMode: action.formMode
			};
      break;
    case ActionTypes.SELECTED_QUESTION_CHANGED:
      state = {
        ...state,
        selectedQuestionChanged: action.selectedQuestionChanged
      };
      break;
		case ActionTypes.UPDATE_APPLICATION_ERROR_MESSAGE:
			state = { ...state, applicationErrorMessage: action.errorMessage };
      break;
    case ActionTypes.UPDATE_APPLICATION_SERVICE_CALL_STATUS:
      state = { ...state, applicationServiceCallInfo: action.serviceStatus };
      break;
		default:
			// loading?
			break;
	}

	return state;
};
