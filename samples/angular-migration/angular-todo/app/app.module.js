(function () {
  'use strict';

  var todoapp = angular.module('todoapp', [
    'officeuifabric.core',
    'officeuifabric.components'
  ]);

  todoapp.config(['$logProvider', function ($logProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
  }]);
})();
