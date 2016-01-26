angular.module('main', [])

// inject the Entry service factory into our controller
.controller('jamListController', ['$scope','$http','config', 'jamListService',
                               function($scope, $http, config, jamListService ) {
	
	var dothis = function(callback) {
		jamListService.getJamLists(function (err, data) {
			if(err) {
				console.log("error" + err);
			} else {
				console.log("Got result" + data);
				$scope.jamList = data;
			}
		});
	}

	dothis();
}]);