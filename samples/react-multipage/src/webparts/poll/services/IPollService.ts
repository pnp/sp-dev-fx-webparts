import { IVoteOption } from './IVoteOption';
import { IVoteResult } from './IVoteResult';

export interface IPollService {
  getVoteOptions: (listName: string) => Promise<IVoteOption[]>;
  vote: (voteOptionId: number, listName: string) => Promise<{}>;
  getResults: (listName: string) => Promise<IVoteResult[]>;
}