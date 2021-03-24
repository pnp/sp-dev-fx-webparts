export interface IQuestionsWebPartProps {
    title: string;
    pageSize: number;
    sortOption: string;
    loadInitialPage: boolean;
    showQuestionAnsweredDropDown: boolean;
    hideViewAllButton: boolean;
    applicationPage: string;
    useApplicationPage: boolean;

    canVisitorsAskQuestions?: boolean;
    notificationGroup?: string;
    webPartRenderMode: string;
    category: string;
    showCategory: boolean;
    stateLabel: string;
    discussionType: string;
}
