import * as angular from 'angular';

angular
  .module('elevatedprivileges')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$injectorProvider'];

function uiRouterConfigurator($stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
    $stateProvider.state('elevatedprivileges', {
      template: require('./elevatedprivileges/elevatedprivileges.signin.html'),
      controller: 'elevatedPrivilegesController',
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise( function($injector, $location) {
      let $state: angular.ui.IStateService = $injector.get('$state');
      $state.go('elevatedprivileges');
    });
}