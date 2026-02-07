import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Poll, PollResult } from "../webparts/dynamicPoll/models/Poll";

const POLLS_LIST_NAME = "Polls";
const POLL_ANSWERS_LIST_NAME = "Poll Answers";

export class SharePointService {
  private _sp: SPFI;
  private _context: WebPartContext;

  constructor(context: WebPartContext) {
    this._context = context;
    this._sp = spfi().using(SPFx(context));
  }

  public async getActivePoll(): Promise<Poll | undefined> {
    try {
      const now = new Date().toISOString();
      const items: Array<Poll> = await this._sp.web.lists
        .getByTitle(POLLS_LIST_NAME)
        .items.filter(
          `StartDate lt '${now}' and EndDate ge '${now}' and IsActive eq 1`,
        )
        .top(1)();

      if (items.length > 0) {
        const item = items[0];
        return {
          Id: item.Id,
          Title: item.Title,
          Question: item.Question,
          Options: item.Options,
        };
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching poll items:", error);
      return undefined;
    }
  }

  public async getUserVote(pollId: number): Promise<string | undefined> {
    try {
      const currentUserEmail = this._context.pageContext.user.email;
      const votes = await this._sp.web.lists
        .getByTitle(POLL_ANSWERS_LIST_NAME)
        .items.filter(
          `PollId eq ${pollId} and Title eq '${currentUserEmail}'`,
        )();

      if (votes.length > 0) {
        return votes[0].Answer;
      }
      return undefined;
    } catch (error) {
      console.error("Error checking user vote:", error);
      return undefined;
    }
  }

  public async submitVote(pollId: number, answer: string): Promise<void> {
    try {
      const currentUserEmail = this._context.pageContext.user.email;
      await this._sp.web.lists.getByTitle(POLL_ANSWERS_LIST_NAME).items.add({
        Title: currentUserEmail,
        PollId: pollId,
        Answer: answer,
      });
    } catch (error) {
      console.error("Error submitting vote:", error);
      throw error;
    }
  }

  public async getPollResults(
    pollItem: Poll,
  ): Promise<{ results: PollResult[]; totalVotes: number }> {
    try {
      const items = await this._sp.web.lists
        .getByTitle(POLL_ANSWERS_LIST_NAME)
        .items.filter(`PollId eq ${pollItem.Id}`)
        .select("Answer")();

      const counts: { [key: string]: number } = {};
      let total = 0;

      // Initialize counts with 0 for all options to show empty bars
      pollItem.Options.forEach((opt) => (counts[opt.trim()] = 0));

      items.forEach((item: { Answer: string }) => {
        const answer = item.Answer;
        if (counts[answer] !== undefined) {
          counts[answer]++;
        } else {
          // Handle cases where answer might not match exactly or is legacy
          counts[answer] = 1;
        }
        total++;
      });

      const results = Object.keys(counts).map((key) => ({
        Answer: key,
        Count: counts[key],
        Percentage: total === 0 ? 0 : counts[key] / total,
      }));

      return { results, totalVotes: total };
    } catch (error) {
      console.error("Error fetching poll results:", error);
      return { results: [], totalVotes: 0 };
    }
  }
}
