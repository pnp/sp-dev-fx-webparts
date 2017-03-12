import * as angular from 'angular';
import HomeController from './HomeController';
import GraphHelper from './GraphHelper';
angular
    .module('angularconnectsp', [
        'officeuifabric.core',
        'officeuifabric.components'])
    .component('angulargraphapi', {
        controller: HomeController,
        controllerAs: 'vm',
        template: require('./home-template.html').toString()
    })
    .service('GraphHelper', GraphHelper);