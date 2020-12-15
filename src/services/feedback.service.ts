import { sp } from '@pnp/sp/presets/all';
import { IPrincipalInfo } from "@pnp/sp";
import "@pnp/sp/sputilities";
import "@pnp/polyfill-ie11";
import { IEmailProperties } from "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-groups/web";
// import { EmailProperties } from '@pnp/sp';
import { BaseService } from './base.service';
import { LogHelper } from '../utilities';
import { IArticleInfo } from '../models/IArticleInfo';

export class FeedbackService extends BaseService {

  public async getTitle(listitemid): Promise<any> {
    var item = await sp.web.lists.getByTitle("Site Pages").items.getById(listitemid).select("Title").get();

    var itemTitle = item["Title"];
    return itemTitle;
  }

  public async getArticleInfo(listitemid): Promise<IArticleInfo> {
    var item = await sp.web.lists.getByTitle("Site Pages").items.getById(listitemid).select("Title", "EncodedAbsUrl").get();

    let articleInfo: IArticleInfo = {
      title: item["Title"],
      url: item["EncodedAbsUrl"]
    };

    return articleInfo;
  }

  public async sendEmailToFeedbackSender(articleInfo: IArticleInfo,  feedback, listitemid, currentUserEmail): Promise<any> {

    if (feedback.indexOf("\n") > -1) {
      feedback = feedback.replace(/\n/g, '<br/>');
    }

    if (currentUserEmail) {
      console.log("Email sending to User: " + currentUserEmail);
      const emailProps: IEmailProperties = {
        To: [currentUserEmail],
        Subject: (articleInfo.title == "Home" || listitemid == 1) ? "Feedback has been provided on the Homepage" : "Feedback for " + articleInfo.title,
        Body: (articleInfo.title == "Home" || listitemid == 1) ? "The feedback you provided on the Homepage has successfully been submitted.</br></br>\"" + feedback + "\"<br/>"
          : "The feedback you provided on \"" + articleInfo.title + "\" has been successfully submitted.</br></br>\"" + feedback + "\"<br/><br>Article can be found here: <a href=\"" + articleInfo.url + "\">" + articleInfo.url + "</a></br>"
      };
      await sp.utility.sendEmail(emailProps)
        .catch(e => {
          super.handleHttpError('sendEmail', e);
          throw e;
        });
    }
    return;
  }

  public async sendEmailToOwnerGroup(feedback, listitemid, category, currentUserName, currentUserEmail) {
    let articleInfo = await this.getArticleInfo(listitemid);

    let principals: IPrincipalInfo[] = await sp.utility.expandGroupsToPrincipals(["Feedback Owners"]);

    if (feedback.indexOf("\n") > -1) {
      feedback = feedback.replace(/\n/g, '<br/>');
    }

    var emails: string[] = [];
    for (var i = 0; i < principals.length; i++) {
      if (principals[i].Email) {
        emails.push(principals[i].Email);
      }
      else {
        LogHelper.warning("FeedbackService", "sendEmailToOwnerGroup", `No email for ${principals[i].LoginName}`);
      }
    }

    console.log("Owner Emails: " + emails.join(";"));

    if (emails && emails.length > 0) {
      const emailProps: IEmailProperties = {
        To: emails,
        Subject: (articleInfo.title == "Home") ? "Feedback has been provided on the Homepage (" + category + ")" : "Feedback for " + articleInfo.title + " (" + category + ")",
        Body: (articleInfo.title == "Home" || listitemid == 1) ? "\"" + feedback + "\"<br/><br/>Submitted by: " + currentUserName + " <a href=\"mailto:" + currentUserEmail + "\">" + currentUserEmail + "</a><br/>"
          : "\"" + feedback + "\"<br/><br/>Submitted by: " + currentUserName + " <a href=\"mailto:" + currentUserEmail + "\">" + currentUserEmail + "</a><<br/><br/>Article can be found here: <a href=\"" + articleInfo.url + "\">" + articleInfo.url + "</a>"
      };

      await sp.utility.sendEmail(emailProps)
        .catch(e => {
          super.handleHttpError('sendEmail', e);
          throw e;
        });
      LogHelper.info("FeedbackService", "sendEmailToOwnerGroup", `Email Sent`);
    }

    this.sendEmailToFeedbackSender(articleInfo, feedback, listitemid, currentUserEmail);
  }

}
