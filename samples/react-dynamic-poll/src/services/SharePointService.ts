import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Poll, PollResult } from "../webparts/dynamicPoll/models/Poll";

const POLLS_LIST_NAME = "Polls";
const POLL_ANSWERS_LIST_NAME = "Poll Answers";
const ANSWERS_PAGE_SIZE = 1000;

interface PollAnswer {
  PollId: number;
  Answer: string;
  Title?: string;
}

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
      const pages = this._sp.web.lists
        .getByTitle(POLL_ANSWERS_LIST_NAME)
        .items.select("PollId", "Title", "Answer")
        .orderBy("Id", true)
        .top(ANSWERS_PAGE_SIZE);

      // Avoid lookup/text filters that can hit the large-list threshold.
      for await (const page of pages) {
        for (const item of page as PollAnswer[]) {
          if (item.PollId === pollId && item.Title === currentUserEmail) {
            return item.Answer;
          }
        }
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
      const pages = this._sp.web.lists
        .getByTitle(POLL_ANSWERS_LIST_NAME)
        .items.select("PollId", "Answer")
        .orderBy("Id", true)
        .top(ANSWERS_PAGE_SIZE);

      const counts: { [key: string]: number } = Object.create(null);
      let total = 0;

      // Initialize counts with 0 for all options to show empty bars
      pollItem.Options.forEach((opt) => (counts[opt.trim()] = 0));

      // Follow every continuation page, including when the list exceeds 5,000
      // items. Filter locally: indexing a lookup does not avoid the threshold.
      // Aggregate per page so the full list never needs to be held in memory.
      for await (const page of pages) {
        (page as PollAnswer[]).forEach((item) => {
          if (item.PollId !== pollItem.Id) return;
          const answer = item.Answer;
          counts[answer] = (counts[answer] || 0) + 1;
          total++;
        });
      }

      const results = Object.keys(counts).map((key) => ({
        Answer: key,
        Count: counts[key],
        Percentage: total === 0 ? 0 : counts[key] / total,
      }));

      return { results, totalVotes: total };
    } catch (error) {
      console.error("Error fetching poll results:", error);
      // Never present failed or partially retrieved results as a complete total.
      throw error;
    }
  }
}
