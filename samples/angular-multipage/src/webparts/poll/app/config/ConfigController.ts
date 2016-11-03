import * as angular from 'angular';
import { DisplayMode } from '@microsoft/sp-client-base';

export interface IConfigControllerState {
  isEditMode: boolean;
  configure: ($event: MouseEvent) => void;
}

export class ConfigController implements IConfigControllerState {
  public static $inject: string[] = ['$stateParams', '$rootScope'];

  public isEditMode: boolean;

  constructor($stateParams: angular.ui.IStateParamsService, private $rootScope: angular.IRootScopeService) {
    this.init($stateParams['displayMode']);
  }

  private init(displayMode: DisplayMode): void {
    this.isEditMode = displayMode === DisplayMode.Edit;
  }

  public configure($event: MouseEvent): void {
    $event.preventDefault();

    this.$rootScope.$broadcast('startConfiguration');
  }
}
