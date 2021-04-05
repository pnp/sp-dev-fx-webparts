import { IQuestionnaireItem } from "../models/IQuestionnaireItem";
import { sp } from '@pnp/sp/presets/all';

export default class SPOService {
    public async getQuestionnaire(listTitle: string, meetingId: string): Promise<IQuestionnaireItem[]> {
        let meetingQuestionnaire: IQuestionnaireItem[] = [];

        try {
            // Get Client POC Master
            meetingQuestionnaire = await sp.web.lists.getByTitle(listTitle)
                .items
                .select("ID,MeetingID,Title,Description,Author/Title,Author/EMail,Modified")
                .expand("Author")
                .filter(`MeetingID eq '${meetingId}'`)
                .orderBy("Modified", false)
                .get<IQuestionnaireItem[]>();
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
        return meetingQuestionnaire;
    }

    public async addQuestion(listTitle: string, item: IQuestionnaireItem): Promise<boolean> {
        try {
            // Get Client POC Master
            return sp.web.lists.getByTitle(listTitle)
                .items
                .add({
                    Title: item.Title,
                    Description: item.Description,
                    MeetingID: item.MeetingID
                })
                .then((value) => {
                    return Promise.resolve(true);
                });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
