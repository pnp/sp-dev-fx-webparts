import { IPrincipalInfo } from "@pnp/sp";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-groups/web";
import { getSP } from "../pnpjsConfig";
import { getGraphClient } from "../graphConfig";
import { BaseService } from './base.service';
import { LogHelper, withRetry } from '../utilities';
import { IArticleInfo } from '../models/IArticleInfo';

export class FeedbackService extends BaseService {

  private async sendMail(to: string[], subject: string, htmlBody: string): Promise<void> {
    // De-duplicate recipients (case-insensitive) while preserving the first-seen value.
    const seen = new Set<string>();
    const recipients: string[] = [];
    for (const address of to) {
      if (!address) {
        continue;
      }
      const key = address.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        recipients.push(address);
      }
    }

    if (recipients.length === 0) {
      return;
    }

    const graphClient = await getGraphClient();
    const CHUNK_SIZE = 500; // Graph allows a maximum of 500 recipients per message.

    for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
      const chunk = recipients.slice(i, i + CHUNK_SIZE);
      const message = {
        message: {
          subject: subject,
          body: {
            contentType: 'HTML',
            content: htmlBody
          },
          toRecipients: chunk.map(address => ({ emailAddress: { address } }))
        },
        saveToSentItems: false
      };

      await withRetry(() => graphClient.api('/me/sendMail').post(message));
    }
  }

  public async getTitle(listitemid): Promise<string> {
    const sp = getSP();
    const item = await sp.web.lists.getByTitle("Site Pages").items.getById(listitemid).select("Title")();

    const itemTitle = item.Title;
    return itemTitle;
  }

  public async getArticleInfo(listitemid): Promise<IArticleInfo> {
    const sp = getSP();
    const item = await sp.web.lists.getByTitle("Site Pages").items.getById(listitemid).select("Title", "EncodedAbsUrl")();

    const articleInfo: IArticleInfo = {
      title: item.Title,
      url: item.EncodedAbsUrl
    };

    return articleInfo;
  }

  public async sendEmailToFeedbackSender(articleInfo: IArticleInfo,  feedback, listitemid, currentUserEmail): Promise<void> {
    if (feedback.indexOf("\n") > -1) {
      feedback = feedback.replace(/\n/g, '<br/>');
    }

    if (currentUserEmail) {
      console.log("Email sending to User: " + currentUserEmail);
      const subject = (articleInfo.title === "Home" || listitemid === 1) ? "Feedback has been provided on the Homepage" : "Feedback for " + articleInfo.title;
      const body = (articleInfo.title === "Home" || listitemid === 1) ? "The feedback you provided on the Homepage has successfully been submitted.</br></br>\"" + feedback + "\"<br/>"
        : "The feedback you provided on \"" + articleInfo.title + "\" has been successfully submitted.</br></br>\"" + feedback + "\"<br/><br>Article can be found here: <a href=\"" + articleInfo.url + "\">" + articleInfo.url + "</a></br>";
      await this.sendMail([currentUserEmail], subject, body)
        .catch(e => {
          super.logError('sendMail', e);
          throw e;
        });
    }
    return;
  }

  public async sendEmailToOwnerGroup(feedback, listitemid, category, currentUserName, currentUserEmail): Promise<void> {
    const sp = getSP();
    const articleInfo = await this.getArticleInfo(listitemid);

    const principals: IPrincipalInfo[] = await sp.utility.expandGroupsToPrincipals(["Feedback Owners"]);

    if (feedback.indexOf("\n") > -1) {
      feedback = feedback.replace(/\n/g, '<br/>');
    }

    const emails: string[] = [];
    for (let i = 0; i < principals.length; i++) {
      if (principals[i].Email) {
        emails.push(principals[i].Email);
      }
      else {
        LogHelper.warning("FeedbackService", "sendEmailToOwnerGroup", `No email for ${principals[i].LoginName}`);
      }
    }

    console.log("Owner Emails: " + emails.join(";"));

    if (emails && emails.length > 0) {
      const subject = (articleInfo.title === "Home") ? "Feedback has been provided on the Homepage (" + category + ")" : "Feedback for " + articleInfo.title + " (" + category + ")";
      const body = (articleInfo.title === "Home" || listitemid === 1) ? "\"" + feedback + "\"<br/><br/>Submitted by: " + currentUserName + " <a href=\"mailto:" + currentUserEmail + "\">" + currentUserEmail + "</a><br/>"
        : "\"" + feedback + "\"<br/><br/>Submitted by: " + currentUserName + " <a href=\"mailto:" + currentUserEmail + "\">" + currentUserEmail + "</a><<br/><br/>Article can be found here: <a href=\"" + articleInfo.url + "\">" + articleInfo.url + "</a>";

      await this.sendMail(emails, subject, body)
        .catch(e => {
          super.logError('sendMail', e);
          throw e;
        });
      LogHelper.info("FeedbackService", "sendEmailToOwnerGroup", `Email Sent`);
    }

    await this.sendEmailToFeedbackSender(articleInfo, feedback, listitemid, currentUserEmail);
  }

}
