'use strict';

angular.module('iris.contacts', ['ngRoute', 'ngAnimate', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController'
        });
    }])

    .controller('ContactsController', ['$scope', '$mdDialog', 'uuid', 'contactService', function ($scope, $mdDialog, uuid, contactService) {
        $scope.contacts = [];
        $scope.error;

        $scope.getContacts = function () {
            contactService.getContacts()
                .then(function (data) {
                    $scope.contacts = data;
                })
                .catch(function (data) {
                    $scope.error = data;
                });
        }

        $scope.deleteContact = function (contact) {
            var confirm = $mdDialog.confirm()
                .title('Suppression de ' + contact.nom + ' ' + contact.prenom)
                .textContent('Voulez-vous vraiment supprimer ce contact?')
                .ariaLabel('Suppression de compte')
                .ok('Oui')
                .cancel('Non')
                .closeTo({
                    left: 1500
                });

            $mdDialog
                .show(confirm)
                .then(function () {
                    contactService.deleteContact(contact)
                        .then(function () {
                            $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                        })
                        .catch(function (data) {
                            $scope.error = data;
                        });
                });

        }
        
        $scope.enregistrer = function (contact) {
            contact.identifiant = uuid.v4();
            contactService.createContact(contact)
                .then(function () {
                    $scope.contacts.push(contact);
                })
                .catch(function (data) {
                    alert(data);
                    $scope.error = data;
                });
        }

        $scope.getContacts();
    }])

    .service('contactService', function ($http, $q) {
        return ({
            getContacts: getContacts,
            deleteContact: deleteContact,
            createContact: createContact
        });

        function deleteContact(contact) {
            return $http.delete("http://localhost:8182/contacts/" + contact.identifiant).then(contactsSuccess, contactsError);
        }

        function getContacts() {
            return $http.get("http://localhost:8182/contacts").then(contactsSuccess, contactsError);
        }

        function createContact(contact) {
            return $http.put("http://localhost:8182/contacts/" + contact.identifiant, contact).then(contactsSuccess, contactsError);
        }

        function contactsSuccess(response) {
            return response.data;
        }

        function contactsError(response) {
            return $q.reject(response.data);
        }
    });