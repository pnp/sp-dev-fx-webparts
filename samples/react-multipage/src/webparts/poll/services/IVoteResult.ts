import { IVoteOption } from './IVoteOption';

export interface IVoteResult extends IVoteOption {
  numVotes: number;
}