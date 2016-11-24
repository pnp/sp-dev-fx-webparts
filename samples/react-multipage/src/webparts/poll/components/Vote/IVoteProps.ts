import { IPollService } from '../../services/IPollService';

export interface IVoteProps {
  onVoted: () => void;
  listName: string;
  pollService: IPollService;
}