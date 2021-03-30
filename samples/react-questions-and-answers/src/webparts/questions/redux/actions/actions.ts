import { IQuestionsFilter, IQuestionItem, IPagedItems, ICurrentUser, IReplyItem, IPostItem } from "models";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import { StandardFields, SortOption, PostFields, FormMode, Parameters, DiscussionType, MentionUtility, ApplicationPages} from "utilities";
import { IApplicationState } from "../reducers/appReducer";
import { HttpRequestError } from "@pnp/odata";
import { IEmailProperties } from '@pnp/sp/sputilities';
import { IPeoplePickerEntity } from '@pnp/sp/profiles';
import * as strings from 'QuestionsWebPartStrings';
import { ISiteUserProps } from "@pnp/sp/presets/all";

export enum IServiceCallState {
  Warning = "Warning",
  Error = "Error",
  Information = "Information",
  Success = "Success"
}
export interface IServiceCallStatus {
  state: IServiceCallState;
  display: boolean;
  message: string;
}

// types of actions that can be performed
export enum ActionTypes {
    UPDATE_THEMEVARIANT = 'UPDATE_THEMEVARIANT',
    UPDATE_WEBPARTPROPERTY = 'UPDATE_WEBPARTPROPERTY',
    UPDATE_WEBPARTCONTEXT = 'UPDATE_WEBPARTCONTEXT',
    UPDATE_WEBPARTDISPLAYMODE = 'UPDATE_WEBPARTDISPLAYMODE',
    UPDATE_SEARCHTEXT = 'UPDATE_SEARCHTEXT',
    UPDATE_SHOWQUESTIONSOPTION = 'UPDATE_SHOWQUESTIONSOPTION',
    GET_CURRENTUSER_START = 'GET_CURRENTUSER_START',
    GET_CURRENTUSER_SUCCESSFUL = 'GET_CURRENTUSER_SUCCESSFUL',
    UPDATE_CURRENTUSER = 'UPDATE_CURRENTUSER',
    UPDATE_PAGED_QUESTIONS = 'UPDATE_PAGED_QUESTIONS',

    LIKE_QUESTION_START = 'LIKE_QUESTION_START',
    LIKE_QUESTION_SUCCESSFUL = 'LIKE_QUESTION_SUCCESSFUL',
    FOLLOW_QUESTION_START = 'FOLLOW_QUESTION_START',
    FOLLOW_QUESTION_SUCCESSFUL = 'FOLLOW_QUESTION_SUCCESSFUL',
    LIKE_REPLY_START = 'LIKE_REPLY_START',
    LIKE_REPLY_SUCCESSFUL = 'LIKE_REPLY_SUCCESSFUL',
    HELPFUL_REPLY_START = 'HELPFUL_REPLY_START',
    HELPFUL_REPLY_SUCCESSFUL = 'HELPFUL_REPLY_SUCCESSFUL',
    CHANGE_DISCUSSION_TYPE_START = 'CHANGE_DISCUSSION_TYPE_START',
    CHANGE_DISCUSSION_TYPE_SUCCESSFUL = 'CHANGE_DISCUSSION_TYPE_SUCCESSFUL',

    GET_QUESTIONS_START = 'GET_QUESTIONS_START',
    GET_QUESTIONS_FINISHED = 'GET_QUESTIONS_FINISHED',
    GET_QUESTION_START = 'GET_QUESTION_START',
    GET_QUESTION_FINISHED = 'GET_QUESTION_FINISHED',
    UPDATE_SELECTED_QUESTION = 'UPDATE_SELECTED_QUESTION',
    SELECTED_QUESTION_CHANGED = 'SELECTED_QUESTION_CHANGED',

    DELETE_QUESTION_START = 'DELETE_QUESTION_START',
    DELETE_QUESTION_SUCCESSFUL = 'DELETE_QUESTION_SUCCESSFUL',
    SAVE_QUESTION_START = 'SAVE_QUESTION_START',
    SAVE_QUESTION_SUCCESSFUL = 'SAVE_QUESTION_SUCCESSFUL',

    GET_REPLY_START = 'GET_REPLY_START',
    GET_REPLY_FINISHED = 'GET_REPLY_FINISHED',
    DELETE_REPLY_START = 'DELETE_REPLY_START',
    DELETE_REPLY_SUCCESSFUL = 'DELETE_REPLY_SUCCESSFUL',
    SAVE_REPLY_START = 'SAVE_REPLY_START',
    SAVE_REPLY_SUCCESSFUL = 'SAVE_REPLY_SUCCESSFUL',
    REPLY_ANSWER_START = 'REPLY_ANSWER_START',
    REPLY_ANSWER_SUCCESSFUL = 'REPLY_ANSWER_SUCCESSFUL',

