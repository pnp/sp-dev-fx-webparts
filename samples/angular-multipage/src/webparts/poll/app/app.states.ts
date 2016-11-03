import * as angular from 'angular';

angular
  .module('poll')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterConfigurator($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
  $stateProvider
    .state('config', {
      template: require('./config/config.html'),
      params: {
        displayMode: undefined
      },
      controller: 'configController',
      controllerAs: 'vm'
    })
    .state('poll', {
      template: require('./poll/poll.html'),
      params: {
        title: undefined,
        description: undefined
      },
      controller: 'pollController',
      controllerAs: 'vm'
    })
    .state('poll.vote', {
      template: require('./poll/vote/vote.html'),
      params: {
        listName: undefined,
        sharePointApiUrl: undefined
      },
      controller: 'voteController',
      controllerAs: 'vm'
    })
    .state('poll.results', {
      template: require('./poll/results/results.html'),
      params: {
        listName: undefined,
        sharePointApiUrl: undefined
      },
      controller: 'resultsController',
      controllerAs: 'vm'
    });
}