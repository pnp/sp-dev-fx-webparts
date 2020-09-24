import { IQuestionsFilter, IQuestionItem, IPagedItems, ICurrentUser, IReplyItem, IPostItem } from "models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from "@microsoft/sp-core-library";
import { StandardFields, SortOption, PostFields, FormMode, Parameters } from "utilities";
import { IApplicationState } from "../reducers/appReducer";
import { HttpRequestError } from "@pnp/odata";
import { IEmailProperties } from '@pnp/sp/sputilities';
import * as strings from 'QuestionsWebPartStrings';

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

    GET_QUESTIONS_START = 'GET_QUESTIONS_START',
    GET_QUESTIONS_FINISHED = 'GET_QUESTIONS_FINISHED',
    GET_QUESTION_START = 'GET_QUESTION_START',
    GET_QUESTION_FINISHED = 'GET_QUESTION_FINISHED',
    UPDATE_SELECTED_QUESTION = 'UPDATE_SELECTED_QUESTION',

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

    UPDATE_APPLICATION_ERROR_MESSAGE = 'UPDATE_APPLICATION_ERROR_MESSAGE'
}

// contracts for those actions
export type Action =
    { type: ActionTypes.UPDATE_THEMEVARIANT, themeVariant: IReadonlyTheme | undefined } |
    { type: ActionTypes.UPDATE_WEBPARTPROPERTY, propertyName: string, propertyValue: any } |
    { type: ActionTypes.UPDATE_WEBPARTCONTEXT, webPartContext: IWebPartContext } |
    { type: ActionTypes.UPDATE_WEBPARTDISPLAYMODE, displayMode: DisplayMode } |
    { type: ActionTypes.UPDATE_SEARCHTEXT, searchText: string } |
    { type: ActionTypes.UPDATE_SHOWQUESTIONSOPTION, option: string } |
    { type: ActionTypes.UPDATE_CURRENTUSER, currentUser: ICurrentUser } |
    { type: ActionTypes.UPDATE_APPLICATION_ERROR_MESSAGE, errorMessage: string } |
    { type: ActionTypes.GET_QUESTIONS_START } |
    {
        type: ActionTypes.UPDATE_PAGED_QUESTIONS,
        currentPagedQuestions: IPagedItems<IQuestionItem> | null,
        previousPagedQuestions: IPagedItems<IQuestionItem>[]
    } |
    {
        type: ActionTypes.UPDATE_SELECTED_QUESTION,
        selectedQuestion: IQuestionItem | null,
        formMode: FormMode
    }
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

export const updateWebPartContext = (webPartContext: IWebPartContext): Action => ({
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

const updatePagedQuestions = (currentPagedQuestions: IPagedItems<IQuestionItem> | null,
  previousPagedQuestions: IPagedItems<IQuestionItem>[]): Action => ({
      type: ActionTypes.UPDATE_PAGED_QUESTIONS,
      currentPagedQuestions,
      previousPagedQuestions
  });

export function searchQuestions(searchText: string) {
    return (dispatch) => {
        dispatch(updateSearchText(searchText));
        dispatch(updatePagedQuestions(null, []));
        dispatch(getPagedQuestions(false));
    };
}

export function changeShowQuestionsOption(option: string) {
    return (dispatch) => {
        dispatch(updateShowQuestionsOption(option));
        dispatch(updatePagedQuestions(null, []));
        dispatch(getPagedQuestions(false));
    };
}

const updateSelectedQuestion = (selectedQuestion: IQuestionItem | null, formMode: FormMode): Action => ({
    type: ActionTypes.UPDATE_SELECTED_QUESTION,
    selectedQuestion,
    formMode
});

export function getPagedQuestions(goingToNextPage: boolean) {
    return async (dispatch, getState, { questionService }) => {

        let currentUser = await dispatch(getCurrentUser());
        const { pageSize, searchText, sortOption, selectedShowQuestionsOption, loadInitialPage, currentPagedQuestions, previousPagedQuestions } = getState();

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
                selectedShowQuestionsOption: selectedShowQuestionsOption
            };

            if (currentPagedQuestions !== null && goingToNextPage === true) {
                previousPagedQuestions.push(currentPagedQuestions);
            }

            dispatch(simpleAction(ActionTypes.GET_QUESTIONS_START));

            let questions = await questionService.getPagedQuestions(currentUser, filter, currentPagedQuestions)
                .catch(e => {
                    let message = handleHttpError(e);
                    dispatch(updateApplicationErrorMessage(message));
                });

            dispatch(updatePagedQuestions(questions, previousPagedQuestions));
            dispatch(simpleAction(ActionTypes.GET_QUESTIONS_FINISHED));

        }
        else {
            // reset state of paged items
            dispatch(updatePagedQuestions(null, []));
        }
    };
}

