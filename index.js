/**
* cuf Module
*
* Description
*/
angular.module('test', ['ui.router','ngResource', 'cuf'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/example1");

  $stateProvider
    .state('/example1', {
      url: '/example1',
      templateUrl: 'partials/example1.html'
    })
    .state('example2', {
      url: '/example2',
      templateUrl: 'partials/example2.html'
    })
    .state('example3', {
      url: '/example3',
      templateUrl: "partials/example3.html"
    })
    .state('example4', {
      url: '/example4',
      templateUrl: "partials/example4.html",
      controller: 'navCtrl'
    })
    .state('usage', {
      url: '/usage',
      templateUrl: "partials/usage.html"
    })
    .state('api', {
      url: '/api',
      templateUrl: "partials/api.html"
    })

}])
.service('navConf', ['$resource', function($resource){
	return $resource("data/navConf.json", {}, {query: {method:'post', isArray:true}});
}])
.controller('navCtrl', ['$scope', 'navConf', function($scope, navConf){
    $scope.navData = navConf.query();
}]);