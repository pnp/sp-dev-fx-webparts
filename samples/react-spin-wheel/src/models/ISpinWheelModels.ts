export interface IWheelReward {
  Id: number;
  Title: string;
  Points: number;
  Probability: number;
  Color: string;
  Active: boolean;
}

export interface ISpinHistory {
  userId: string;
  lastSpinDate: string;
}

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