    UPDATE_APPLICATION_ERROR_MESSAGE = 'UPDATE_APPLICATION_ERROR_MESSAGE',
    UPDATE_APPLICATION_SERVICE_CALL_STATUS = 'UPDATE_APPLICATION_SERVICE_CALL_STATUS',

    UPLOAD_IMAGE_START = 'UPLOAD_IMAGE_START',
    UPLOAD_IMAGE_SUCCESSFUL = 'UPLOAD_IMAGE_SUCCESSFUL',

    SEARCH_PEOPLE_START = 'SEARCH_PEOPLE_START',
    SEARCH_PEOPLE_SUCCESSFUL = 'SEARCH_PEOPLE_SUCCESSFUL',
    UPDATE_PERSONAS_LIST = 'UPDATE_PERSONAS_LIST'
}

// contracts for those actions
export type Action =
    { type: ActionTypes.UPDATE_THEMEVARIANT, themeVariant: IReadonlyTheme | undefined } |
    { type: ActionTypes.UPDATE_WEBPARTPROPERTY, propertyName: string, propertyValue: any } |
    { type: ActionTypes.UPDATE_WEBPARTCONTEXT, webPartContext: WebPartContext } |
    { type: ActionTypes.UPDATE_WEBPARTDISPLAYMODE, displayMode: DisplayMode } |
    { type: ActionTypes.UPDATE_SEARCHTEXT, searchText: string } |
    { type: ActionTypes.UPDATE_SHOWQUESTIONSOPTION, option: string } |
    { type: ActionTypes.UPDATE_CURRENTUSER, currentUser: ICurrentUser } |
    { type: ActionTypes.UPDATE_APPLICATION_ERROR_MESSAGE, errorMessage: string } |
    { type: ActionTypes.UPDATE_APPLICATION_SERVICE_CALL_STATUS, serviceStatus: IServiceCallStatus } |
    { type: ActionTypes.GET_QUESTIONS_START } |
    {
        type: ActionTypes.UPDATE_PAGED_QUESTIONS,
        currentPagedQuestions: IPagedItems<IQuestionItem> | null,
        previousPagedQuestions: IPagedItems<IQuestionItem>[]
    } |
    {
        type: ActionTypes.UPDATE_SELECTED_QUESTION,
        selectedQuestion: IQuestionItem | null,
        formMode: FormMode,
    } |
    {
        type: ActionTypes.SELECTED_QUESTION_CHANGED,
        selectedQuestionChanged: boolean
    } |
    { type: ActionTypes.UPDATE_PERSONAS_LIST, people: IPeoplePickerEntity[] }
    ;

// functions for those actions

const simpleAction = (actionType: ActionTypes) => ({
    type: actionType
});

export const updateThemeVariant = (themeVariant: IReadonlyTheme | undefined): Action => ({
    type: ActionTypes.UPDATE_THEMEVARIANT,
    themeVariant
});

export const updateWebPartProperty = (propertyName: string, propertyValue: any): Action => ({
    type: ActionTypes.UPDATE_WEBPARTPROPERTY,
    propertyName,
    propertyValue
});

export const updateWebPartDisplayMode = (displayMode: DisplayMode): Action => ({
    type: ActionTypes.UPDATE_WEBPARTDISPLAYMODE,
    displayMode
});

export const updateWebPartContext = (webPartContext: WebPartContext): Action => ({
    type: ActionTypes.UPDATE_WEBPARTCONTEXT,
    webPartContext
});

const updateCurrentUser = (currentUser: ICurrentUser): Action => ({
    type: ActionTypes.UPDATE_CURRENTUSER,
    currentUser
});

const updateSearchText = (searchText: string): Action => ({
    type: ActionTypes.UPDATE_SEARCHTEXT,
    searchText
});

export const updateShowQuestionsOption = (option: string): Action => ({
    type: ActionTypes.UPDATE_SHOWQUESTIONSOPTION,
    option: option
});

const updateApplicationErrorMessage = (errorMessage: string): Action => ({
    type: ActionTypes.UPDATE_APPLICATION_ERROR_MESSAGE,
    errorMessage
});

const updateApplicationServiceCallStatus = (serviceStatus: IServiceCallStatus): Action => ({
    type: ActionTypes.UPDATE_APPLICATION_SERVICE_CALL_STATUS,
    serviceStatus
});

export function flashServiceStatus(message: string, state: IServiceCallState) {
    return (dispatch) => {
      dispatch(updateApplicationServiceCallStatus({ display: true, message: message, state: state }));
      setTimeout(() => { dispatch(updateApplicationServiceCallStatus({ display: false, message: message, state: state })); }, 5000);
    };
}

const updatePagedQuestions = (currentPagedQuestions: IPagedItems<IQuestionItem> | null,
  previousPagedQuestions: IPagedItems<IQuestionItem>[]): Action => ({
      type: ActionTypes.UPDATE_PAGED_QUESTIONS,
      currentPagedQuestions,
      previousPagedQuestions
  });

