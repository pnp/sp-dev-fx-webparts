import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/site-users";
import "@pnp/sp/site-users/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IMatchQuestion, IGameScore } from "../models/IGameModels";

export class SharePointGameService {
  private sp: SPFI;

  constructor() {
    this.sp = null as any;
  }

  public init(context: WebPartContext): void {
    this.sp = spfi().using(SPFx(context));
  }

  /** Drag & drop questions (MatchQuestions list) */
  public async getMatchQuestions(): Promise<IMatchQuestion[]> {
    try {
      const items = await this.sp.web.lists
        .getByTitle("MatchQuestions")
        .items.filter("IsActive eq 1")
        .select("Id", "Question", "Answer", "Difficulty", "IsActive")
        .top(5000)();

      return items.map((item: any) => ({
        Id: item.Id,
        Question: item.Question,
        Answer: item.Answer,
        Difficulty: item.Difficulty,
        IsActive: item.IsActive
      }));
    } catch (error) {
      console.error("Error fetching match questions:", error);
      return [];
    }
  }

  /** Save score into GameScores list */
  public async saveScore(score: IGameScore): Promise<void> {
    try {
      if (!this.sp) {
        throw new Error("SP context not initialized. Call gameService.init(context) in webpart onInit().");
      }

      const currentUser = await this.sp.web.currentUser();
      const now = new Date().toISOString();

      await this.sp.web.lists.getByTitle("GameScores").items.add({
        Title: score.Title || `${score.GameName} - ${currentUser.Title}`,
        Player: currentUser.Title,
        PlayerEmail: currentUser.Email,
        GameName: score.GameName,
        Score: score.Score,
        CorrectCount: score.CorrectCount,
        TimeTakenSeconds: score.TimeTakenSeconds,
        Timestamp: now
      });

      console.log("GameScore saved successfully.");
    } catch (error) {
      console.error("Error saving score:", error);
      throw error;
    }
  }

  /**
   * Get current user's personal scores (lightweight query)
   */
  public async getCurrentUserScores(): Promise<IGameScore[]> {
    try {
      const currentUser = await this.sp.web.currentUser();
      
      const items = await this.sp.web.lists
        .getByTitle("GameScores")
        .items
        .filter(`PlayerEmail eq '${currentUser.Email}'`)
        .select("Title", "Score", "GameName", "TimeTakenSeconds", "Created", "CorrectCount")
        .orderBy("Created", false)
        .top(100)();
  
      return items.map((item: any) => ({
        Id: 0,
        Title: item.Title || '',
        Player: currentUser.Title,
        PlayerEmail: currentUser.Email,
        GameName: item.GameName || 'Unknown',
        Score: item.Score || 0,
        CorrectCount: item.CorrectCount || 0,
        TimeTakenSeconds: item.TimeTakenSeconds || 0,
        Timestamp: new Date(item.Created)
      }));
    } catch (error) {
      console.error("Error fetching current user scores:", error);
      return [];
    }
  }

  /**
   * Get completion rank for Drag Match (how many users completed before this user)
   */
  public async getDragMatchCompletionRank(): Promise<number> {
    try {
      const allScores = await this.sp.web.lists
        .getByTitle("GameScores")
        .items.filter(`GameName eq 'Drag Match'`)
        .select("Id", "PlayerEmail", "Created")
        .orderBy("Created", true)
        .top(5000)();
  
      const uniqueUsers = new Set<string>();
      allScores.forEach((item: any) => {
        if (item.PlayerEmail) {
          uniqueUsers.add(item.PlayerEmail.toLowerCase());
        }
      });
  
      return uniqueUsers.size + 1;
    } catch (error) {
      console.error("Error getting drag match completion rank:", error);
      return 999;
    }
  }
}

export const gameService = new SharePointGameService();
