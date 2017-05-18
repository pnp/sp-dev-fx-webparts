import { IVoteOption } from '../../services';

export interface IVoteState {
  loading: boolean;
  voteOptions: IVoteOption[];
  voting: boolean;
  error: string;
  voteOptionId: number;
}