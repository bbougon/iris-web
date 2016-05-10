'use strict';

var module = angular.module('irisE2e', ['iris', 'ngMockE2E']);

module.run(function ($httpBackend) {
    //$httpBackend.whenGET('/api/contacts').respond([{nom: 'Bertrand'}, {nom: 'Aline'}, {nom: 'Alessandra'}, {nom: 'Rafael'}]);
});