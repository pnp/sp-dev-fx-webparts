import * as angular from 'angular';

angular
  .module('elevatedprivileges')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$injectorProvider'];

function uiRouterConfigurator($stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider): void {
    $stateProvider.state('elevatedprivileges', {
      template: require('./elevatedprivileges/elevatedprivileges.signin.html').toString(),
      controller: 'elevatedPrivilegesController',
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise( function($injector, $location) {
      let $state: angular.ui.IStateService = $injector.get('$state');
      $state.go('elevatedprivileges');
    });
}