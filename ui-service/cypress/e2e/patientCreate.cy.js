describe("Verifying Patient Menu", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000");
    cy.get("#username").type("admin");
    cy.get("#password").type("testpassword");
    cy.get(".btn").click();
  });

  it("Creating Patient Without Illsnes", () => {
    cy.get(".navbar-toggler-icon").click();
    cy.get(':nth-child(3) > #offcanvasNavbarDropdown-expand-false').click();
    cy.get('[href="/patients/patientRegister"]').click();

    cy.get('#id').type('1151970618');
    cy.get('#firstName').type('Sergio');
    cy.get('#lastName').type('Cabrera');
    cy.get('#genre').select('Masculino');
    cy.get('#civilStatus').select('Soltero');
    cy.get('#nationality').type('Colombia');
    cy.get('#migratoryState').select('No aplica');
    cy.get('#birthDateDay').type('11');
    cy.get('#birthDateMonth').select('Octubre');
    cy.get('#birthDateYear').type('1999');

    cy.get('.d-flex > .btn').click();
  });

  it("Creating Patient With Illsnes", () => {
    cy.get(".navbar-toggler-icon").click();
    cy.get(':nth-child(3) > #offcanvasNavbarDropdown-expand-false').click();
    cy.get('[href="/patients/patientRegister"]').click();

    cy.get('#id').type('1151970618');
    cy.get('#firstName').type('Sergio');
    cy.get('#lastName').type('Cabrera');
    cy.get('#genre').select('Masculino');
    cy.get('#civilStatus').select('Soltero');
    cy.get('#nationality').type('Colombia');
    cy.get('#migratoryState').select('No aplica');
    cy.get('#birthDateDay').type('11');
    cy.get('#birthDateMonth').select('Octubre');
    cy.get('#birthDateYear').type('1999');

    cy.get('#mainDiseaseCode').type('12345678');
    cy.get('#mainDiseaseName').type('Gripe')
  });
});