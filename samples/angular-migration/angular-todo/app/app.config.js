(function () {
	var todoapp = angular.module('todoapp');
	todoapp.constant('sharepointApi', '/sites/todo/_api/');
	todoapp.constant('todoListName', 'Todo');
	todoapp.constant('hideFinishedTasks', false);
})();