angular.module('main')
.factory('questionService', ['$http','config', 
	                        function($http, config ) {

	var service = {};

  	service.getQuestion = function(id, callback) {
    	$http({
	      	method: 'GET',
	      	url: config.restAPIUrl + 'question/' + id
	    }).success(function(data){
	      	callback(null, data);
	    }).error(function(status){
	      	callback(status, null);
	    });
  	};

  	return service;
}]);