export function searchPeople(input: string, maxCount: number) {
  return async (dispatch, getState, { userService }) => {
    let peopleFound: ISiteUserProps[];
    dispatch(simpleAction(ActionTypes.SEARCH_PEOPLE_START));
    peopleFound = await userService.searchPeople(input, maxCount)
        .catch(e => {
            let message = handleHttpError(e);
            dispatch(updateApplicationErrorMessage(message));
        });
    dispatch(simpleAction(ActionTypes.SEARCH_PEOPLE_SUCCESSFUL));

    return peopleFound;
  };
}

export function searchPeoplePicker(input: string, maxCount: number) {
  return async (dispatch, getState, { userService }) => {
    let peopleFound: IPeoplePickerEntity[];
    dispatch(simpleAction(ActionTypes.SEARCH_PEOPLE_START));
    peopleFound = await userService.searchPeoplePicker(input, maxCount)
        .catch(e => {
            let message = handleHttpError(e);
            dispatch(updateApplicationErrorMessage(message));
        });
    dispatch(simpleAction(ActionTypes.SEARCH_PEOPLE_SUCCESSFUL));

    return peopleFound;
  };
}

export function ensureUserInSite(email: string) {
  return async (dispatch, getState, { userService }) => {
    let response: boolean = await userService.ensureUserInSite(email)
      .catch(e => {
        let message = handleHttpError(e);
        dispatch(updateApplicationErrorMessage(message));
      });

    return response;
  };
}

export function searchQuestions(searchText: string, categoryFilter: string | null) {
    return (dispatch) => {
        dispatch(updateSearchText(searchText));
        dispatch(updatePagedQuestions(null, []));
        dispatch(getPagedQuestions(false, categoryFilter));
    };
}

export function changeShowQuestionsOption(option: string, categoryFilter: string | null) {
    return (dispatch) => {
        dispatch(updateShowQuestionsOption(option));
        dispatch(updatePagedQuestions(null, []));
        dispatch(getPagedQuestions(false, categoryFilter));
    };
}

const updateSelectedQuestion = (selectedQuestion: IQuestionItem | null, formMode: FormMode): Action => ({
    type: ActionTypes.UPDATE_SELECTED_QUESTION,
    selectedQuestion,
    formMode
});

const selectedQuestionUpdated = (selectedQuestionChanged: boolean): Action => ({
  type: ActionTypes.SELECTED_QUESTION_CHANGED,
  selectedQuestionChanged
});

export function getPagedQuestions(goingToNextPage: boolean, categoryFilter: string | null) {
    return async (dispatch, getState, { questionService }) => {

        let currentUser = await dispatch(getCurrentUser());
        const { pageSize, searchText, sortOption, selectedShowQuestionsOption, loadInitialPage, currentPagedQuestions, previousPagedQuestions, discussionType, selectedQuestionChanged } = getState();

        if (loadInitialPage === true || (searchText && searchText.length > 2)) {
            let orderByColumn: string = StandardFields.TITLE;
            let orderByAscending: boolean = true;
            switch (sortOption) {
                case SortOption.MostRecent:
                    orderByColumn = StandardFields.CREATED;
                    orderByAscending = false;
                    break;
                case SortOption.MostLiked:
                    orderByColumn = PostFields.LIKE_COUNT;
                    orderByAscending = false;
                    break;
            }

            let filter: IQuestionsFilter = {
                pageSize: pageSize,
                searchText: searchText,
                orderByColumnName: orderByColumn,
                orderByAscending: orderByAscending,
                selectedShowQuestionsOption: selectedShowQuestionsOption,
                category: categoryFilter,
                discussionType: discussionType
            };

            if (currentPagedQuestions !== null && goingToNextPage === true) {
                previousPagedQuestions.push(currentPagedQuestions);
            }

            dispatch(simpleAction(ActionTypes.GET_QUESTIONS_START));
            let questions: any;
            if(selectedQuestionChanged === true) {
              filter.searchText = '';
              questions = await questionService.getPagedQuestions(currentUser, filter, null)
                .catch(e => {
                    let message = handleHttpError(e);
                    dispatch(updateApplicationErrorMessage(message));
                });
                dispatch(updatePagedQuestions(questions, []));
                dispatch(updateSearchText(filter.searchText as string));
                dispatch(selectedQuestionUpdated(false));
            }
            else {
              questions = await questionService.getPagedQuestions(currentUser, filter, currentPagedQuestions)
                .catch(e => {
                    let message = handleHttpError(e);
                    dispatch(updateApplicationErrorMessage(message));
                });
              dispatch(updatePagedQuestions(questions, previousPagedQuestions));
            }
            dispatch(simpleAction(ActionTypes.GET_QUESTIONS_FINISHED));

        }
        else {
            // reset state of paged items
            dispatch(updatePagedQuestions(null, []));
        }
    };
}

