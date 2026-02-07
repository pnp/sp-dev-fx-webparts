export interface Poll {
  Id: number;
  Title: string;
  Question: string;
  Options: string[];
}

export interface PollResult {
  Answer: string;
  Count: number;
  Percentage: number;
}
