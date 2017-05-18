(function () {
  'use strict';

  angular.module('todoapp')
    .controller('homeController', ['dataService', '$window', homeController]);

  function homeController(dataService, $window) {
    var vm = this;  // jshint ignore:line
    vm.isLoading = false;
    vm.newItem = null;
    vm.todoCollection = [];
    vm.todoKeyDown = todoKeyDown;
    vm.deleteTodo = deleteTodo;
    vm.completeTodo = completeTodo;
    vm.undoTodo = undoTodo;

    loadTodos();

    function loadTodos() {
      vm.isLoading = true;
      dataService.getTodos()
        .then(function (todos) {
          vm.todoCollection = todos;
        })
        .finally(function() {
          vm.isLoading = false;
        });
    }
    
    function todoKeyDown($event) {
      if ($event.keyCode === 13 && vm.newItem.length > 0) {
        $event.preventDefault();
        
        vm.todoCollection.unshift({id: -1, title: vm.newItem, done: false});
        
        dataService.addTodo(vm.newItem)
          .then(function() {
            vm.newItem = null;
            dataService.getTodos()
              .then(function (todos) {
                vm.todoCollection = todos;
              });
          });
      }
    }
    
    function deleteTodo(todo) {
      if ($window.confirm('Are you sure you want to delete this todo item?')) {
        
        var index = -1;
        for (var i = 0; i < vm.todoCollection.length; i++) {
          if (vm.todoCollection[i].id === todo.id) {
            index = i;
            break;
          }
        }
        
        if (index > -1) {
          vm.todoCollection.splice(index, 1);
        }
        
        dataService.deleteTodo(todo)
          .then(function() {
            dataService.getTodos()
              .then(function (todos) {
                vm.todoCollection = todos;
              });
          });
      }
    }
    
    function completeTodo(todo) {
      todo.done = true;
      
      dataService.setTodoStatus(todo, true)
        .then(function() {
          dataService.getTodos()
            .then(function (todos) {
              vm.todoCollection = todos;
            });
        });
    }
    
    function undoTodo(todo) {
      todo.done = false;
      
      dataService.setTodoStatus(todo, false)
        .then(function() {
          dataService.getTodos()
            .then(function (todos) {
              vm.todoCollection = todos;
            });
        });
    }
  }
})();
