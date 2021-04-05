import { IQuestionnaireItem } from "../../../models/IQuestionnaireItem";

export interface IQuestionnaireMeetingAppState {
    infoLoaded: boolean;
    meetingQuestionnaire: IQuestionnaireItem[];
    showPopup:boolean;
}