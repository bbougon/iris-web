'use strict';

describe('iris.contacts module', function () {

    var mock, service;

    beforeEach(module('iris.contacts'));

    beforeEach(function () {
        mock = {alert: jasmine.createSpy()};

        module(function ($provide) {
            $provide.value('$window', mock);
        });

        inject(function ($injector) {
            service = $injector.get('contactService');
        });
    });

    describe('contact services', function () {
        it('devrait appeler la ressource des contacts et les charger', inject(function ($httpBackend, $http, $controller) {
            var donneeAttendue = angular.toJson('[{"nom":"Bertrand"}, {"nom":"Aline"}, {"nom":"Alessandra"}, {"nom":"Rafael"}]');
            $httpBackend.expectGET('http://localhost:8000/contacts').respond(donneeAttendue);
            var $scope = {};
            $controller('ContactsController', {$scope: $scope, contactsService: service});

            $httpBackend.flush();

            expect($scope.contacts).not.toBeNull();
            expect($scope.contacts).toEqual(donneeAttendue);
        }));

        it('devrait retourner un message d\'erreur lorsque la ressource des contacts renvoit une erreur', inject(function ($httpBackend, $http, $controller) {
            var erreurAttendue = "Une erreur a eu lieu lors de la récupération des contacts.";
            $httpBackend.expectGET('http://localhost:8000/contacts').respond(400, erreurAttendue);
            var $scope = {};
            $controller('ContactsController', {$scope: $scope, contactsService: service});

            $httpBackend.flush();

            expect($scope.contacts).toEqual([]);
            expect($scope.error).toEqual(erreurAttendue);
        }));

    });
});