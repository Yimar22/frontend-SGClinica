//import { user } from "../page/index";
//let user: User;

describe('template spec', () => {
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