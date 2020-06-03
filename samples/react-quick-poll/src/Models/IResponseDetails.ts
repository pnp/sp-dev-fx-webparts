export interface IResponseDetails {
    UserID: string;
    UserDisplayName: string;
    UserLoginName?: string;
    PollResponse?: string;
    PollMultiResponse?: string[];
    PollQuestion: string;
    PollQuestionId: string;
    IsMulti: boolean;
}