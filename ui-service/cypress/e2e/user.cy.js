describe('Verifying Login Process ', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.visit("http://localhost:3000");
      });

    it("Login should notify when a wrong username/password combination is used.", () => {
        cy.get('#username').type("testUser");
        cy.get('#password').type("testPass");
        cy.get('.btn').click();

        // Assertion for error message
        cy.get('.fade').should(
          "include.text",
          "Usuario no encontrado")
    });

    it("Login should work for existing user.", () => {

        cy.get('#username').type("admin");
        cy.get('#password').type("testpassword");
        cy.get('.btn').click();
        cy.get('.navbar-toggler-icon').click();
        // Assertion that verifies that products list is displayed
        cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').should("have.text", "Gestión de Usuarios")
    });
})