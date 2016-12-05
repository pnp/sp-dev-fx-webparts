import * as angular from 'angular';
import { IPollService, IVoteOption } from '../../services/PollService';
import { IConfigurationChanged } from '../../../IConfigurationChanged';

export interface IVoteControllerScope {
  loading: boolean;
  error: string;
  voteOptions: IVoteOption[];
  vote: ($event: MouseEvent) => void;
  voteOptionId: number;
  voting: boolean;
  selectVoteOption: (voteOptionId: number, $event: MouseEvent) => void;
}

export class VoteController implements IVoteControllerScope {
  public static $inject: string[] = ['PollService', '$state', '$stateParams'];

  public loading: boolean;
  public error: string;
  public voteOptions: IVoteOption[];
  public voteOptionId: number;
  public voting: boolean;

  private listName: string;
  private sharePointApiUrl: string;

  constructor(private pollService: IPollService, private $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
    this.init($stateParams['listName'], $stateParams['sharePointApiUrl']);
  }

  private init(listName: string, sharePointApiUrl: string): void {
    this.error = undefined;

    this.listName = listName;
    this.sharePointApiUrl = sharePointApiUrl;
    this.loadVoteOptions();
  }

  private loadVoteOptions(): void {
    this.loading = true;
    this.error = undefined;

    this.pollService.getVoteOptions(this.listName, this.sharePointApiUrl)
      .then((voteOptions: IVoteOption[]): void => {
        this.voteOptions = voteOptions;
      }, (error: any): void => {
        this.error = error;
      })
      .finally((): void => {
        this.loading = false;
      });
  }

  public vote($event: MouseEvent): void {
    $event.preventDefault();

    this.voting = true;
    this.error = undefined;

    this.pollService.vote(this.voteOptionId, this.listName, this.sharePointApiUrl)
      .then((): void => {
        this.$state.go('poll.results', <IConfigurationChanged>{
          listName: this.listName,
          sharePointApiUrl: this.sharePointApiUrl
        });
      }, (error: any): void => {
        this.error = error;
      })
      .finally((): void => {
        this.voting = false;
      });
  }

  public selectVoteOption(voteOptionId: number, $event: MouseEvent): void {
    $event.preventDefault();

    if (this.voting) {
      return;
    }

    this.voteOptionId = voteOptionId;
  }
}