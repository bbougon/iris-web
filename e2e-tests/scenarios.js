'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
//var HttpBackend = require('../node_modules/httpbackend/lib/httpbackend');
var backend;

describe('iris', function () {


    it('affiche la page de contacts par défaut', function () {
        browser.get('index.html');

        expect(browser.getLocationAbsUrl()).toMatch("/contacts");
    });


    describe('contacts', function () {

        beforeEach(function () {
        });

        afterEach(function () {
            if (undefined != backend) {
                backend.clear();
            }
        });

        it('affiche la page des contacts lorsque l\'on va sur /contacts', function () {
            browser.get('index.html#/contacts');

            expect(element.all(by.css('span', 'ng-scope')).first().getText()).toMatch(/Liste des contacts/);
        });

        it('affiche la liste des contacts', function () {
            browser.get('index.html');

            var contacts = element.all(by.repeater('contact in contacts'));
            expect(contacts.count()).toBe(4);
            expect(contacts.get(0).nom).toEqual('Bertrand');
        });

    });

});