export function navigateToViewAll(categoryFilter: string | null) {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();
        if (useApplicationPage === true
            && webPartContext
            && applicationPage
            && applicationPage.endsWith('.aspx')) {
            window.open(`${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}${(!(categoryFilter === null || categoryFilter ==='') ? '?Category=' + encodeURIComponent(categoryFilter) : '' )}`, '_blank');
        }
        else {
            dispatch(updateWebPartProperty('loadInitialPage', true));
            dispatch(updatePagedQuestions(null, []));
            dispatch(updateSearchText(''));
            dispatch(getPagedQuestions(false, categoryFilter));
        }
    };
}

export function getPrevPagedQuestions() {
    return (dispatch, getState) => {
        const { previousPagedQuestions } = getState();

        let questions = previousPagedQuestions.pop();

        dispatch(updatePagedQuestions(questions, previousPagedQuestions));
    };
}

export function launchNewQuestion(initialTitle: string, category: string, type: DiscussionType) {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();

        if(webPartContext && applicationPage) {
          const questionUrl = `${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=0&${Parameters.CATEGORY}=${encodeURIComponent(category)}&${Parameters.TYPE}=${encodeURIComponent(type)}`;

          if (useApplicationPage === true
              && webPartContext
              && applicationPage
              && applicationPage.endsWith('.aspx')) {
              window.open(questionUrl, '_blank');
          }
          else {
              dispatch(inializeNewQuestion(initialTitle, category, type));

              if(window.location.pathname.length > 0 &&
                (window.location.pathname.toLowerCase().endsWith(ApplicationPages.QUESTIONS.toLowerCase()) ||
                 window.location.pathname.toLowerCase().endsWith(ApplicationPages.CONVERSATIONS.toLowerCase()))) {
                window.history.replaceState({}, "", questionUrl);
            }
          }
        }
    };
}

export function launchQuestion(questionId?: number) {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();

        if(webPartContext && applicationPage) {
          let questionUrl = `${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${questionId}`;

          //if the route contains a category, keep it in the URL
          let queryParms = new URLSearchParams(window.location.search);
          if (queryParms.has(Parameters.CATEGORY)) {
            questionUrl = `${questionUrl}&${Parameters.CATEGORY}=${String(queryParms.get(Parameters.CATEGORY))}`;
          }

          if (useApplicationPage === true && applicationPage.endsWith('.aspx')) {
              window.open(questionUrl, '_blank');
          }
          else {
              dispatch(getSelectedQuestion(questionId));

              // only attempt to update the url if we are on one of our application pages
              if(window.location.pathname.length > 0 &&
                (window.location.pathname.toLowerCase().endsWith(ApplicationPages.QUESTIONS.toLowerCase()) ||
                 window.location.pathname.toLowerCase().endsWith(ApplicationPages.CONVERSATIONS.toLowerCase()))) {
                  window.history.replaceState({}, "", questionUrl);
              }
          }
      }
    };
}

export function inializeNewQuestion(initialTitle: string, category: string, type: DiscussionType) {
    return (dispatch, getState) => {
        let newQuestion: IQuestionItem = {
            id: 0,
            title: initialTitle,
            details: '',
            detailsText: '',
            likeCount: 0,
            likeIds: [],
            likedByCurrentUser: false,
            followEmails: [],
            followedByCurrentUser: false,
            isAnswered: false,
            totalReplyCount: 0,
            canDelete: false,
            canEdit: false,
            canReact: false,
            canReply: false,
            replies: [],
            category: category,
            discussionType: type,
            page: '',
            attachments: [],
            newAttachments: [],
            removedAttachments: []
        };

        dispatch(updateSelectedQuestion(newQuestion, FormMode.New));
    };
}

