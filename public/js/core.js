angular.module('codeJam', [
    'ngRoute',
    'ngCookies',
    'codeJamConfig',
    'main',
    'lr.upload'
])
.config(['$routeProvider', function ($routeProvider) {
 
    $routeProvider  
        .when('/', {
            controller: 'jamListController',
            templateUrl: 'views/jamList.html'
        })
        .when('/question/:id', {
            controller: 'questionController',
            templateUrl: 'views/question.html'
        })
        .otherwise({ redirectTo: '/' });
}])
// .run(['$rootScope', '$location', '$cookieStore', '$http',
//     function ($rootScope, $location, $cookieStore, $http) {
//         // keep user logged in after page refresh
//         $rootScope.globals = $cookieStore.get('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }
  
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in
//             if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                 $location.path('/login');
//             }
//         });
//     }]);
