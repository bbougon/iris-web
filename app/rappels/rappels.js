'use strict';

angular.module('iris.rappels', ['ngRoute', 'ngAnimate', 'ngMaterial', 'angular-uuid'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rappels', {
            templateUrl: 'rappels/rappels.html',
            controller: 'RappelsController'
        });
    }])

    .controller('RappelsController', ['$scope', function ($scope) {
        
    }]);