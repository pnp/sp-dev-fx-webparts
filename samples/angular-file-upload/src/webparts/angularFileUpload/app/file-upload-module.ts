import * as angular from 'angular';
import 'ng-office-ui-fabric';
import { BaseService } from './services/baseSvc';
import { FileUploadService } from './services/fileUploadSvc';
import { FileUploadCtrl } from './controllers/fileUploadCtrl';
import { CustomFileChange } from './directives/customFileChange';
import { IsoToDateString } from './filters/isoToDateString';


class Config {
  /**
   *
   */
  constructor() {
    console.log("NG loaded");
  }
};

const fileUploadApp: ng.IModule = angular.module('fileUploadApp', [
  'officeuifabric.core',
  'officeuifabric.components'
]);

fileUploadApp
  .config(Config)
  .service("BaseService", BaseService)
  .service("FileUploadService", FileUploadService)
  .controller("FileUploadCtrl", FileUploadCtrl)
  .filter("isoToDateString", IsoToDateString.filter)
  .directive("customFileChange", CustomFileChange.factory());

