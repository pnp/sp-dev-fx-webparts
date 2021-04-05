import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import { sp } from "@pnp/sp";
import { UserService } from 'services/user.service';
//import * as strings from 'QuestionsWebPartStrings';
import { LogHelper, ListNames, ListForms, ApplicationPages, Parameters, DiscussionType } from 'utilities';
import { ICurrentUser, IItemInfo } from 'models';
import { QuestionService } from 'services/questions.service';

export interface IQuestionsListManagerApplicationCustomizerProperties {
    // This is an example; replace with your own property
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class QuestionsListManagerApplicationCustomizer
    extends BaseApplicationCustomizer<IQuestionsListManagerApplicationCustomizerProperties> {

    @override
    public onInit(): Promise<void> {
        LogHelper.info(this.constructor.name, "onInit", "start");

        sp.setup({
            ie11: true,
            spfxContext: this.context,
        });

        let currentLocation = window.location.href.toLocaleLowerCase();
        let questionsUrl = `/lists/${ListNames.QUESTIONS.toLowerCase()}`;
        let dispFormUrl = `${questionsUrl}/${ListForms.DiSPLAYFORM.toLowerCase()}`;
        let editFormUrl = `${questionsUrl}/${ListForms.EDITFORM.toLowerCase()}`;
        let newFormUrl = `${questionsUrl}/${ListForms.NEWFORM.toLowerCase()}`;

        // we only care to do anything if we are somewhere in the questions lists
        if (currentLocation.indexOf(questionsUrl) !== -1) {

            if ((currentLocation.indexOf(dispFormUrl) !== -1) || (currentLocation.indexOf(editFormUrl) !== -1)) {

                // if disp or edit form get item an send to appropriate question or conversation
                if (window.location.search) {
                    let queryParms = new URLSearchParams(window.location.search.toLowerCase());
                    if (queryParms.has(Parameters.ID.toLowerCase())) {
                        let itemId = Number(queryParms.get(Parameters.ID.toLowerCase()));
                        new QuestionService().getItemInfoById(itemId)
                            .then((itemInfo: IItemInfo) => {
                                let applicationPage = itemInfo.discussionType === DiscussionType.Question ? ApplicationPages.QUESTIONS : ApplicationPages.CONVERSATIONS;
                                let questionId = itemInfo.parentQuestionId ? itemInfo.parentQuestionId : itemInfo.id;
                                this.redirectToPage(currentLocation, questionsUrl, applicationPage, questionId);
                            })
                            .catch((e) => {
                                LogHelper.error(this.constructor.name, "onInit", `Error getting item: ${e.message}`);
                            });
                    }
                }
            }
            else if (currentLocation.indexOf(newFormUrl) !== -1) {
                // if new form send to new question page
                this.redirectToPage(currentLocation, questionsUrl, ApplicationPages.QUESTIONS, 0);
            }
            else {
                // if normal list views and user can't moderate send to Questions.aspx
                new UserService().getCurrentUser()
                    .then((currentUser: ICurrentUser) => {
                        if (!currentUser || !currentUser.canModerateItems) {
                            this.redirectToPage(currentLocation, questionsUrl, ApplicationPages.QUESTIONS);
                        }
                    })
                    .catch((e) => {
                        LogHelper.error(this.constructor.name, "onInit", `Error getting current user: ${e.message}`);
                        this.redirectToPage(currentLocation, questionsUrl, ApplicationPages.QUESTIONS);
                    });
            }


        }

        return Promise.resolve();
    }

    private redirectToPage = (currentLocation: string, questionsUrl: string, applicationPage: string, questionId?: number) => {
      let questionsListParts = currentLocation.split(questionsUrl);
      let questionsListUrl = `${questionsListParts[0]}/SitePages/${applicationPage}`;

      if(questionId) {
        questionsListUrl += `?${Parameters.QUESTIONID}=${questionId}`;
      }

      window.location.replace(questionsListUrl);
    }
}
