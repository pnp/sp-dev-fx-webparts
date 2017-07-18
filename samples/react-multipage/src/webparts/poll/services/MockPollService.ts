import { IPollService } from './IPollService';
import { IVoteOption } from './IVoteOption';
import { IVoteResult } from './IVoteResult';

export class MockPollService implements IPollService {
  private poll: IVoteResult[];

  constructor() {
    this.poll = [
      {
        id: 1,
        label: 'Angular',
        numVotes: 0
      },
      {
        id: 2,
        label: 'React',
        numVotes: 0
      }
    ];
  }

  public getVoteOptions(listName: string): Promise<IVoteOption[]> {
    return new Promise<IVoteOption[]>((resolve: (voteOptions: IVoteOption[]) => void, reject: (error: any) => void): void => {
      resolve(this.poll);
    });
  }

  public vote(voteOptionId: number, listName: string): Promise<{}> {
    return new Promise<{}>((resolve: () => void, reject: (error: any) => void): void => {
      let voted: boolean = false;

      for (let i: number = 0; i < this.poll.length; i++) {
        if (this.poll[i].id === voteOptionId) {
          this.poll[i].numVotes += 1;
          voted = true;
          break;
        }
      }

      if (voted) {
        resolve();
      }
      else {
        reject('Invalid vote option');
      }
    });
  }

  public getResults(listName: string): Promise<IVoteResult[]> {
    return new Promise<IVoteResult[]>((resolve: (results: IVoteResult[]) => void, reject: (error: any) => void): void => {
      resolve(this.poll);
    });
  }
}