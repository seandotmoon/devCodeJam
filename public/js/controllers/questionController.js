angular.module('main')

// inject the Entry service factory into our controller
.controller('questionController', ['$scope','$http','$sce','config', 'questionService', '$routeParams',
                               function($scope, $http, $sce, config, questionService, $routeParams ) {
	var questionId = $routeParams.id;

	var dothis = function(callback) {
		questionService.getQuestion(questionId, function (err, data) {
			if(err) {
				console.log("error" + err);
			} else {
				console.log("Got result" + data);
				$scope.questionHtml = $sce.trustAsHtml(data);
			}
		});
	}

	dothis();
}]);