export function navigateToViewAll() {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();
        if (useApplicationPage === true
            && webPartContext
            && applicationPage
            && applicationPage.endsWith('.aspx')) {
            window.open(`${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}`, '_blank');
        }
        else {
            dispatch(updateWebPartProperty('loadInitialPage', true));
            dispatch(updateSearchText(''));
            dispatch(getPagedQuestions(false));
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

export function launchNewQuestion(initialTitle: string) {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();
        if (useApplicationPage === true
            && webPartContext
            && applicationPage
            && applicationPage.endsWith('.aspx')) {
            window.open(`${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=0`, '_blank');
        }
        else {
            dispatch(inializeNewQuestion(initialTitle));
        }
    };
}

export function launchQuestion(questionId?: number) {
    return (dispatch, getState) => {

        const { webPartContext, applicationPage, useApplicationPage }: IApplicationState = getState();
        if (useApplicationPage === true
            && webPartContext
            && applicationPage
            && applicationPage.endsWith('.aspx')) {
            window.open(`${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${questionId}`, '_blank');
        }
        else {
            dispatch(getSelectedQuestion(questionId));
        }
    };
}

export function inializeNewQuestion(initialTitle: string) {
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
            replies: []
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
                        message = strings.ErrorMessage_HTTP_QuestionNotFound;
                    }

                    dispatch(updateApplicationErrorMessage(message));
                });

            dispatch(updateSelectedQuestion(question, FormMode.View));
            dispatch(simpleAction(ActionTypes.GET_QUESTION_FINISHED));
        }
        else {
            dispatch(updateSelectedQuestion(null, FormMode.View));
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
            }
            let id = await questionService.saveQuestion(question)
                .catch(e => {
                    let message = handleHttpError(e);
                    throw new Error(message);
                });

            dispatch(simpleAction(ActionTypes.SAVE_QUESTION_SUCCESSFUL));
            dispatch(getSelectedQuestion(id));

            // TODO send notification to all follows and moderators on update
            // TODO send notification to moderators for new

            if (isNewQuestion === true) {
                dispatch(createAndSendNewQuestionEmail(question, id));
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
                let subjectPrefix = strings.EmailMessage_Subject_NewQuestion;
                let actionMessage = strings.EmailMessage_Body_HasNewQuestion;
                const { webPartContext, applicationPage } = getState();

                let email: IEmailProperties = {
                    Subject: `${subjectPrefix} ${question.title}`,
                    To: notifyEmails,
                    Body: `
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${questionId}'>
                        ${question.title}
                        </a>
                    </p>
                    <p><b>${strings.EmailMessage_Body_QuestionDetails}</b></p>
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

            let subjectPrefix = strings.EmailMessage_Subject_NewReply;
            let actionMessage = strings.EmailMessage_Body_HasNewRepliedTo;
            if (reply.id && reply.id > 0) {
                subjectPrefix = strings.EmailMessage_Subject_UpdatedReply;
                actionMessage = strings.EmailMessage_Body_HasUpdatedRepliedTo;
            }
            const { selectedQuestion, webPartContext, applicationPage } = getState();

            let email: IEmailProperties = {
                Subject: `${subjectPrefix} ${selectedQuestion.title}`,
                To: selectedQuestion.followEmails,
                Body: `
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${selectedQuestion.id}'>
                        ${selectedQuestion.title}
                        </a>
                    </p>
                    <p><b>${strings.EmailMessage_Body_ReplyDetails}</b></p>
                    <p><hr>${reply.details}</p>
                `
            };
            notificationService.sendEmail(email);
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

            let email: IEmailProperties = {
                Subject: `${subjectPrefix} ${selectedQuestion.title}`,
                To: selectedQuestion.followEmails,
                Body: `
                    <p>
                        <a href='mailto:${currentUser.email}' >${currentUser.displayName}</a>
                        ${actionMessage}
                        <a href='${webPartContext.pageContext.web.absoluteUrl}/SitePages/${applicationPage}?${Parameters.QUESTIONID}=${selectedQuestion.id}'>
                        ${selectedQuestion.title}
                        </a>
                    </p>
                    <p><b>${strings.EmailMessage_Body_ReplyDetails}</b></p>
                    <p><hr>${reply.details}</p>
                `
            };
            notificationService.sendEmail(email);
        }
    };
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

export function handleHttpError(error: HttpRequestError): string {
    switch (error.status) {
        case 403:
            return strings.ErrorMessage_HTTP_AccessDenied;
        case 404:
            return strings.ErrorMessage_HTTP_NotFound;
        default:
            return strings.ErrorMessage_HTTP_Generic;
    }
}
