/// <reference types="cypress" />

describe('Valid Login Test and User location Assertion', () => {
  it('should navigate to the inventory page after successful login', () => {

    cy.visit('/');

    // Enter username and password, then submit the form
    cy.get('#user-name').type(Cypress.env('VALID_USERNAME'));
    cy.get('#password').type(Cypress.env('VALID_PASSWORD'));
    cy.get('#login-button').click();

    // Assert that the user has succesfully logged in and has been navigated to the inventory page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  
  });
});

describe('Locked out User Login Test and error message Assertion', () => {
  it('login should not be successful and correct error message should be displayed', () => {

    cy.visit('/');

    // Enter username and password, then submit the form
    cy.get('#user-name').type(Cypress.env('LOCKED_USERNAME'));
    cy.get('#password').type(Cypress.env('VALID_PASSWORD'));
    cy.get('#login-button').click();


    // Assert that the user has not logged in
   cy.url().should('eq', 'https://www.saucedemo.com/');

    // Assert that the correct error message is displayed
    cy.get('.error-message-container.error').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });
});


//ADDITIONAL SCENARIOS, using the same format as the tests above:
//Empty Username - User Not logged in, and Correct error message
//Empty Password - User Not logged in, and Correct error message
//Incorrect Username - User Not logged in, and Correct error message
//Incorrect Password - User Not logged in, and Correct error message
//etc