'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


describe('iris', function () {

    it('affiche la page de contacts par défaut', function () {
        browser.get('index.html');

        expect(browser.getLocationAbsUrl()).toMatch("/contacts");
    });

    describe('affiche la page des contacts', function () {
        it('appelle l\'url des contacts lorsque l\' on clique sur le lien contacts', function () {
            element(by.id('contacts')).click();

            expect(browser.getLocationAbsUrl()).toMatch("/contacts");
        });

        it('affiche la page des contacts lorsque l\'on va sur /contacts', function () {
            browser.get('http://localhost:8000/app/#/contacts');

            expect(element.all(by.css('span', 'ng-scope')).first().getText()).toMatch(/Liste des contacts/);
        });

        it('affiche le formulaire d\'ajout de contacts', function () {
            browser.get('http://localhost:8000/app/#/contacts');
            element(by.id('ajout-contact')).click();

            expect(element.all(by.css('h2')).first().getText()).toMatch(/Ajouter un contact/);
        });

        it('ferme le formulaire d\'ajout', function () {
            element(by.id('annuler')).click();

            expect(element.all(by.css('span', 'ng-scope')).first().getText()).toMatch(/Liste des contacts/);
        });
    });

    describe('affiche la page des rappels', function () {
        it('affiche la page des rappels lorsque l\'on clique sur le lien rappels', function () {
            element(by.id('rappels')).click();

            expect(browser.getLocationAbsUrl()).toMatch("/rappels");
        });
    });


});