export function getSelectedQuestion(questionId?: number) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (questionId && questionId > 0) {
            dispatch(simpleAction(ActionTypes.GET_QUESTION_START));

            let question = await questionService.getQuestionById(currentUser, questionId)
                .catch(e => {
                    let message = handleHttpError(e);
                    if (e.status === 404) {
                        message = strings.ErrorMessage_HTTP_ItemNotFound;
                    }

                    dispatch(updateApplicationErrorMessage(message));
                });

            dispatch(updateSelectedQuestion(question, FormMode.View));
            dispatch(simpleAction(ActionTypes.GET_QUESTION_FINISHED));
        }
        else {
            dispatch(updateSelectedQuestion(null, FormMode.View));

            const { webPartContext, applicationPage }: IApplicationState = getState();

            if(webPartContext && applicationPage) {
              /*
                The risk in the below url is if a user launches to the Questions.aspx on a question with a category or see all for a web part with category we won't
                preserve that, so new questions after below wouldn't keep it.
                In testing we could try to utilize the category from the 'last question', however that also has risks when you see all with no category you
                see all questions regardless of category so your last viewed question would impact what category is used on the next new category
              */
              let questionUrl = `${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}`;

              // check if category is in the URL and preserve it
              let queryParms = new URLSearchParams(window.location.search);

              if(queryParms.has(Parameters.CATEGORY)) {
                questionUrl = `${questionUrl}?${Parameters.CATEGORY}=${String(queryParms.get(Parameters.CATEGORY))}`;
              }

              // only attempt to update the url if we are on one of our application pages
              // this should only be invoked when the questions.tsx is closed, cancel edit or cancel on new
              if(window.location.pathname.length > 0 &&
                (window.location.pathname.toLowerCase().endsWith(ApplicationPages.QUESTIONS.toLowerCase()) ||
                 window.location.pathname.toLowerCase().endsWith(ApplicationPages.CONVERSATIONS.toLowerCase()))) {
                window.history.replaceState({}, "", questionUrl);
              }
            }
        }
    };
}

// Delete question actions
export function deleteQuestion(question: IQuestionItem) {
    return async (dispatch, getState, { questionService }) => {
        if (question && question.id && question.id > 0) {
            dispatch(simpleAction(ActionTypes.DELETE_QUESTION_START));
            await questionService.deleteQuestion(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.DELETE_QUESTION_SUCCESSFUL));
            dispatch(selectedQuestionUpdated(true)); // so question list will know to refresh
            dispatch(updateSelectedQuestion(null, FormMode.View));
        }
    };
}

export function likeQuestion(question: IQuestionItem) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (question && question.id && question.id > 0) {
            updateLiked(currentUser, question);
            dispatch(simpleAction(ActionTypes.LIKE_QUESTION_START));
            await questionService.updateLiked(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(getSelectedQuestion(question.id));
            dispatch(simpleAction(ActionTypes.LIKE_QUESTION_SUCCESSFUL));

        }
    };
}

export function followQuestion(question: IQuestionItem) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (question && question.id && question.id > 0) {
            updateFollowed(currentUser, question);
            dispatch(simpleAction(ActionTypes.FOLLOW_QUESTION_START));
            await questionService.updateFollowed(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(getSelectedQuestion(question.id));
            dispatch(simpleAction(ActionTypes.FOLLOW_QUESTION_SUCCESSFUL));

        }
    };
}

export function updateDiscussionType(question: IQuestionItem) {
  return async (dispatch, getState, { questionService }) => {
      if (question && question.id && question.id > 0) {
          dispatch(simpleAction(ActionTypes.CHANGE_DISCUSSION_TYPE_START));
          await questionService.updateDiscussionType(question)
              .catch(e => {
                  let message = handleHttpError(e);
                  throw new Error(message);
              });
          dispatch(getSelectedQuestion(question.id));
          dispatch(selectedQuestionUpdated(true)); // so question list will know to refresh
          dispatch(simpleAction(ActionTypes.CHANGE_DISCUSSION_TYPE_SUCCESSFUL));
          dispatch(flashServiceStatus("Discussion Type successfully updated.", IServiceCallState.Success));
      }
  };
}

// Save question action

export function isDuplicateQuestion(question: IQuestionItem) {
    return async (dispatch, getState, { questionService }) => {
        if (question) {
            let isDuplicate = await questionService.isDuplicateQuestion(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            return isDuplicate;
        }
    };
}

export function saveQuestion(question: IQuestionItem) {
    return async (dispatch, getState, { questionService }) => {
        if (question) {
            let currentUser = await dispatch(getCurrentUser());

            dispatch(simpleAction(ActionTypes.SAVE_QUESTION_START));

            // make sure user asking question is following by default for new questions
            let isNewQuestion: boolean = false;
            if (!question.id || question.id <= 0) {
                question.followEmails.push(currentUser.email);
                isNewQuestion = true;

              //Special logic for page tracking on New Questions
              //Essentially, if we are on the full page part, then store the referrer, unless it's null, undefined, empty or was the login page
              //Otherwise, store the current page
              var page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
              let trackCurrentPage: boolean = true;

              const { applicationPage }: IApplicationState = getState();
              if (page === applicationPage) {
                trackCurrentPage = false;
              }

              if (trackCurrentPage === false) {
                if (document.referrer !== null && document.referrer !== undefined && document.referrer.length > 0 && (document.referrer.search(/login.microsoftonline.com\//gi) === -1) ) {
                  question.page = document.referrer;
                }
                else {
                  // our application page should always be in site pages so lest split and just use the site url
                  question.page = window.location.href.search(/\/sitepages\//gi) !== -1 ? window.location.href.split(/\/sitepages\//gi)[0] : window.location.href;
                }
              }
              else {
                question.page = window.location.href.indexOf('?') !== -1 ? window.location.href.split('?')[0]: window.location.href;
              }
            }

            let id = await questionService.saveQuestion(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });

            dispatch(simpleAction(ActionTypes.SAVE_QUESTION_SUCCESSFUL));
            dispatch(getSelectedQuestion(id));
            dispatch(selectedQuestionUpdated(true)); // so question list will know to refresh

            // TODO send notification to all follows and moderators on update
            // TODO send notification to moderators for new

            if (isNewQuestion === true) {
                dispatch(createAndSendNewQuestionEmail(question, id));

                //Send out mention notifications
                const mentions = MentionUtility.parse(question.details);
                if (mentions.length > 0) {
                  dispatch(createAndSendMentionReceiptEmail(question, id, mentions));
                }
            }

            return id;
        }
    };
}

// REPLY actions

export function getReply(replyId: number) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (replyId && replyId > 0) {
            dispatch(simpleAction(ActionTypes.GET_REPLY_START));
            let reply = await questionService.getReplyById(currentUser, replyId)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.GET_REPLY_FINISHED));
            return reply;
        }
        else {
            dispatch(updateSelectedQuestion(null, FormMode.View));
        }
    };
}

