'use strict';

// Declare app level module which depends on views, and components
angular.module('iris', [
        'ngRoute',
        'iris.contacts',
        'iris.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/contacts'});
    }])
    .config(function ($mdIconProvider) {
        $mdIconProvider
            .iconSet('action', 'img/icons/sets/action-icons.svg', 24);
    });
;
