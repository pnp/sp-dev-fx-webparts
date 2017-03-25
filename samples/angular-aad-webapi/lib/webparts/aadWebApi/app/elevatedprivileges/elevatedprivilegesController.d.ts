import * as angular from 'angular';
import adal = require('adal-angular');
import { IWebAPIServce } from '../webApiService';
import { IGraphApi } from '../../models/IGraphApi';
export declare class ElevatedPrivilegesController {
    private $scope;
    private $log;
    private $api;
    private $adalProvider;
    static $inject: string[];
    displayName: string;
    signedIn: boolean;
    user: IGraphApi;
    private _hasGraphToken;
    private _hasAPIToken;
    constructor($scope: angular.IScope, $log: angular.ILogService, $api: IWebAPIServce, $adalProvider: adal.AdalAuthenticationService);
    signOn(): void;
    signOut(): void;
    isAuthenticated(): boolean;
    getGraphToken(): void;
    getAPIToken(): void;
    hasGraphToken(): boolean;
    hasAPIToken(): boolean;
    callGraph(): void;
    callApi(): void;
}
