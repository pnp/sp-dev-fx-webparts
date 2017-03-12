import * as angular from 'angular';
import DataService from './DataService';
import HomeController from './HomeController';

angular
    .module('angularsearchapp', [
        'officeuifabric.core',
        'officeuifabric.components'
    ])
    .component('angularsearch', {
        controller: (HomeController),
        controllerAs: 'vm',
        bindings: {
            web: '@',
            style: '<',
            contentType: '@'
        },
        template: require(`home-template.html`).toString()
    })
    .service('DataService', DataService);