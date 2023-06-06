describe("Verifying User Info", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000");
    cy.get("#username").type("admin");
    cy.get("#password").type("testpassword");
    cy.get(".btn").click();
  });

  it("Read Should Work For First User In The List", () => {
    cy.get('.navbar-toggler-icon').click();
    cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click();
    cy.get('[href="/users/emtUsers"]').click();
    cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(1) > span > svg ').click();
    cy.get('#firstName').should("have.text", "");
    cy.get('#fill-tab-example-tab-contactInformation').click();
    cy.get('#phone').should("have.text", "");
    cy.get('#fill-tab-example-tab-roles').click();
    cy.get('#fill-tab-example-tab-status').click();
    cy.get('h6 > strong').should("have.text","activo");

    //Assertion to that verifies that user info is displayed
    
});

});
