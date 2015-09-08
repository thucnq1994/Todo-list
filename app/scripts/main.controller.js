(function(){
	'use strict';
	
	angular
		.module("todolist")
		.controller("mainController", ['$scope', mainController]);

	function mainController($scope) {
		var obj = JSON.parse('[\
			{"name" : "Wake up", "done" : false}, \
			{"name" : "Check Gmail", "done" : false}, \
			{"name" : "Check Twitter", "done" : false}, \
			{"name" : "Check Facebook", "done" : false}, \
			{"name" : "Keep Repeating 2, 3, 4", "done" : false}, \
			{"name" : "Sleep", "done" : false}\
		]');
		
		$scope.todolist = obj;
		$scope.completedTask = 0;
		$scope.taskID = null;
		$scope.taskName = null;
		
		$scope.submit = function() {
			if($scope.taskID != null) {
				if ($scope.taskName.length > 0) {
					$scope.todolist[$scope.taskID].name = $scope.taskName;
				}
			} else {
				if ($scope.taskName.length > 0) {
					obj.push({
						"name" : this.taskName,
						"done" : false
					});
				}
			}
			$scope.taskID = null;
			$scope.taskName = null;
		}
		
		$scope.doneTask = function(index, todo) {
			if(todo.done == false) {
				$scope.todolist.splice(index, 1);
				$scope.todolist.push(todo);
				todo.done = true;
				$scope.completedTask += 1;
			} else {
				$scope.todolist.splice(index, 1);
				$scope.todolist.unshift(todo);
				todo.done = false;
				$scope.completedTask -= 1;
			}
		};
		
		$scope.deleteTask = function(index) {
			$scope.todolist.splice(index, 1);
		};
		
		$scope.deleteCompletedTask = function() {
			for(var i = 0; i < $scope.todolist.length; ) {
				if($scope.todolist[i].done === true) {
					$scope.todolist.splice(i, 1);
					i = 0;
				} else {
					i++;
				}
			}
			$scope.completedTask = 0;
			if($scope.todolist.length == 0){
				document.getElementById('toggle-all').checked = 0;
			}
		}
		
		$scope.editTask = function(index) {
			$scope.taskName = $scope.todolist[index].name;
			$scope.taskID = index;
			$("#taskName").focus();
		}
		
		$scope.clickAll = function(){
			if(document.getElementById('toggle-all').checked == 1){
				for(var i = 0; i < $scope.todolist.length; i++) {
					$scope.todolist[i].done = true;
				}
				$scope.completedTask = $scope.todolist.length;
			} else {
				for(var i = 0; i < $scope.todolist.length; i++) {
					$scope.todolist[i].done = false;
				}
				$scope.completedTask = 0;
			}
		}
	}
})();
