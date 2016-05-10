'use strict';

// Declare app level module which depends on views, and components
angular.module('iris', [
    'ngRoute',
    'ngMaterial',
    'iris.contacts',
    'iris.version'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
