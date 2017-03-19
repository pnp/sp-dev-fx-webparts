"use strict";
var angular = require("angular");
require('./adal-angular');
var webApiService_1 = require("./webApiService");
var homeController_1 = require("./homeController");
angular
    .module('angularsecurecall', [
    'officeuifabric.core',
    'officeuifabric.components',
    'AdalAngular'
])
    .component('angularwebapi', {
    controller: homeController_1.HomeController,
    controllerAs: 'vm',
    template: require('./webapi.html').toString()
})
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
            clientId: 'f78bf941-5184-4bc1-8bde-8613b9e0f462',
            redirectUri: 'https://dhartman.sharepoint.com/sites/spfx-dev/Shared%20Documents/workbench.aspx',
            cacheLocation: 'sessionStorage',
            endpoints: {
                'https://graph.microsoft.com': 'https://graph.microsoft.com',
                'https://pnpwebappsecure.azurewebsites.net': 'https://dhartman.onmicrosoft.com/PnPWebApp'
            },
            extraQueryParameter: 'nux=1',
        }, $http);
    }]);

//# sourceMappingURL=app.module.js.map
