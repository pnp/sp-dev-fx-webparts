import * as angular from 'angular';
import 'ng-office-ui-fabric';

class Config{
  /**
   *
   */
  constructor() {
    console.log("angular app setup done");
  }
}

const sendEmailApp: ng.IModule = angular.module('sendEmailApp', ['officeuifabric.core', 'officeuifabric.components']);
sendEmailApp.config(Config);