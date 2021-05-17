// Represents attributes of Questionnaire
export interface IQuestionnaireItem {
    ID?: number;
    MeetingID: string;
    Title: string;
    Description: string;
    Author?: any;
    Modified?: Date;
}