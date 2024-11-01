/// <reference types="cypress" />
beforeEach(() => {
    // After succesful login, adds the first item to the cart and navigates to the cart
    cy.itemAddToCart();
  });


describe('succesfully takes an item through checkout step 1', () => {

  it('should enter checkout information, display correct pricing and display order confirmation upon finish', () => {
    //Select Checkout button on the cart page
    cy.get('#checkout').click();
    //Checks that the user has been navigated to the first checkout step
    cy.url().should('include', '/checkout-step-one.html');
    //Fills all but post code checkout details input fields
    cy.get('#first-name').type(Cypress.env('VALID_FIRSTNAME'));
    cy.get('#last-name').type(Cypress.env('VALID_LASTNAME'));
    //Clicks continue and checks for a missing post code error message
    cy.get('#continue').click()
    .then(() => {
      cy.get('.error-message-container.error').should('have.text', 'Error: Postal Code is required');
    });
    //Enters a valid post code and presses continue again
    cy.get('#postal-code').type(Cypress.env('VALID_POSTALCODE'));
    cy.get('#continue').click()
    //Checks that the user is navigated to the second checkout step
    cy.url().should('include', '/checkout-step-two.html');
  });
});


describe('checks for the presence of check out data and succesfully checks out an item', () => {

  it('should validate check out data and that the order confirmation page and message are displayed after completing the checkout', () => {
    // Pogresses an item through the first step of checking out
    cy.checkOutStep1();
    //Checks that there is an item present in the page
    cy.get('.cart_item').should('not.be.empty');
    //Checks that there is Payment Information present in the page
    cy.get('[data-test="payment-info-value"]').should('not.be.empty');
    //Checks that there is Shipping Information present in the page
    cy.get('[data-test="shipping-info-value"]').should('not.be.empty');
    //Clicks the finish button and checks that the user is navigated to the checkout complete page
    cy.get('#finish').click();
    cy.url().should('include', '/checkout-complete.html');
    //Checks for the 
    cy.get('[data-test="checkout-complete-container"]').should('not.be.empty');
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
  });
});


// **check that the tax and final price are correct

//ADDITIONAL SCENARIOS
//That an empty cart cannot be checked out
//That a checkout can be cancelled during Check Out Step 1 - Cart persists
//That a checkout can be cancelled during Check Out Step 2 - Cart persists
//etc

