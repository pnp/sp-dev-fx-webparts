import * as angular from 'angular';
import 'angular-ui-router';
import 'angular-chart.js';
import { AppController } from './AppController';
import { ConfigController } from './config/ConfigController';
import { PollController } from './poll/PollController';
import { VoteController } from './poll/vote/VoteController';
import { ResultsController } from './poll/results/ResultsController';
import { PollService } from './services/PollService';
import { SpinnerDirective } from './directives/SpinnerDirective';

angular
  .module('poll', [
    'ui.router',
    'chart.js'
  ])
  .controller('appController', AppController)
  .controller('configController', ConfigController)
  .controller('pollController', PollController)
  .controller('voteController', VoteController)
  .controller('resultsController', ResultsController)
  .service('PollService', PollService)
  .directive('spinner', SpinnerDirective.factory());

require('./app.states');
