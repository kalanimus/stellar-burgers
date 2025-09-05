/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      authenticateUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('authenticateUser', () => {
  cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });

  cy.setCookie('accessToken', 'test-access-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
  });

  cy.reload();
  cy.wait(200);
});

export {};
