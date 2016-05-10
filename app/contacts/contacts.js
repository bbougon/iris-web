'use strict';

angular.module('iris.contacts', ['ngRoute', 'ngAnimate'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController'
        });
    }])

    .controller('ContactsController', ['$scope', 'contactService', function ($scope, contactService) {
        $scope.contacts = [];
        $scope.error = '';

        $scope.getContacts = function () {
            contactService.getContacts()
                .then(function (data) {
                    $scope.contacts = data;
                })
                .catch(function (data) {
                    $scope.error = data;
                });
        }

        $scope.getContacts();
    }])

    .service('contactService', function ($http, $q) {
        return ({
            getContacts: getContacts
        });

        function getContacts() {
            return $http.get("http://localhost:8182/contacts").then(contactsSuccess, contactsError);
        }

        function contactsSuccess(response) {
            return response.data;
        }

        function contactsError(response) {
            return $q.reject(response.data);
        }
    });