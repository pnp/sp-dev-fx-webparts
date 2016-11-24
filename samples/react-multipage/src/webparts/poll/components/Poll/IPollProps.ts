import { IPollService } from '../../services';

export interface IPollProps {
  title: string;
  description: string;
  listName: string;
  pollService: IPollService;
}