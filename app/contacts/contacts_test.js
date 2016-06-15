'use strict';

describe('iris.contacts module', function () {

    var service, scope;

    beforeEach(module('iris.contacts'));

    beforeEach(function () {
        inject(function ($injector) {
            service = $injector.get('contactService');
        });
    });

    describe('contact services', function () {
        it('devrait appeler la ressource des contacts et les charger', inject(function ($httpBackend, $http, $controller) {
            var donneeAttendue = angular.toJson('[{"nom":"Bougon", "prénom":"Bertrand"}, {"nom":"Aline"}, {"nom":"Alessandra"}, {"nom":"Rafael"}]');
            $httpBackend.when('GET', 'http://localhost:8182/contacts').respond(donneeAttendue);
            var $scope = {};

            $controller('ContactsController', {$scope: $scope, contactsService: service});
            $httpBackend.flush();

            expect($scope.contacts).not.toBeNull();
            expect($scope.contacts).toEqual(angular.fromJson(donneeAttendue));
        }));

        it('devrait retourner un message d\'erreur lorsque la ressource des contacts renvoit une erreur', inject(function ($httpBackend, $http, $controller) {
            var erreurAttendue = "Une erreur a eu lieu lors de la récupération des contacts.";
            $httpBackend.expectGET('http://localhost:8182/contacts').respond(400, erreurAttendue);
            var $scope = {};

            $controller('ContactsController', {$scope: $scope, contactsService: service});
            $httpBackend.flush();

            expect($scope.contacts).toEqual([]);
            expect($scope.error).toEqual(erreurAttendue);
        }));

        it('devrait enregistrer un nouveau contact', inject(function ($httpBackend, $http, $controller, $rootScope) {
            var contact = {
                nom: "Bougon",
                prenom: "Bertrand"
            };
            var urlRegExp = new RegExp('http:\/\/localhost:8182\/.*contacts\/.*');
            var dataRegExp = new RegExp('.*identifiant.*');
            $httpBackend.expectGET('http://localhost:8182/contacts').respond(200);
            $httpBackend.expectPUT(urlRegExp, dataRegExp).respond(201);
            scope = $rootScope.$new();
            scope.contacts = [];

            $controller('ContactsController', {$scope: scope, contactsService: service});
            scope.enregistrer(contact);
            $httpBackend.flush();

            expect(scope.contacts).not.toBeNull();
            console.log(scope.contacts);
            expect(scope.contacts[0].identifiant).not.toBeNull();
        }));

    });
});