export function deleteReply(reply: IReplyItem) {
    return async (dispatch, getState, { questionService }) => {
        if (reply && reply.id && reply.id > 0) {
            dispatch(simpleAction(ActionTypes.DELETE_REPLY_START));

            // Bug 16315 - if we are deleting a reply that has been marked as the answer then let's unmark it
            // Bug 16328 - if we are deleting a reply and a child reply is the answer then let's unmark it
            await dispatch(tryUnMarkAnswerOnDelete(reply));

            await questionService.deleteReply(reply)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.DELETE_REPLY_SUCCESSFUL));
            if (reply.parentQuestionId) {
                dispatch(getSelectedQuestion(reply.parentQuestionId));
            }
        }
    };
}


export function saveReply(reply: IReplyItem) {
    return async (dispatch, getState, { questionService, notificationService }) => {
        if (reply) {
            dispatch(simpleAction(ActionTypes.SAVE_REPLY_START));
            let id = await questionService.saveReply(reply)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.SAVE_REPLY_SUCCESSFUL));
            if (reply.parentQuestionId) {
                dispatch(getSelectedQuestion(reply.parentQuestionId));
            }
            dispatch(createAndSendReplyEmail(reply));

            return id;
        }
    };
}


export function helpfulReply(reply: IReplyItem) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (reply && reply.id && reply.id > 0) {
            updateHelpful(currentUser, reply);
            dispatch(simpleAction(ActionTypes.HELPFUL_REPLY_START));
            await questionService.updateHelpful(reply)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.HELPFUL_REPLY_SUCCESSFUL));
        }
    };
}

export function likeReply(reply: IReplyItem) {
    return async (dispatch, getState, { questionService }) => {
        let currentUser = await dispatch(getCurrentUser());

        if (reply && reply.id && reply.id > 0) {
            updateLiked(currentUser, reply);
            dispatch(simpleAction(ActionTypes.LIKE_REPLY_START));
            await questionService.updateLiked(reply)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.LIKE_REPLY_SUCCESSFUL));
        }
    };
}

export function markAnswer(reply: IReplyItem) {
    return async (dispatch, getState, { questionService }) => {
        if (reply && reply.id && reply.id > 0) {
            reply.isAnswer = !reply.isAnswer;
            dispatch(simpleAction(ActionTypes.REPLY_ANSWER_START));
            await questionService.markAnswer(reply)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });
            dispatch(simpleAction(ActionTypes.REPLY_ANSWER_SUCCESSFUL));
            if (reply.parentQuestionId) {
                dispatch(getSelectedQuestion(reply.parentQuestionId));
                dispatch(selectedQuestionUpdated(true)); // so question list will know to refresh
            }
            if (reply.isAnswer === true) {
                dispatch(createAndSendMarkedAnswerEmail(reply));
            }
        }
    };
}

export function tryUnMarkAnswerOnDelete(reply: IReplyItem) {
    return async (dispatch, getState, { questionService }) => {
        if (reply.isAnswer) {
            await dispatch(markAnswer(reply));
        }
        else {
            if (reply.replies) {
                for (let childReply of reply.replies) {
                    await dispatch(tryUnMarkAnswerOnDelete(childReply));
                }
            }
        }
    };
}

function updateFollowed(currentUser: ICurrentUser, question: IQuestionItem) {
    question.followedByCurrentUser = !question.followedByCurrentUser;

    const index = question.followEmails.indexOf(currentUser.email);

    if (question.followedByCurrentUser === true) {
        if (index === -1) {
            question.followEmails.push(currentUser.email);
        }
    }
    else {
        if (index > -1) {
            question.followEmails.splice(index, 1);
        }
    }
}

