import * as angular from 'angular';
import { IGraphHelper } from './GraphHelper';
import { ISiteCollections } from './../models/ISiteCollections';
import { IListCollection } from './../models/IListCollection';
import { IAnnouncements } from './../models/IAnnouncements';
import { IGenericCreateItem } from './../models/IGenericCreateItem';

export default class HomeController {
  public static $inject: string[] = ['$rootScope', '$scope', '$http', 'GraphHelper', '$log'];
  public hello: any = require('hellojs');

  // public variables
  public displayName: string;
  public vwSC: boolean = false;
  public vwLsts: boolean = false;
  public vwLstItm: boolean = false;
  public vwCreateItem: boolean = false;
  public siteCollection: Array<ISiteCollections>;
  public listCollection: Array<IListCollection>;
  public itemCollection: Array<IAnnouncements>;
  public createItemTitle: string;

  // private variables
  private _siteId: string;
  private _listId: string;

  constructor(private $rootScope: angular.IRootScopeService, private $scope: angular.IScope,
  private $http: angular.IHttpService, private graphHelper: IGraphHelper, private $log: angular.ILogService){
    this._initAuth();
  }

  private _initAuth(): void {
    if (localStorage.getItem('auth')){
      this._processAuth();
    }
    else {
      let auth: any = this.hello('aad').getAuthResponse();
      if (auth != null){
        localStorage.setItem('auth', angular.toJson(auth));
        this._processAuth();
      }
    }
  }

  private _processAuth(){
    let auth: any = angular.fromJson(localStorage.getItem('auth'));

    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);
    if (expiration > new Date()){
      this.$http.defaults.headers.common.Authorization = 'Bearer ' + auth.access_token;
      this.$http.defaults.headers.common.SampleID = 'angular-connect-rest-sharepoint';

      if (localStorage.getItem('user') === null){
        this.graphHelper.me().then((results: any): void => {
          let user = results.data;
          localStorage.setItem('user', angular.toJson(user));

          this.displayName = user.displayName;
        });
      }
      else {
        let user = angular.fromJson(localStorage.getItem('user'));

        this.displayName = user.displayName;
      }
    }
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  public login(): void {
    this.graphHelper.login();
  }

  public logout(): void {
    this.graphHelper.logout();
  }

  // Get's SharePoint's Root Site Collection for now
  // until Microsoft Graph is updated. Then it will be a list of sites
  public getSites(): void {
    // Check token expiry. If the token is valid for another 5 minutes, we'll use it.
    let auth: any = angular.fromJson(localStorage.getItem('auth'));
    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);

    if (expiration > new Date()){
      this.graphHelper.getSites().then((results: Array<ISiteCollections>): void => {
        this.$log.debug(results);
        this.vwSC = true;
        this.siteCollection = results;
      });
    }
    else {
      // If the token is expired, this sample just redirects the user to sign in.
      this.graphHelper.login();
    }
  }

  public getLists(siteId: string): void {
    let auth: any = angular.fromJson(localStorage.getItem('auth'));
    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);

    if (expiration > new Date()){
      this.graphHelper.getLists(siteId).then((results: Array<IListCollection>): void => {
        this.$log.debug(results);
        this.vwSC = false;
        this.vwLsts = true;
        this.listCollection = results;
        this._siteId = siteId;
      });
    }
    else {
      this.graphHelper.login();
    }
  }

  public getListItems(listId: string): void {
    let auth: any = angular.fromJson(localStorage.getItem('auth'));
    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);

    if (expiration > new Date()){
      this.graphHelper.getListItems(this._siteId, listId).then((results: Array<IAnnouncements>): void => {
        this.$log.debug(results);
        this.vwLsts = false;
        this.vwLstItm = true;
        this.itemCollection = results;
        this._listId = listId;
      });
    }
    else {
      this.graphHelper.login();
    }
  }

  public showCreateItemForm(): void {
    this.vwLstItm = false;
    this.vwCreateItem = true;
  }

  public createItem(): void {
    let auth: any = angular.fromJson(localStorage.getItem('auth'));
    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);

    if (expiration > new Date()){
      this.graphHelper.createItem(this._siteId, this._listId).then((result: IGenericCreateItem): void => {
        this.$log.debug(result);
        this.graphHelper.updateItem(this._siteId, this._listId, result, this.createItemTitle)
          .then((result: any): void => {
            // item create was successfull so navigate back to list item view
            this.getListItems(this._listId);
            this.vwCreateItem = false;
            this.vwLstItm = true;
          });
      });
    }
    else {
      this.graphHelper.login();
    }
  }

  public deleteItem(item: IGenericCreateItem): void {
    let auth: any = angular.fromJson(localStorage.getItem('auth'));
    let expiration: Date = new Date();
    expiration.setTime((auth.expires - 300) * 1000);

    if (expiration > new Date()){
      this.graphHelper.deleteItem(this._siteId, this._listId, item).then((result: any): void => {
        // delete item was successful so refresh the list items
        this.getListItems(this._listId);
      });
    }
    else {
      this.graphHelper.login();
    }
  }
}