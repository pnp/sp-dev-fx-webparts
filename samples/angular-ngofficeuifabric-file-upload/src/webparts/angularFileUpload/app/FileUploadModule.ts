import * as angular from 'angular';
import 'ng-office-ui-fabric';
import { BaseService } from './services/BaseSvc';
import { FileUploadService } from './services/FileUploadSvc';
import { FileUploadCtrl } from './controllers/FileUploadCtrl';
import { CustomFileChange } from './directives/CustomFileChange';
import { IsoToDateString } from './filters/IsoToDateString';

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

