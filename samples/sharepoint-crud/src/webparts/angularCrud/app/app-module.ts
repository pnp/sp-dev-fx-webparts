import * as angular from 'angular';
import HomeController from './HomeController';
import DataService from './DataService';

import 'ng-office-ui-fabric';

const crudapp: ng.IModule = angular.module('crudapp', [
  'officeuifabric.core',
  'officeuifabric.components'
]);

crudapp
  .controller('HomeController', HomeController)
  .service('DataService', DataService);