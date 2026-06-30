import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IWheelReward, IGameScore } from "../models/ISpinWheelModels";

export class SpinWheelService {
  private sp: SPFI;

  constructor() {
    this.sp = null as any;
  }

  public init(context: WebPartContext): void {
    this.sp = spfi().using(SPFx(context));
  }

  /**
   * Get all active wheel rewards from WheelRewards list
   */
  public async getWheelRewards(): Promise<IWheelReward[]> {
    try {
      const items = await this.sp.web.lists
        .getByTitle("WheelRewards")
        .items.filter("Active eq 1")
        .select("Id", "Title", "Points", "Probability", "Color", "Active")
        .top(5000)();

      return items.map((item: any) => ({
        Id: item.Id,
        Title: item.Title,
        Points: item.Points,
        Probability: item.Probability,
        Color: item.Color,
        Active: item.Active
      }));
    } catch (error) {
      console.error("Error fetching wheel rewards:", error);
      return [];
    }
  }

  /**
   * Save spin result to GameScores list
   */
  public async saveScore(score: IGameScore): Promise<void> {
    try {
      if (!this.sp) {
        throw new Error("SP context not initialized. Call spinWheelService.init(context) in webpart onInit().");
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

      console.log("✅ Spin result saved successfully.");
    } catch (error) {
      console.error("❌ Error saving score:", error);
      throw error;
    }
  }

  /**
   * Get last spin date for current user
   */
  public async getLastSpinDate(): Promise<string | null> {
    try {
      const currentUser = await this.sp.web.currentUser();

      const items = await this.sp.web.lists
        .getByTitle("GameScores")
        .items.filter(`PlayerEmail eq '${currentUser.Email}' and GameName eq 'Spin Wheel'`)
        .select("Timestamp")
        .orderBy("Timestamp", false)
        .top(1)();

      if (items.length > 0) {
        return items[0].Timestamp;
      }

      return null;
    } catch (error) {
      console.error("Error getting last spin date:", error);
      return null;
    }
  }

  /**
   * Check if user can spin today (1 spin per day)
   */
  public async canSpinToday(): Promise<boolean> {
    try {
      const lastSpinDate = await this.getLastSpinDate();

      if (!lastSpinDate) {
        return true;
      }

      const lastSpin = new Date(lastSpinDate);
      const today = new Date();

      lastSpin.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return lastSpin.getTime() < today.getTime();
    } catch (error) {
      console.error("Error checking spin availability:", error);
      return false;
    }
  }

  /**
   * Get user's spin history (last 10 spins)
   */
  public async getUserSpinHistory(): Promise<IGameScore[]> {
    try {
      const currentUser = await this.sp.web.currentUser();

      const items = await this.sp.web.lists
        .getByTitle("GameScores")
        .items.filter(`PlayerEmail eq '${currentUser.Email}' and GameName eq 'Spin Wheel'`)
        .select("Id", "Title", "Score", "Timestamp")
        .orderBy("Timestamp", false)
        .top(10)();

      return items.map((item: any) => ({
        Id: item.Id,
        Title: item.Title,
        GameName: "Spin Wheel",
        Score: item.Score,
        CorrectCount: 1,
        TimeTakenSeconds: 0,
        Timestamp: new Date(item.Timestamp)
      }));
    } catch (error) {
      console.error("Error fetching spin history:", error);
      return [];
    }
  }
}

export const spinWheelService = new SpinWheelService();
