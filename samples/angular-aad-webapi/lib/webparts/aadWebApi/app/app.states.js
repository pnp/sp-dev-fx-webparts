"use strict";
var angular = require("angular");
angular
    .module('elevatedprivileges')
    .config(uiRouterConfigurator);
uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$injectorProvider'];
function uiRouterConfigurator($stateProvider, $urlRouterProvider) {
    $stateProvider.state('elevatedprivileges', {
        template: require('./elevatedprivileges/elevatedprivileges.signin.html').toString(),
        controller: 'elevatedPrivilegesController',
        controllerAs: 'vm'
    });
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        $state.go('elevatedprivileges');
    });
}

//# sourceMappingURL=app.states.js.map
