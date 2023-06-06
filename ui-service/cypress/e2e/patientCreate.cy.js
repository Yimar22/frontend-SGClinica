describe("CRUD TESTING USER", () => {
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
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      //Assertion that verifies that we are on the patient submenu
      cy.get('[href="/patients/patientRegister"]').should(
        "have.text",
        "Registro de Pacientes"
      );
      cy.get('[href="/patients/emtPatients"]').should(
        "have.text",
        "Pacientes del EMT"
      );
    });
  });
  describe("Verifying Patient Creation", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.visit("http://localhost:3000");
      cy.get("#username").type("admin");
      cy.get("#password").type("testpassword");
      cy.get(".btn").click();
    });

    it("Creating Patient Without Illsnes", () => {
      cy.get(".navbar-toggler-icon").click();
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      cy.get('[href="/patients/patientRegister"]').click();

      cy.get("#id").type("1151918");
      cy.get("#firstName").type("Sergio");
      cy.get("#lastName").type("Cabrera");
      cy.get("#genre").select("Masculino");
      cy.get("#civilStatus").select("Soltero");
      cy.get("#nationality").type("Colombia");
      cy.get("#migratoryState").select("No aplica");
      cy.get("#birthDateDay").type("11");
      cy.get("#birthDateMonth").select("Octubre");
      cy.get("#birthDateYear").type("1999");

      cy.get(".d-flex > .btn").click();
      cy.get(".navbar-toggler").click();
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      cy.get('[href="/patients/emtPatients"]').click();
      cy.get('#text-filter-column-id').type('1151918');
      cy.contains('Sergio');
    });

    it("Creating Patient With Illsnes", () => {
      cy.get(".navbar-toggler-icon").click();
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      cy.get('[href="/patients/patientRegister"]').click();

      cy.get("#id").type("1151970618");
      cy.get("#firstName").type("Zergio");
      cy.get("#lastName").type("Cabrera");
      cy.get("#genre").select("Masculino");
      cy.get("#civilStatus").select("Soltero");
      cy.get("#nationality").type("Colombia");
      cy.get("#migratoryState").select("No aplica");
      cy.get("#birthDateDay").type("11");
      cy.get("#birthDateMonth").select("Octubre");
      cy.get("#birthDateYear").type("1999");

      cy.get("#mainDiseaseCode").type("12345678");
      cy.get("#mainDiseaseName").type("Gripe");

      cy.get(".d-flex > .btn").click();
      cy.get(".navbar-toggler").click();
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      cy.get('[href="/patients/emtPatients"]').click();
      cy.get('#text-filter-column-id').type('1151970618');
      cy.contains('Zergio');
    });
  });

  describe("Verifying Patient Read Functionality", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.visit("http://localhost:3000");
      cy.get("#username").type("admin");
      cy.get("#password").type("testpassword");
      cy.get(".btn").click();
    });

    it("Checking Patient Info", () => {
      cy.get(".navbar-toggler-icon").click();
      cy.get(":nth-child(3) > #offcanvasNavbarDropdown-expand-false").click();
      cy.get('[href="/patients/emtPatients"]').click();
      cy.get(':nth-child(1) > :nth-child(5) > .container > .users-table-controls > :nth-child(1) > span > svg').click();
      cy.contains('Nuñez');
      cy.get('#fill-tab-example-tab-nationalityInformation').click();
      cy.get('#fill-tab-example-tab-admissionInformation').click();
    });
  });


});