function updateLiked(currentUser: ICurrentUser, post: IPostItem) {
    post.likedByCurrentUser = !post.likedByCurrentUser;

    let currentUserId = `${currentUser.id}`;
    const index = post.likeIds.indexOf(currentUserId);

    if (post.likedByCurrentUser === true) {
        if (index === -1) {
            post.likeIds.push(currentUserId);
        }
    }
    else {
        if (index > -1) {
            post.likeIds.splice(index, 1);
        }
    }
}

function updateHelpful(currentUser: ICurrentUser, reply: IReplyItem) {
    reply.helpfulByCurrentUser = !reply.helpfulByCurrentUser;

    let currentUserId = `${currentUser.id}`;
    const index = reply.helpfulIds.indexOf(currentUserId);

    if (reply.helpfulByCurrentUser === true) {
        if (index === -1) {
            reply.helpfulIds.push(currentUserId);
        }
    }
    else {
        if (index > -1) {
            reply.helpfulIds.splice(index, 1);
        }
    }
}

function createAndSendNewQuestionEmail(question: IQuestionItem, questionId: number) {
    return async (dispatch, getState, { userService, notificationService }) => {
        if (question) {

            let currentUser = await dispatch(getCurrentUser());

            let notifyEmails = await userService.getNotificationGroupUserEmails();

            if (notifyEmails && notifyEmails.length > 0) {
              const { webPartContext, applicationPage, discussionType } = getState();

                let subjectPrefix = discussionType === DiscussionType.Question ? strings.EmailMessage_Subject_NewQuestion : strings.EmailMessage_Subject_NewConversation;
                let actionMessage = discussionType === DiscussionType.Question ? strings.EmailMessage_Body_HasNewQuestion : strings.EmailMessage_Body_HasNewConversation;
                let pageDetailsLabel = discussionType === DiscussionType.Question ? strings.EmailMessage_Body_PageDetails_Question : strings.EmailMessage_Body_PageDetails_Conversation;

                let categoryDetails: string = '';
                if(question.category && question.category.length > 0) {
                  categoryDetails = `<p><b>${strings.EmailMessage_Body_CategoryDetails}</b> ${question.category}</p>`;
                }

                let pageDetails: string = '';
                if(question.page && question.page.length > 0) {
                  pageDetails = `<p><b>${pageDetailsLabel}</b> <a href='${question.page}'>${question.page}</a></p>`;
                }

                let email: IEmailProperties = {
                    Subject: `${subjectPrefix} ${question.title}`,
                    To: notifyEmails,
                    Body: `
                    ${getTroubleViewingHtml(webPartContext, applicationPage, questionId, question.title, currentUser, actionMessage)}
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${questionId}'>
                        ${question.title}
                        </a>
                    </p>
                    ${categoryDetails}
                    ${pageDetails}
                    <p><b>${(discussionType === DiscussionType.Question ? strings.EmailMessage_Body_QuestionDetails : strings.EmailMessage_Body_ConversationDetails)}</b></p>
                    <p><hr>${question.details}</p>
                `
                };
                notificationService.sendEmail(email);
            }
        }
    };
}

function createAndSendReplyEmail(reply: IReplyItem) {
    return async (dispatch, getState, { notificationService }) => {
        if (reply) {
            let currentUser = await dispatch(getCurrentUser());
            const { selectedQuestion, webPartContext, applicationPage, discussionType } = getState();

            let subjectPrefix = strings.EmailMessage_Subject_NewReply;
            let actionMessage = discussionType === DiscussionType.Question ? strings.EmailMessage_Body_HasNewRepliedToQuestion : strings.EmailMessage_Body_HasNewRepliedToConversation;
            if (reply.id && reply.id > 0) {
                subjectPrefix = strings.EmailMessage_Subject_UpdatedReply;
                actionMessage = discussionType === DiscussionType.Question ? strings.EmailMessage_Body_HasUpdatedRepliedToQuestion : strings.EmailMessage_Body_HasUpdatedRepliedToConversation;
            }

            let categoryDetails: string = '';
            if(selectedQuestion.category && selectedQuestion.category.length > 0) {
              categoryDetails = `<p><b>${strings.EmailMessage_Body_CategoryDetails}</b> ${selectedQuestion.category}</p>`;
            }

            let email: IEmailProperties = {
                Subject: `${subjectPrefix} ${selectedQuestion.title}`,
                To: selectedQuestion.followEmails,
                Body: `
                    ${getTroubleViewingHtml(webPartContext, applicationPage, selectedQuestion.id, selectedQuestion.title, currentUser, actionMessage)}
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${selectedQuestion.id}'>
                        ${selectedQuestion.title}
                        </a>
                    </p>
                    ${categoryDetails}
                    <p><b>${strings.EmailMessage_Body_ReplyDetails}</b></p>
                    <p><hr>${reply.details}</p>
                `
            };
            notificationService.sendEmail(email);
        }
    };
}

