<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SharePoint ToDo</title>
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="node_modules/ng-office-ui-fabric/ngOfficeUiFabric.min.js"></script>
  <link href="node_modules/office-ui-fabric/dist/css/fabric.min.css" rel="stylesheet" type="text/css">
  <link href="node_modules/office-ui-fabric/dist/css/fabric.components.min.css" rel="stylesheet" type="text/css">
  <link href="styles.css" rel="stylesheet" type="text/css">
</head>

<body>

<div id="container">
  <div data-ng-controller="homeController as vm">
    <div id="loading" ng-show="vm.isLoading">
      <uif-spinner>Loading...</uif-spinner>
    </div>
    <div id="entryform" ng-show="vm.isLoading === false">
      <uif-textfield uif-label="New to do:" uif-underlined ng-model="vm.newItem" ng-keydown="vm.todoKeyDown($event)"></uif-textfield>
    </div>
    <uif-list id="items" ng-show="vm.isLoading === false" >
      <uif-list-item ng-repeat="todo in vm.todoCollection" uif-item="todo" ng-class="{'done': todo.done}">
        <uif-list-item-primary-text>{{todo.title}}</uif-list-item-primary-text>
        <uif-list-item-actions>
          <uif-list-item-action ng-click="vm.completeTodo(todo)" ng-show="todo.done === false">
            <uif-icon uif-type="check"></uif-icon>
          </uif-list-item-action>
          <uif-list-item-action ng-click="vm.undoTodo(todo)" ng-show="todo.done">
            <uif-icon uif-type="reactivate"></uif-icon>
          </uif-list-item-action>
          <uif-list-item-action ng-click="vm.deleteTodo(todo)">
            <uif-icon uif-type="trash"></uif-icon>
          </uif-list-item-action>
        </uif-list-item-actions>
      </uif-list-item>
    </uif-list>
  </div>
</div>

<script src="app/app.module.js"></script>
<script src="app/app.config.js"></script>
<script src="app/data.service.js"></script>
<script src="app/home.controller.js"></script>
<script>
  angular.bootstrap(document.getElementById('container'), ['todoapp']);
</script>
</body>

</html>