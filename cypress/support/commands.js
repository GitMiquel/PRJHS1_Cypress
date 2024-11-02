/** 
 * Custom command to login and verify we are in the inventory page
 * Usage: cy.validLogin();
 */
Cypress.Commands.add('validLogin', () => {
    cy.visit('/');
    cy.get('#user-name').type(Cypress.env('VALID_USERNAME'));
    cy.get('#password').type(Cypress.env('VALID_PASSWORD'));
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });


 /** 
 * Custom command add an item to the cart, navigate to the cart page and verify the item added
 * Usage: cy.itemAddToCart();
 */
Cypress.Commands.add('itemAddToCart', () => {
  cy.validLogin()
  cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');
  cy.get('.cart_item').should('be.visible');
})


 /** 
 * Custom command to progress through the first step of checking out an item
 * Usage: cy.checkOutStep1();
 */
 Cypress.Commands.add('checkOutStep1', () => {
  cy.get('#checkout').click();
  cy.url().should('include', '/checkout-step-one.html');
  cy.get('#first-name').type(Cypress.env('VALID_FIRSTNAME'));
  cy.get('#last-name').type(Cypress.env('VALID_LASTNAME'));
  cy.get('#continue').click()
  .then(() => {
    cy.get('.error-message-container.error').should('have.text', 'Error: Postal Code is required');
  });
  cy.get('#postal-code').type(Cypress.env('VALID_POSTALCODE'));
  cy.get('#continue').click()
  cy.url().should('include', '/checkout-step-two.html');
})
