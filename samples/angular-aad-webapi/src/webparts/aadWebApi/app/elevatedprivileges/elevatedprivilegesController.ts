import * as angular from 'angular';
import adal = require('adal-angular');
import { IWebAPIServce } from '../webApiService';
import { IGraphApi } from '../../models/IGraphApi';

export class ElevatedPrivilegesController {
  public static $inject: string[] = ['$scope', '$log', 'WebAPIService', 'adalAuthenticationService'];

  // public variables
  public displayName: string;
  public signedIn: boolean = false;
  public user: IGraphApi;

  // private variables
  private _hasGraphToken: boolean = false;
  private _hasAPIToken: boolean = false;

  constructor(private $scope: angular.IScope, private $log: angular.ILogService,
    private $api: IWebAPIServce, private $adalProvider: adal.AdalAuthenticationService) {
    if (this.hasGraphToken()) {
      this.callGraph();
    }
  }

  public signOn(): void {
    this.$adalProvider.login();
  }

  public signOut(): void {
    this.$adalProvider.logOut();
  }

  public isAuthenticated(): boolean {
    return this.$adalProvider.userInfo.isAuthenticated;
  }

  public getGraphToken(): void {
    this.$adalProvider.acquireToken("https://graph.microsoft.com");
  }

  public getAPIToken(): void {
    this.$adalProvider.acquireToken('https://dhartman.onmicrosoft.com/PnPWebApp');
  }

  public hasGraphToken(): boolean {
    this._hasGraphToken = this.$adalProvider.getCachedToken("https://graph.microsoft.com") !== null;
    return this._hasGraphToken;
  }

  public hasAPIToken(): boolean {
    this._hasAPIToken = this.$adalProvider.getCachedToken('https://dhartman.onmicrosoft.com/PnPWebApp') !== null;
    return this._hasAPIToken;
  }

  public callGraph(): void {
    this.$api.getMe()
      .then((result: any): void => {
        this.$log.debug("success call to graph api");
        this.user = result.data;
      });
  }

  public callApi(): void {
    this.$api.getItem()
      .then((result: any): void => {
        this.$log.debug("success call to web api");
        this.$log.debug(result);
        alert('success call to custom web api');
      });
  }
}