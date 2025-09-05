describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.get('[data-cy=bun-ingredient]').first().find('button').click();
    cy.get('[data-cy=constructor-bun-top]').should('exist');

    cy.get('[data-cy=main-ingredient]').first().find('button').click();
    cy.get('[data-cy=constructor-ingredients]').should('contain', 'Биокотлета');

    cy.get('[data-cy=sauce-ingredient]').first().find('button').click();
    cy.get('[data-cy=constructor-ingredients]').should('contain', 'Соус Spicy-X');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.get('[data-cy=ingredient-link]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=ingredient-details]').should('contain', 'Краторная булка');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=ingredient-link]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });
    cy.authenticateUser();

    cy.get('[data-cy=bun-ingredient]').first().find('button').click();
    cy.get('[data-cy=constructor-bun-top]').should('exist');

    cy.get('[data-cy=main-ingredient]').first().find('button').click();
    cy.get('[data-cy=constructor-ingredients]').should('contain', 'Биокотлета');

    cy.get('[data-cy=order-button]').click();

    cy.url().should('not.include', '/login');
    cy.get('[data-cy=modal]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy=order-details]').should('contain', '12345');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
