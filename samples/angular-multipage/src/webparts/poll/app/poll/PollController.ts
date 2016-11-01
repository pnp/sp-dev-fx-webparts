import * as angular from 'angular';

export interface IPollControllerState {
  title: string;
  description: string;
}

export class PollController implements IPollControllerState {
  public static $inject: string[] = ['$stateParams'];

  public title: string;
  public description: string;

  constructor(private $stateParams: angular.ui.IStateParamsService) {
    this.init($stateParams['title'], $stateParams['description']);
  }

  private init(title: string, description: string): void {
    this.title = title;
    this.description = description;
  }
}
