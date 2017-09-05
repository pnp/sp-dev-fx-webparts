import * as angular from 'angular';  
import HomeController from './HomeController';  
import DataService from './DataService';
import { CustomFileChange } from '../app/customFileChange';

const mediarecorderapp: ng.IModule = angular.module('mediarecorderapp', []);

mediarecorderapp  
  .controller('HomeController', HomeController)
  .directive("customFileChange", CustomFileChange.factory())
  .service('DataService', DataService);