import * as angular from 'angular';
export interface IAppControllerState {
}
export declare class AppController implements IAppControllerState {
    private $state;
    static $inject: string[];
    constructor($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService);
    private _init();
}
