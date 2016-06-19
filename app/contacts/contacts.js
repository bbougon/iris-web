'use strict';

angular.module('iris.contacts', ['ngRoute', 'ngAnimate', 'ngMaterial', 'angular-uuid'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController'
        });
    }])

    .controller('ContactsController', ['$scope', '$mdDialog', '$timeout', '$mdMedia', 'uuid', 'contactService', function ($scope, $mdDialog, $timeout, $mdMedia, uuid, contactService) {
        $scope.contacts = [];


        $scope.formulaireAjout = function () {
            $mdDialog.show({
                    controller: 'ContactsController',
                    templateUrl: 'contacts/ajout-contact.tmpl.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then(function (contact) {
                    $scope.contacts.push(contact);
                    $scope.success = "Ajout de " + contact.nom + " " + contact.prenom + " effectué.";
                    $timeout(function () {
                        $scope.success = false;
                    }, 4000);
                });
        };

        $scope.detailsContact = function (contact) {
            var copieContact = {};
            angular.copy(contact, copieContact),
                $mdDialog.show({
                        locals: {
                            contact: copieContact
                        },
                        controller: 'ContactsController',
                        controllerAs: 'contactsController',
                        templateUrl: 'contacts/details-contact.tmpl.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        bindToController: true,
                        fullscreen: true
                    })
                    .then(function (contactModifie) {
                        $scope.contacts.splice($scope.contacts.indexOf(contact), 1, contactModifie);
                        $scope.success = "Modification de " + contactModifie.nom + " " + contactModifie.prenom + " effectuée.";
                        $timeout(function () {
                            $scope.success = false;
                        }, 4000);
                    });
        };

        $scope.annuler = function () {
            $mdDialog.cancel();
        };

        $scope.getContacts = function () {
            contactService.getContacts()
                .then(function (data) {
                    $scope.contacts = angular.fromJson(data);
                })
                .catch(function (data) {
                    $scope.error = data;
                });
        };

        $scope.supprimer = function (contact) {
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
                    contactService.supprimer(contact)
                        .then(function () {
                            $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                            $scope.success = "Suppression de " + contact.nom + " " + contact.prenom + " effectuée.";
                            $timeout(function () {
                                $scope.success = false;
                            }, 4000);
                        })
                        .catch(function (data) {
                            $scope.error = data;
                        });
                });

        };

        $scope.enregistrer = function (contact) {
            if (!contact.identifiant) {
                contact.identifiant = uuid.v4();
            }
            contactService.enregistrer(contact)
                .then(function () {
                    $mdDialog.hide(contact);
                })
                .catch(function (data) {
                    $scope.error = data;
                });
        }

        $scope.getContacts();
    }])

    .service('contactService', function ($http, $q) {
        return ({
            getContacts: getContacts,
            supprimer: supprimer,
            enregistrer: enregistrer
        });

        function supprimer(contact) {
            return $http.delete("http://localhost:8182/contacts/" + contact.identifiant).then(contactsSuccess, contactsError);
        }

        function getContacts() {
            return $http.get("http://localhost:8182/contacts").then(contactsSuccess, contactsError);
        }

        function enregistrer(contact) {
            return $http.put("http://localhost:8182/contacts/" + contact.identifiant, contact).then(contactsSuccess, contactsError);
        }

        function contactsSuccess(response) {
            return response.data;
        }

        function contactsError(response) {
            return $q.reject(response.data);
        }
    });