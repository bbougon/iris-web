'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var HttpBackend = require('httpbackend');
var backend;

describe('iris', function () {

    it('affiche la page de contacts par défaut', function () {
        browser.get('index.html');

        expect(browser.getLocationAbsUrl()).toMatch("/contacts");
    });

    describe('contacts', function () {

        beforeEach(function () {
            backend = new HttpBackend(browser);
        });

        afterEach(function () {
            backend.clear();
        });

        it('affiche la page des contacts lorsque l\'on va sur /contacts', function () {
            expect(element.all(by.css('span', 'ng-scope')).first().getText()).toMatch(/Liste des contacts/);
        });

        it('affiche la liste des contacts', function () {
            backend.whenGET("http://localhost:8182/contacts").respond(
                [{
                    "identifiant": "9604d6f6-ff35-429c-b749-35825b8192a3",
                    "adresse": {"voie": "rue des martyrs", "codePostal": "75010", "ville": "Paris"}
                },
                    {"identifiant": "141f83a6-5ec9-4f2b-b16b-a235ab84a0cb", "nom": "Bertrand"},
                    {"identifiant": "131379ea-214c-410b-9ee6-56fecd40888f", "nom": "Bertrand"},
                    {"identifiant": "95492e1a-3fbb-49e4-8ed8-78e881dd85bb", "nom": "Bertrand"}]);

            var contacts = element.all(by.repeater('contact in contacts'));

            browser.wait(function () {
                return browser.getLocationAbsUrl().then(function (currentUrl) {
                    return currentUrl.indexOf("contacts") > -1;
                });
            }, 5000).then(function () {
                expect(contacts.count()).toBe(4);
            });
        });
    });


});
