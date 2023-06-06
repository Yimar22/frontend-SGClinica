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

    
    describe('Create Testing', () => {

        beforeEach(() => {

            cy.clearCookies();
            cy.visit("http://localhost:3000");
            cy.get('#username').type("admin");
            cy.get('#password').type("testpassword");
            cy.get('.btn').click();
        });

        it('should create a user successfully', () => {

            cy.get('.navbar-toggler').click();
            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click();
            cy.get('[href="/users/userRegister"]').click();
            cy.get('#email').type("johndoe@example.com");
            cy.get('#username').type("AAJohn Doe");
            cy.get('#password').type("1234");
            cy.get('#firstName').type("John");
            cy.get('#lastName').type("Doe");
            cy.get('#id').type("1100");
            cy.get('#birthDateDay').type("14");
            cy.get('#birthDateMonth').select("Diciembre");
            cy.get('#birthDateYear').type("2001");
            cy.get('#genre').select("Masculino");
            cy.get('#civilStatus').select("Conviviendo");
            cy.get('#phoneNumber').type("3214286125");
            cy.get('#address').type("Cl. 18 #122-135");
            cy.get(':nth-child(3) > .mx-2 > .form-check-input').click();
            cy.get('.d-flex > .btn').click();
            cy.wait(500);
            cy.get('.navbar-toggler').click();
            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click();
            cy.get('[href="/users/emtUsers"]').click();
        })


        it('should show an error message when the text field is empty', () => {

            cy.get('.navbar-toggler').click();
            cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click();
            cy.get('[href="/users/userRegister"]').click();
            cy.get('#email').type("johndoe2@example.com");
            cy.get('#username')
            cy.get('#password').type("1234");
            cy.get('#firstName').type("John2");
            cy.get('#lastName').type("Doe");
            cy.get('#id').type("1100");
            cy.get('#birthDateDay').type("15");
            cy.get('#birthDateMonth').select("Diciembre");
            cy.get('#birthDateYear').type("2002");
            cy.get('#genre').select("Masculino");
            cy.get('#civilStatus').select("Soltero");
            cy.get('#phoneNumber').type("321432325");
            cy.get('#address').type("Cl. 18 #122-135");
            cy.get(':nth-child(3) > .mx-2 > .form-check-input').click();
            cy.get('.d-flex > .btn').click();
            cy.wait(5000);
            //  cy.get('.navbar-toggler').click();
            // cy.get(':nth-child(1) > #offcanvasNavbarDropdown-expand-false').click();
            // cy.get('[href="/users/emtUsers"]').click();
        })
    })

    describe("Read Testing", () => {

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
})