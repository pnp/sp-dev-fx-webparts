import * as angular from 'angular';
import { IPollService, IVoteResult } from '../../services/PollService';

export interface IResultsControllerScope {
  loading: boolean;
  error: string;
  data: number[][];
  labels: string[];
  series: string[];
  options: any;
}

export class ResultsController implements IResultsControllerScope {
  public static $inject: string[] = ['PollService', '$stateParams'];

  public loading: boolean;
  public error: string;
  public data: number[][];
  public labels: string[];
  public series: string[];
  public options: any;

  private listName: string;
  private sharePointApiUrl: string;

  constructor(private pollService: IPollService, $stateParams: angular.ui.IStateParamsService) {
    this.init($stateParams['listName'], $stateParams['sharePointApiUrl']);
  }

  private init(listName: string, sharePointApiUrl: string): void {
    this.error = undefined;

    this.listName = listName;
    this.sharePointApiUrl = sharePointApiUrl;
    this.loadResults();
  }

  public loadResults(): void {
    this.loading = true;
    this.error = undefined;

    this.pollService.getResults(this.listName, this.sharePointApiUrl)
      .then((results: IVoteResult[]): void => {
        this.labels = [];
        this.series = ['Number of votes'];
        this.data = [];
        this.data[0] = [];
        this.options = {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Number of votes'
              }
            }]
          }
        };

        for (let i: number = 0; i < results.length; i++) {
          const result: IVoteResult = results[i];
          this.labels.push(result.label);
          this.data[0].push(result.numVotes);
        }
      }, (error: any): void => {
        this.error = error;
      })
      .finally((): void => {
        this.loading = false;
      });
  }
}
