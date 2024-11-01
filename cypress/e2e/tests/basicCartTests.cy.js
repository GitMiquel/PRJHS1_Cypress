/// <reference types="cypress" />
beforeEach(() => {
    // Visits the SauceDemo login page and logs in with valid credentials
    cy.validLogin();
  });

  describe('Add items to cart and verify cart badge count', () => {

    it('should add each item to the cart and verify the cart badge count', () => {
      // Select all "Add to cart" buttons and checks the cart count badge after each item
      cy.get('.inventory_item').each((item, index) => {
        // Clicks the "Add to cart" button for the currently listed items on the inventory page
        cy.wrap(item).find('button').contains('Add to cart').click();
  
        // Verifies the cart badge count is updated to the expected number after each item is added (index + 1)
        cy.get('.shopping_cart_badge').should('have.text', (index + 1).toString());
      });
    });
  });


  describe('Adds the first item to the cart and verifies the cart', () => {

    it('should add the first item to the cart and verify its presence in the cart page', () => {

      // Selects the first inventory item and captures its name
      cy.get('.inventory_item').first().within(() => {
        cy.get('.inventory_item_name')
          .invoke('text')
          //We use .then to ensure the alias is set before any further actions are taken, as the DOM will change after navigating to the cart page
          .then((text) => {
            cy.wrap(text).as('selectedItemName'); // Stores the item name as an alias
          });
      });
  
      // Add the first item to the cart
      cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
  
      // Clicks on the shopping cart link and verifies navigation to cart page
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      // Retrieve the alias and verify that the item in the cart matches the selected item
      cy.get('@selectedItemName').then((itemName) => {
        cy.get('.cart_item .inventory_item_name').should('have.text', itemName);
      });

    });
});



//ADDITIONAL SCENARIOS, using a similar format to that of the second test
//
//*********************************************************************/
//beforeEach (Adding 2 items to the cart) - then removing 1 items using 2 methods:
//** 1st Test *//
//1 Item is removed by clicking remove in the inventory page, name of removed item is captured, badge number decreases to 1
//Navigates to the cart and checks that the captured item name does not correspond to the item found in the cart page
//** 2nd Test *//
//1 Item is removed by clicking remove in the cart page, name of removed item is captured, badge number decreases to 1
//Checks that the captured item name does not correspond to the item still remaining in the cart page
//*********************************************************************/
//
//Test that checks that no duplicate items are added
//Test that checks the functionality of the Continue Shopping in the cart page
//etc

