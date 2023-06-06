describe('template spec', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000");
    cy.get('#username').type("admin");
        cy.get('#password').type("testpassword");
        cy.get('.btn').click();
  });


  it('should create a clinical history successfully', () => {
    const opcionesTexto = ['Describa el motivo de consulta y sintomas ', 'El paciente esta consciente?', 'El paciente tiene alguna enfermedad cronica? Cual?'];
    cy.get('.navbar-toggler').click();
    cy.get(':nth-child(4) > #offcanvasNavbarDropdown-expand-false').click();
    cy.get('[href="/clinicHistory/createClinicHistory"]').click();
    cy.get('#clinicHistory-content').type("Historia clinica de urgencias");
    cy.get('#clinicHistory-description').type("Basica para urgencias");
    cy.get('.row > :nth-child(1) > .form-control').type("Describa el motivo de consulta y sintomas");
    cy.get('.form-select').select("Opción abierta");
  //  cy.get('[data-tip="Añadir campo"]').click();
    //cy.get('.row > :nth-child(1) > .form-control').invoke('val', 'El paciente esta consciente?');
  //  cy.get('.row > :nth-child(1) > .form-control').type("Describa el motivo de consulta y sintomas").each( 'El paciente esta consciente?');
     //   cy.get('.d-flex > .form-control')
     cy.get('.mx-auto > .mt-5').click();
  })


})