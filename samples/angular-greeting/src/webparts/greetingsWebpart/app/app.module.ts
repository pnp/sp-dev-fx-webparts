import * as angular from 'angular';
import {GreetingComponent, GreetingController} from './Greetings.component';
import { GreetingService } from './Greetings.service';

const greetingApp: angular.IModule = angular.module('greeting-webpart-app', []);

greetingApp
  .service("GreetingService", GreetingService);

greetingApp
   .controller('GreetingController', GreetingController);

  greetingApp
  .component(GreetingComponent.selector, GreetingComponent);
