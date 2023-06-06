describe('CRUD TESTING USER', () => {

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

    describe('Delete Testing', () => {

        beforeEach(() => {
            cy.clearCookies();
            cy.visit("http://localhost:3000");
            cy.get('#username').type("admin");
            cy.get('#password').type("testpassword");
            cy.get('.btn').click();
            cy.get('.navbar-toggler-icon').click();
        });


        it("Should Cancel Delete", () => {

            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click()
            cy.get('[href="/users/emtUsers"]').click()
            cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(4) > span > svg > [d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"]').click()
            cy.get('.modal-footer > .btn-secondary').click()

            // Assertion that verifies that products list is displayed
            cy.get('tbody > :nth-child(1) > :nth-child(1)').should("have.text", "AAJohn Doe")
        });

        it("Should Delete", () => {

            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click()
            cy.get('[href="/users/emtUsers"]').click()
            cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(4) > span > svg > [d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"]').click()
            cy.get('.btn-primary').click()
            // Assertion that verifies that products list is displayed
            cy.get('tbody > :nth-child(1) > :nth-child(1)').should("have.text", "admin")
        });
    });

    describe('Update Testing', () => {

        beforeEach(() => {
            cy.clearCookies();
            cy.visit("http://localhost:3000");
            cy.get('#username').type("admin");
            cy.get('#password').type("testpassword");
            cy.get('.btn').click();
            cy.get('.navbar-toggler-icon').click();
        });

        it("should update personal Info", () => {

            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click()
            cy.get('[href="/users/emtUsers"]').click()
            cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(2) > span > svg').click()
            cy.get('#fill-tab-example-tabpane-personalInformation > .card > .ms-2 > form > .d-flex > .btn').click()

            cy.get('#firstName').type("AAADiego")
            cy.get('#lastName').type("Torres")

            cy.get('#genre').select("Masculino")
            cy.get('#civilStatus').select("Viudo")

            cy.get('#fill-tab-example-tabpane-personalInformation > .card > .ms-2 > form > .d-flex > .btn').click()
        });

        it("should update personal Info", () => {

            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click()
            cy.get('[href="/users/emtUsers"]').click()
            cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(2) > span > svg').click()+
            cy.get('#fill-tab-example-tab-contactInformation').click()
            cy.get('#fill-tab-example-tabpane-contactInformation > .card > .ms-2 > form > .d-flex > .btn').click()

            cy.get('#phone').type("3216994239")
            cy.get('#email').type("diego145@hotmail.com")
            cy.get('#address').type("No la se")

            cy.get('#fill-tab-example-tabpane-contactInformation > .card > .ms-2 > form > .d-flex > .btn').click()
        });

        it("should update Rol Info", () => {

            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click()
            cy.get('[href="/users/emtUsers"]').click()
            cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(2) > span > svg').click()
            cy.get('#fill-tab-example-tab-roles').click()
            cy.get('#fill-tab-example-tabpane-roles > .card > .ms-2 > .d-flex > .btn').click()
            cy.get(':nth-child(1) > .badge').click()
            cy.get('#fill-tab-example-tab-roles').click()

            //asert
            cy.get('.form-check-label').should("have.text", "ADMIN")
        });

    });
})