function createAndSendMentionReceiptEmail(post: IPostItem, postId: number, mentionEmails: string[]) {
  return async (dispatch, getState, { notificationService }) => {
      if (post) {

          let currentUser = await dispatch(getCurrentUser());

          if (mentionEmails && mentionEmails.length > 0) {
            const { webPartContext, applicationPage } = getState();

              let subjectSuffix = strings.EmailMessage_Subject_MentionNotification;
              let preamble = strings.EmailMessage_Body_MentionNotification;

              let email: IEmailProperties = {
                  Subject: `${currentUser.displayName} ${subjectSuffix}`,
                  To: mentionEmails,
                  Body: `
                  ${getTroubleViewingHtml(webPartContext, applicationPage, postId, post.title, undefined, preamble)}
                  <p>
                    ${preamble}
                  </p>
                  <p>
                      <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${postId}'>
                      ${post.title}
                      </a>
                  </p>
                  <p><hr>${post.details}</p>
                  <p>
                    By <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                  </p>
              `
              };
              notificationService.sendEmail(email);
          }
      }
  };
}


function createAndSendMarkedAnswerEmail(reply: IReplyItem) {
    return async (dispatch, getState, { notificationService }) => {
        if (reply) {
            let currentUser = await dispatch(getCurrentUser());

            let subjectPrefix = strings.EmailMessage_Subject_ReplyMarkedAnswer;
            let actionMessage = strings.EmailMessage_Body_HasMarkedAnswerTo;
            if (reply.id && reply.id > 0) {
                if (reply.isAnswer === false) {
                    subjectPrefix = strings.EmailMessage_Subject_ReplyUnMarkedAnswer;
                    actionMessage = strings.EmailMessage_Body_HasUnmarkedAnswerTo;
                }
            }

            const { selectedQuestion, webPartContext, applicationPage } = getState();

            let categoryDetails: string = '';
            if(selectedQuestion.category && selectedQuestion.category.length > 0) {
              categoryDetails = `<p><b>${strings.EmailMessage_Body_CategoryDetails}</b> ${selectedQuestion.category}</p>`;
            }

            let email: IEmailProperties = {
                Subject: `${subjectPrefix} ${selectedQuestion.title}`,
                To: selectedQuestion.followEmails,
                Body: `
                    ${getTroubleViewingHtml(webPartContext, applicationPage, selectedQuestion.id, selectedQuestion.title, currentUser, actionMessage)}
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${selectedQuestion.id}'>
                        ${selectedQuestion.title}
                        </a>
                    </p>
                    ${categoryDetails}
                    <p><b>${strings.EmailMessage_Body_ReplyDetails}</b></p>
                    <p><hr>${reply.details}</p>
                `
            };
            notificationService.sendEmail(email);
        }
    };
}

export function getTroubleViewingHtml(webPartContext, applicationPage, questionId, title, currentUser, actionMessage) {
  return `
  <div style='display:none' >${currentUser ? currentUser.displayName : ''} ${actionMessage} ${title}</div>
  <p>
    <a style='text-decoration: none;font-size: 12px;color: #a19f9d;'
      href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${questionId}'>
        ${strings.EmailMessage_Body_ProblemViewing}
    </a>
  </p>`;
}

export function getCurrentUser() {
    return async (dispatch, getState, { userService }) => {
        let { currentUser } = getState();
        if (!currentUser) {
            dispatch(simpleAction(ActionTypes.GET_CURRENTUSER_START));
            currentUser = await userService.getCurrentUser();
            dispatch(simpleAction(ActionTypes.GET_CURRENTUSER_SUCCESSFUL));
            dispatch(updateCurrentUser(currentUser));
        }
        return currentUser;
    };
}

export function uploadImageToQuestionsAssets(questionTile: string, blobInfo: any, progress) {
    return async (dispatch, getState, { questionsAssetsService }) => {

        dispatch(simpleAction(ActionTypes.UPLOAD_IMAGE_START));

        let imageUrl = await questionsAssetsService.uploadImageToQuestionsAssets(questionTile, blobInfo, progress)
          .catch(e => {
              let message = handleHttpError(e);
              throw new Error(message);
          });

        dispatch(simpleAction(ActionTypes.UPLOAD_IMAGE_SUCCESSFUL));
        return imageUrl;
      };
}

export function handleHttpError(error: HttpRequestError): string {
    switch (error.status) {
        case 400:
            return strings.ErrorMessage_HTTP_BadRequest;
        case 403:
            return strings.ErrorMessage_HTTP_AccessDenied;
        case 404:
            return strings.ErrorMessage_HTTP_NotFound;
        case undefined:
            return error.message;
        default:
            return strings.ErrorMessage_HTTP_Generic;
    }
}
