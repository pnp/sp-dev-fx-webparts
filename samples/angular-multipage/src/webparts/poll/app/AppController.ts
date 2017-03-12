import * as angular from 'angular';
import { DisplayMode } from '@microsoft/sp-client-base';
import { IConfigurationChanged } from '../IConfigurationChanged';

export interface IAppControllerState {
}

export class AppController implements IAppControllerState {
  public static $inject: string[] = ['$rootScope', '$state'];

  constructor($rootScope: angular.IRootScopeService, private $state: angular.ui.IStateService) {
    $rootScope.$on('configurationChanged', (event: angular.IAngularEvent, args: IConfigurationChanged): void => {
      this.init(args.listName, args.sharePointApiUrl, args.title, args.description, args.displayMode);
    });
  }

  private init(listName: string, sharePointApiUrl: string, title: string, description: string, displayMode: DisplayMode): void {
    if (!listName || listName.trim().length === 0) {
      this.$state.go('config', {
        displayMode: displayMode
      });
    }
    else {
      this.$state.go('poll.vote', <IConfigurationChanged>{
        title: title,
        description: description,
        listName: listName,
        sharePointApiUrl: sharePointApiUrl
      });
    }
  }
}
