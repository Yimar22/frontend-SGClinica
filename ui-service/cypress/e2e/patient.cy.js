describe("Verifying Patient Menu", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000");
    cy.get("#username").type("admin");
    cy.get("#password").type("testpassword");
    cy.get(".btn").click();
  });

  it("Menu Should Be Displayed", () => {
    cy.get(".navbar-toggler-icon").click();
    cy.get(':nth-child(3) > #offcanvasNavbarDropdown-expand-false').click();
    //Assertion that verifies that we are on the patient submenu
    cy.get('[href="/patients/patientRegister"]').should("have.text", "Registro de Pacientes");
    cy.get('[href="/patients/emtPatients"]').should("have.text", "Pacientes del EMT");
  });
});