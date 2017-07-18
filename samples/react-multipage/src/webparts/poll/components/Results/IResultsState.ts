import { IVoteResult } from '../../services';

export interface IResultsState {
  loading: boolean;
  error: string;
  results: IVoteResult[];
}