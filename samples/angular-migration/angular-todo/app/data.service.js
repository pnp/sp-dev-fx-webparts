(function () {
  'use strict';

  angular.module('todoapp')
    .service('dataService', ['$q', '$http', 'sharepointApi', 'todoListName', 'hideFinishedTasks', dataService]);

  function dataService($q, $http, sharepointApi, todoListName, hideFinishedTasks) {
    return {
      getTodos: getTodos,
      addTodo: addTodo,
      deleteTodo: deleteTodo,
      setTodoStatus: setTodoStatus
    };

    function getTodos() {
      var deferred = $q.defer();

      var url = sharepointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items?$select=Id,Title,Status&$orderby=ID desc';

      if (hideFinishedTasks === true) {
        url += "&$filter=Status ne 'Completed'";
      }

      $http({
        url: url,
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      }).then(function(result) {
        var todos = [];
        for (var i = 0; i < result.data.value.length; i++) {
          var todo = result.data.value[i];
          todos.push({
            id: todo.Id,
            title: todo.Title,
            done: todo.Status === 'Completed'
          })
        }
        deferred.resolve(todos);
      });

      return deferred.promise;
    }
    
    function addTodo(todo) {
      var deferred = $q.defer();
      
      $http({
        url: sharepointApi + 'contextinfo',
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      }).then(function(result) {
        var requestDigest = result.data.FormDigestValue;
        var body = JSON.stringify({
          '__metadata': { 'type': 'SP.Data.' + todoListName + 'ListItem' },
          'Title': todo
        });
        $http({
          url: sharepointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items',
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'X-RequestDigest': requestDigest
          },
          data: body
        }).then(function(result) {
          deferred.resolve();
        });
      });
      
      return deferred.promise;
    }
    
    function deleteTodo(todo) {
      var deferred = $q.defer();
      
      $http({
        url: sharepointApi + 'contextinfo',
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      }).then(function(result) {
        var requestDigest = result.data.FormDigestValue;
        $http({
          url: sharepointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items(' + todo.id + ')',
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'DELETE'
          }
        }).then(function(result) {
          deferred.resolve();
        });
      });
      
      return deferred.promise;
    }
    
    function setTodoStatus(todo, done) {
      var deferred = $q.defer();
      
      $http({
        url: sharepointApi + 'contextinfo',
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      }).then(function(result) {
        var requestDigest = result.data.FormDigestValue;
        var body = JSON.stringify({
          '__metadata': { 'type': 'SP.Data.' + todoListName + 'ListItem' },
          'Status': done ? 'Completed' : 'Not started'
        });
        $http({
          url: sharepointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items(' + todo.id + ')',
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': '*',
            'X-HTTP-Method': 'MERGE'
          },
          data: body
        }).then(function(result) {
          deferred.resolve();
        });
      });
      
      return deferred.promise;
    }
  }
})();
