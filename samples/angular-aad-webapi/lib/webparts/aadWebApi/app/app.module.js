"use strict";
var angular = require("angular");
require("angular-ui-router");
require('./adal-angular');
var AppController_1 = require("./AppController");
var webApiService_1 = require("./webApiService");
var elevatedprivilegesController_1 = require("./elevatedprivileges/elevatedprivilegesController");
angular
    .module('elevatedprivileges', ['ui.router', 'AdalAngular'])
    .controller('appController', AppController_1.AppController)
    .controller('elevatedPrivilegesController', elevatedprivilegesController_1.ElevatedPrivilegesController)
    .service('WebAPIService', webApiService_1.WebAPIService)
    .config(['$httpProvider', 'adalAuthenticationServiceProvider',
    function ($http, $adalProvider) {
        // Need to do this because adal-angular expects the AuthenticationContext
        // to be in the global namespace
        var AuthenticationContext = require('./adal');
        window['AuthenticationContext'] = AuthenticationContext;
        $adalProvider.init({
            instance: 'https://login.microsoftonline.com/',
            tenant: 'dhartman.onmicrosoft.com',
            // clientId: 'f78bf941-5184-4bc1-8bde-8613b9e0f462',
            clientId: '055a4273-eb88-4406-a96f-077fed0695b6',
            redirectUri: 'https://dhartman.sharepoint.com/sites/spfx-dev/_layouts/15/workbench.aspx',
            cacheLocation: 'sessionStorage',
            endpoints: {
                'https://graph.microsoft.com': 'https://graph.microsoft.com',
                'https://pnpwebappsecure.azurewebsites.net': 'https://dhartman.onmicrosoft.com/PnPWebApp'
            },
            extraQueryParameter: 'nux=1',
        }, $http);
    }]);
require('./app.states');

//# sourceMappingURL=app.module.js.map
