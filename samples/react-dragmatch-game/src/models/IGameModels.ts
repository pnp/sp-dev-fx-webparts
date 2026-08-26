export interface IMatchQuestion {
  Id: number;
  Question: string;
  Answer: string;
  Difficulty: string;
  IsActive: boolean;
}

/** Used when saving scores into GameScores list */
export interface IGameScore {
  Id?: number;
  Title?: string;
  Player?: string;
  PlayerEmail?: string;
  GameName: string;
  Score: number;
  CorrectCount: number;
  TimeTakenSeconds: number;
  Timestamp?: Date;
}
