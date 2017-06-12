import * as angular from 'angular';
import 'ng-office-ui-fabric';
import { BaseService } from './services/baseSvc';
import { FileUploadService } from './services/fileUploadSvc';
import { FileUploadCtrl } from './controllers/fileUploadCtrl';
import { CustomFileChange } from './directives/customFileChange';
import { IsoToDateString } from './filters/isoToDateString';

const fileUploadApp: ng.IModule = angular.module('fileUploadApp', [
  'officeuifabric.core',
  'officeuifabric.components'
]);

fileUploadApp
  .service("baseService", BaseService)
  .service("fileUploadService", FileUploadService)
  .controller("fileUploadCtrl", FileUploadCtrl)
  .filter("isoToDateString", IsoToDateString.filter)
  .directive("customFileChange", CustomFileChange.factory());

