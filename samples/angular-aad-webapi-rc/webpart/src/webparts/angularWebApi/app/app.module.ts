import * as angular from 'angular';
require('./adal-angular');
import { WebAPIService } from './webApiService';
import { HomeController } from './homeController';

angular
    .module('angularsecurecall', [
        'officeuifabric.core',
        'officeuifabric.components',
        'AdalAngular'
    ])
    .component('angularwebapi', {
        controller: HomeController,
        controllerAs: 'vm',
        template: require('./webapi.html').toString()
    })
    .service('WebAPIService', WebAPIService)
    .config(['$httpProvider', 'adalAuthenticationServiceProvider',
        function ($http, $adalProvider) {
            // Need to do this because adal-angular expects the AuthenticationContext
            // to be in the global namespace
            const AuthenticationContext = require('./adal');
            window['AuthenticationContext'] = AuthenticationContext;

            $adalProvider.init({
                instance: 'https://login.microsoftonline.com/',
                tenant: 'contoso.onmicrosoft.com',
                clientId: 'f78bf941-5184-4bc1-8bde-8613b9e0f462',
                redirectUri: 'https://{SharePoint Site}/_layouts/15/workbench.aspx',
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