'use strict';

// Declare app level module which depends on views, and components
angular.module('iris', [
        'ngRoute',
        'iris.contacts',
        'iris.version',
        'angular-uuid'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/contacts'});
    }])
    .config(function ($mdIconProvider) {
        $mdIconProvider
            .iconSet('action', 'img/icons/sets/action-icons.svg', 24)
            .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
            .iconSet('content', 'img/icons/sets/content-icons.svg', 24)
            .iconSet('social', 'img/icons/sets/social-icons.svg', 24);
    });
;
