import * as angular from 'angular';
import 'angular-ui-router';
require('./adal-angular');
import { AppController } from './AppController';
import { WebAPIService } from './webApiService';
import { ElevatedPrivilegesController } from './elevatedprivileges/elevatedprivilegesController';

angular
  .module('elevatedprivileges', ['ui.router', 'AdalAngular'])
  .controller('appController', AppController)
  .controller('elevatedPrivilegesController', ElevatedPrivilegesController)
  .service('WebAPIService', WebAPIService)
  .config(['$httpProvider', 'adalAuthenticationServiceProvider',
    function($http, $adalProvider){
      // Need to do this because adal-angular expects the AuthenticationContext
      // to be in the global namespace
      const AuthenticationContext = require('./adal');
      window['AuthenticationContext'] = AuthenticationContext;

      $adalProvider.init({
        instance: 'https://login.microsoftonline.com/',
        tenant: 'contoso.onmicrosoft.com',
        clientId: 'f78bf941-5184-4bc1-8bde-8613b9e0f462',
        redirectUri: 'https://dhartman.sharepoint.com/sites/spfx-dev/Shared%20Documents/workbench.aspx',
        cacheLocation: 'sessionStorage',
        endpoints: {
          'https://graph.microsoft.com': 'https://graph.microsoft.com',
          'https://pnpwebappsecure.azurewebsites.net': 'https://dhartman.onmicrosoft.com/PnPWebApp'
        },
        extraQueryParameter: 'nux=1',
        // Currently PopUp cause infinite digest loop
        // popUp: true
      }, $http);
  }]);

require('./app.states');

