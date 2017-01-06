import * as angular from 'angular';

export interface IAppControllerState {
}

export class AppController implements IAppControllerState {
  public static $inject: string[] = ['$rootScope', '$state'];

  constructor($rootScope: angular.IRootScopeService, private $state: angular.ui.IStateService) {
    this._init();
  }

  private _init(): void {
    this.$state.go('elevatedprivileges');
  }
}