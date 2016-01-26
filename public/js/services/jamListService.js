angular.module('main')
.factory('jamListService', ['$http','config', 
	                        function($http, config ) {

	var service = {};

  	service.getJamLists = function(callback) {
    	$http({
	      	method: 'GET',
	      	url: config.restAPIUrl + 'list'
	    }).success(function(data){
	      	callback(null, data);
	    }).error(function(status){
	      	callback(status, null);
	    });
  	};

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